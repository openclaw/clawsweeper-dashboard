---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75603"
mode: "autonomous"
run_id: "25215356650"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25215356650"
head_sha: "df20b9a6303d40b1149054180a017e06e722c7f4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T13:19:18.076Z"
canonical: "https://github.com/openclaw/openclaw/pull/75603"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75603"
actions_total: 2
fix_executed: 0
fix_failed: 1
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75603

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25215356650](https://github.com/openclaw/clawsweeper/actions/runs/25215356650)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75603

## Summary

PR #75603 is the canonical path and its same-repo branch is writable, but exact-head CI has relevant failures. Plan a bounded contributor-branch repair; do not merge or close in this worker run.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| repair_contributor_branch | failed |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/commands/doctor-bundled-plugin-runtime-deps.test.ts: core test [check:changed] src/commands/doctor-bundled-plugin-runtime-deps.ts: core production [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] duplicate scan target coverage [check:changed] typecheck core [check:changed] typecheck core tests [check:changed] summary 442ms ok conflict markers 182ms ok changelog attributions 193ms ok guarded  ... nclaw@2026.4.30 tsgo:core /tmp/clawsweeper-repair-fix-VFpJi2/openclaw-openclaw > node scripts/run-tsgo.mjs -p tsconfig.core.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/core.tsbuildinfo > openclaw@2026.4.30 tsgo:core:test /tmp/clawsweeper-repair-fix-VFpJi2/openclaw-openclaw > node scripts/run-tsgo.mjs -p tsconfig.core.test.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/core-test.tsbuildinfo src/pairing/pairing-store.test.ts(189,26): error TS2554: Expected 1 arguments, but got 0. ELIFECYCLE Command failed with exit code 2. ELIFECYCLE Command failed with exit code 2. |
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/commands/doctor-bundled-plugin-runtime-deps.test.ts: core test [check:changed] src/commands/doctor-bundled-plugin-runtime-deps.ts: core production [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] duplicate scan target coverage [check:changed] typecheck core [check:changed] typecheck core tests [check:changed] summary 442ms ok conflict markers 182ms ok changelog attributions 193ms ok guarded  ... nclaw@2026.4.30 tsgo:core /tmp/clawsweeper-repair-fix-VFpJi2/openclaw-openclaw > node scripts/run-tsgo.mjs -p tsconfig.core.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/core.tsbuildinfo > openclaw@2026.4.30 tsgo:core:test /tmp/clawsweeper-repair-fix-VFpJi2/openclaw-openclaw > node scripts/run-tsgo.mjs -p tsconfig.core.test.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/core-test.tsbuildinfo src/pairing/pairing-store.test.ts(189,26): error TS2554: Expected 1 arguments, but got 0. ELIFECYCLE Command failed with exit code 2. ELIFECYCLE Command failed with exit code 2. |
| automerge_repair_outcome_comment | updated | #75603 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75603 | fix_needed | planned | canonical | Exact-head CI failures block merge/automerge; the safe next step is repairing the writable contributor branch. |
| cluster:automerge-openclaw-openclaw-75603 | build_fix_artifact | planned |  | Build an executable repair artifact for the existing PR branch rather than opening a replacement PR. |

## Needs Human

- none
