---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-9307affe595f
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-9307affe595f
source: clawsweeper_commit
commit_sha: 9307affe595f1008e9d4e903dca186a604c577c7
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/9307affe595f1008e9d4e903dca186a604c577c7.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-9307affe595f`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/9307affe595f1008e9d4e903dca186a604c577c7
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/9307affe595f1008e9d4e903dca186a604c577c7.md
- Latest main at intake: d30b8dccfda391cd5b6eb9d2484676d4d07c1dae

## ClawSweeper Report

```md
---
sha: 9307affe595f1008e9d4e903dca186a604c577c7
parent: 10b9adb010a666401fd21507a30f935ead4f6ccd
repository: openclaw/openclaw
author: "Shakker"
committer: "Shakker"
github_author: shakkernerd
github_committer: shakkernerd
co_authors: []
commit_authored_at: "2026-04-29T19:59:23+01:00"
commit_committed_at: "2026-04-30T00:13:12+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T23:19:25Z
---

# Commit 9307affe

## Summary

Found one concrete bug in the new config-aware auth evidence path: workspace plugin auth evidence can only resolve when `workspaceDir` is passed, but the runtime/model-auth callers added by this commit only pass `config`.

## Findings

### Medium: Workspace plugin auth evidence is still invisible to runtime auth resolution

- Kind: bug
- File: `src/agents/model-auth.ts`
- Line: 56
- Evidence: `resolveEnvApiKey` now supports `options.workspaceDir` and forwards it into manifest-backed auth evidence lookup, but `resolveConfigAwareEnvApiKey()` calls `resolveEnvApiKey(provider, process.env, { config: cfg })` with no workspace directory. The affected runtime paths then use this helper in `resolveApiKeyForProvider`, `resolveModelAuthMode`, and `hasAvailableAuthForProvider`. The catalog path is also still config-blind for env evidence via `hasRuntimeAvailableProviderAuth()` at line 325.
- Impact: A trusted workspace plugin that declares `setup.providers[].authEvidence` under `<workspace>/.openclaw/extensions` can be resolved by the low-level API only when `workspaceDir` is supplied, but the public runtime auth APIs cannot supply it. In a focused smoke check with a temporary workspace plugin, `resolveEnvApiKey("workspace-cloud", env, { config, workspaceDir })` returned the expected marker, while `resolveEnvApiKey("workspace-cloud", env, { config })` returned `null`; `hasAuthForModelProvider` returned `false`, `resolveVisibleModelCatalog` returned `[]`, and `resolveApiKeyForProvider` threw `No API key found for provider "workspace-cloud"`.
- Suggested fix: Add `workspaceDir?: string` to the model auth availability/resolution parameter types, thread it through `resolveConfigAwareEnvApiKey`, `hasRuntimeAvailableProviderAuth`, `hasAuthForModelProvider`, `createProviderAuthChecker`, and model catalog/picker callers, then cover a real workspace plugin auth-evidence case instead of only mocking `resolveProviderEnvAuthEvidence`.
- Confidence: high

## Reviewed

- Diff: `10b9adb010a666401fd21507a30f935ead4f6ccd..9307affe595f1008e9d4e903dca186a604c577c7`
- Changed files: `src/agents/model-auth-env.ts`, `src/agents/model-auth.ts`, `src/agents/model-auth.profiles.test.ts`
- Code read: changed files in full, `src/secrets/provider-env-vars.ts`, plugin trust/discovery/registry code, model auth availability and catalog visibility callers, adjacent tests
- Dependencies/web: no dependency changes; no web lookup needed

## Tests / Live Checks

- `pnpm docs:list`
- Initial `pnpm test src/agents/model-auth.profiles.test.ts src/agents/model-provider-auth.test.ts` failed because `node_modules` was missing.
- `pnpm install`
- `pnpm test src/agents/model-auth.profiles.test.ts src/agents/model-provider-auth.test.ts` passed: 2 Vitest shards, 45 tests.
- Focused `node --import tsx` smoke with a temporary workspace plugin reproduced the missing `workspaceDir` failure described above.

## Limitations

- Full changed gate was not run; this was a focused report-only commit review.

https://github.com/openclaw/openclaw/commit/9307affe595f1008e9d4e903dca186a604c577c7
```
