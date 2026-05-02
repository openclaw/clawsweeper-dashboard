---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74506"
mode: "autonomous"
run_id: "25247662932"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25247662932"
head_sha: "26f2c55b6de0f674ad103ffa68e2456d40dc81b0"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T08:19:49.932Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25247662932](https://github.com/openclaw/clawsweeper/actions/runs/25247662932)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75173

## Summary

Preflight shows #74506 is already closed in favor of #75173. The replacement PR #75173 is the repairable canonical path, has no hydrated review-comment blockers, and has passing ClawSweeper review/security notes, but it is currently dirty with merge conflicts. Merge and close are blocked by job policy, so the only executable path is a branch repair/rebase artifact for #75173.

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
| #74506 | keep_closed | skipped | superseded | Already closed source PR superseded by hydrated replacement #75173. |
| #75173 | fix_needed | planned | canonical | Repair the existing writable replacement PR branch; do not merge or close from this worker. |
| cluster:automerge-openclaw-openclaw-74506 | build_fix_artifact | planned |  | Emit an executable branch-repair plan for the deterministic executor. |

## Needs Human

- none
