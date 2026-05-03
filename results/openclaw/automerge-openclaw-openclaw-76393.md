---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76393"
mode: "autonomous"
run_id: "25272101832"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25272101832"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T06:56:33.401Z"
canonical: "https://github.com/openclaw/openclaw/pull/76393"
canonical_issue: "https://github.com/openclaw/openclaw/issues/76367"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76393"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76393

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25272101832](https://github.com/openclaw/clawsweeper/actions/runs/25272101832)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76393

## Summary

Canonical PR #76393 is useful, narrow, and branch-writable, but the hydrated preflight reports it as dirty/unmergeable against current main. Plan a repair of the contributor branch, preserve @neeravmakwana credit, and keep linked issue #76367 open until the repaired PR lands. No close or merge action is emitted because this job blocks close/merge.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76393 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76393 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76367 | keep_related | planned | fixed_by_candidate | Covered by the repairable canonical PR path, but must remain open until #76393 is repaired and landed. |
| #76393 | fix_needed | planned | canonical | Repair the existing contributor PR branch rather than replacing it; the branch is writable and the remaining blocker is dirty/unmergeable state. |
| cluster:automerge-openclaw-openclaw-76393 | build_fix_artifact | planned |  | Automerge repair loop needs an executable branch repair plan; merge remains out of scope for this worker. |

## Needs Human

- none
