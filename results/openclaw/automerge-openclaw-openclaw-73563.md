---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-73563"
mode: "autonomous"
run_id: "25593563115"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25593563115"
head_sha: "9ac2a14bcadf21a865435feeb6d7fcb71dca1d3e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-09T06:19:17.660Z"
canonical: "https://github.com/openclaw/openclaw/pull/79645"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/79645"
actions_total: 5
fix_executed: 0
fix_failed: 1
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-73563

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25593563115](https://github.com/openclaw/clawsweeper/actions/runs/25593563115)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/79645

## Summary

Canonical repair path is the open same-repo replacement PR #79645. The original contributor PR #73563 is already closed, #79645 has a clean ClawSweeper review and passing checks in the artifact, but it is still dirty/unmergeable against current main and must be repaired/rebased before the automerge router can re-review and merge. No GitHub mutation is planned by this worker.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
| Fix executed | 0 |
| Fix failed | 1 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | failed |  |  | source PR #73563 is closed |
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/79645 | clawsweeper/automerge-openclaw-openclaw-73563 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #79645 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #64046 | keep_related | planned | related | #79645 is related narrow fix work under the umbrella, not a complete duplicate or full closeout for #64046. |
| #73563 | keep_closed | skipped | superseded | Already superseded by same-repo replacement PR #79645; no further mutation is valid for this closed PR. |
| #73565 | keep_related | planned | fixed_by_candidate | Covered by candidate #79645, but closure is blocked until #79645 is repaired and merged by the separate automerge path. |
| #79645 | fix_needed | planned | canonical | Repair the writable same-repo replacement branch, resolve dirty mergeability against current main, rerun review/gates, and leave final merge to the automerge router. |
| cluster:automerge-openclaw-openclaw-73563 | build_fix_artifact | planned |  | A narrow repair artifact is needed because the canonical PR is open and reviewed but dirty/unmergeable. |

## Needs Human

- none
