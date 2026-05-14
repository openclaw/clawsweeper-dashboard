---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-82ca6ecdde80"
mode: "autonomous"
run_id: "25837320475"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25837320475"
head_sha: "1558af39eeca02b91e57ae98a885c7871229a8e8"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-14T02:10:32.222Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25837320475](https://github.com/openclaw/clawsweeper/actions/runs/25837320475)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Verified the ClawSweeper commit finding against current main 983064f5f8199422f813006fbeff3e1f7013f185. The pre-resolved requested-mode bug is already fixed, and group/subagent/inherited policy are now included in dispatch. A narrow residual bug remains: dispatch still decides message-tool availability without sandbox tool policy, while the actual embedded tool pipeline applies sandbox policy before exposing the message tool. Plan a narrow fix PR for that remaining mismatch; no GitHub mutation, close, or merge is recommended.

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
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | fix_needed | planned |  | A user-visible fallback can still be bypassed for sandboxed group/channel runs where tools.sandbox.tools.allow excludes message: dispatch suppresses final replies as message_tool_only while actual tool construction filters out the message tool. |
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | build_fix_artifact | planned |  | No viable canonical PR exists in the hydrated artifact; allow_fix_pr is true, so the executor should create a narrow ClawSweeper fix PR from the target branch. |

## Needs Human

- none
