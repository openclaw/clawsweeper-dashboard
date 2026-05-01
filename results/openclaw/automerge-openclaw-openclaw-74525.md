---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74525"
mode: "autonomous"
run_id: "25217893046"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25217893046"
head_sha: "f1bb916a329faa6fdadc8549b12d2dd5453c7f91"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T14:32:56.737Z"
canonical: "https://github.com/openclaw/openclaw/pull/74564"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/74564"
actions_total: 4
fix_executed: 0
fix_failed: 1
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-74525

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25217893046](https://github.com/openclaw/clawsweeper/actions/runs/25217893046)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/74564

## Summary

PR #74564 is the active canonical repair path for the `/models` agent-auth regression. It is useful and same-repo writable, but not merge-ready: ClawSweeper review requested two changes, checks include relevant failures, and local main still shows the provider-data helper does not pass agentDir into visible-catalog auth checks. Emit a repair-contributor-branch fix artifact; do not close or merge anything.

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
| repair_contributor_branch | failed |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/auto-reply/reply/commands-models.test.ts: core test [check:changed] src/auto-reply/reply/commands-models.ts: core production [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] duplicate scan target coverage [check:changed] typecheck core [check:changed] typecheck core tests [check:changed] lint core [check:changed] summary 421ms ok conflict markers 158ms ok changelog attributions 174ms ok guar ... tsbuildinfo > openclaw@2026.4.30 lint:core /tmp/clawsweeper-repair-fix-Gf780S/openclaw-openclaw > node scripts/run-oxlint.mjs --tsconfig tsconfig.oxlint.core.json src ui packages [plugin-sdk boundary dts] fresh; skipping [plugin-sdk package boundary dts] fresh; skipping [qa-channel boundary dts] fresh; skipping [plugin-sdk boundary root shims] fresh; skipping Failed to parse oxlint configuration file. [38;2;225;80;80;1m×[0m [38;2;225;80;80;1mRule 'no-underscore-dangle' not found in plugin 'eslint'[0m ELIFECYCLE Command failed with exit code 1. ELIFECYCLE Command failed with exit code 1. |
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] src/auto-reply/reply/commands-models.test.ts: core test [check:changed] src/auto-reply/reply/commands-models.ts: core production [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] duplicate scan target coverage [check:changed] typecheck core [check:changed] typecheck core tests [check:changed] lint core [check:changed] summary 421ms ok conflict markers 158ms ok changelog attributions 174ms ok guar ... tsbuildinfo > openclaw@2026.4.30 lint:core /tmp/clawsweeper-repair-fix-Gf780S/openclaw-openclaw > node scripts/run-oxlint.mjs --tsconfig tsconfig.oxlint.core.json src ui packages [plugin-sdk boundary dts] fresh; skipping [plugin-sdk package boundary dts] fresh; skipping [qa-channel boundary dts] fresh; skipping [plugin-sdk boundary root shims] fresh; skipping Failed to parse oxlint configuration file. [38;2;225;80;80;1m×[0m [38;2;225;80;80;1mRule 'no-underscore-dangle' not found in plugin 'eslint'[0m ELIFECYCLE Command failed with exit code 1. ELIFECYCLE Command failed with exit code 1. |
| automerge_repair_outcome_comment | updated | #74564 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74423 | keep_closed | skipped | related | Already closed; no closure action is valid or needed. |
| #74525 | keep_closed | skipped | superseded | Closed source PR; keep it as credit/history for the #74564 repair path. |
| #74564 | fix_needed | planned | canonical | Repair the open canonical PR branch; do not merge because merge is blocked by review findings and failing relevant checks. |
| cluster:automerge-openclaw-openclaw-74525 | build_fix_artifact | planned |  | Provide an executable, credit-preserving repair plan for the deterministic ClawSweeper executor. |

## Needs Human

- none
