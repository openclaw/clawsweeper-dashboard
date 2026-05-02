---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76021"
mode: "autonomous"
run_id: "25249053874"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25249053874"
head_sha: "bcfc0ffc062a67bab6187524b996e0a990e906d5"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T09:42:19.782Z"
canonical: "https://github.com/openclaw/openclaw/pull/76021"
canonical_issue: "https://github.com/openclaw/openclaw/issues/47311"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76021"
actions_total: 3
fix_executed: 0
fix_failed: 1
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76021

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25249053874](https://github.com/openclaw/clawsweeper/actions/runs/25249053874)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76021

## Summary

#76021 is the canonical adopted PR for #47311, but it is not merge-ready: the hydrated preflight shows relevant failing and pending checks, no completed ClawSweeper review verdict, and merge is blocked by job policy. The safe path is to repair the writable same-repo contributor branch, preserve source credit, rerun review and changed-surface validation, and leave #47311 open until the fix lands.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| repair_contributor_branch | failed |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/gateway/method-scopes.ts: core production [check:changed] src/gateway/server-methods-list.ts: core production [check:changed] src/gateway/server-methods.ts: core production [check:changed] src/gateway/server-methods/chat-transcribe-audio.test.ts: core test [check:changed] src/gateway/server-methods/chat-transcribe-audio.ts: core production [check:changed] ui/src/styles/chat/layout.css: core production [check:changed] ui/src/ui/app-chat.test.ts: core test [check:changed] ui/src/ui/app-chat.ts: core production [check:changed] ui/s ... overage /tmp/clawsweeper-repair-fix-PcppgC/openclaw-openclaw > node scripts/check-duplicates.mjs --coverage [dup:check] target coverage ok > openclaw@2026.4.30 tsgo:core /tmp/clawsweeper-repair-fix-PcppgC/openclaw-openclaw > node scripts/run-tsgo.mjs -p tsconfig.core.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/core.tsbuildinfo src/plugins/loader.ts(1381,7): error TS2322: Type 'string[] | undefined' is not assignable to type 'string[]'. Type 'undefined' is not assignable to type 'string[]'. ELIFECYCLE Command failed with exit code 2. ELIFECYCLE Command failed with exit code 2. |
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/gateway/method-scopes.ts: core production [check:changed] src/gateway/server-methods-list.ts: core production [check:changed] src/gateway/server-methods.ts: core production [check:changed] src/gateway/server-methods/chat-transcribe-audio.test.ts: core test [check:changed] src/gateway/server-methods/chat-transcribe-audio.ts: core production [check:changed] ui/src/styles/chat/layout.css: core production [check:changed] ui/src/ui/app-chat.test.ts: core test [check:changed] ui/src/ui/app-chat.ts: core production [check:changed] ui/s ... overage /tmp/clawsweeper-repair-fix-PcppgC/openclaw-openclaw > node scripts/check-duplicates.mjs --coverage [dup:check] target coverage ok > openclaw@2026.4.30 tsgo:core /tmp/clawsweeper-repair-fix-PcppgC/openclaw-openclaw > node scripts/run-tsgo.mjs -p tsconfig.core.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/core.tsbuildinfo src/plugins/loader.ts(1381,7): error TS2322: Type 'string[] | undefined' is not assignable to type 'string[]'. Type 'undefined' is not assignable to type 'string[]'. ELIFECYCLE Command failed with exit code 2. ELIFECYCLE Command failed with exit code 2. |
| automerge_repair_outcome_comment | updated | #76021 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76021 | fix_needed | planned | canonical | Repair the writable same-repo PR branch before any later exact-head review or merge gate. |
| #47311 | keep_related | planned | related | #47311 is the linked feature request covered by the canonical repair path, but it is not closable before the fix lands. |
| cluster:automerge-openclaw-openclaw-76021 | build_fix_artifact | planned |  | A branch repair artifact is required for the deterministic executor to update #76021 and re-run gates. |

## Needs Human

- none
