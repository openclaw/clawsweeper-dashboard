import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const ACTION_LEDGER_SCHEMA = JSON.parse(
  fs.readFileSync(path.join(scriptDir, "..", "schema", "state-ledger-event.schema.json"), "utf8"),
);

const POSITIVE_INTEGER_ATTRIBUTE_KEYS = new Set(["attempt", "shard_count"]);
const NON_NEGATIVE_INTEGER_ATTRIBUTE_KEYS = new Set([
  "candidate_count",
  "closed_count",
  "cost_usd_micros",
  "duration_ms",
  "failed_count",
  "finding_count",
  "input_tokens",
  "item_count",
  "output_tokens",
  "result_count",
  "shard_index",
  "skipped_count",
]);
const BOOLEAN_ATTRIBUTE_KEYS = new Set(["cached", "coverage_complete"]);
const UNIT_INTERVAL_ATTRIBUTE_KEYS = new Set(["coverage_ratio"]);
const MACHINE_TEXT_ATTRIBUTE_KEYS = new Set([
  "cache_mode",
  "completion_reason",
  "dispatch_kind",
  "model",
  "phase",
  "query_version",
  "reasoning_effort",
  "review_mode",
  "state",
  "work_kind",
]);
const MAX_EVENT_COLLECTION_ITEMS = 64;

export class LedgerValidationError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "LedgerValidationError";
  }
}

export function validateActionLedgerEvent(value, location = "action ledger event") {
  validateSchemaValue(value, ACTION_LEDGER_SCHEMA, ACTION_LEDGER_SCHEMA, location);
  const semantic = actionEventSemanticValue(value, location);
  const expectedEventId = actionEventId(value.subject.repository, value.event_key);
  if (value.event_id !== expectedEventId) {
    throw new LedgerValidationError(`${location}: event_id does not match repository and event_key`);
  }
  const expectedSemanticSha256 = sha256(stableJson(semantic));
  if (value.semantic_sha256 !== expectedSemanticSha256) {
    throw new LedgerValidationError(`${location}: semantic_sha256 does not match event payload`);
  }
  const canonical = sortStable({
    schema: "clawsweeper.state-ledger-event.v1",
    schema_version: 1,
    event_id: value.event_id,
    event_key: requiredEventKey(value.event_key, `${location}.event_key`),
    semantic_sha256: value.semantic_sha256,
    occurred_at: canonicalTimestamp(value.occurred_at, `${location}.occurred_at`),
    recorded_at: canonicalTimestamp(value.recorded_at, `${location}.recorded_at`),
    ...semantic,
  });
  if (stableJson(canonical) !== stableJson(value)) {
    throw new LedgerValidationError(`${location}: event contains non-canonical fields`);
  }
  return canonical;
}

export function actionEventId(repository, eventKey) {
  const normalizedRepository = canonicalText(repository, "repository").toLowerCase();
  return sha256(
    `${requiredRepository(normalizedRepository, "repository")}\n${requiredEventKey(eventKey)}`,
  );
}

export function actionEventKey(scope, identity) {
  const normalizedScope = eventScope(scope);
  const canonicalIdentity = stableJson(identity);
  if (typeof canonicalIdentity !== "string") {
    throw new LedgerValidationError("action event identity must be JSON serializable");
  }
  return `${normalizedScope}:${sha256(canonicalIdentity)}`;
}

export function actionEventSemanticSha256(event, location = "action ledger event") {
  return sha256(stableJson(actionEventSemanticValue(event, location)));
}

export function stableJson(value) {
  return JSON.stringify(sortStable(value));
}

export function compareCanonicalTimestamps(left, right) {
  const leftInstant = timestampInstant(left);
  const rightInstant = timestampInstant(right);
  if (leftInstant.epochSecond !== rightInstant.epochSecond) {
    return leftInstant.epochSecond < rightInstant.epochSecond ? -1 : 1;
  }
  const length = Math.max(leftInstant.fraction.length, rightInstant.fraction.length);
  for (let index = 0; index < length; index += 1) {
    const leftDigit = leftInstant.fraction.charCodeAt(index) || 48;
    const rightDigit = rightInstant.fraction.charCodeAt(index) || 48;
    if (leftDigit !== rightDigit) return leftDigit < rightDigit ? -1 : 1;
  }
  return 0;
}

export function sortStable(value) {
  if (Array.isArray(value)) return value.map(sortStable);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, sortStable(item)]),
  );
}

function actionEventSemanticValue(event, location) {
  if (event.evidence?.length > MAX_EVENT_COLLECTION_ITEMS) {
    throw new LedgerValidationError(
      `${location}.evidence: exceeds ${MAX_EVENT_COLLECTION_ITEMS} entries`,
    );
  }
  if (event.privacy.fields_dropped.length > MAX_EVENT_COLLECTION_ITEMS) {
    throw new LedgerValidationError(
      `${location}.privacy.fields_dropped: exceeds ${MAX_EVENT_COLLECTION_ITEMS} entries`,
    );
  }
  const semantic = sortStable({
    event_type: machineText(event.event_type, `${location}.event_type`),
    producer: {
      repository: requiredRepository(
        event.producer.repository,
        `${location}.producer.repository`,
      ),
      sha: machineText(event.producer.sha, `${location}.producer.sha`),
      workflow: machineText(event.producer.workflow, `${location}.producer.workflow`, 128),
      job: machineText(event.producer.job, `${location}.producer.job`, 128),
      run_id: machineText(event.producer.run_id, `${location}.producer.run_id`),
      run_attempt: safePositiveInteger(
        event.producer.run_attempt,
        `${location}.producer.run_attempt`,
      ),
      component: machineText(event.producer.component, `${location}.producer.component`),
    },
    subject: normalizeSubject(event.subject, location),
    action: {
      name: machineText(event.action.name, `${location}.action.name`),
      status: machineText(event.action.status, `${location}.action.status`),
      ...(event.action.reason_code
        ? {
            reason_code: machineText(
              event.action.reason_code,
              `${location}.action.reason_code`,
            ),
          }
        : {}),
      retryable: event.action.retryable,
      mutation: event.action.mutation,
    },
    ...(event.learning ? { learning: normalizeLearning(event.learning, location) } : {}),
    ...(event.evidence?.length
      ? {
          evidence: event.evidence
            .map((entry, index) => normalizeEvidence(entry, `${location}.evidence[${index}]`))
            .sort((left, right) => stableJson(left).localeCompare(stableJson(right))),
        }
      : {}),
    ...(event.attributes
      ? { attributes: normalizeAttributes(event.attributes, location) }
      : {}),
    privacy: {
      classification: event.privacy.classification,
      redaction_version: machineText(
        event.privacy.redaction_version,
        `${location}.privacy.redaction_version`,
      ),
      fields_dropped: event.privacy.fields_dropped
        .map((field) => machineText(field, `${location}.privacy.fields_dropped`))
        .sort(),
    },
  });
  if (containsPrivateData(semantic)) {
    throw new LedgerValidationError(`${location}: contains privacy-unsafe event data`);
  }
  return semantic;
}

function normalizeSubject(subject, location) {
  return {
    repository: requiredRepository(subject.repository, `${location}.subject.repository`),
    kind: subject.kind,
    ...(subject.number !== undefined
      ? { number: safePositiveInteger(subject.number, `${location}.subject.number`) }
      : {}),
    ...(subject.cluster_id
      ? {
          cluster_id: machineText(subject.cluster_id, `${location}.subject.cluster_id`),
        }
      : {}),
    ...(subject.source_revision
      ? {
          source_revision: machineText(
            subject.source_revision,
            `${location}.subject.source_revision`,
          ),
        }
      : {}),
    ...(subject.record_path
      ? {
          record_path: canonicalRelativePath(
            subject.record_path,
            `${location}.subject.record_path`,
          ),
        }
      : {}),
  };
}

function normalizeLearning(learning, location) {
  return {
    category: machineText(learning.category, `${location}.learning.category`),
    signal: machineText(learning.signal, `${location}.learning.signal`),
    ...(learning.rule_id
      ? { rule_id: machineText(learning.rule_id, `${location}.learning.rule_id`) }
      : {}),
    ...(learning.confidence !== undefined ? { confidence: learning.confidence } : {}),
  };
}

function normalizeEvidence(evidence, location) {
  return {
    kind: machineText(evidence.kind, `${location}.kind`),
    ...(evidence.sha256
      ? { sha256: requiredSha256(evidence.sha256, `${location}.sha256`) }
      : {}),
    ...(evidence.report_path
      ? {
          report_path: canonicalRelativePath(evidence.report_path, `${location}.report_path`),
        }
      : {}),
    ...(evidence.run_url
      ? { run_url: canonicalPublicUrl(evidence.run_url, `${location}.run_url`) }
      : {}),
    ...(evidence.snapshot_id
      ? { snapshot_id: machineText(evidence.snapshot_id, `${location}.snapshot_id`) }
      : {}),
  };
}

function normalizeAttributes(attributes, location) {
  const normalized = {};
  for (const [key, raw] of Object.entries(attributes).sort(([left], [right]) =>
    left.localeCompare(right),
  )) {
    const attributeLocation = `${location}.attributes.${key}`;
    const normalizedKey = machineText(key, `${location}.attributes key`);
    if (
      !POSITIVE_INTEGER_ATTRIBUTE_KEYS.has(normalizedKey) &&
      !NON_NEGATIVE_INTEGER_ATTRIBUTE_KEYS.has(normalizedKey) &&
      !BOOLEAN_ATTRIBUTE_KEYS.has(normalizedKey) &&
      !UNIT_INTERVAL_ATTRIBUTE_KEYS.has(normalizedKey) &&
      !MACHINE_TEXT_ATTRIBUTE_KEYS.has(normalizedKey)
    ) {
      throw new LedgerValidationError(`${attributeLocation}: attribute is not allowlisted`);
    }
    const values = Array.isArray(raw) ? raw : [raw];
    if (values.length > MAX_EVENT_COLLECTION_ITEMS) {
      throw new LedgerValidationError(
        `${attributeLocation}: exceeds ${MAX_EVENT_COLLECTION_ITEMS} values`,
      );
    }
    const normalizedValues = values.map((value) =>
      normalizeAttributeScalar(normalizedKey, value, attributeLocation),
    );
    normalized[normalizedKey] = Array.isArray(raw) ? normalizedValues : normalizedValues[0];
  }
  return normalized;
}

function normalizeAttributeScalar(key, value, location) {
  if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
    throw new LedgerValidationError(`${location}: must be a scalar`);
  }
  if (POSITIVE_INTEGER_ATTRIBUTE_KEYS.has(key)) {
    return safePositiveInteger(value, location);
  }
  if (NON_NEGATIVE_INTEGER_ATTRIBUTE_KEYS.has(key)) {
    return safeNonNegativeInteger(value, location);
  }
  if (BOOLEAN_ATTRIBUTE_KEYS.has(key)) {
    if (typeof value !== "boolean") {
      throw new LedgerValidationError(`${location}: must be a boolean`);
    }
    return value;
  }
  if (UNIT_INTERVAL_ATTRIBUTE_KEYS.has(key)) {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1) {
      throw new LedgerValidationError(`${location}: must be between 0 and 1`);
    }
    return value;
  }
  if (MACHINE_TEXT_ATTRIBUTE_KEYS.has(key)) {
    if (typeof value !== "string") {
      throw new LedgerValidationError(`${location}: must be machine-readable text`);
    }
    const normalized = machineText(value, location);
    if (containsPrivateData(normalized)) {
      throw new LedgerValidationError(`${location}: privacy-unsafe attribute value`);
    }
    return normalized;
  }
  throw new LedgerValidationError(`${location}: attribute has no value contract`);
}

function containsPrivateData(value) {
  if (Array.isArray(value)) return value.some(containsPrivateData);
  if (value && typeof value === "object") {
    return Object.values(value).some(containsPrivateData);
  }
  if (typeof value !== "string") return false;
  if (
    /^(?:\/|[A-Za-z]:[\\/]|\\\\)/.test(value) ||
    [
      /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/,
      /(?:ghp_|github_pat_|sk-)[A-Za-z0-9_-]{16,}/,
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
    ].some((pattern) => pattern.test(value))
  ) {
    return true;
  }
  if (privateHost(value)) return true;
  const embeddedUrls = value.match(/\b(?:file|https?):\/\/[^\s"'<>]+/gi) ?? [];
  return embeddedUrls.some(privateUrl);
}

function privateUrl(value) {
  try {
    const parsed = new URL(value);
    return Boolean(
      parsed.protocol === "file:" ||
        parsed.username ||
        parsed.password ||
        privateHost(parsed.hostname),
    );
  } catch {
    return false;
  }
}

function privateHost(value) {
  const host = String(value).trim().replace(/^\[|\]$/g, "").toLowerCase();
  if (!host) return false;
  if (host === "localhost" || host.endsWith(".local")) return true;
  if (host === "::1" || /^(?:fc|fd)[0-9a-f]{2}:/.test(host) || /^fe[89ab][0-9a-f]:/.test(host)) {
    return true;
  }
  const octets = host.split(".").map(Number);
  if (
    octets.length !== 4 ||
    octets.some((part) => !Number.isInteger(part) || part < 0 || part > 255)
  ) {
    return false;
  }
  return (
    octets[0] === 10 ||
    octets[0] === 127 ||
    (octets[0] === 169 && octets[1] === 254) ||
    (octets[0] === 192 && octets[1] === 168) ||
    (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31)
  );
}

function canonicalPublicUrl(value, location) {
  const normalized = canonicalText(value, location);
  const parsed = new URL(normalized);
  if (
    parsed.protocol !== "https:" ||
    parsed.username ||
    parsed.password ||
    parsed.port ||
    parsed.search ||
    parsed.hash
  ) {
    throw new LedgerValidationError(`${location}: run URL must be credential-free HTTPS`);
  }
  if (
    parsed.hostname !== "github.com" ||
    !/^\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/actions\/runs\/[0-9]+$/.test(parsed.pathname)
  ) {
    throw new LedgerValidationError(`${location}: run URL must identify a GitHub Actions run`);
  }
  const canonical = parsed.toString();
  if (canonical !== value) {
    throw new LedgerValidationError(`${location}: run URL is not canonical`);
  }
  return canonical;
}

function canonicalRelativePath(value, location) {
  const normalized = boundedText(value, location, 512).replaceAll("\\", "/").replace(/^\.\//, "");
  if (
    path.posix.isAbsolute(normalized) ||
    /^[A-Za-z]:\//.test(normalized) ||
    normalized.split("/").includes("..")
  ) {
    throw new LedgerValidationError(`${location}: path must be repository-relative`);
  }
  if (normalized !== value) {
    throw new LedgerValidationError(`${location}: path is not canonical`);
  }
  return normalized;
}

function canonicalText(value, location) {
  if (typeof value !== "string") {
    throw new LedgerValidationError(`${location}: expected string`);
  }
  const normalized = value.trim();
  if (!normalized || normalized !== value || /[\u0000-\u001f\u007f]/.test(normalized)) {
    throw new LedgerValidationError(`${location}: text is not canonical`);
  }
  return normalized;
}

function boundedText(value, location, maxLength) {
  const normalized = canonicalText(value, location);
  if (normalized.length > maxLength) {
    throw new LedgerValidationError(`${location}: exceeds ${maxLength} characters`);
  }
  return normalized;
}

function machineText(value, location, maxLength = 256) {
  const normalized = boundedText(value, location, maxLength);
  if (!/^[A-Za-z0-9][A-Za-z0-9_.:/@+-]*$/.test(normalized)) {
    throw new LedgerValidationError(`${location}: must be machine-readable text`);
  }
  return normalized;
}

function eventScope(value) {
  const normalized = boundedText(value, "action event scope", 128);
  if (!/^[A-Za-z0-9][A-Za-z0-9_.+-]*$/.test(normalized)) {
    throw new LedgerValidationError("action event scope must be machine-readable text");
  }
  return normalized;
}

function requiredEventKey(value, location = "action event key") {
  const normalized = boundedText(value, location, 193);
  if (!/^[A-Za-z0-9][A-Za-z0-9_.+-]{0,127}:[a-f0-9]{64}$/.test(normalized)) {
    throw new LedgerValidationError(
      `${location}: must be generated from a machine-readable scope and digest`,
    );
  }
  return normalized;
}

function requiredRepository(value, location) {
  const normalized = canonicalText(value, location);
  if (!/^[a-z0-9_][a-z0-9_.-]*\/[a-z0-9_][a-z0-9_.-]*$/.test(normalized)) {
    throw new LedgerValidationError(`${location}: invalid repository`);
  }
  return normalized;
}

function requiredSha256(value, location) {
  const normalized = canonicalText(value, location);
  if (!/^[a-f0-9]{64}$/.test(normalized)) {
    throw new LedgerValidationError(`${location}: must be a lowercase SHA-256 digest`);
  }
  return normalized;
}

function canonicalTimestamp(value, location) {
  const normalized = canonicalText(value, location);
  if (!isStrictTimestamp(normalized)) {
    throw new LedgerValidationError(`${location}: invalid canonical date-time`);
  }
  return normalized;
}

function timestampInstant(value) {
  const match =
    /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:\d{2})$/.exec(
      value,
    );
  if (!match) throw new LedgerValidationError(`invalid canonical timestamp: ${value}`);
  const epochMilliseconds = Date.parse(`${match[1]}${match[3]}`);
  if (!Number.isFinite(epochMilliseconds)) {
    throw new LedgerValidationError(`invalid canonical timestamp: ${value}`);
  }
  return {
    epochSecond: BigInt(epochMilliseconds / 1000),
    fraction: match[2] ?? "",
  };
}

export function requiredCalendarDate(value, location = "partition date") {
  const normalized = canonicalText(value, location);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalized);
  if (!match || !isCalendarDate(Number(match[1]), Number(match[2]), Number(match[3]))) {
    throw new LedgerValidationError(`${location}: must be an ISO calendar date`);
  }
  return normalized;
}

function safePositiveInteger(value, location) {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new LedgerValidationError(`${location}: expected a positive safe integer`);
  }
  return value;
}

function safeNonNegativeInteger(value, location) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new LedgerValidationError(`${location}: expected a non-negative safe integer`);
  }
  return value;
}

function validateSchemaValue(value, schema, rootSchema, location) {
  if (schema.$ref) {
    validateSchemaValue(value, resolveRef(rootSchema, schema.$ref), rootSchema, location);
    return;
  }
  if (schema.allOf) {
    for (const branch of schema.allOf) validateSchemaValue(value, branch, rootSchema, location);
  }
  if (schema.anyOf && !schema.anyOf.some((branch) => matchesSchema(value, branch, rootSchema))) {
    throw new LedgerValidationError(`${location}: does not match any allowed schema`);
  }
  if (schema.oneOf) {
    const matches = schema.oneOf.filter((branch) => matchesSchema(value, branch, rootSchema)).length;
    if (matches !== 1) {
      throw new LedgerValidationError(`${location}: must match exactly one allowed schema`);
    }
  }
  if (schema.not && matchesSchema(value, schema.not, rootSchema)) {
    throw new LedgerValidationError(`${location}: matches a forbidden schema`);
  }
  if ("const" in schema && !deepEqual(value, schema.const)) {
    throw new LedgerValidationError(`${location}: must equal ${JSON.stringify(schema.const)}`);
  }
  if (schema.enum && !schema.enum.some((candidate) => deepEqual(value, candidate))) {
    throw new LedgerValidationError(`${location}: is not an allowed value`);
  }
  if (schema.type && !hasJsonType(value, schema.type)) {
    throw new LedgerValidationError(`${location}: expected ${schema.type}`);
  }
  if (typeof value === "string") validateString(value, schema, location);
  if (typeof value === "number") validateNumber(value, schema, location);
  if (Array.isArray(value)) validateArray(value, schema, rootSchema, location);
  if (value && typeof value === "object" && !Array.isArray(value)) {
    validateObject(value, schema, rootSchema, location);
  }
}

function validateString(value, schema, location) {
  const length = [...value].length;
  if (schema.minLength !== undefined && length < schema.minLength) {
    throw new LedgerValidationError(`${location}: shorter than ${schema.minLength} characters`);
  }
  if (schema.maxLength !== undefined && length > schema.maxLength) {
    throw new LedgerValidationError(`${location}: longer than ${schema.maxLength} characters`);
  }
  if (schema.pattern && !new RegExp(schema.pattern, "u").test(value)) {
    throw new LedgerValidationError(`${location}: does not match required pattern`);
  }
  if (schema.format === "date-time" && !isDateTime(value)) {
    throw new LedgerValidationError(`${location}: invalid date-time`);
  }
  if (schema.format === "uri" && !isAbsoluteUri(value)) {
    throw new LedgerValidationError(`${location}: invalid URI`);
  }
}

function validateNumber(value, schema, location) {
  if (!Number.isFinite(value)) throw new LedgerValidationError(`${location}: must be finite`);
  if (schema.minimum !== undefined && value < schema.minimum) {
    throw new LedgerValidationError(`${location}: below minimum ${schema.minimum}`);
  }
  if (schema.maximum !== undefined && value > schema.maximum) {
    throw new LedgerValidationError(`${location}: above maximum ${schema.maximum}`);
  }
}

function validateArray(value, schema, rootSchema, location) {
  if (schema.maxItems !== undefined && value.length > schema.maxItems) {
    throw new LedgerValidationError(`${location}: has more than ${schema.maxItems} items`);
  }
  if (schema.uniqueItems) {
    const keys = value.map(stableJson);
    if (new Set(keys).size !== keys.length) {
      throw new LedgerValidationError(`${location}: items must be unique`);
    }
  }
  if (schema.items) {
    value.forEach((item, index) =>
      validateSchemaValue(item, schema.items, rootSchema, `${location}[${index}]`),
    );
  }
}

function validateObject(value, schema, rootSchema, location) {
  const properties = schema.properties ?? {};
  for (const required of schema.required ?? []) {
    if (!Object.hasOwn(value, required)) {
      throw new LedgerValidationError(`${location}: missing required property ${required}`);
    }
  }
  for (const [key, item] of Object.entries(value)) {
    if (schema.propertyNames) {
      validateSchemaValue(key, schema.propertyNames, rootSchema, `${location}.${key}`);
    }
    if (Object.hasOwn(properties, key)) {
      validateSchemaValue(item, properties[key], rootSchema, `${location}.${key}`);
    } else if (schema.additionalProperties === false) {
      throw new LedgerValidationError(`${location}: unexpected property ${key}`);
    } else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
      validateSchemaValue(
        item,
        schema.additionalProperties,
        rootSchema,
        `${location}.${key}`,
      );
    }
  }
}

function matchesSchema(value, schema, rootSchema) {
  try {
    validateSchemaValue(value, schema, rootSchema, "candidate");
    return true;
  } catch (error) {
    if (error instanceof LedgerValidationError) return false;
    throw error;
  }
}

function resolveRef(rootSchema, ref) {
  if (!ref.startsWith("#/")) throw new LedgerValidationError(`unsupported schema ref: ${ref}`);
  return ref
    .slice(2)
    .split("/")
    .map((segment) => segment.replaceAll("~1", "/").replaceAll("~0", "~"))
    .reduce((value, segment) => value?.[segment], rootSchema);
}

function hasJsonType(value, type) {
  if (type === "null") return value === null;
  if (type === "array") return Array.isArray(value);
  if (type === "object") return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  if (type === "integer") return Number.isInteger(value);
  return typeof value === type;
}

function isDateTime(value) {
  return isStrictTimestamp(value);
}

function isStrictTimestamp(value) {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-](\d{2}):(\d{2}))$/.exec(
      value,
    );
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const offsetHour = match[8];
  const offsetMinute = match[9];
  return (
    isCalendarDate(year, month, day) &&
    hour <= 23 &&
    minute <= 59 &&
    second <= 59 &&
    (offsetHour === undefined || Number(offsetHour) <= 23) &&
    (offsetMinute === undefined || Number(offsetMinute) <= 59) &&
    Number.isFinite(Date.parse(value))
  );
}

function isCalendarDate(year, month, day) {
  const calendar = new Date(Date.UTC(year, month - 1, day));
  return (
    year >= 1 &&
    calendar.getUTCFullYear() === year &&
    calendar.getUTCMonth() === month - 1 &&
    calendar.getUTCDate() === day
  );
}

function isAbsoluteUri(value) {
  try {
    return Boolean(new URL(value).protocol);
  } catch {
    return false;
  }
}

function deepEqual(left, right) {
  return stableJson(left) === stableJson(right);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
