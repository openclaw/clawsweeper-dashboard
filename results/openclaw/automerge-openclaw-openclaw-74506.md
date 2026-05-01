---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74506"
mode: "autonomous"
run_id: "25202544672"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25202544672"
head_sha: "608eef4eb86affcd1125009b55c54a58305a6b51"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T04:47:43.131Z"
canonical: "https://github.com/openclaw/openclaw/pull/75173"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75173"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-74506

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25202544672](https://github.com/openclaw/clawsweeper/actions/runs/25202544672)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75173

## Summary

Replacement PR #75173 is the canonical open repair path. It is same-repo branch-writable, has passing checks and a clean ClawSweeper review, but ClawSweeper explicitly requested a focused changelog repair before automerge. Source PR #74506 is already closed in favor of #75173, so no close/merge mutation is planned.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75173 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75173 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74506 | keep_closed | skipped | superseded | Already closed source PR; keep as historical source/credit evidence for replacement PR #75173. |
| #75173 | fix_needed | planned | canonical | The only actionable blocker is the required changelog entry; repair the existing writable replacement PR branch rather than opening another replacement. |
| cluster:automerge-openclaw-openclaw-74506 | build_fix_artifact | planned |  | Emit a narrow repair artifact for the deterministic executor to update the existing PR branch. |

## Needs Human

- none
