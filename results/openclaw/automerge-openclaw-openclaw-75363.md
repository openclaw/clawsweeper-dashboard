---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75363"
mode: "autonomous"
run_id: "25249012667"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25249012667"
head_sha: "bcfc0ffc062a67bab6187524b996e0a990e906d5"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T09:40:20.675Z"
canonical: "#75363"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75363"
actions_total: 2
fix_executed: 0
fix_failed: 1
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75363

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25249012667](https://github.com/openclaw/clawsweeper/actions/runs/25249012667)

Workflow conclusion: success

Worker result: planned

Canonical: #75363

## Summary

PR #75363 remains the canonical adopted automerge candidate. It is open, same-repo writable, and non-security, but it is not merge-ready because the hydrated ClawSweeper review has a fix-required marker for Discord REST stale dropping; merge and close actions are blocked by job frontmatter. Plan repair on the contributor branch and rerun review/changed checks after the narrow fix.

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
| repair_contributor_branch | failed |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=extensions, extensionTests, docs [check:changed] extensions/discord/src/actions/handle-action.test.ts: extension test [check:changed] extensions/discord/src/actions/handle-action.ts: extension production [check:changed] extensions/discord/src/internal/client.test.ts: extension test [check:changed] extensions/discord/src/internal/client.ts: extension production [check:changed] extensions/discord/src/internal/command-deploy.ts: extension production [check:changed] extensions/discord/src/internal/gateway.test.ts: extension test [check:changed] extensions/discord/src/intern ... weeper-repair-fix-cFgdso/openclaw-openclaw > node scripts/check-duplicates.mjs --coverage [dup:check] target coverage ok > openclaw@2026.4.30 tsgo:extensions /tmp/clawsweeper-repair-fix-cFgdso/openclaw-openclaw > node scripts/run-tsgo.mjs -p tsconfig.extensions.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/extensions.tsbuildinfo src/plugins/loader.ts(1381,7): error TS2322: Type 'string[] | undefined' is not assignable to type 'string[]'. Type 'undefined' is not assignable to type 'string[]'. ELIFECYCLE Command failed with exit code 2. ELIFECYCLE Command failed with exit code 2. |
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=extensions, extensionTests, docs [check:changed] extensions/discord/src/actions/handle-action.test.ts: extension test [check:changed] extensions/discord/src/actions/handle-action.ts: extension production [check:changed] extensions/discord/src/internal/client.test.ts: extension test [check:changed] extensions/discord/src/internal/client.ts: extension production [check:changed] extensions/discord/src/internal/command-deploy.ts: extension production [check:changed] extensions/discord/src/internal/gateway.test.ts: extension test [check:changed] extensions/discord/src/intern ... weeper-repair-fix-cFgdso/openclaw-openclaw > node scripts/check-duplicates.mjs --coverage [dup:check] target coverage ok > openclaw@2026.4.30 tsgo:extensions /tmp/clawsweeper-repair-fix-cFgdso/openclaw-openclaw > node scripts/run-tsgo.mjs -p tsconfig.extensions.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/extensions.tsbuildinfo src/plugins/loader.ts(1381,7): error TS2322: Type 'string[] | undefined' is not assignable to type 'string[]'. Type 'undefined' is not assignable to type 'string[]'. ELIFECYCLE Command failed with exit code 2. ELIFECYCLE Command failed with exit code 2. |
| automerge_repair_outcome_comment | updated | #75363 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75363 | fix_needed | planned | canonical | Adopted automerge PR needs bounded repair on its writable same-repo branch; merge and closure are disallowed in this job. |
| cluster:automerge-openclaw-openclaw-75363 | build_fix_artifact | planned |  | A narrow branch repair artifact is required before the comment router can request a clean exact-head ClawSweeper review. |

## Needs Human

- none
