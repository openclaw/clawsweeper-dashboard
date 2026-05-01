---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-73725"
mode: "autonomous"
run_id: "25214138872"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25214138872"
head_sha: "df20b9a6303d40b1149054180a017e06e722c7f4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T12:30:53.672Z"
canonical: "https://github.com/openclaw/openclaw/pull/73725"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/73725"
actions_total: 9
fix_executed: 0
fix_failed: 1
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-73725

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25214138872](https://github.com/openclaw/clawsweeper/actions/runs/25214138872)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/73725

## Summary

PR #73725 is the canonical repair path for the narrow WebChat New Chat create-and-switch fix, but it is not merge-ready. It is same-repo branch-writable, so ClawSweeper should repair the existing PR branch in place, address the Greptile P2 silent-failure finding, rerun review and changed-surface validation, and preserve the existing #52042/#52746 credit. No close or merge actions are allowed by this job.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 9 |
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
| repair_contributor_branch | failed |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] ui/src/ui/app-render.helpers.node.test.ts: core test [check:changed] ui/src/ui/app-render.helpers.ts: core production [check:changed] ui/src/ui/app-render.ts: core production [check:changed] ui/src/ui/controllers/sessions.test.ts: core test [check:changed] ui/src/ui/controllers/sessions.ts: core production [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] duplicate scan target coverage [check:cha ... tsbuildinfo > openclaw@2026.4.30 lint:core /tmp/clawsweeper-repair-fix-e7kUJ7/openclaw-openclaw > node scripts/run-oxlint.mjs --tsconfig tsconfig.oxlint.core.json src ui packages [plugin-sdk boundary dts] fresh; skipping [plugin-sdk package boundary dts] fresh; skipping [qa-channel boundary dts] fresh; skipping [plugin-sdk boundary root shims] fresh; skipping Failed to parse oxlint configuration file. [38;2;225;80;80;1m×[0m [38;2;225;80;80;1mRule 'no-underscore-dangle' not found in plugin 'eslint'[0m ELIFECYCLE Command failed with exit code 1. ELIFECYCLE Command failed with exit code 1. |
| execute_fix | blocked |  |  | validation command failed (pnpm check:changed): [check:changed] lanes=core, coreTests, docs [check:changed] ui/src/ui/app-render.helpers.node.test.ts: core test [check:changed] ui/src/ui/app-render.helpers.ts: core production [check:changed] ui/src/ui/app-render.ts: core production [check:changed] ui/src/ui/controllers/sessions.test.ts: core test [check:changed] ui/src/ui/controllers/sessions.ts: core production [check:changed] conflict markers [check:changed] changelog attributions [check:changed] guarded extension wildcard re-exports [check:changed] plugin-sdk wildcard re-exports [check:changed] duplicate scan target coverage [check:cha ... tsbuildinfo > openclaw@2026.4.30 lint:core /tmp/clawsweeper-repair-fix-e7kUJ7/openclaw-openclaw > node scripts/run-oxlint.mjs --tsconfig tsconfig.oxlint.core.json src ui packages [plugin-sdk boundary dts] fresh; skipping [plugin-sdk package boundary dts] fresh; skipping [qa-channel boundary dts] fresh; skipping [plugin-sdk boundary root shims] fresh; skipping Failed to parse oxlint configuration file. [38;2;225;80;80;1m×[0m [38;2;225;80;80;1mRule 'no-underscore-dangle' not found in plugin 'eslint'[0m ELIFECYCLE Command failed with exit code 1. ELIFECYCLE Command failed with exit code 1. |
| automerge_repair_outcome_comment | updated | #73725 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #73725 | fix_needed | planned | canonical | Repair the writable canonical PR branch before any automerge decision. |
| cluster:automerge-openclaw-openclaw-73725 | build_fix_artifact | planned |  | Create an executor-ready in-place repair plan for #73725. |
| #26517 | keep_related | planned | related | Related broader tracker; do not close under this fix-first automerge job. |
| #50404 | keep_related | planned | related | Related product-scope issue; keep open. |
| #60741 | keep_related | planned | related | Related broader feature issue; no closure allowed or appropriate in this job. |
| #52042 | keep_closed | skipped | superseded | Historical credited source PR only. |
| #52746 | keep_closed | skipped | superseded | Historical credited source PR only. |
| #52266 | keep_closed | skipped | duplicate | Closed historical duplicate context. |
| #70783 | keep_closed | skipped | duplicate | Closed historical duplicate context. |

## Needs Human

- none
