---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-84142"
mode: "autonomous"
run_id: "26632565603"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26632565603"
head_sha: "beb50640445a7699b711ffaf8b27ca39a82c5b3c"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-29T11:11:55.639Z"
canonical: "https://github.com/openclaw/openclaw/pull/84362"
canonical_issue: "https://github.com/openclaw/openclaw/issues/84038"
canonical_pr: "https://github.com/openclaw/openclaw/pull/84362"
actions_total: 5
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-84142

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26632565603](https://github.com/openclaw/clawsweeper/actions/runs/26632565603)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84362

## Summary

Hydrated cluster shows #84142 is already closed and superseded by same-repo replacement PR #84362. #84362 is the canonical repair path for #84038, but it is still dirty/behind and merge is blocked by job policy, so the applicator should repair the writable replacement branch and rerun review/validation before any later merge decision.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/84362 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84362 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #83315 | keep_closed | skipped | related | Closed historical related PR; no mutation planned. |
| #84038 | keep_canonical | planned | canonical | Keep the root issue open pending the canonical fix PR. |
| #84142 | keep_closed | skipped | superseded | Source PR was already superseded by the credited replacement PR. |
| #84362 | fix_needed | planned | canonical | Repair the existing writable replacement branch, then rerun review and validation before any later merge decision. |
| cluster:automerge-openclaw-openclaw-84142 | build_fix_artifact | planned |  | Executor should repair #84362 in place and preserve #84142 contributor credit. |

## Needs Human

- none
