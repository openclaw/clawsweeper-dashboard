---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76393"
mode: "autonomous"
run_id: "25269525916"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25269525916"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T04:36:41.314Z"
canonical: "https://github.com/openclaw/openclaw/pull/76393"
canonical_issue: "https://github.com/openclaw/openclaw/issues/76367"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76393"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76393

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25269525916](https://github.com/openclaw/clawsweeper/actions/runs/25269525916)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76393

## Summary

Canonical PR #76393 is useful and branch-writable, but the hydrated preflight marks it dirty/unmergeable against current main e8756d99aef038711534fac3f5809454119fdaee. Plan a bounded repair of the contributor branch, preserving @neeravmakwana credit, then rerun review and changed-surface validation. Linked issue #76367 remains open as fixed-by-candidate until the fix lands; close and merge are blocked by job policy.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | blocked | https://github.com/openclaw/openclaw/pull/76393 |  | source PR #76393 is paused by clawsweeper:human-review; refusing to mutate the PR branch |
| automerge_repair_outcome_comment | updated | #76393 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76393 | fix_needed | planned | canonical | Repair the contributor branch before any merge consideration because the PR is dirty/unmergeable but safely writable. |
| #76367 | keep_related | planned | fixed_by_candidate | The issue is covered by the canonical repair path but must remain open until the fix lands. |
| cluster:automerge-openclaw-openclaw-76393 | build_fix_artifact | planned |  | Emit an executable fix artifact for the ClawSweeper executor; do not merge or close in this worker. |

## Needs Human

- none
