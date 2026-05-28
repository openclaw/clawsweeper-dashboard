---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87374"
mode: "autonomous"
run_id: "26593233922"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26593233922"
head_sha: "8db024ba0503b6c8368d0b699367e0f321d740b1"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-28T18:38:00.983Z"
canonical: "https://github.com/openclaw/openclaw/pull/87550"
canonical_issue: "https://github.com/openclaw/openclaw/issues/87310"
canonical_pr: "https://github.com/openclaw/openclaw/pull/87550"
actions_total: 4
fix_executed: 0
fix_failed: 1
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87374

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26593233922](https://github.com/openclaw/clawsweeper/actions/runs/26593233922)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87550

## Summary

#87550 is the current canonical repair path for the stale diagnostic session activity bug. #87374 was already closed as a credited superseded source PR because its fork branch was not writable, and #87550 is a same-repo writable replacement, but it is not merge-ready because the hydrated exact-head checks show checks-node-agentic-agents failing.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
| Fix executed | 0 |
| Fix failed | 1 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | failed |  |  | Codex fix worker timed out after 1200000ms |
| execute_fix | blocked |  |  | Codex fix worker timed out after 1200000ms |
| automerge_repair_outcome_comment | updated | #87550 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87310 | keep_canonical | planned | canonical | Keep the issue open until the canonical replacement PR is repaired and lands; post-merge closeout is disabled for this job. |
| #87374 | keep_closed | skipped | superseded | Historical source PR only; it is already superseded by the writable replacement #87550. |
| #87550 | fix_needed | planned | canonical | Repair the writable #87550 branch, address the failing relevant CI lane, rerun review/validation, and only then let the deterministic automerge gate decide merge. |
| cluster:automerge-openclaw-openclaw-87374 | build_fix_artifact | planned |  | Emit an executable repair artifact for the existing same-repo replacement PR rather than opening another replacement. |

## Needs Human

- none
