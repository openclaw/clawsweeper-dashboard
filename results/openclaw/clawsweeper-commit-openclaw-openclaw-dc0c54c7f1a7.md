---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-dc0c54c7f1a7"
mode: "autonomous"
run_id: "25154533242"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25154533242"
head_sha: "42ca9d9c4fc8e9979a44a05e87fba0b460ea44d9"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T08:16:07.510Z"
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

# clawsweeper-commit-openclaw-openclaw-dc0c54c7f1a7

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25154533242](https://github.com/openclaw/clawsweeper/actions/runs/25154533242)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one low-severity CLI correctness issue in the new warning text.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74964 | clawsweeper/clawsweeper-commit-openclaw-openclaw-dc0c54c7f1a7 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74964 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-dc0c54c7f1a7 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
