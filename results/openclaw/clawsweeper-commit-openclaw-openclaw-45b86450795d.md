---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-45b86450795d"
mode: "autonomous"
run_id: "25200785766"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25200785766"
head_sha: "32acaf47f27fd897d90b6186a2ca6365d99a9689"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T03:37:00.181Z"
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

# clawsweeper-commit-openclaw-openclaw-45b86450795d

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25200785766](https://github.com/openclaw/clawsweeper/actions/runs/25200785766)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one concrete regression: making typing start fire-and-forget allows cleanup/idle to run before a persistent typing indicator has finished starting, so the stop path can no-op and leave the indicator behind.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75403 | clawsweeper/clawsweeper-commit-openclaw-openclaw-45b86450795d |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75403 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-45b86450795d | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
