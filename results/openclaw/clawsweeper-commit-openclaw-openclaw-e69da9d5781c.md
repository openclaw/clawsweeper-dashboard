---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-e69da9d5781c"
mode: "autonomous"
run_id: "25128116958"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25128116958"
head_sha: "71b9b0bbe0a24535fe6bb3fa272bbb7aff65372d"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-29T19:07:03.513Z"
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

# clawsweeper-commit-openclaw-openclaw-e69da9d5781c

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25128116958](https://github.com/openclaw/clawsweeper/actions/runs/25128116958)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one low-severity diagnostics flag contract issue introduced/exposed by making timeline honor config flags.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74561 | clawsweeper/clawsweeper-commit-openclaw-openclaw-e69da9d5781c |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74561 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-e69da9d5781c | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
