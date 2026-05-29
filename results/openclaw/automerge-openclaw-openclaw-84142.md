---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-84142"
mode: "autonomous"
run_id: "26630622792"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26630622792"
head_sha: "beb50640445a7699b711ffaf8b27ca39a82c5b3c"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-29T10:42:19.193Z"
canonical: "https://github.com/openclaw/openclaw/pull/84362"
canonical_issue: "https://github.com/openclaw/openclaw/issues/84038"
canonical_pr: "https://github.com/openclaw/openclaw/pull/84362"
actions_total: 5
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-84142

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26630622792](https://github.com/openclaw/clawsweeper/actions/runs/26630622792)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84362

## Summary

Cluster has a clear repair path: #84362 is the open same-repo ClawSweeper replacement for closed source PR #84142 and should be repaired before any merge decision. No GitHub mutations are proposed because close and merge are blocked for this job.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #83315 | keep_closed | skipped | related | Already closed; no closure action is valid. |
| #84038 | keep_related | planned | fixed_by_candidate | Covered by the active candidate path, but not closable in this job. |
| #84142 | keep_closed | skipped | superseded | Closed source PR already superseded by #84362; no mutation is valid. |
| #84362 | fix_needed | planned | canonical | Repair the writable canonical replacement PR; merge is blocked by job policy and missing clean review preflight. |
| cluster:automerge-openclaw-openclaw-84142 | build_fix_artifact | planned |  | A narrow repair artifact is required for the executor. |

## Needs Human

- none
