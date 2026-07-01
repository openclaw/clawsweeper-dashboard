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
const LANE_STATES = [
  "maintainer_input",
  "merge_ready",
  "merge_not_authorized",
  "checks_blocked",
  "repair_open",
  "automation_active",
  "action_planned",
  "automation_failed",
  "automation_blocked",
  "reviewed_no_action",
  "completed",
];

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
  const ownerDashboard = ownerActionDashboard(latest);
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

### Owner Action Dashboard

#### Recap

${ownerDashboard.recapLines.join("\n")}

| Bucket | Count | Operator read |
| --- | ---: | --- |
${rowsOrNone(ownerDashboard.summaryRows, 3)}

| Lane state | Count |
| --- | ---: |
${rowsOrNone(ownerDashboard.stateRows, 2)}

#### Maintainer Action

| Repository | Item | Lane state | Recorded need | Updated | Cluster | Run |
| --- | --- | --- | --- | --- | --- | --- |
${rowsOrNone(ownerDashboard.maintainerAction.slice(0, 15).map(ownerActionRow), 7)}

#### Automation Snapshot

| Repository | Item | Lane state | Recorded status | Updated | Cluster | Run |
| --- | --- | --- | --- | --- | --- | --- |
${rowsOrNone(ownerDashboard.automationSnapshot.slice(0, 15).map(ownerActionRow), 7)}

#### Intervention Needed

| Repository | Item | Lane state | Recorded blocker | Updated | Cluster | Run |
| --- | --- | --- | --- | --- | --- | --- |
${rowsOrNone(ownerDashboard.interventionNeeded.slice(0, 15).map(ownerActionRow), 7)}

#### No Pending Action

| Repository | Item | Lane state | Latest result | Updated | Cluster | Run |
| --- | --- | --- | --- | --- | --- | --- |
${rowsOrNone(ownerDashboard.noPendingAction.slice(0, 15).map(ownerActionRow), 7)}

#### Completed

| Repository | Item | Lane state | Recorded outcome | Updated | Cluster | Run |
| --- | --- | --- | --- | --- | --- | --- |
${rowsOrNone(ownerDashboard.completed.slice(0, 15).map(ownerActionRow), 7)}

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

function ownerActionDashboard(latest) {
  const latestRows = latest.map(ownerRowFromRecord);
  const bucketed = {
    maintainerAction: latestRows.filter((row) => row.bucket === "maintainer_action"),
    automationSnapshot: latestRows.filter((row) => row.bucket === "automation_snapshot"),
    interventionNeeded: latestRows.filter((row) => row.bucket === "intervention_needed"),
    noPendingAction: latestRows.filter((row) => row.bucket === "no_pending_action"),
    completed: latestRows.filter((row) => row.bucket === "completed"),
  };
  const stateCounts = new Map(LANE_STATES.map((state) => [state, 0]));
  for (const row of latestRows) stateCounts.set(row.state, (stateCounts.get(row.state) ?? 0) + 1);
  const summaryRows = [
    ["Maintainer Action", bucketed.maintainerAction.length, "explicit decision, access, or merge authority recorded"],
    ["Automation Snapshot", bucketed.automationSnapshot.length, "repair, check, or planned action recorded; verify live status"],
    ["Intervention Needed", bucketed.interventionNeeded.length, "automation failure or blocker recorded"],
    ["No Pending Action", bucketed.noPendingAction.length, "latest record proposes no repair or apply action"],
    ["Completed", bucketed.completed.length, "latest record contains an executed merge or close"],
  ].map(([label, count, meaning]) => `| ${label} | ${count} | ${meaning} |`);
  const stateRows = [...stateCounts.entries()].map(([state, count]) => `| ${state} | ${count} |`);
  const recapLines = ownerRecapLines(bucketed, latest.length);
  return { ...bucketed, summaryRows, stateRows, recapLines };
}

function ownerRecapLines(bucketed, latestCount) {
  return [
    "- Snapshot only: lane states reflect the latest durable run records, not live GitHub state; verify linked items before action.",
    `- Latest records: ${countLabel(latestCount, "cluster")}: ${bucketed.maintainerAction.length} maintainer action, ${bucketed.automationSnapshot.length} automation snapshot, ${bucketed.interventionNeeded.length} intervention needed, ${bucketed.noPendingAction.length} no pending action, ${bucketed.completed.length} completed.`,
    ownerRecapItem("Maintainer first", bucketed.maintainerAction[0], "no explicit maintainer action recorded"),
    ownerRecapItem("Intervention first", bucketed.interventionNeeded[0], "no automation blocker recorded"),
    ownerRecapItem("Automation latest", bucketed.automationSnapshot[0], "no open repair or check state recorded"),
    ownerRecapItem("Completed latest", bucketed.completed[0], "no completed action in the latest records"),
  ];
}

function countLabel(count, singular) {
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

function ownerRecapItem(label, row, emptyText) {
  if (!row) return `- ${label}: ${emptyText}.`;
  const item = ownerItemLink(row.record, row.action ?? {}) || clusterLink(row.record);
  return `- ${label}: ${repoLink(row.record)} ${item} is ${row.state}: ${truncate(row.reason, 140)}.`;
}

function ownerRowFromRecord(record) {
  const state = laneState(record);
  const reason = ownerNeed(record, state);
  return {
    record,
    action: primaryAction(record, state),
    state,
    bucket: ownerBucket(state),
    reason,
    updatedAt: record.published_at ?? "",
  };
}

function laneState(record) {
  const needsHuman = record.needs_human ?? [];
  const actions = record.actions ?? [];
  const fixActions = record.fix_actions ?? [];
  const applyActions = record.apply_actions ?? [];
  if (
    applyActions.some(
      (action) =>
        action.status === "executed" &&
        (MERGE_ACTIONS.has(String(action.action)) || CLOSE_ACTIONS.has(String(action.action))),
    )
  ) {
    return "completed";
  }
  if (
    needsHuman.length > 0 ||
    record.result_status === "needs_human" ||
    maintainerAction(actions)
  ) {
    return "maintainer_input";
  }
  if (applyActions.some((action) => action.status === "ready" && MERGE_ACTIONS.has(String(action.action)))) {
    return "merge_ready";
  }
  if (
    applyActions.some(
      (action) =>
        action.status === "blocked" &&
        MERGE_ACTIONS.has(String(action.action)) &&
        isAuthorizationReason(action.reason),
    )
  ) {
    return "merge_not_authorized";
  }
  if (applyActions.some((action) => action.status === "blocked" && isChecksReason(action.reason))) {
    return "checks_blocked";
  }
  if (
    fixActions.some((action) => action.status === "failed") ||
    applyActions.some((action) => action.status === "failed") ||
    actions.some((action) => action.status === "failed") ||
    record.workflow_conclusion === "failure"
  ) {
    return "automation_failed";
  }
  if (
    fixActions.some((action) => action.status === "blocked") ||
    applyActions.some((action) => action.status === "blocked") ||
    actions.some((action) => action.status === "blocked") ||
    record.result_status === "blocked"
  ) {
    return "automation_blocked";
  }
  if (hasRepairOutput(fixActions)) return "repair_open";
  if (hasRunningAction(fixActions) || hasRunningAction(applyActions) || isWorkflowRunning(record)) {
    return "automation_active";
  }
  if (plannedAction(actions)) return "action_planned";
  return "reviewed_no_action";
}

function primaryAction(record, state) {
  const actions = record.actions ?? [];
  const fixActions = record.fix_actions ?? [];
  const applyActions = record.apply_actions ?? [];
  if (state === "maintainer_input") {
    return (
      maintainerAction(actions) ??
      applyActions.find((action) => action.target || action.url || action.pr) ??
      fixActions[0] ??
      null
    );
  }
  if (state === "completed") {
    return applyActions.find(
      (action) =>
        action.status === "executed" &&
        (MERGE_ACTIONS.has(String(action.action)) || CLOSE_ACTIONS.has(String(action.action))),
    );
  }
  if (state === "merge_ready") {
    return applyActions.find(
      (action) => action.status === "ready" && MERGE_ACTIONS.has(String(action.action)),
    );
  }
  if (state === "merge_not_authorized") {
    return applyActions.find(
      (action) =>
        action.status === "blocked" &&
        MERGE_ACTIONS.has(String(action.action)) &&
        isAuthorizationReason(action.reason),
    );
  }
  if (state === "checks_blocked") {
    return applyActions.find(
      (action) => action.status === "blocked" && isChecksReason(action.reason),
    );
  }
  if (state === "repair_open") {
    return repairOutput(fixActions) ?? applyActions[0] ?? null;
  }
  if (state === "automation_active") {
    return runningAction(fixActions) ?? runningAction(applyActions) ?? null;
  }
  if (state === "action_planned") return plannedAction(actions);
  if (["automation_failed", "automation_blocked"].includes(state)) {
    return (
      fixActions.find((action) => ["blocked", "failed"].includes(String(action.status ?? ""))) ??
      applyActions.find((action) => ["blocked", "failed"].includes(String(action.status ?? ""))) ??
      actions.find((action) => action.status === "failed") ??
      actions.find((action) => action.status === "blocked") ??
      plannedAction(actions) ??
      null
    );
  }
  return applyActions.find((action) => action.target || action.url || action.pr) ?? fixActions[0] ?? null;
}

function ownerNeed(record, state) {
  const action = primaryAction(record, state);
  if (state === "maintainer_input") {
    return (
      (record.needs_human ?? []).join("; ") ||
      action?.reason ||
      record.summary ||
      "maintainer input recorded"
    );
  }
  if (state === "merge_ready") return action?.reason || "merge-ready action recorded";
  if (state === "merge_not_authorized") return action?.reason || "merge authority is not enabled for this lane";
  if (state === "checks_blocked") return action?.reason || "checks blocked the recorded action";
  if (state === "repair_open") return action?.reason || "repair branch or PR recorded; verify live status";
  if (state === "automation_active") return action?.reason || "active automation state recorded; verify live status";
  if (state === "action_planned") return action?.reason || "automation action planned in the latest record";
  if (state === "automation_failed") return action?.reason || record.summary || "automation failure recorded";
  if (state === "automation_blocked") return action?.reason || record.summary || "automation blocker recorded";
  if (state === "reviewed_no_action") return record.summary || "latest record has no pending action";
  return action?.title || action?.reason || record.summary || state;
}

function ownerBucket(state) {
  if (["maintainer_input", "merge_ready", "merge_not_authorized"].includes(state)) {
    return "maintainer_action";
  }
  if (["checks_blocked", "repair_open", "automation_active", "action_planned"].includes(state)) {
    return "automation_snapshot";
  }
  if (["automation_failed", "automation_blocked"].includes(state)) return "intervention_needed";
  if (state === "completed") return "completed";
  return "no_pending_action";
}

function hasRepairOutput(actions) {
  return Boolean(repairOutput(actions));
}

function hasRunningAction(actions) {
  return Boolean(runningAction(actions));
}

function runningAction(actions) {
  return actions.find((action) =>
    ["queued", "in_progress", "running", "pending", "planned"].includes(
      String(action.status ?? ""),
    ),
  );
}

function isWorkflowRunning(record) {
  return ["queued", "in_progress", "waiting", "requested"].includes(
    String(record.workflow_status ?? "").toLowerCase(),
  );
}

function repairOutput(actions) {
  return actions.find(
    (action) =>
      ["open_fix_pr", "repair_contributor_branch", "execute_fix"].includes(String(action.action ?? "")) &&
      ["opened", "pushed", "updated"].includes(String(action.status ?? "")),
  );
}

function maintainerAction(actions) {
  return actions.find(
    (action) =>
      ["needs_human", "route_security"].includes(String(action.action ?? "")) &&
      ["planned", "blocked", "skipped"].includes(String(action.status ?? "")),
  );
}

function plannedAction(actions) {
  return actions.find(
    (action) =>
      action.status === "planned" &&
      !String(action.action ?? "").startsWith("keep_") &&
      !["needs_human", "route_security"].includes(String(action.action ?? "")),
  );
}

function isChecksReason(reason) {
  return /checks? (?:are|is) not clean|in_progress|pending|required status/i.test(String(reason ?? ""));
}

function isAuthorizationReason(reason) {
  return /job does not allow merge|intentionally blocked|not authorized|permission/i.test(
    String(reason ?? ""),
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

function ownerActionRow(row) {
  return `| ${repoLink(row.record)} | ${ownerItemLink(row.record, row.action ?? {})} | ${tableCell(row.state)} | ${truncate(row.reason, 150)} | ${formatTimestamp(row.updatedAt)} | ${clusterLink(row.record)} | ${runLink(row.record)} |`;
}

function ownerItemLink(record, action) {
  const target = targetLink(record, action);
  if (target) return target;
  for (const value of [action.pr, action.url]) {
    const match = String(value ?? "").match(
      /^https:\/\/github\.com\/[^/]+\/[^/]+\/(?:issues|pull)\/(\d+)$/,
    );
    if (match) return link(`#${match[1]}`, value);
  }
  return "";
}

function repoLink(record) {
  const repo = String(record.repo ?? "");
  return repo ? link(repo, `https://github.com/${repo}`) : "";
}
