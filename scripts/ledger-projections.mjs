import { loadActionLedger } from "./ledger-events.mjs";

const DAY_MS = 24 * 60 * 60 * 1000;
export const EVENT_FAMILIES = [
  "review",
  "commands",
  "repair",
  "apply",
  "operations",
  "gitcrawl_evidence",
  "other",
];
export const FRESHNESS_BUCKETS = [
  "future",
  "last_24_hours",
  "days_1_to_7",
  "days_8_to_30",
  "older_than_30_days",
];

export function buildActionLedgerProjection(root, options = {}) {
  const now = normalizeNow(options.now);
  const { events, source } = loadActionLedger(root);
  const chronologicalEvents = [...events].sort(compareEventInstants);
  const metrics = {
    schema: "clawsweeper.state-ledger-metrics.v1",
    schema_version: 1,
    as_of: now.toISOString(),
    source_digest: source.source_digest,
    total_events: events.length,
    oldest_occurred_at: chronologicalEvents[0]?.occurred_at ?? null,
    newest_occurred_at: chronologicalEvents.at(-1)?.occurred_at ?? null,
    by_event_family: initializedMetrics(EVENT_FAMILIES),
    by_repository: Object.create(null),
    by_action_status: Object.create(null),
    by_freshness: initializedMetrics(FRESHNESS_BUCKETS),
  };

  for (const event of events) {
    addMetric(metrics.by_event_family, eventFamily(event.event_type), event.occurred_at);
    addMetric(metrics.by_repository, event.subject.repository, event.occurred_at);
    addMetric(metrics.by_action_status, event.action.status, event.occurred_at);
    addMetric(metrics.by_freshness, freshnessBucket(event.occurred_at, now), event.occurred_at);
  }

  metrics.by_event_family = sortedMetrics(metrics.by_event_family, EVENT_FAMILIES);
  metrics.by_repository = sortedMetrics(metrics.by_repository);
  metrics.by_action_status = sortedMetrics(metrics.by_action_status);
  metrics.by_freshness = sortedMetrics(metrics.by_freshness, FRESHNESS_BUCKETS);
  return { source, metrics };
}

export function eventFamily(eventType) {
  if (eventType.startsWith("review.")) return "review";
  if (eventType.startsWith("command.")) return "commands";
  if (eventType.startsWith("repair.")) return "repair";
  if (eventType.startsWith("apply.")) return "apply";
  if (
    eventType.startsWith("notification.") ||
    eventType.startsWith("session.") ||
    eventType.startsWith("workflow.") ||
    eventType.startsWith("operation.")
  ) {
    return "operations";
  }
  if (eventType.startsWith("evidence.")) return "gitcrawl_evidence";
  return "other";
}

function normalizeNow(value) {
  const now = value instanceof Date ? value : new Date(value ?? Date.now());
  if (Number.isNaN(now.getTime())) throw new Error(`invalid action ledger projection time: ${value}`);
  return now;
}

function initializedMetrics(keys) {
  return Object.fromEntries(keys.map((key) => [key, { count: 0, latest_occurred_at: null }]));
}

function addMetric(metrics, key, occurredAt) {
  const metric = Object.hasOwn(metrics, key)
    ? metrics[key]
    : { count: 0, latest_occurred_at: null };
  metric.count += 1;
  if (
    !metric.latest_occurred_at ||
    Date.parse(occurredAt) > Date.parse(metric.latest_occurred_at)
  ) {
    metric.latest_occurred_at = occurredAt;
  }
  metrics[key] = metric;
}

function compareEventInstants(left, right) {
  return (
    Date.parse(left.occurred_at) - Date.parse(right.occurred_at) ||
    left.event_id.localeCompare(right.event_id)
  );
}

function sortedMetrics(metrics, preferredOrder = []) {
  const preferred = new Map(preferredOrder.map((key, index) => [key, index]));
  return Object.fromEntries(
    Object.entries(metrics).sort(
      ([leftKey, left], [rightKey, right]) =>
        (preferred.get(leftKey) ?? Number.MAX_SAFE_INTEGER) -
          (preferred.get(rightKey) ?? Number.MAX_SAFE_INTEGER) ||
        right.count - left.count ||
        leftKey.localeCompare(rightKey),
    ),
  );
}

function freshnessBucket(occurredAt, now) {
  const age = now.getTime() - Date.parse(occurredAt);
  if (age < 0) return "future";
  if (age < DAY_MS) return "last_24_hours";
  if (age < 7 * DAY_MS) return "days_1_to_7";
  if (age < 30 * DAY_MS) return "days_8_to_30";
  return "older_than_30_days";
}
