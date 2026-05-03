---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75590"
mode: "autonomous"
run_id: "25266243095"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25266243095"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T01:18:15.370Z"
canonical: "https://github.com/openclaw/openclaw/pull/76318"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/76318"
actions_total: 6
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75590

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25266243095](https://github.com/openclaw/clawsweeper/actions/runs/25266243095)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76318

## Summary

Canonical path is the writable replacement PR #76318. It repairs the closed adopted source PR #75590 and carries credit for @Ricardo-M-L, but it is currently dirty against main and has failing exact-head CI checks, so the next deterministic action is a narrow branch repair/rebase plus re-review, not merge or close.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 6 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76318 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76318 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #58269 | keep_closed | skipped | related | Closed context ref only; no closure or merge action is valid. |
| #64104 | keep_closed | skipped | independent | Unrelated closed context ref; keep out of the delete-popover repair path. |
| #69982 | keep_related | planned | superseded | Same root cause, but closure is disabled and should wait until the canonical replacement path is repaired and handled by the applicator/maintainer gates. |
| #75590 | keep_closed | skipped | superseded | Already closed source PR; no further close action is valid. |
| #76318 | fix_needed | planned | canonical | Repair the writable replacement branch, rerun validation and review, then let the deterministic merge router decide. Merge is explicitly blocked for this worker. |
| cluster:automerge-openclaw-openclaw-75590 | build_fix_artifact | planned |  | Emit an executable repair artifact for the applicator instead of merge/close actions. |

## Needs Human

- none
