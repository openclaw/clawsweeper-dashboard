---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-82ca6ecdde80"
mode: "autonomous"
run_id: "25277369897"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25277369897"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T11:05:47.340Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-82ca6ecdde80

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25277369897](https://github.com/openclaw/clawsweeper/actions/runs/25277369897)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Verified the ClawSweeper commit finding against current main 9772ce6ce975ed0b5b0f3fa371cbddcddcd3a447. The pre-resolved requested-mode fallback is already fixed, but the sandbox-policy portion of the message-tool availability bug still appears valid, so a narrow fix PR is planned.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | fix_needed | planned |  | A sandboxed group/channel turn with sandbox tools.allow omitting message can still be resolved as message_tool_only by dispatch, while the actual model tool list later removes message. That preserves the visible-reply suppression the fallback was meant to avoid. |
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | build_fix_artifact | planned |  | No viable canonical PR exists in the hydrated cluster; the remaining bug is narrow and fix-pr eligible. |

## Needs Human

- none
