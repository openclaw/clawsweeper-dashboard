---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-ebf05be7420c"
mode: "autonomous"
run_id: "25149585942"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25149585942"
head_sha: "07623fab44927ac7e912c79d8803d9ce6939ef31"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T05:54:42.541Z"
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

# clawsweeper-commit-openclaw-openclaw-ebf05be7420c

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25149585942](https://github.com/openclaw/clawsweeper/actions/runs/25149585942)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one low-severity remaining mixed-block collision in the Slack outbound path touched by this commit. The originally targeted `presentation` + `interactive` action-dispatch case is fixed and covered.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74885 | clawsweeper/clawsweeper-commit-openclaw-openclaw-ebf05be7420c |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74885 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-ebf05be7420c | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
