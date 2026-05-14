---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-82ca6ecdde80"
mode: "autonomous"
run_id: "25842227457"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25842227457"
head_sha: "1558af39eeca02b91e57ae98a885c7871229a8e8"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-14T04:52:37.441Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25842227457](https://github.com/openclaw/clawsweeper/actions/runs/25842227457)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Latest main 6db2ee6583d968586ffba6dbf995f2e31402c2a1 partially fixed the commit finding: pre-resolved message_tool_only now falls back when message is unavailable, and dispatch now checks group/subagent/inherited policy. A narrow follow-up is still needed because dispatch still omits sandbox tool policy and runtime tool disabling/allowlisting from the message-tool-availability decision, while the real tool pipeline applies those filters.

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
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | fix_needed | planned |  | The reported bug remains valid for sandbox/runtime-filtered message tool availability, so a narrow fix PR is appropriate. |
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | build_fix_artifact | planned |  | No viable existing PR is hydrated; allow_fix_pr is true and the patch can stay narrow. |

## Needs Human

- none
