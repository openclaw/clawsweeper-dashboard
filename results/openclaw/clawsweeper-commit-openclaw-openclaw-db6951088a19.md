---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-db6951088a19"
mode: "autonomous"
run_id: "25128072554"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25128072554"
head_sha: "ec57686a997be0cd2068f69ae7cc1fa328db3c2b"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-29T19:07:28.822Z"
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

# clawsweeper-commit-openclaw-openclaw-db6951088a19

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25128072554](https://github.com/openclaw/clawsweeper/actions/runs/25128072554)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found two medium reliability risks in the new uncaught-exception handling. The focused tests added by the commit pass, but the new recovery path is broader than the Telegram failure it is meant to address and is not scoped to the affected Telegram account.

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
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, extensions, extensionTests [check:changed] extensions/telegram/src/monitor.test.ts: extension test [check:changed] extensions/telegram/src/monitor.ts: extension production [check:changed] src/cli/run-main.exit.test.ts: core test [check:changed] src/infra/unhandled-rejections.test.ts: core test [check:changed] src/infra/unhandled-rejections.ts: core production [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] typecheck core [check:changed] typecheck core tests [check:changed] typecheck extensions [check:changed] typecheck extension tests [check:changed] lint core [check:changed] lint extensions [check:changed] summary 536ms ok conflict markers 215ms ok changelog attributions 226ms ok guarded extension wildcard re-exports 205ms ok plugin-sdk wildcard re-exports 1.30s ok typecheck core 1.72s ok typecheck core tests 1.87s ok typecheck extensions 2.25s ok typecheck extension tests 16.84s ok lint core 13.83s failed:1 lint extensions |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-db6951088a19 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
