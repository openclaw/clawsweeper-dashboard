import { formatTimestamp, link, rowsOrNone, tableCell } from "./markdown.mjs";
import { buildActionLedgerProjection } from "./ledger-projections.mjs";

const FAMILY_LABELS = {
  review: "Review",
  commands: "Commands",
  repair: "Repair",
  apply: "Apply",
  operations: "Operations",
  gitcrawl_evidence: "Gitcrawl evidence",
  other: "Other",
};
const FRESHNESS_LABELS = {
  future: "Future timestamp",
  last_24_hours: "Last 24 hours",
  days_1_to_7: "1-7 days",
  days_8_to_30: "8-30 days",
  older_than_30_days: "Older than 30 days",
};

export function renderActionLedgerDashboard(root, options = {}) {
  const { source, metrics } = buildActionLedgerProjection(root, options);
  const familyRows = Object.entries(metrics.by_event_family)
    .filter(([, metric]) => metric.count > 0)
    .map(([key, metric]) => metricRow(FAMILY_LABELS[key] ?? key, metric));
  const repositoryRows = Object.entries(metrics.by_repository)
    .slice(0, 12)
    .map(([repository, metric]) =>
      metricRow(link(repository, `https://github.com/${repository}`), metric),
    );
  const statusRows = Object.entries(metrics.by_action_status)
    .slice(0, 12)
    .map(([status, metric]) => metricRow(tableCell(status), metric));
  const freshnessRows = Object.entries(metrics.by_freshness)
    .filter(([, metric]) => metric.count > 0)
    .map(([key, metric]) => metricRow(FRESHNESS_LABELS[key] ?? key, metric));

  return `## Action Ledger

Last source event: ${formatTimestamp(metrics.newest_occurred_at)}

Immutable source: ${source.event_count} events across ${source.shard_count} JSONL shards; ${source.duplicate_count} duplicate replays collapsed. Snapshot: \`${source.source_digest.slice(0, 12)}\`.

Current indexes and this dashboard section are replaceable projections, never mutation authority.

| Event family | Events | Latest |
| --- | ---: | --- |
${rowsOrNone(familyRows, 3)}

| Repository | Events | Latest |
| --- | ---: | --- |
${rowsOrNone(repositoryRows, 3)}

| Action status | Events | Latest |
| --- | ---: | --- |
${rowsOrNone(statusRows, 3)}

| Freshness | Events | Latest |
| --- | ---: | --- |
${rowsOrNone(freshnessRows, 3)}
`;
}

function metricRow(label, metric) {
  return `| ${label} | ${metric.count} | ${formatTimestamp(metric.latest_occurred_at)} |`;
}
