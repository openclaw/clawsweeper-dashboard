---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-82ca6ecdde80"
mode: "autonomous"
run_id: "25176627885"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25176627885"
head_sha: "ccf445256b0567653d93b1af9dc2ee7092faaa98"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T16:23:17.070Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25176627885](https://github.com/openclaw/clawsweeper/actions/runs/25176627885)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Verified the ClawSweeper commit finding against current main adc20fed0d15c370cc36b8648636112a3c0efcf0. The pre-resolved requested-mode fallback is already fixed on main, but the dispatch-time message tool availability check still omits group, sandbox, subagent, and runtime allowlist policy inputs, so a narrow fix PR is still needed.

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
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | fix_needed | planned |  | No viable canonical PR exists in the hydrated artifact; allow_fix_pr is true, and the remaining bug can be fixed narrowly. |
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | build_fix_artifact | planned |  | A cluster-scoped fix artifact is the correct autonomous output for a valid ClawSweeper commit finding with no hydrated issue/PR refs. |

## Needs Human

- none
