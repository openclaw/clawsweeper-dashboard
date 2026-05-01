---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-10b9adb010a6
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-10b9adb010a6
source: clawsweeper_commit
commit_sha: 10b9adb010a666401fd21507a30f935ead4f6ccd
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/10b9adb010a666401fd21507a30f935ead4f6ccd.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-10b9adb010a6`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/10b9adb010a666401fd21507a30f935ead4f6ccd
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/10b9adb010a666401fd21507a30f935ead4f6ccd.md
- Latest main at intake: d30b8dccfda391cd5b6eb9d2484676d4d07c1dae

## ClawSweeper Report

```md
---
sha: 10b9adb010a666401fd21507a30f935ead4f6ccd
parent: b8c77c1bd764beaf9c99d2a51a305f271e3d5161
repository: openclaw/openclaw
author: "Shakker"
committer: "Shakker"
github_author: shakkernerd
github_committer: shakkernerd
co_authors: []
commit_authored_at: "2026-04-29T19:40:56+01:00"
commit_committed_at: "2026-04-30T00:13:12+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T23:17:55Z
---

# Commit 10b9adb

## Summary

Found one regression in the new workspace-plugin trust gate: explicitly trusted workspace plugin auth evidence can be resolved by the low-level manifest helper, but the main runtime auth paths do not pass config into `resolveEnvApiKey()`, so those trusted evidence entries are not usable where auth is actually checked.

## Findings

### Medium: Trusted workspace plugin auth evidence is not threaded into runtime auth resolution

- Kind: regression
- File: `src/secrets/provider-env-vars.ts`
- Line: 65
- Evidence: The new `shouldUsePluginProviderAuthEvidence()` only keeps workspace plugin evidence when `params.config` marks the workspace plugin trusted (`src/secrets/provider-env-vars.ts:65`). The new test covers `resolveProviderAuthEvidence({ config: { plugins: { allow: [...] } } })`, but `resolveEnvApiKey()` builds its default evidence map with only `{ env }` (`src/agents/model-auth-env.ts:93`), and runtime callers that already have `cfg` still call `resolveEnvApiKey(provider)` or `resolveEnvApiKey(provider, env)` without passing a cfg-derived `authEvidenceMap` (`src/agents/model-auth.ts:317`, `src/agents/model-auth.ts:570`, `src/agents/model-auth.ts:621`, `src/agents/model-auth.ts:766`). In contrast, `createModelListAuthIndex()` explicitly passes `authEvidenceMap` built with `config`, so status/listing can recognize auth that runtime resolution then misses (`src/commands/models/list.auth-index.ts:60`).
- Impact: A workspace plugin that is explicitly allowed in `config.plugins.allow` and relies on manifest `setup.providers[].authEvidence` can appear authenticated in cfg-aware status/list paths, but `hasRuntimeAvailableProviderAuth()`, `hasAvailableAuthForProvider()`, and `resolveApiKeyForProvider()` can still fail with “No API key found”. This regresses the documented non-bundled plugin manifest `authEvidence` contract for trusted workspace plugins.
- Suggested fix: Thread config into env auth resolution. For example, add cfg/config support to `resolveEnvApiKey()` options, have it call `resolveProviderEnvAuthEvidence({ config, env })`, and update cfg-aware callers in `src/agents/model-auth.ts` and related auth probes to pass the active cfg. Keep no-config call sites conservative so untrusted workspace evidence remains excluded.
- Confidence: high

## Reviewed

- Diff: `b8c77c1bd764beaf9c99d2a51a305f271e3d5161..10b9adb010a666401fd21507a30f935ead4f6ccd`
- Changed files: `src/secrets/provider-env-vars.ts`, `src/secrets/provider-env-vars.dynamic.test.ts`
- Code read: provider env/evidence resolver, provider auth alias resolver, manifest auth evidence normalization, model auth env resolver, runtime model auth checks, models auth index, plugin manifest docs.
- Dependencies/web: no dependency files changed; no web lookup needed.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because the initial test run failed with missing `vitest/package.json`
- `pnpm test src/secrets/provider-env-vars.dynamic.test.ts src/secrets/provider-env-vars.test.ts` passed: 2 files, 16 tests.
- `pnpm test src/agents/model-auth.profiles.test.ts` passed: 1 file, 40 tests.

## Limitations

- I did not run the broad changed gate; this review used focused tests and source tracing only.
```
