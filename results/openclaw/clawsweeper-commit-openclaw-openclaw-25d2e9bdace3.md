---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-25d2e9bdace3"
mode: "autonomous"
run_id: "25145494152"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25145494152"
head_sha: "c9bf88cf68345598443274e88bd39cc72d57d872"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T03:19:17.601Z"
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

# clawsweeper-commit-openclaw-openclaw-25d2e9bdace3

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25145494152](https://github.com/openclaw/clawsweeper/actions/runs/25145494152)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one attach-only regression: the commit stops the immediate `uninstall` call, but other normal app paths still uninstall launchd while attach-only is enabled.

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
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=apps [check:changed] apps/macos/Sources/OpenClaw/GatewayLaunchAgentManager.swift: app surface [check:changed] apps/macos/Tests/OpenClawIPCTests/GatewayLaunchAgentManagerTests.swift: app surface [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] duplicate scan target coverage [check:changed] lint apps sh: 1: swiftlint: not found [check:changed] summary 550ms ok conflict markers 189ms ok changelog attributions 201ms ok guarded extension wildcard re-exports 186ms ok plugin-sdk wildcard re-exports 194ms ok duplicate scan target coverage 347ms failed:1 lint apps |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-25d2e9bdace3 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
