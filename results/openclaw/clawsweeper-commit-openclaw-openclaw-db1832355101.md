---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-db1832355101"
mode: "autonomous"
run_id: "25145621962"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25145621962"
head_sha: "3995dc4f4a049ee66ec5f10eb13a141a028912f2"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T03:26:15.113Z"
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

# clawsweeper-commit-openclaw-openclaw-db1832355101

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25145621962](https://github.com/openclaw/clawsweeper/actions/runs/25145621962)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one concrete regression: the committed Plugin SDK API baseline hash is not reproducible from the committed source, so the API baseline check fails.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74789 | clawsweeper/clawsweeper-commit-openclaw-openclaw-db1832355101 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74789 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-db1832355101 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
