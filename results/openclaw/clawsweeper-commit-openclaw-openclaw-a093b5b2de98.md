---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-a093b5b2de98"
mode: "autonomous"
run_id: "25152903485"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25152903485"
head_sha: "fc20156936aba9e567a4bd9dde6b519a83b729c4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T07:37:02.829Z"
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

# clawsweeper-commit-openclaw-openclaw-a093b5b2de98

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25152903485](https://github.com/openclaw/clawsweeper/actions/runs/25152903485)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one actionable regression in the new bounded directory scan: ignored raw entries can consume the configured candidate budget before valid skill directories are considered.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74942 | clawsweeper/clawsweeper-commit-openclaw-openclaw-a093b5b2de98 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74942 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-a093b5b2de98 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
