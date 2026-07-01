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
  "bot_challenged",
  "needs_repair",
  "repair_running",
  "repair_pushed",
  "waiting_checks",
  "waiting_review",
  "needs_human",
  "ready_to_merge",
  "merged",
  "closed",
  "blocked",
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
  const ownerDashboard = ownerActionDashboard(latest, closedRows, mergedRows);
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

#### Needs Nico

| Repository | Item | Lane state | Need | Updated | Cluster | Run |
| --- | --- | --- | --- | --- | --- | --- |
${rowsOrNone(ownerDashboard.needsNico.slice(0, 15).map(ownerActionRow), 7)}

#### Automation Running

| Repository | Item | Lane state | Automation | Updated | Cluster | Run |
| --- | --- | --- | --- | --- | --- | --- |
${rowsOrNone(ownerDashboard.automationRunning.slice(0, 15).map(ownerActionRow), 7)}

#### Ready/Autonomous

| Repository | Item | Lane state | Next automatic action | Updated | Cluster | Run |
| --- | --- | --- | --- | --- | --- | --- |
${rowsOrNone(ownerDashboard.readyAutonomous.slice(0, 15).map(ownerActionRow), 7)}

#### Done

| Repository | Item | Lane state | Outcome | Updated | Cluster | Run |
| --- | --- | --- | --- | --- | --- | --- |
${rowsOrNone(ownerDashboard.done.slice(0, 15).map(ownerActionRow), 7)}

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

function ownerActionDashboard(latest, closedRows, mergedRows) {
  const latestRows = latest.map(ownerRowFromRecord);
  const activeRows = latestRows.filter((row) => !["merged", "closed"].includes(row.state));
  const doneRows = [
    ...mergedRows.map((row) => ownerRowFromAction(row, "merged")),
    ...closedRows.map((row) => ownerRowFromAction(row, "closed")),
  ].sort((a, b) => Date.parse(b.updatedAt ?? "") - Date.parse(a.updatedAt ?? ""));
  const allRows = [...activeRows, ...doneRows];
  const bucketed = {
    needsNico: activeRows.filter((row) => row.bucket === "needs_nico"),
    automationRunning: activeRows.filter((row) => row.bucket === "automation_running"),
    readyAutonomous: activeRows.filter((row) => row.bucket === "ready_autonomous"),
    done: doneRows,
  };
  const stateCounts = new Map(LANE_STATES.map((state) => [state, 0]));
  for (const row of allRows) stateCounts.set(row.state, (stateCounts.get(row.state) ?? 0) + 1);
  const summaryRows = [
    ["Needs Nico", bucketed.needsNico.length, "approve merge/deploy, choose policy, provide access, approve broad fix, hold/close"],
    ["Automation Running", bucketed.automationRunning.length, "worker, repair, review, or checks still in motion"],
    ["Ready/Autonomous", bucketed.readyAutonomous.length, "can merge or close without Nico if this lane is authorized"],
    ["Done", bucketed.done.length, "recently merged or closed"],
  ].map(([label, count, meaning]) => `| ${label} | ${count} | ${meaning} |`);
  const stateRows = [...stateCounts.entries()].map(([state, count]) => `| ${state} | ${count} |`);
  const recapLines = ownerRecapLines(bucketed, latest.length);
  return { ...bucketed, summaryRows, stateRows, recapLines };
}

function ownerRecapLines(bucketed, latestCount) {
  const activeCount = bucketed.needsNico.length + bucketed.automationRunning.length + bucketed.readyAutonomous.length;
  return [
    "- Flow: bot challenge -> repair/fix -> checks/review -> merge or close.",
    `- Current snapshot: ${countLabel(activeCount, "active lane")} and ${countLabel(bucketed.done.length, "done lane")} from ${countLabel(latestCount, "latest cluster")}: ${bucketed.needsNico.length} need Nico, ${bucketed.automationRunning.length} automation running, ${bucketed.readyAutonomous.length} ready/autonomous.`,
    ownerRecapItem("Nico first", bucketed.needsNico[0], "nothing needs Nico right now"),
    ownerRecapItem("Automation first", bucketed.automationRunning[0], "nothing is waiting on automation"),
    ownerRecapItem("Ready/autonomous first", bucketed.readyAutonomous[0], "nothing is queued for autonomous action"),
    ownerRecapItem("Done latest", bucketed.done[0], "nothing recently merged or closed"),
  ];
}

function countLabel(count, singular) {
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

function ownerRecapItem(label, row, emptyText) {
  if (!row) return `- ${label}: ${emptyText}.`;
  const item = targetLink(row.record, row.action ?? {}) || clusterLink(row.record);
  return `- ${label}: ${repoLink(row.record)} ${item} is ${row.state}: ${truncate(row.reason, 140)}.`;
}

function ownerRowFromRecord(record) {
  const state = laneState(record);
  const reason = ownerNeed(record, state);
  return {
    record,
    action: primaryAction(record, state),
    state,
    bucket: ownerBucket(state, reason),
    reason,
    updatedAt: record.published_at ?? "",
  };
}

function ownerRowFromAction(row, state) {
  const action = row.action;
  return {
    record: row.record,
    action,
    state,
    bucket: "done",
    reason: action.title || action.reason || action.action || "completed",
    updatedAt: action.closed_at ?? action.merged_at ?? row.record.published_at ?? "",
  };
}

function laneState(record) {
  const needsHuman = record.needs_human ?? [];
  const fixActions = record.fix_actions ?? [];
  const applyActions = record.apply_actions ?? [];
  if (applyActions.some((action) => action.status === "executed" && MERGE_ACTIONS.has(String(action.action)))) {
    return "merged";
  }
  if (applyActions.some((action) => action.status === "executed" && CLOSE_ACTIONS.has(String(action.action)))) {
    return "closed";
  }
  if (needsHuman.length > 0 || record.result_status === "needs_human") return "needs_human";
  if (hasRunningAction(fixActions) || hasRunningAction(applyActions) || isWorkflowRunning(record)) {
    return "repair_running";
  }
  if (applyActions.some((action) => action.status === "ready" && MERGE_ACTIONS.has(String(action.action)))) {
    return "ready_to_merge";
  }
  if (applyActions.some((action) => action.status === "blocked" && isChecksReason(action.reason))) {
    return "waiting_checks";
  }
  if (fixActions.some((action) => ["pushed", "opened"].includes(String(action.status ?? "")))) {
    if (applyActions.some((action) => action.status === "blocked" && isAuthorizationReason(action.reason))) {
      return "repair_pushed";
    }
    return "waiting_review";
  }
  if (
    fixActions.some((action) => ["blocked", "failed"].includes(String(action.status ?? ""))) ||
    applyActions.some((action) => ["blocked", "failed"].includes(String(action.status ?? ""))) ||
    record.result_status === "blocked" ||
    record.workflow_conclusion === "failure"
  ) {
    return "blocked";
  }
  if (looksLikeChallengedPr(record)) return "bot_challenged";
  return "needs_repair";
}

function primaryAction(record, state) {
  const fixActions = record.fix_actions ?? [];
  const applyActions = record.apply_actions ?? [];
  if (["ready_to_merge", "waiting_checks", "repair_pushed", "merged", "closed"].includes(state)) {
    return applyActions.find((action) => action.target || action.url || action.pr) ?? fixActions[0] ?? null;
  }
  if (["waiting_review", "repair_running"].includes(state)) {
    return fixActions.find((action) => action.pr || action.url || action.target) ?? applyActions[0] ?? null;
  }
  if (state === "blocked") {
    return (
      fixActions.find((action) => ["blocked", "failed"].includes(String(action.status ?? ""))) ??
      applyActions.find((action) => ["blocked", "failed"].includes(String(action.status ?? ""))) ??
      null
    );
  }
  return applyActions[0] ?? fixActions[0] ?? null;
}

function ownerNeed(record, state) {
  const action = primaryAction(record, state);
  if (state === "needs_human") return (record.needs_human ?? []).join("; ") || record.summary || "human decision needed";
  if (state === "ready_to_merge") return action?.reason || "approve merge/automerge";
  if (state === "repair_pushed") return action?.reason || "repair pushed; merge authority is not enabled for this lane";
  if (state === "waiting_checks") return action?.reason || "checks are still running";
  if (state === "waiting_review") return "repair PR is open; wait for review/checks";
  if (state === "repair_running") return "worker, repair, review, or checks are in progress";
  if (state === "blocked") return action?.reason || record.summary || "blocked";
  if (state === "bot_challenged") return "bot challenged the PR; wait for repair command or maintainer decision";
  if (state === "needs_repair") return record.summary || "repair has not started";
  return action?.title || action?.reason || record.summary || state;
}

function ownerBucket(state, reason) {
  if (["needs_human", "ready_to_merge", "repair_pushed", "blocked"].includes(state)) return "needs_nico";
  if (["repair_running", "waiting_checks", "waiting_review"].includes(state)) return "automation_running";
  if (["bot_challenged", "needs_repair"].includes(state)) return "ready_autonomous";
  if (["merged", "closed"].includes(state)) return "done";
  if (String(reason ?? "").includes("job does not allow merge")) return "needs_nico";
  return "ready_autonomous";
}

function hasRunningAction(actions) {
  return actions.some((action) =>
    ["queued", "in_progress", "running", "pending", "planned"].includes(String(action.status ?? "")),
  );
}

function isWorkflowRunning(record) {
  return ["queued", "in_progress", "waiting", "requested"].includes(
    String(record.workflow_status ?? "").toLowerCase(),
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

function looksLikeChallengedPr(record) {
  const cluster = String(record.cluster_id ?? "");
  return cluster.startsWith("automerge-") || /review|proof|challenge/i.test(String(record.summary ?? ""));
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
  return `| ${repoLink(row.record)} | ${targetLink(row.record, row.action ?? {})} | ${tableCell(row.state)} | ${truncate(row.reason, 150)} | ${formatTimestamp(row.updatedAt)} | ${clusterLink(row.record)} | ${runLink(row.record)} |`;
}

function repoLink(record) {
  const repo = String(record.repo ?? "");
  return repo ? link(repo, `https://github.com/${repo}`) : "";
}
