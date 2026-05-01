---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-354084b1b320
mode: autonomous
allowed_actions:
  - comment
  - label
  - fix
  - raise_pr
blocked_actions:
  - close
  - merge
require_human_for:
  - close
  - merge
canonical: []
candidates: []
cluster_refs: []
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: false
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-354084b1b320
source: clawsweeper_commit
commit_sha: 354084b1b320a2a8c60b841ff19f67d8c7d19972
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/354084b1b320a2a8c60b841ff19f67d8c7d19972.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-354084b1b320`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/354084b1b320a2a8c60b841ff19f67d8c7d19972
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/354084b1b320a2a8c60b841ff19f67d8c7d19972.md
- Latest main at intake: 8093ae60292f4d9009b3d48f234b39b5cbc538e5

## ClawSweeper Report

```md
---
sha: 354084b1b320a2a8c60b841ff19f67d8c7d19972
parent: 5a69832833b5cdde9f407a47d31d848b4654e0fe
repository: openclaw/openclaw
author: "Ayaan Zaidi"
committer: "Ayaan Zaidi"
github_author: obviyus
github_committer: obviyus
co_authors: []
commit_authored_at: "2026-05-01T07:34:08+05:30"
commit_committed_at: "2026-05-01T08:33:02+05:30"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T03:24:15Z
---

# Commit 354084b

## Summary

Found two provider-runtime regressions in the new targeted hook resolution/cache path.

## Findings

### Medium: Targeted provider hook lookup skips manifest provider aliases

- Kind: regression
- File: `src/plugins/provider-hook-runtime.ts`
- Line: 217
- Evidence: `wrapProviderStreamFn` and several provider-runtime hooks now call `resolveProviderRuntimePlugin` directly, which scopes loading through `providerRefs` and only finds plugins returned by that targeted load. The broad alias fallback still exists in `resolveProviderHookPlugin` at `src/plugins/provider-hook-runtime.ts:157`, but these changed hook paths no longer use it. `azure-openai-responses` is declared as an OpenAI `modelCatalog.aliases` entry in `extensions/openai/openclaw.plugin.json:681`, and the OpenAI provider advertises `hookAliases: ["azure-openai", "azure-openai-responses"]` in `extensions/openai/openai-provider.ts:204`. A focused probe on current `main` returned `{"pluginId":null,"hasWrap":false,"wrapped":false}` for `wrapProviderStreamFn({ provider: "azure-openai-responses", ... })`, and `resolveProviderReplayPolicyWithPlugin` also returned `null`.
- Impact: Azure OpenAI Responses no longer receives OpenAI-owned stream wrappers, replay policy, reasoning mode, transport turn state, or WebSocket policy hooks. That can break request/stream shaping and replay behavior for a documented provider alias.
- Suggested fix: Make targeted provider ownership include `modelCatalog.aliases` owners, or keep the broad `resolveProviderHookPlugin` fallback for hook-alias based runtime hooks until alias ownership is represented in activation planning. Add a real-manifest or stricter mock test for `azure-openai-responses`.
- Confidence: high

### Medium: In-flight provider-load misses can be cached as permanent negative results

- Kind: reliability
- File: `src/plugins/provider-hook-runtime.ts`
- Line: 147
- Evidence: `resolveProviderPluginsForHooks` returns `[]` when `isPluginProvidersLoadInFlight` is true at `src/plugins/provider-hook-runtime.ts:92`. `resolveProviderRuntimePlugin` then stores `plugin ?? null` in the new per-config cache at `src/plugins/provider-hook-runtime.ts:147`. With a real `config` object, a reentrant lookup during plugin loading is cached as “no plugin”, so later calls with the same config/provider can return `undefined` after the load has completed.
- Impact: Provider hooks can stay disabled for the lifetime of the config object after a transient reentrant load guard, causing missing auth/profile/replay/stream behavior in later turns.
- Suggested fix: Do not populate the runtime-plugin cache when resolution was suppressed by `isPluginProvidersLoadInFlight`; return an explicit in-flight sentinel or check the in-flight state before caching. Add the existing nested-load regression test variant with a real `config`.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes for the alias regression: a focused TS probe against current `main` shows `resolveProviderRuntimePlugin` and `wrapProviderStreamFn` return no OpenAI plugin/wrapper for `azure-openai-responses`.
- Is this the best way to solve the issue? Unclear; either alias-aware targeted ownership or restoring fallback behavior would address it, but alias-aware targeted ownership better preserves the commit’s performance goal.

## Reviewed

- Diff: `5a69832833b5cdde9f407a47d31d848b4654e0fe..354084b1b320a2a8c60b841ff19f67d8c7d19972`
- Changed files: `src/plugins/provider-hook-runtime.ts`, `src/plugins/provider-runtime.ts`, `src/plugins/provider-runtime.test.ts`
- Code read: changed files, provider loader/owner resolution, activation planner, OpenAI manifest/provider hooks, relevant plugin manifest docs
- Dependencies/web: no external dependency or web lookup needed

## Tests / Live Checks

- `pnpm install`: succeeded after initial missing `node_modules`
- `pnpm test src/plugins/provider-runtime.test.ts`: passed, 40 tests
- `git diff --check 5a69832833b5cdde9f407a47d31d848b4654e0fe..354084b1b320a2a8c60b841ff19f67d8c7d19972 -- src/plugins/provider-hook-runtime.ts src/plugins/provider-runtime.ts src/plugins/provider-runtime.test.ts`: passed
- Focused `node --import tsx` probes confirmed current targeted lookup returns no runtime plugin, wrapper, replay policy, or reasoning hook for `azure-openai-responses`

## Limitations

- A broad fallback comparison probe was stopped because it began installing bundled runtime dependencies; the old fallback path is still evident from the diff and current `resolveProviderHookPlugin` implementation.

https://github.com/openclaw/openclaw/commit/354084b1b320a2a8c60b841ff19f67d8c7d19972
```
