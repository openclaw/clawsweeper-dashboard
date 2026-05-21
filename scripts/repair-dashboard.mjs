import path from "node:path";
import { formatTimestamp, link, percent, rowsOrNone, tableCell, truncate } from "./markdown.mjs";
import { jsonFiles, newestTimestamp, readJson } from "./source.mjs";

const REPORT_BASE = "https://github.com/openclaw/clawsweeper-state/blob/state";
const CLOSE_ACTIONS = new Set([
  "close",
  "close_duplicate",
  "close_superseded",
  "close_fixed_by_candidate",
  "close_low_signal",
  "post_merge_close",
]);
const MERGE_ACTIONS = new Set(["merge_candidate", "merge_canonical"]);

export function renderRepairDashboard(root) {
  const records = jsonFiles(path.join(root, "results", "runs"))
    .map((file) => readJson(file))
    .filter(Boolean);
  const archivedRaw = readJson(path.join(root, "results", "archived-clusters.json"), []);
  const archived = new Set(
    Array.isArray(archivedRaw)
      ? archivedRaw
      : (archivedRaw.archived_clusters ?? []).map((record) => record.cluster_id),
  );
  const latest = latestByCluster(records).filter((record) => !archived.has(record.cluster_id));
  const allApplyRows = records.flatMap((record) =>
    (record.apply_actions ?? []).map((action) => ({ record, action })),
  );
  const latestApplyRows = latest.flatMap((record) =>
    (record.apply_actions ?? []).map((action) => ({ record, action })),
  );
  const latestFixRows = latest.flatMap((record) =>
    (record.fix_actions ?? []).map((action) => ({ record, action })),
  );
  const mutationRows = allApplyRows.filter((row) =>
    ["executed", "blocked", "skipped"].includes(String(row.action.status ?? "")),
  );
  const closedRows = allApplyRows
    .filter((row) => row.action.status === "executed" && CLOSE_ACTIONS.has(String(row.action.action)))
    .sort(newestActionFirst);
  const mergedRows = allApplyRows.filter(
    (row) => row.action.status === "executed" && MERGE_ACTIONS.has(String(row.action.action)),
  );
  const blockedRows = latestApplyRows.filter((row) =>
    ["blocked", "skipped"].includes(String(row.action.status ?? "")),
  );
  const failedFixRows = latestFixRows.filter((row) =>
    ["blocked", "failed"].includes(String(row.action.status ?? "")),
  );
  const inspectionRows = inspectionQueue(latest, failedFixRows, blockedRows);
  const totals = {
    latest: latest.length,
    runs: records.length,
    success: latest.filter((record) => record.workflow_conclusion === "success").length,
    failure: latest.filter((record) => record.workflow_conclusion === "failure").length,
    cancelled: latest.filter((record) => record.workflow_conclusion === "cancelled").length,
    needsHuman: latest.filter((record) => (record.needs_human ?? []).length > 0).length,
    closed: closedRows.length,
    merged: mergedRows.length,
    blocked: allApplyRows.filter((row) => row.action.status === "blocked").length,
    skipped: allApplyRows.filter((row) => row.action.status === "skipped").length,
    fixFailed: latestFixRows.filter((row) => row.action.status === "failed").length,
    fixBlocked: latestFixRows.filter((row) => row.action.status === "blocked").length,
    mutationAttempts: mutationRows.length,
  };
  const lastSourceUpdate = newestTimestamp(...records.map((record) => record.published_at));

  return `## Repair Dashboard

Last source update: ${formatTimestamp(lastSourceUpdate)}

State: ${repairState(totals, inspectionRows)}

| Metric | Count | Rate |
| --- | ---: | ---: |
| Latest clusters reviewed | ${totals.latest} | 100% |
| Run attempts archived | ${totals.runs} | audit |
| Latest successful clusters | ${totals.success} | ${percent(totals.success, totals.latest)} |
| Latest failed clusters | ${totals.failure} | ${percent(totals.failure, totals.latest)} |
| Latest cancelled clusters | ${totals.cancelled} | ${percent(totals.cancelled, totals.latest)} |
| Needs-human clusters | ${totals.needsHuman} | ${percent(totals.needsHuman, totals.latest)} |
| Fix actions failed | ${totals.fixFailed} | ${percent(totals.fixFailed, latestFixRows.length)} |
| Fix actions blocked | ${totals.fixBlocked} | ${percent(totals.fixBlocked, latestFixRows.length)} |
| Completed close actions | ${totals.closed} | ${percent(totals.closed, totals.mutationAttempts)} |
| Completed merge actions | ${totals.merged} | ${percent(totals.merged, totals.mutationAttempts)} |
| Blocked mutation attempts | ${totals.blocked} | ${percent(totals.blocked, totals.mutationAttempts)} |
| Skipped mutation attempts | ${totals.skipped} | ${percent(totals.skipped, totals.mutationAttempts)} |

### Clusters Needing Inspection

| Cluster | State | Reason | Report | Run |
| --- | --- | --- | --- | --- |
${rowsOrNone(inspectionRows.slice(0, 30).map(inspectionRow), 5)}

### Fix Failure Queue

| Cluster | Status | Target | Branch/PR | Reason | Run |
| --- | --- | --- | --- | --- | --- |
${rowsOrNone(failedFixRows.slice(0, 25).map(fixRow), 6)}

### Top Blocked Reasons

| Reason | Latest count | Example cluster |
| --- | ---: | --- |
${rowsOrNone(blockedReasonRows(blockedRows), 3)}

### Latest Repair Closures

| Target | Action | Title | Closed | Cluster | Report | Run |
| --- | --- | --- | --- | --- | --- | --- |
${rowsOrNone(closedRows.slice(0, 25).map(closeRow), 7)}
`;
}

function latestByCluster(records) {
  const byCluster = new Map();
  for (const record of records) {
    const key = String(record.cluster_id ?? "");
    const previous = byCluster.get(key);
    if (!previous || Date.parse(record.published_at ?? "") > Date.parse(previous.published_at ?? "")) {
      byCluster.set(key, record);
    }
  }
  return [...byCluster.values()].sort(
    (a, b) => Date.parse(b.published_at ?? "") - Date.parse(a.published_at ?? ""),
  );
}

function repairState(totals, inspectionRows) {
  if (totals.failure > 0) return "Failed clusters need inspection";
  if (totals.fixFailed + totals.fixBlocked > 0) return "Fix execution needs repair";
  if (inspectionRows.length > 0) return "Inspection needed";
  return "Clean";
}

function inspectionQueue(latest, failedFixRows, blockedRows) {
  const rows = [];
  const seen = new Set();
  for (const row of [...failedFixRows, ...blockedRows]) {
    const key = String(row.record.cluster_id ?? "");
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({
      record: row.record,
      state: row.action.status === "failed" ? "fix failed" : `${row.action.action ?? "action"} ${row.action.status}`,
      reason: row.action.reason ?? row.record.summary ?? "",
    });
  }
  for (const record of latest) {
    const key = String(record.cluster_id ?? "");
    if (seen.has(key) || (record.needs_human ?? []).length === 0) continue;
    seen.add(key);
    rows.push({
      record,
      state: "needs human",
      reason: (record.needs_human ?? []).join("; "),
    });
  }
  return rows.sort(
    (a, b) => Date.parse(b.record.published_at ?? "") - Date.parse(a.record.published_at ?? ""),
  );
}

function blockedReasonRows(rows) {
  const byReason = new Map();
  for (const row of rows) {
    const reason = truncate(row.action.reason ?? "unspecified", 140);
    const current = byReason.get(reason) ?? { count: 0, row };
    current.count += 1;
    byReason.set(reason, current);
  }
  return [...byReason.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 15)
    .map(([reason, value]) => `| ${reason} | ${value.count} | ${clusterLink(value.row.record)} |`);
}

function newestActionFirst(left, right) {
  const leftTime = Date.parse(left.action.closed_at ?? left.action.merged_at ?? left.record.published_at ?? "");
  const rightTime = Date.parse(right.action.closed_at ?? right.action.merged_at ?? right.record.published_at ?? "");
  return rightTime - leftTime;
}


function clusterLink(record) {
  const owner = String(record.repo ?? "unknown/unknown").split("/")[0] || "unknown";
  const cluster = String(record.cluster_id ?? "");
  const slug = cluster.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return link(cluster || "unknown", `${REPORT_BASE}/results/${owner}/${slug}.md`);
}

function runLink(record) {
  return record.run_url ? link(record.run_id ?? "run", record.run_url) : "_none_";
}

function targetLink(record, action) {
  const target = String(action.target ?? "");
  const match = target.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/(issues|pull)\/(\d+)/);
  if (match) return link(`#${match[3]}`, target);
  const shorthand = target.match(/^#(\d+)$/);
  const repo = String(record.repo ?? "");
  if (shorthand && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) {
    const explicitUrl = githubItemUrlForNumber(action.url, shorthand[1]);
    if (explicitUrl) return link(target, explicitUrl);
    const segment = repairActionTargetsPullRequest(action) ? "pull" : "issues";
    return link(target, `https://github.com/${repo}/${segment}/${shorthand[1]}`);
  }
  return target ? link(target, target) : "";
}

function githubItemUrlForNumber(value, number) {
  const url = String(value ?? "");
  const match = url.match(/^https:\/\/github\.com\/[^/]+\/[^/]+\/(?:issues|pull)\/(\d+)$/);
  return match?.[1] === number ? url : "";
}

function repairActionTargetsPullRequest(action) {
  const actionName = String(action.action ?? "");
  const classification = String(action.classification ?? "");
  return (
    actionName.startsWith("merge_") ||
    actionName.includes("automerge") ||
    actionName.includes("repair_contributor_branch") ||
    classification === "canonical" ||
    classification === "fix_pr"
  );
}

function inspectionRow(row) {
  return `| ${tableCell(String(row.record.cluster_id ?? ""))} | ${tableCell(row.state)} | ${truncate(row.reason, 150)} | ${clusterLink(row.record)} | ${runLink(row.record)} |`;
}

function fixRow(row) {
  const action = row.action;
  return `| ${clusterLink(row.record)} | ${tableCell(action.status)} | ${targetLink(row.record, action)} | ${tableCell(action.branch ?? action.pr ?? "")} | ${truncate(action.reason, 150)} | ${runLink(row.record)} |`;
}

function closeRow(row) {
  const action = row.action;
  return `| ${targetLink(row.record, action)} | ${tableCell(action.action)} | ${truncate(action.title ?? "")} | ${formatTimestamp(action.closed_at ?? action.merged_at ?? row.record.published_at)} | ${tableCell(String(row.record.cluster_id ?? ""))} | ${clusterLink(row.record)} | ${runLink(row.record)} |`;
}
