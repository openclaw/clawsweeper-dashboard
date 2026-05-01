---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-73989"
mode: "autonomous"
run_id: "25220842888"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25220842888"
head_sha: "f1bb916a329faa6fdadc8549b12d2dd5453c7f91"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T15:49:10.623Z"
canonical: "https://github.com/openclaw/openclaw/pull/73989"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/73989"
actions_total: 4
fix_executed: 0
fix_failed: 1
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-73989

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25220842888](https://github.com/openclaw/clawsweeper/actions/runs/25220842888)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/73989

## Summary

Canonical path is the open same-repo PR #73989. The hydrated artifact shows ClawSweeper review passed for head b62721f04f5213b41bf749dbb3a539ab169fe24a, but the PR is dirty/behind and needs a bounded rebase repair on its writable branch before the merge router can continue. No GitHub mutations were performed.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
| Fix executed | 0 |
| Fix failed | 1 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | failed |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/gateway/channel-health-monitor.test.ts: core test [check:changed] src/gateway/channel-health-monitor.ts: core production [check:changed] src/gateway/channel-health-policy.test.ts: core test [check:changed] src/gateway/channel-health-policy.ts: core production [check:changed] src/gateway/server/readiness.test.ts: core test [check:changed] src/gateway/server/readiness.ts: core production [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plu ... tsbuildinfo > openclaw@2026.4.30 lint:core /tmp/clawsweeper-repair-fix-lxknTU/openclaw-openclaw > node scripts/run-oxlint.mjs --tsconfig tsconfig.oxlint.core.json src ui packages [plugin-sdk boundary dts] fresh; skipping [plugin-sdk package boundary dts] fresh; skipping [qa-channel boundary dts] fresh; skipping [plugin-sdk boundary root shims] fresh; skipping Failed to parse oxlint configuration file. [38;2;225;80;80;1m×[0m [38;2;225;80;80;1mRule 'no-underscore-dangle' not found in plugin 'eslint'[0m ELIFECYCLE Command failed with exit code 1. ELIFECYCLE Command failed with exit code 1. |
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/gateway/channel-health-monitor.test.ts: core test [check:changed] src/gateway/channel-health-monitor.ts: core production [check:changed] src/gateway/channel-health-policy.test.ts: core test [check:changed] src/gateway/channel-health-policy.ts: core production [check:changed] src/gateway/server/readiness.test.ts: core test [check:changed] src/gateway/server/readiness.ts: core production [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plu ... tsbuildinfo > openclaw@2026.4.30 lint:core /tmp/clawsweeper-repair-fix-lxknTU/openclaw-openclaw > node scripts/run-oxlint.mjs --tsconfig tsconfig.oxlint.core.json src ui packages [plugin-sdk boundary dts] fresh; skipping [plugin-sdk package boundary dts] fresh; skipping [qa-channel boundary dts] fresh; skipping [plugin-sdk boundary root shims] fresh; skipping Failed to parse oxlint configuration file. [38;2;225;80;80;1m×[0m [38;2;225;80;80;1mRule 'no-underscore-dangle' not found in plugin 'eslint'[0m ELIFECYCLE Command failed with exit code 1. ELIFECYCLE Command failed with exit code 1. |
| automerge_repair_outcome_comment | updated | #73989 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #73989 | fix_needed | planned | canonical | Merge is blocked by job policy and dirty merge state; same-repo branch is writable, so emit repair_contributor_branch work for the existing PR. |
| cluster:automerge-openclaw-openclaw-73989 | build_fix_artifact | planned | canonical | A repair artifact is required because the canonical PR is useful and writable but not merge-ready. |
| #45712 | keep_closed | skipped | superseded | Already closed; no close action is valid. Keep as credited superseded source evidence for #73989. |
| #41030 | keep_closed | skipped | related | Already closed and not the reconnect-grace source path; keep as related historical evidence only. |

## Needs Human

- none
