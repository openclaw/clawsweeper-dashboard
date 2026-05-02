import path from "node:path";
import { formatTimestamp, link, percent, rowsOrNone, tableCell, truncate } from "./markdown.mjs";
import {
  PROFILES,
  markdownFiles,
  newestTimestamp,
  numberFromFile,
  parseFrontMatter,
  profileForSlug,
  readJson,
  readText,
  relativePath,
} from "./source.mjs";

const FRESH_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;
const REPORT_BASE = "https://github.com/openclaw/clawsweeper-state/blob/state";

export function renderSweepDashboard(root) {
  const snapshots = PROFILES.map((profile) => sweepSnapshot(root, profile));
  const totals = snapshots.reduce(
    (acc, snapshot) => {
      acc.openRecords += snapshot.openRecords;
      acc.closedRecords += snapshot.closedRecords;
      acc.fresh += snapshot.fresh;
      acc.proposedClose += snapshot.proposedClose;
      acc.workCandidates += snapshot.workCandidates;
      acc.failedOrStale += snapshot.failedOrStale;
      return acc;
    },
    {
      openRecords: 0,
      closedRecords: 0,
      fresh: 0,
      proposedClose: 0,
      workCandidates: 0,
      failedOrStale: 0,
    },
  );
  const recent = snapshots
    .flatMap((snapshot) => snapshot.recent)
    .sort((a, b) => Date.parse(b.reviewedAt ?? "") - Date.parse(a.reviewedAt ?? ""))
    .slice(0, 15);
  const closed = snapshots
    .flatMap((snapshot) => snapshot.closed)
    .sort((a, b) => Date.parse(b.closedAt ?? "") - Date.parse(a.closedAt ?? ""))
    .slice(0, 15);
  const work = snapshots
    .flatMap((snapshot) => snapshot.work)
    .sort(
      (a, b) =>
        priorityScore(b.workPriority) - priorityScore(a.workPriority) ||
        Date.parse(b.reviewedAt ?? "") - Date.parse(a.reviewedAt ?? ""),
    )
    .slice(0, 20);
  const lastSourceUpdate = newestTimestamp(
    ...snapshots.flatMap((snapshot) => [
      snapshot.status?.updated_at,
      snapshot.audit?.generatedAt,
      snapshot.lastReviewAt,
      snapshot.lastCloseAt,
    ]),
  );

  return `## Sweep Dashboard

Last source update: ${formatTimestamp(lastSourceUpdate)}

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | ${snapshots.length} |
| Open review records | ${totals.openRecords} |
| Archived closed records | ${totals.closedRecords} |
| Fresh reviews, ${FRESH_DAYS}d | ${totals.fresh} |
| Proposed closes awaiting apply | ${totals.proposedClose} |
| Work candidates awaiting promotion | ${totals.workCandidates} |
| Failed or stale reviews | ${totals.failedOrStale} |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
${rowsOrNone(snapshots.map(statusRow), 4)}

### Repositories

| Repository | Open records | Archived | Fresh | Proposed closes | Work candidates | Failed/stale | Last review | Last close |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
${rowsOrNone(snapshots.map(repositoryRow), 9)}

### Work Candidates

| Repository | Item | Title | Priority | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
${rowsOrNone(work.map(workRow), 6)}

### Recently Closed

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
${rowsOrNone(closed.map(closedRow), 6)}

<details>
<summary>Recently Reviewed</summary>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
${rowsOrNone(recent.map(recentRow), 6)}

</details>

### Audit Health

| Repository | Status | Last audit | Missing eligible | Stale records | Protected proposed | Scan complete |
| --- | --- | --- | ---: | ---: | ---: | --- |
${rowsOrNone(snapshots.map(auditRow), 7)}
`;
}

function sweepSnapshot(root, profile) {
  const itemsDir = path.join(root, "records", profile.slug, "items");
  const closedDir = path.join(root, "records", profile.slug, "closed");
  const status = readJson(path.join(root, "results", "sweep-status", `${profile.slug}.json`), {
    state: "Idle",
    detail: "No workflow status has been published yet.",
    updated_at: "",
    run_url: null,
  });
  const audit = readJson(path.join(root, "results", "audit", `${profile.slug}.json`), null);
  const items = markdownFiles(itemsDir).map((file) => recordFromFile(root, file, profile, false));
  const closedItems = markdownFiles(closedDir).map((file) =>
    recordFromFile(root, file, profile, true),
  );
  const fresh = items.filter(isFresh).length;
  const proposedClose = items.filter(
    (item) => isFresh(item) && item.decision === "close" && item.action === "proposed_close",
  ).length;
  const work = items.filter(
    (item) =>
      isFresh(item) &&
      item.workCandidate === "queue_fix_pr" &&
      item.workStatus === "candidate",
  );
  return {
    profile,
    status,
    audit,
    openRecords: items.length,
    closedRecords: closedItems.length,
    fresh,
    proposedClose,
    workCandidates: work.length,
    failedOrStale: items.filter(
      (item) => item.reviewStatus === "failed" || item.reviewStatus.startsWith("stale_"),
    ).length,
    lastReviewAt: newestTimestamp(...items.map((item) => item.reviewedAt)),
    lastCloseAt: newestTimestamp(...closedItems.map((item) => item.closedAt)),
    recent: items
      .filter((item) => item.reviewedAt)
      .sort((a, b) => Date.parse(b.reviewedAt) - Date.parse(a.reviewedAt))
      .slice(0, 15),
    closed: closedItems
      .filter((item) => item.closedAt)
      .sort((a, b) => Date.parse(b.closedAt) - Date.parse(a.closedAt))
      .slice(0, 15),
    work,
  };
}

function recordFromFile(root, file, fallbackProfile, archived) {
  const frontMatter = parseFrontMatter(readText(file));
  const profile = profileForSlug(path.basename(path.dirname(path.dirname(file)))) ?? fallbackProfile;
  const repo = String(frontMatter.repository ?? profile.repo);
  const kind = String(frontMatter.type ?? "issue");
  const action = String(frontMatter.action_taken ?? "unknown");
  const currentState = String(frontMatter.current_state ?? "");
  return {
    profile,
    repo,
    number: numberFromFile(file),
    kind,
    title: String(frontMatter.title ?? ""),
    reviewedAt: String(frontMatter.reviewed_at ?? ""),
    decision: String(frontMatter.decision ?? "unknown"),
    action,
    reviewStatus: String(frontMatter.review_status ?? ""),
    workCandidate: String(frontMatter.work_candidate ?? "none"),
    workPriority: String(frontMatter.work_priority ?? "low"),
    workStatus: String(frontMatter.work_status ?? "none"),
    closeReason: closeReason(frontMatter, action, currentState),
    closedAt: dashboardClosedAt(frontMatter, action, currentState),
    reportPath: relativePath(root, file),
    archived,
  };
}

function isFresh(item) {
  const reviewedAt = Date.parse(item.reviewedAt);
  return Number.isFinite(reviewedAt) && Date.now() - reviewedAt < FRESH_DAYS * DAY_MS;
}

function dashboardClosedAt(frontMatter, action, currentState) {
  if (frontMatter.applied_at) return String(frontMatter.applied_at);
  if (frontMatter.current_item_closed_at) return String(frontMatter.current_item_closed_at);
  if (currentState === "closed") return String(frontMatter.reconciled_at ?? "");
  if (action === "skipped_already_closed") return String(frontMatter.apply_checked_at ?? "");
  return "";
}

function closeReason(frontMatter, action, currentState) {
  if (action === "closed") return String(frontMatter.close_reason ?? "closed");
  if (action === "skipped_already_closed") return "already closed before apply";
  if (currentState === "closed") return "closed externally after review";
  return String(frontMatter.close_reason ?? "");
}

function priorityScore(priority) {
  if (priority === "high") return 3;
  if (priority === "medium") return 2;
  if (priority === "low") return 1;
  return 0;
}

function repoLink(repo) {
  return link(repo, `https://github.com/${repo}`);
}

function itemLink(item) {
  const segment = item.kind === "pull_request" ? "pull" : "issues";
  return link(`#${item.number}`, `https://github.com/${item.repo}/${segment}/${item.number}`);
}

function reportLink(item) {
  return link(item.reportPath, `${REPORT_BASE}/${item.reportPath}`);
}

function statusRow(snapshot) {
  const status = snapshot.status ?? {};
  const run = status.run_url ? link("run", status.run_url) : "_none_";
  return `| ${repoLink(snapshot.profile.repo)} | ${tableCell(status.state ?? "Idle")} | ${formatTimestamp(status.updated_at)} | ${run} |`;
}

function repositoryRow(snapshot) {
  return `| ${repoLink(snapshot.profile.repo)} | ${snapshot.openRecords} | ${snapshot.closedRecords} | ${snapshot.fresh} | ${snapshot.proposedClose} | ${snapshot.workCandidates} | ${snapshot.failedOrStale} | ${formatTimestamp(snapshot.lastReviewAt)} | ${formatTimestamp(snapshot.lastCloseAt)} |`;
}

function workRow(item) {
  return `| ${repoLink(item.repo)} | ${itemLink(item)} | ${truncate(item.title)} | ${item.workPriority} | ${formatTimestamp(item.reviewedAt)} | ${reportLink(item)} |`;
}

function closedRow(item) {
  return `| ${repoLink(item.repo)} | ${itemLink(item)} | ${truncate(item.title)} | ${tableCell(item.closeReason)} | ${formatTimestamp(item.closedAt)} | ${reportLink(item)} |`;
}

function recentRow(item) {
  return `| ${repoLink(item.repo)} | ${itemLink(item)} | ${truncate(item.title)} | ${item.decision} / ${item.action} | ${item.reviewStatus} | ${formatTimestamp(item.reviewedAt)} |`;
}

function auditRow(snapshot) {
  const audit = snapshot.audit;
  if (!audit) return `| ${repoLink(snapshot.profile.repo)} | _unknown_ | unknown | 0 | 0 | 0 | unknown |`;
  const counts = audit.counts ?? {};
  return `| ${repoLink(snapshot.profile.repo)} | ${tableCell(auditStatus(audit))} | ${formatTimestamp(audit.generatedAt)} | ${counts.missingEligibleOpen ?? 0} | ${counts.staleItemRecords ?? 0} | ${counts.protectedProposed ?? 0} | ${audit.scan?.complete ? "yes" : "no"} |`;
}

function auditStatus(audit) {
  const counts = audit.counts ?? {};
  if (!audit.scan?.complete) return "scan incomplete";
  if ((counts.protectedProposed ?? 0) > 0) return "protected proposed closes";
  if ((counts.duplicateRecords ?? 0) > 0) return "duplicate records";
  if ((counts.openArchived ?? 0) > 0) return "open archived records";
  if ((counts.missingEligibleOpen ?? 0) > 0) return "missing records";
  return "clean";
}
