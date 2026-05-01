---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-73724"
mode: "autonomous"
run_id: "25214518153"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25214518153"
head_sha: "df20b9a6303d40b1149054180a017e06e722c7f4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T12:46:42.016Z"
canonical: "https://github.com/openclaw/openclaw/pull/73724"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/73724"
actions_total: 8
fix_executed: 0
fix_failed: 1
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-73724

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25214518153](https://github.com/openclaw/clawsweeper/actions/runs/25214518153)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/73724

## Summary

#73724 is the canonical repair target for this automerge cluster, but it is not merge-ready. The hydrated PR is open, same-repo branch-writable, dirty/unmergeable, has relevant failing checks from the previous run, and lacks merge preflight proof. Plan an in-place contributor-branch repair; no close or merge actions are allowed by this job.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 8 |
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
| repair_contributor_branch | failed |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/cli/daemon-cli/probe.test.ts: core test [check:changed] src/cli/daemon-cli/probe.ts: core production [check:changed] src/commands/gateway-status/local-status-rpc-fallback.ts: core production [check:changed] src/commands/gateway-status/probe-run.test.ts: core test [check:changed] src/commands/gateway-status/probe-run.ts: core production [check:changed] src/commands/status.scan.shared.test.ts: core test [check:changed] src/commands/status.scan.shared.ts: core production [check:changed] conflict markers [check:changed] changelog at ... tsbuildinfo > openclaw@2026.4.30 lint:core /tmp/clawsweeper-repair-fix-4QTdup/openclaw-openclaw > node scripts/run-oxlint.mjs --tsconfig tsconfig.oxlint.core.json src ui packages [plugin-sdk boundary dts] fresh; skipping [plugin-sdk package boundary dts] fresh; skipping [qa-channel boundary dts] fresh; skipping [plugin-sdk boundary root shims] fresh; skipping Failed to parse oxlint configuration file. [38;2;225;80;80;1m×[0m [38;2;225;80;80;1mRule 'no-underscore-dangle' not found in plugin 'eslint'[0m ELIFECYCLE Command failed with exit code 1. ELIFECYCLE Command failed with exit code 1. |
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/cli/daemon-cli/probe.test.ts: core test [check:changed] src/cli/daemon-cli/probe.ts: core production [check:changed] src/commands/gateway-status/local-status-rpc-fallback.ts: core production [check:changed] src/commands/gateway-status/probe-run.test.ts: core test [check:changed] src/commands/gateway-status/probe-run.ts: core production [check:changed] src/commands/status.scan.shared.test.ts: core test [check:changed] src/commands/status.scan.shared.ts: core production [check:changed] conflict markers [check:changed] changelog at ... tsbuildinfo > openclaw@2026.4.30 lint:core /tmp/clawsweeper-repair-fix-4QTdup/openclaw-openclaw > node scripts/run-oxlint.mjs --tsconfig tsconfig.oxlint.core.json src ui packages [plugin-sdk boundary dts] fresh; skipping [plugin-sdk package boundary dts] fresh; skipping [qa-channel boundary dts] fresh; skipping [plugin-sdk boundary root shims] fresh; skipping Failed to parse oxlint configuration file. [38;2;225;80;80;1m×[0m [38;2;225;80;80;1mRule 'no-underscore-dangle' not found in plugin 'eslint'[0m ELIFECYCLE Command failed with exit code 1. ELIFECYCLE Command failed with exit code 1. |
| automerge_repair_outcome_comment | updated | #73724 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #42019 | keep_closed | skipped | duplicate | Already closed; no mutation valid. |
| #48360 | keep_closed | skipped | fixed_by_candidate | Already closed; no mutation valid. |
| #51357 | keep_closed | skipped | superseded | Already closed; no mutation valid. |
| #62762 | keep_closed | skipped | fixed_by_candidate | Already closed; no mutation valid. |
| #64400 | keep_closed | skipped | related | Already closed; no mutation valid. |
| #73535 | keep_closed | skipped | fixed_by_candidate | Already closed; no mutation valid. |
| #73724 | fix_needed | planned | canonical | Canonical PR needs in-place repair before any merge verdict. |
| cluster:automerge-openclaw-openclaw-73724 | build_fix_artifact | planned |  | Automerge job permits fix/raise_pr but blocks close and merge. |

## Needs Human

- none
