---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-ac599c9e539f"
mode: "autonomous"
run_id: "25171874076"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25171874076"
head_sha: "3df927ffc0f78a1a903666dd81977d3681e50925"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T15:56:07.142Z"
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

# clawsweeper-commit-openclaw-openclaw-ac599c9e539f

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25171874076](https://github.com/openclaw/clawsweeper/actions/runs/25171874076)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one runtime-deps selection gap. The new managed `node-llama-cpp` dependency is retained for explicit `provider: "local"`, but not for other supported local-provider paths.

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
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests [check:changed] src/plugins/bundled-runtime-deps-selection.ts: core production [check:changed] src/plugins/bundled-runtime-deps.test.ts: core test [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] duplicate scan target coverage [check:changed] typecheck core [check:changed] typecheck core tests [check:changed] summary 540ms ok conflict markers 194ms ok changelog attributions 206ms ok guarded extension wildcard re-exports 211ms ok plugin-sdk wildcard re-exports 207ms ok duplicate scan target coverage 7.99s ok typecheck core 13.49s failed:2 typecheck core tests > openclaw@2026.4.27 check:changed /tmp/clawsweeper-repair-fix-5qyM1n/openclaw-openclaw > node scripts/check-changed.mjs > openclaw@2026.4.27 check:no-conflict-markers /tmp/clawsweeper-repair-fix-5qyM1n/openclaw-openclaw > node scripts/check-no-conflict-markers.mjs > openclaw@2026.4.27 check:changelog-attributions /tmp/clawsweeper-repair-fix-5qyM1n/openclaw-openclaw > node scripts/check-changelog-attributions.mjs > openclaw@2026.4.27 lint:extensions:... |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-ac599c9e539f | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
