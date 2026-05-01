---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-60c2a9055037"
mode: "autonomous"
run_id: "25131591056"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25131591056"
head_sha: "87255e3cd4b2b8061a509287a5e2f27139e68b71"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-29T20:21:51.661Z"
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

# clawsweeper-commit-openclaw-openclaw-60c2a9055037

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25131591056](https://github.com/openclaw/clawsweeper/actions/runs/25131591056)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one low-severity UI localization regression in the markdown renderer cache.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74600 | clawsweeper/clawsweeper-commit-openclaw-openclaw-60c2a9055037 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74600 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-60c2a9055037 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
