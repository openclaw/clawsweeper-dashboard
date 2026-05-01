---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-57e4994caf6d"
mode: "autonomous"
run_id: "25128232401"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25128232401"
head_sha: "5f1b20b449456483674e5310a1279f2301bf2d54"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-29T19:07:32.476Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-57e4994caf6d

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25128232401](https://github.com/openclaw/clawsweeper/actions/runs/25128232401)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found two release-validation regressions in the new focused live-suite rerun path. The more important one can produce a green focused rerun without executing any requested live suite when `live_suite_filter` is mistyped or not selected by the current profile.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74562 | clawsweeper/clawsweeper-commit-openclaw-openclaw-57e4994caf6d |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74562 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-57e4994caf6d | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
