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
  validateMultipartShardSets(shardFiles, sourceRoot);
  const shards = [];
  const occurrences = [];
  const partitionByProducer = new Map();

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
    const producerIdentity = stableJson(events[0].producer);
    const existingPartition = partitionByProducer.get(producerIdentity);
    if (existingPartition && existingPartition.date !== partitionDate) {
      throw new LedgerValidationError(
        `${relativePath}: producer identity already uses partition ${existingPartition.date} in ${existingPartition.path}`,
      );
    }
    partitionByProducer.set(producerIdentity, { date: partitionDate, path: relativePath });
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

  // Immutable shard bytes retain the producer's historical occurrence ordering. The aggregate
  // projection can honor phase ordinals without redefining that durable storage contract.
  const deduped = dedupeEvents(occurrences, { phaseAware: true, validatePhase: true });
  validateCompleteCausalParents(deduped.events);
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

export function actionEventShardRelativePath(identity, events, shardIndex, shardCount) {
  if (!events.length) throw new LedgerValidationError("action event shard requires events");
  const normalizedIdentity = normalizeShardIdentity(identity);
  const normalized = dedupeEvents(
    events.map((event, index) => ({ event, path: "candidate", line: index + 1 })),
  ).events;
  const ordered = sortActionEventsCausally(normalized);
  for (const event of ordered) {
    assertSameShardIdentity(event, normalizedIdentity, "candidate shard");
  }
  const day = normalizedIdentity.partitionDate.split("-");
  const identityDigest = sha256(stableJson(normalizedIdentity)).slice(0, 12);
  const filenameBase = [
    safePathSegment(normalizedIdentity.runId),
    String(normalizedIdentity.runAttempt),
    safePathSegment(normalizedIdentity.job),
    identityDigest,
  ].join("-");
  if ((shardIndex === undefined) !== (shardCount === undefined)) {
    throw new LedgerValidationError(
      "action event shard index and count must be provided together",
    );
  }
  const normalizedShardIndex =
    shardIndex === undefined ? undefined : shardPart(shardIndex, "action event shard index");
  const normalizedShardCount =
    shardCount === undefined ? undefined : shardPart(shardCount, "action event shard count");
  if (
    normalizedShardIndex !== undefined &&
    normalizedShardCount !== undefined &&
    normalizedShardIndex > normalizedShardCount
  ) {
    throw new LedgerValidationError("action event shard index cannot exceed shard count");
  }
  const filename =
    normalizedShardIndex === undefined
      ? filenameBase
      : `${filenameBase}-part-${String(normalizedShardIndex).padStart(6, "0")}-of-${String(
          normalizedShardCount,
        ).padStart(6, "0")}`;
  return path.posix.join(
    "ledger",
    "v1",
    "events",
    day[0],
    day[1],
    day[2],
    boundedPathSegment(repositorySlug(normalizedIdentity.repository), 120),
    boundedPathSegment(normalizedIdentity.producer, 120),
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
  const eventsForOrder = events.filter(
    (event, index) => index === 0 || stableJson(event) !== stableJson(events[index - 1]),
  );
  const ordered = sortActionEventsCausally(eventsForOrder);
  if (eventsForOrder.some((event, index) => event.event_id !== ordered[index].event_id)) {
    throw new LedgerValidationError(`${relativePath}: events are not in canonical causal order`);
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
  const part = /-part-(\d{6})-of-(\d{6})\.jsonl$/.exec(relativePath);
  const expected = actionEventShardRelativePath(
    identity,
    events,
    part ? Number(part[1]) : undefined,
    part ? Number(part[2]) : undefined,
  );
  if (relativePath !== expected) {
    throw new LedgerValidationError(
      `${relativePath}: shard path does not match producer identity; expected ${expected}`,
    );
  }
  return partitionDate;
}

function validateMultipartShardSets(shardFiles, sourceRoot) {
  const groups = new Map();
  for (const file of shardFiles) {
    const relativePath = toPosixPath(path.relative(sourceRoot, file));
    const match = /^(.*?)(?:-part-(\d{6})-of-(\d{6}))?\.jsonl$/.exec(relativePath);
    if (!match) continue;
    const base = match[1];
    const group = groups.get(base) ?? { whole: null, count: null, parts: new Map() };
    if (!match[2]) {
      group.whole = relativePath;
    } else {
      const index = Number(match[2]);
      const count = Number(match[3]);
      if (group.count !== null && group.count !== count) {
        throw new LedgerValidationError(
          `${relativePath}: multipart shard count ${count} conflicts with ${group.count}`,
        );
      }
      group.count = count;
      group.parts.set(index, relativePath);
    }
    groups.set(base, group);
  }

  for (const [base, group] of groups) {
    if (group.whole && group.parts.size > 0) {
      throw new LedgerValidationError(
        `${group.whole}: unsplit shard conflicts with multipart shard set ${base}`,
      );
    }
    if (group.count === null) continue;
    for (let index = 1; index <= group.count; index += 1) {
      if (!group.parts.has(index)) {
        throw new LedgerValidationError(
          `${base}: incomplete multipart shard set; missing part ${index} of ${group.count}`,
        );
      }
    }
    if (group.parts.size !== group.count) {
      throw new LedgerValidationError(`${base}: invalid multipart shard set`);
    }
  }
}

function shardIdentity(event) {
  return {
    repository: event.producer.repository,
    sha: event.producer.sha,
    producer: event.producer.component,
    workflow: event.producer.workflow,
    job: event.producer.job,
    runId: event.producer.run_id,
    runAttempt: event.producer.run_attempt,
  };
}

function normalizeShardIdentity(identity) {
  return {
    repository: requiredRepository(identity.repository, "shard repository"),
    sha: machineText(identity.sha, "shard producer sha"),
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
    /^ledger\/v1\/events\/(\d{4})\/(\d{2})\/(\d{2})\/[^/]+\/[^/]+\/[^/]+\.jsonl$/.exec(
      relativePath,
    );
  if (!match) {
    throw new LedgerValidationError(`${relativePath}: invalid action ledger shard path`);
  }
  return requiredCalendarDate(`${match[1]}-${match[2]}-${match[3]}`, `${relativePath}: partition`);
}

function assertSameShardIdentity(event, identity, location) {
  if (
    event.producer.repository !== identity.repository ||
    event.producer.sha !== identity.sha ||
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

function dedupeEvents(occurrences, sortOptions) {
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
    events: sortActionEventsCausally(
      [...byId.values()].map(({ event }) => event),
      sortOptions,
    ),
    duplicateCount,
  };
}

function compareOccurrences(left, right) {
  return left.path.localeCompare(right.path) || left.line - right.line;
}

function compareEvents(left, right) {
  if (left.occurred_at_source === "source" && right.occurred_at_source === "source") {
    return (
      compareCanonicalTimestamps(left.occurred_at, right.occurred_at) ||
      compareLedgerText(left.event_id, right.event_id)
    );
  }
  if (left.occurred_at_source !== right.occurred_at_source) {
    return left.occurred_at_source === "source" ? -1 : 1;
  }
  return compareLedgerText(left.event_id, right.event_id);
}

export function sortActionEventsCausally(
  events,
  { phaseAware = false, validatePhase = false } = {},
) {
  const byId = new Map();
  const childIds = new Map();
  const inDegree = new Map();
  const addEdge = (parentId, childId) => {
    inDegree.set(childId, (inDegree.get(childId) ?? 0) + 1);
    const children = childIds.get(parentId) ?? [];
    children.push(childId);
    childIds.set(parentId, children);
  };
  for (const event of events) {
    if (byId.has(event.event_id)) {
      throw new LedgerValidationError(`action event shard contains duplicate event: ${event.event_id}`);
    }
    byId.set(event.event_id, event);
    inDegree.set(event.event_id, 0);
  }
  for (const event of events) {
    const parentId = event.parent_event_id;
    if (!parentId || !byId.has(parentId)) continue;
    if (validatePhase) {
      const parent = byId.get(parentId);
      if (parent.operation_id !== event.operation_id || parent.attempt_id !== event.attempt_id) {
        throw new LedgerValidationError(
          `action event ${event.event_id} has a causal parent outside its operation attempt`,
        );
      }
      if (parent.attempt_id === event.attempt_id && parent.phase_seq >= event.phase_seq) {
        throw new LedgerValidationError(
          `action event ${event.event_id} does not advance its causal parent phase sequence`,
        );
      }
    }
    addEdge(parentId, event.event_id);
  }
  if (phaseAware) {
    const phasesByAttempt = new Map();
    for (const event of events) {
      const attemptScope = `${event.operation_id}:${event.attempt_id}`;
      const phases = phasesByAttempt.get(attemptScope) ?? new Map();
      const phaseEvents = phases.get(event.phase_seq) ?? [];
      phaseEvents.push(event.event_id);
      phases.set(event.phase_seq, phaseEvents);
      phasesByAttempt.set(attemptScope, phases);
    }
    for (const [attemptScope, phases] of phasesByAttempt) {
      const orderedPhases = [...phases.keys()].sort((left, right) => left - right);
      for (let index = 0; index + 1 < orderedPhases.length; index += 1) {
        // A virtual barrier keeps the heap comparator globally transitive while ensuring every
        // event in one phase finishes before any event in the next phase becomes ready.
        const barrierId = `phase-barrier:${attemptScope}:${orderedPhases[index]}`;
        inDegree.set(barrierId, 0);
        for (const eventId of phases.get(orderedPhases[index])) addEdge(eventId, barrierId);
        for (const eventId of phases.get(orderedPhases[index + 1])) addEdge(barrierId, eventId);
      }
    }
  }

  const ready = [];
  for (const event of events) {
    if (inDegree.get(event.event_id) === 0) pushReadyEvent(ready, event);
  }
  const sorted = [];
  let processedNodes = 0;
  const release = (nodeId) => {
    processedNodes += 1;
    for (const childId of childIds.get(nodeId) ?? []) {
      const remaining = (inDegree.get(childId) ?? 0) - 1;
      inDegree.set(childId, remaining);
      if (remaining !== 0) continue;
      const child = byId.get(childId);
      if (child) pushReadyEvent(ready, child);
      else release(childId);
    }
  };
  while (ready.length > 0) {
    const event = popReadyEvent(ready);
    sorted.push(event);
    release(event.event_id);
  }
  if (sorted.length !== events.length || processedNodes !== inDegree.size) {
    throw new LedgerValidationError("action event shard contains a causal cycle");
  }
  return sorted;
}

function validateCompleteCausalParents(events) {
  const ids = new Set(events.map((event) => event.event_id));
  for (const event of events) {
    if (event.parent_event_id && !ids.has(event.parent_event_id)) {
      throw new LedgerValidationError(
        `action event ${event.event_id} references missing causal parent ${event.parent_event_id}`,
      );
    }
  }
}

function pushReadyEvent(heap, event) {
  heap.push(event);
  let index = heap.length - 1;
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (compareEvents(heap[parent], event) <= 0) break;
    heap[index] = heap[parent];
    index = parent;
  }
  heap[index] = event;
}

function popReadyEvent(heap) {
  const first = heap[0];
  const last = heap.pop();
  if (heap.length === 0) return first;
  let index = 0;
  while (true) {
    const left = index * 2 + 1;
    if (left >= heap.length) break;
    const right = left + 1;
    const child =
      right < heap.length && compareEvents(heap[right], heap[left]) < 0 ? right : left;
    if (compareEvents(last, heap[child]) <= 0) break;
    heap[index] = heap[child];
    index = child;
  }
  heap[index] = last;
  return first;
}

function safePathSegment(value) {
  const safe = value.replace(/[^A-Za-z0-9_.-]+/g, "-").replace(/^-+|-+$/g, "");
  return !safe || safe === "." || safe === ".." ? "unknown" : safe;
}

function boundedPathSegment(value, maxLength) {
  let safe = safePathSegment(value);
  const reservedDevice = /^(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i.test(safe);
  const trailingDot = safe.endsWith(".");
  if (!reservedDevice && !trailingDot && safe.length <= maxLength) return safe;
  const digest = sha256(value).slice(0, 12);
  if (reservedDevice) safe = `_${safe}`;
  if (trailingDot) safe = safe.replace(/\.+$/, "");
  return `${safe.slice(0, maxLength - digest.length - 1)}-${digest}`;
}

function repositorySlug(repository) {
  return repository.replace(/[^A-Za-z0-9_.-]+/g, "-");
}

function shardPart(value, location) {
  if (!Number.isSafeInteger(value) || value < 1 || value > 999_999) {
    throw new LedgerValidationError(`${location}: must be an integer between 1 and 999999`);
  }
  return value;
}

function compareLedgerText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
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

function requiredRepository(value, location) {
  if (
    typeof value !== "string" ||
    !/^[a-z0-9_][a-z0-9_.-]*\/[a-z0-9_][a-z0-9_.-]*$/.test(value)
  ) {
    throw new LedgerValidationError(`${location}: must be a canonical owner/repository name`);
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
