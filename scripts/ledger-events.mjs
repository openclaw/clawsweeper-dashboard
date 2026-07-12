import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  compareCanonicalTimestamps,
  LedgerValidationError,
  requiredCalendarDate,
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
  const shardFiles = listShardFiles(eventsRoot, sourceRoot);
  const shards = [];
  const occurrences = [];

  for (const file of shardFiles) {
    const relativePath = toPosixPath(path.relative(sourceRoot, file));
    const rawContent = fs.readFileSync(file);
    let content;
    try {
      content = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(rawContent);
    } catch (error) {
      throw new LedgerValidationError(`${relativePath}: invalid UTF-8`, { cause: error });
    }
    const events = parseShard(content, relativePath);
    const partitionDate = validateShardIdentity(events, relativePath);
    shards.push({
      path: relativePath,
      partition_date: partitionDate,
      sha256: sha256(rawContent),
      bytes: rawContent.byteLength,
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

export function actionEventShardRelativePath(identity, events) {
  if (!events.length) throw new LedgerValidationError("action event shard requires events");
  const normalizedIdentity = normalizeShardIdentity(identity);
  const normalized = dedupeEvents(
    events.map((event, index) => ({ event, path: "candidate", line: index + 1 })),
  ).events;
  const ordered = [...normalized].sort(compareEvents);
  for (const event of ordered) {
    assertSameShardIdentity(event, normalizedIdentity, "candidate shard");
  }
  const day = normalizedIdentity.partitionDate.split("-");
  const identityDigest = sha256(
    stableJson({
      producer: normalizedIdentity.producer,
      workflow: normalizedIdentity.workflow,
      job: normalizedIdentity.job,
      runId: normalizedIdentity.runId,
      runAttempt: normalizedIdentity.runAttempt,
      partitionDate: normalizedIdentity.partitionDate,
    }),
  ).slice(0, 12);
  const filename = [
    safePathSegment(normalizedIdentity.runId),
    String(normalizedIdentity.runAttempt),
    safePathSegment(normalizedIdentity.job),
    identityDigest,
  ].join("-");
  return path.posix.join(
    "ledger",
    "v1",
    "events",
    day[0],
    day[1],
    day[2],
    safePathSegment(normalizedIdentity.producer),
    `${filename}.jsonl`,
  );
}

function listShardFiles(root, sourceRoot) {
  assertNoSymlinkedSourcePath(root, sourceRoot);
  if (!pathEntryExists(root)) return [];
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

function assertNoSymlinkedSourcePath(root, sourceRoot) {
  let current = path.resolve(root);
  const boundary = path.resolve(sourceRoot);
  while (true) {
    try {
      if (fs.lstatSync(current).isSymbolicLink()) {
        throw new LedgerValidationError(`action ledger source contains symlink: ${current}`);
      }
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
    if (current === boundary) return;
    const parent = path.dirname(current);
    if (parent === current || path.relative(boundary, current).startsWith("..")) {
      throw new LedgerValidationError(`action ledger source escapes source root: ${root}`);
    }
    current = parent;
  }
}

function pathEntryExists(value) {
  try {
    fs.lstatSync(value);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function parseShard(content, relativePath) {
  if (!content) throw new LedgerValidationError(`${relativePath}: empty action ledger shard`);
  const lines = content.split(/\r?\n/);
  if (lines.at(-1) === "") lines.pop();
  if (!lines.length) throw new LedgerValidationError(`${relativePath}: empty action ledger shard`);
  return lines.map((line, index) => {
    const location = `${relativePath}:${index + 1}`;
    if (!line.trim()) throw new LedgerValidationError(`${location}: blank JSONL line`);
    assertNoDuplicateJsonMembers(line, location);
    let parsed;
    try {
      parsed = JSON.parse(line);
    } catch (error) {
      throw new LedgerValidationError(`${location}: malformed JSON`, { cause: error });
    }
    return validateActionLedgerEvent(parsed, location);
  });
}

function assertNoDuplicateJsonMembers(source, location) {
  let offset = 0;

  const skipWhitespace = () => {
    while (offset < source.length && /\s/.test(source[offset])) offset += 1;
  };

  const scanString = () => {
    const start = offset;
    offset += 1;
    while (offset < source.length) {
      const character = source[offset];
      if (character === '"') {
        offset += 1;
        try {
          return { valid: true, value: JSON.parse(source.slice(start, offset)) };
        } catch {
          return { valid: false };
        }
      }
      if (character === "\\") {
        offset += 2;
      } else {
        offset += 1;
      }
    }
    return { valid: false };
  };

  const scanPrimitive = () => {
    const start = offset;
    while (offset < source.length && !/[\s,\]}]/.test(source[offset])) offset += 1;
    return offset > start;
  };

  const scanValue = (depth) => {
    if (depth > 128) {
      throw new LedgerValidationError(`${location}: JSON nesting exceeds 128 levels`);
    }
    skipWhitespace();
    if (source[offset] === "{") return scanObject(depth + 1);
    if (source[offset] === "[") return scanArray(depth + 1);
    if (source[offset] === '"') return scanString().valid;
    return scanPrimitive();
  };

  const scanObject = (depth) => {
    offset += 1;
    skipWhitespace();
    if (source[offset] === "}") {
      offset += 1;
      return true;
    }
    const keys = new Set();
    while (offset < source.length) {
      if (source[offset] !== '"') return false;
      const key = scanString();
      if (!key.valid) return false;
      if (keys.has(key.value)) {
        throw new LedgerValidationError(
          `${location}: duplicate JSON member ${JSON.stringify(key.value)}`,
        );
      }
      keys.add(key.value);
      skipWhitespace();
      if (source[offset] !== ":") return false;
      offset += 1;
      if (!scanValue(depth)) return false;
      skipWhitespace();
      if (source[offset] === "}") {
        offset += 1;
        return true;
      }
      if (source[offset] !== ",") return false;
      offset += 1;
      skipWhitespace();
    }
    return false;
  };

  const scanArray = (depth) => {
    offset += 1;
    skipWhitespace();
    if (source[offset] === "]") {
      offset += 1;
      return true;
    }
    while (offset < source.length) {
      if (!scanValue(depth)) return false;
      skipWhitespace();
      if (source[offset] === "]") {
        offset += 1;
        return true;
      }
      if (source[offset] !== ",") return false;
      offset += 1;
      skipWhitespace();
    }
    return false;
  };

  scanValue(0);
}

function validateShardIdentity(events, relativePath) {
  if (!events.length) throw new LedgerValidationError(`${relativePath}: empty action ledger shard`);
  for (let index = 1; index < events.length; index += 1) {
    if (compareEvents(events[index - 1], events[index]) > 0) {
      throw new LedgerValidationError(`${relativePath}: events are not in canonical order`);
    }
  }
  const partitionDate = partitionDateFromPath(relativePath);
  const identity = { ...shardIdentity(events[0]), partitionDate };
  const producerIdentity = stableJson(events[0].producer);
  for (const event of events) {
    assertSameShardIdentity(event, identity, relativePath);
    if (stableJson(event.producer) !== producerIdentity) {
      throw new LedgerValidationError(
        `${relativePath}: event ${event.event_id} does not match complete shard producer identity`,
      );
    }
  }
  const expected = actionEventShardRelativePath(identity, events);
  if (relativePath !== expected) {
    throw new LedgerValidationError(
      `${relativePath}: shard path does not match producer identity; expected ${expected}`,
    );
  }
  return partitionDate;
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

function normalizeShardIdentity(identity) {
  return {
    producer: machineText(identity.producer, "shard producer"),
    workflow: machineText(identity.workflow, "shard workflow", 128),
    job: machineText(identity.job, "shard job", 128),
    runId: machineText(identity.runId, "shard run ID"),
    runAttempt: positiveInteger(identity.runAttempt, "shard run attempt"),
    partitionDate: requiredCalendarDate(identity.partitionDate, "shard partition date"),
  };
}

function partitionDateFromPath(relativePath) {
  const match =
    /^ledger\/v1\/events\/(\d{4})\/(\d{2})\/(\d{2})\/[^/]+\/[^/]+\.jsonl$/.exec(
      relativePath,
    );
  if (!match) {
    throw new LedgerValidationError(`${relativePath}: invalid action ledger shard path`);
  }
  return requiredCalendarDate(`${match[1]}-${match[2]}-${match[3]}`, `${relativePath}: partition`);
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
    if (stableJson(previous.event) !== stableJson(event)) {
      throw new LedgerConflictError(
        `action ledger event ${event.event_id} has conflicting duplicate metadata: ` +
          `${previous.path}:${previous.line} != ${occurrence.path}:${occurrence.line}`,
      );
    }
    duplicateCount += 1;
  }
  return {
    events: [...byId.values()].map(({ event }) => event).sort(compareEvents),
    duplicateCount,
  };
}

function compareOccurrences(left, right) {
  return left.path.localeCompare(right.path) || left.line - right.line;
}

function compareEvents(left, right) {
  return (
    compareCanonicalTimestamps(left.occurred_at, right.occurred_at) ||
    left.event_id.localeCompare(right.event_id)
  );
}

function safePathSegment(value) {
  return value.replace(/[^A-Za-z0-9_.-]+/g, "-").replace(/^-+|-+$/g, "") || "unknown";
}

function machineText(value, location, maxLength = 256) {
  if (
    typeof value !== "string" ||
    value.length < 1 ||
    value.length > maxLength ||
    !/^[A-Za-z0-9][A-Za-z0-9_.:/@+-]*$/.test(value)
  ) {
    throw new LedgerValidationError(`${location}: must be machine-readable text`);
  }
  return value;
}

function positiveInteger(value, location) {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new LedgerValidationError(`${location}: must be a positive integer`);
  }
  return value;
}

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
