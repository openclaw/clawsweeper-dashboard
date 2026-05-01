---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0"
mode: "autonomous"
run_id: "25200994696"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25200994696"
head_sha: "f67c5ae4e9737489bbd57009d57dd5df4a1e369b"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T03:38:11.201Z"
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

# clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25200994696](https://github.com/openclaw/clawsweeper/actions/runs/25200994696)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one command-routing bug: the target workflow’s pre-dispatch grep drops an alias that the ClawSweeper receiver explicitly supports.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75404 | clawsweeper/clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75404 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
