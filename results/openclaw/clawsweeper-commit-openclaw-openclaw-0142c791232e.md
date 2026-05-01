---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-0142c791232e"
mode: "autonomous"
run_id: "25147836943"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25147836943"
head_sha: "ddc3e904d6c8aff557646e663bea5d0969913bd0"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T04:44:26.544Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-0142c791232e

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25147836943](https://github.com/openclaw/clawsweeper/actions/runs/25147836943)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

One low-severity generated-baseline issue found. The runtime/schema fix itself matches the existing browser tab cleanup contract, but the committed config docs baseline hash does not match the current generator output.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| execute_fix | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-0142c791232e | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
