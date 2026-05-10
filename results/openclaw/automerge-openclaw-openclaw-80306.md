---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-80306"
mode: "autonomous"
run_id: "25632632520"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25632632520"
head_sha: "b3153aa5f15ae6e9411f0fdd17d4d3358f93a3c1"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-10T15:48:47.077Z"
canonical: "https://github.com/openclaw/openclaw/pull/80306"
canonical_issue: "https://github.com/openclaw/openclaw/issues/79349"
canonical_pr: "https://github.com/openclaw/openclaw/pull/80306"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-80306

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25632632520](https://github.com/openclaw/clawsweeper/actions/runs/25632632520)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/80306

## Summary

#80306 is the canonical repair path for #79349, but it is not merge-ready: the hydrated exact-head state shows failing check, check-additional, check-lint, check-test-types, and check-additional-extension-bundled jobs, plus one pending Critical Quality shard. The same-repo PR branch is writable, so the executable path is to repair #80306 in place, re-run review and changed-surface validation, and leave #79349 open until the fix lands.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/80306 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #80306 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #80306 | fix_needed | planned | canonical | Canonical automerge PR needs CI/check repair on the writable contributor branch before any exact-head automerge gate can proceed. |
| cluster:automerge-openclaw-openclaw-80306 | build_fix_artifact | planned | canonical | Build a repair-contributor-branch artifact so the executor can fetch failing job logs, patch the current #80306 head narrowly, and rerun review/validation. |
| #79349 | fix_needed | planned | fixed_by_candidate | Issue is covered by the canonical candidate PR, but closeout is intentionally blocked until the fixed exact head lands. |

## Needs Human

- none
