import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  LedgerValidationError,
  stableJson,
  validateActionLedgerEvent,
} from "./ledger-schema.mjs";

export class LedgerConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "LedgerConflictError";
  }
}

export function loadActionLedger(root) {
  const sourceRoot = path.resolve(root);
  const eventsRoot = path.join(sourceRoot, "ledger", "v1", "events");
  const shardFiles = listShardFiles(eventsRoot);
  const shards = [];
  const occurrences = [];

  for (const file of shardFiles) {
    const relativePath = toPosixPath(path.relative(sourceRoot, file));
    const content = fs.readFileSync(file, "utf8");
    const events = parseShard(content, relativePath);
    validateShardIdentity(events, relativePath);
    shards.push({
      path: relativePath,
      sha256: sha256(content),
      bytes: Buffer.byteLength(content),
      event_count: events.length,
      first_occurred_at: events[0]?.occurred_at ?? null,
      last_occurred_at: events.at(-1)?.occurred_at ?? null,
    });
    events.forEach((event, index) => {
      occurrences.push({ event, path: relativePath, line: index + 1 });
    });
  }

  const deduped = dedupeEvents(occurrences);
  const source = {
    schema: "clawsweeper.state-ledger-source.v1",
    schema_version: 1,
    epoch: "v1",
    source_digest: sha256(stableJson(shards)),
    shard_count: shards.length,
    raw_event_count: occurrences.length,
    event_count: deduped.events.length,
    duplicate_count: deduped.duplicateCount,
    shards,
  };
  return { events: deduped.events, source };
}

export function actionEventShardRelativePath(events) {
  if (!events.length) throw new LedgerValidationError("action event shard requires events");
  const normalized = dedupeEvents(
    events.map((event, index) => ({ event, path: "candidate", line: index + 1 })),
  ).events;
  const ordered = [...normalized].sort(compareEvents);
  const first = ordered[0];
  const identity = shardIdentity(first);
  for (const event of ordered) assertSameShardIdentity(event, identity, "candidate shard");
  const day = first.occurred_at.slice(0, 10).split("-");
  const identityDigest = sha256(
    stableJson({
      producer: identity.producer,
      workflow: identity.workflow,
      job: identity.job,
      runId: identity.runId,
      runAttempt: identity.runAttempt,
    }),
  ).slice(0, 12);
  const filename = [
    safePathSegment(identity.runId),
    String(identity.runAttempt),
    safePathSegment(identity.job),
    identityDigest,
  ].join("-");
  return path.posix.join(
    "ledger",
    "v1",
    "events",
    day[0],
    day[1],
    day[2],
    safePathSegment(identity.producer),
    `${filename}.jsonl`,
  );
}

function listShardFiles(root) {
  if (!fs.existsSync(root)) return [];
  const files = [];
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) =>
      a.name.localeCompare(b.name),
    )) {
      const file = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        throw new LedgerValidationError(`action ledger source contains symlink: ${file}`);
      }
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile() && entry.name.endsWith(".jsonl")) files.push(file);
      else {
        throw new LedgerValidationError(`action ledger source contains unexpected entry: ${file}`);
      }
    }
  };
  visit(root);
  return files;
}

function parseShard(content, relativePath) {
  if (!content) throw new LedgerValidationError(`${relativePath}: empty action ledger shard`);
  const lines = content.split(/\r?\n/);
  if (lines.at(-1) === "") lines.pop();
  if (!lines.length) throw new LedgerValidationError(`${relativePath}: empty action ledger shard`);
  return lines.map((line, index) => {
    const location = `${relativePath}:${index + 1}`;
    if (!line.trim()) throw new LedgerValidationError(`${location}: blank JSONL line`);
    let parsed;
    try {
      parsed = JSON.parse(line);
    } catch (error) {
      throw new LedgerValidationError(`${location}: malformed JSON`, { cause: error });
    }
    return validateActionLedgerEvent(parsed, location);
  });
}

function validateShardIdentity(events, relativePath) {
  if (!events.length) throw new LedgerValidationError(`${relativePath}: empty action ledger shard`);
  for (let index = 1; index < events.length; index += 1) {
    if (compareEvents(events[index - 1], events[index]) > 0) {
      throw new LedgerValidationError(`${relativePath}: events are not in canonical order`);
    }
  }
  const identity = shardIdentity(events[0]);
  for (const event of events) assertSameShardIdentity(event, identity, relativePath);
  const expected = actionEventShardRelativePath(events);
  if (relativePath !== expected) {
    throw new LedgerValidationError(
      `${relativePath}: shard path does not match producer identity; expected ${expected}`,
    );
  }
}

function shardIdentity(event) {
  return {
    producer: event.producer.component,
    workflow: event.producer.workflow,
    job: event.producer.job,
    runId: event.producer.run_id,
    runAttempt: event.producer.run_attempt,
  };
}

function assertSameShardIdentity(event, identity, location) {
  if (
    event.producer.component !== identity.producer ||
    event.producer.workflow !== identity.workflow ||
    event.producer.job !== identity.job ||
    event.producer.run_id !== identity.runId ||
    event.producer.run_attempt !== identity.runAttempt
  ) {
    throw new LedgerValidationError(
      `${location}: event ${event.event_id} does not match shard producer identity`,
    );
  }
}

function dedupeEvents(occurrences) {
  const byId = new Map();
  let duplicateCount = 0;
  for (const occurrence of [...occurrences].sort(compareOccurrences)) {
    const event = validateActionLedgerEvent(
      occurrence.event,
      `${occurrence.path}:${occurrence.line}`,
    );
    const candidate = { ...occurrence, event };
    const previous = byId.get(event.event_id);
    if (!previous) {
      byId.set(event.event_id, candidate);
      continue;
    }
    if (
      previous.event.event_key !== event.event_key ||
      previous.event.semantic_sha256 !== event.semantic_sha256
    ) {
      throw new LedgerConflictError(
        `action ledger event conflict for ${event.event_id}: ` +
          `${previous.path}:${previous.line} != ${occurrence.path}:${occurrence.line}`,
      );
    }
    duplicateCount += 1;
    if (compareRepresentatives(candidate, previous) < 0) byId.set(event.event_id, candidate);
  }
  return {
    events: [...byId.values()].map(({ event }) => event).sort(compareEvents),
    duplicateCount,
  };
}

function compareOccurrences(left, right) {
  return left.path.localeCompare(right.path) || left.line - right.line;
}

function compareRepresentatives(left, right) {
  return (
    left.event.recorded_at.localeCompare(right.event.recorded_at) ||
    left.event.occurred_at.localeCompare(right.event.occurred_at) ||
    stableJson(left.event).localeCompare(stableJson(right.event)) ||
    compareOccurrences(left, right)
  );
}

function compareEvents(left, right) {
  return (
    left.occurred_at.localeCompare(right.occurred_at) ||
    left.event_id.localeCompare(right.event_id)
  );
}

function safePathSegment(value) {
  return value.replace(/[^A-Za-z0-9_.-]+/g, "-").replace(/^-+|-+$/g, "") || "unknown";
}

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
