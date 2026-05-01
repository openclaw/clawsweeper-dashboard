---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75382"
mode: "autonomous"
run_id: "25202542275"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25202542275"
head_sha: "608eef4eb86affcd1125009b55c54a58305a6b51"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T04:56:55.128Z"
canonical: "https://github.com/openclaw/openclaw/pull/75382"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75382"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75382

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25202542275](https://github.com/openclaw/clawsweeper/actions/runs/25202542275)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75382

## Summary

Canonical PR #75382 is useful and ClawSweeper-reviewed, but the hydrated preflight reports it is dirty/unmergeable against main. Because the branch is a same-repo writable head and merge is blocked by job policy, plan a repair pass on the contributor branch rather than replacement, closeout, or merge.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75382 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75382 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74842 | keep_closed | skipped | fixed_by_candidate | Historical linked issue only; no mutation needed. |
| #75207 | keep_closed | skipped | fixed_by_candidate | Historical linked issue only; no mutation needed. |
| #75382 | fix_needed | planned | canonical | Repair/rebase the writable contributor branch, then rerun review and changed-surface validation before the router considers automerge. |
| cluster:automerge-openclaw-openclaw-75382 | build_fix_artifact | planned |  | The only blocker is branch freshness/conflict repair on a writable same-repo branch. |

## Needs Human

- none
