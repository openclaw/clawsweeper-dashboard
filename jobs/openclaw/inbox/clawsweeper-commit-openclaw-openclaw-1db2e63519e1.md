---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-1db2e63519e1
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-1db2e63519e1
source: clawsweeper_commit
commit_sha: 1db2e63519e1f76f813402f7209f7de93c59e952
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/1db2e63519e1f76f813402f7209f7de93c59e952.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-1db2e63519e1`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/1db2e63519e1f76f813402f7209f7de93c59e952
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/1db2e63519e1f76f813402f7209f7de93c59e952.md
- Latest main at intake: d30b8dccfda391cd5b6eb9d2484676d4d07c1dae

## ClawSweeper Report

```md
---
sha: 1db2e63519e1f76f813402f7209f7de93c59e952
parent: 9307affe595f1008e9d4e903dca186a604c577c7
repository: openclaw/openclaw
author: "Shakker"
committer: "Shakker"
github_author: shakkernerd
github_committer: shakkernerd
co_authors: []
commit_authored_at: "2026-04-29T20:07:20+01:00"
commit_committed_at: "2026-04-30T00:13:12+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T23:16:53+00:00
---

# Commit 1db2e635

## Summary

The commit adds a regression test, but the implementation still does not satisfy it. The focused agents test file is now red on `main`.

## Findings

### Medium: Added provider auth checker test fails because runtime env evidence ignores config

- Kind: regression
- File: `src/agents/model-auth.profiles.test.ts`
- Line: 543
- Evidence: The new test expects `hasAuthForModelProvider({ provider: "workspace-cloud", cfg: { plugins: { allow: ["workspace-cloud"] } }, store })` to return `true` when `WORKSPACE_CLOUD_CREDENTIALS` points at an existing file. The focused check `pnpm test src/agents/model-auth.profiles.test.ts` fails with `AssertionError: expected false to be true` at this assertion. The call path reaches `hasRuntimeAvailableProviderAuth` through `src/agents/model-provider-auth.ts:19`, but `src/agents/model-auth.ts:325` calls `resolveEnvApiKey(provider, params.env)` without passing the `cfg`; the surrounding aligned paths use config-aware resolution, for example `resolveModelAuthMode` calls `resolveConfigAwareEnvApiKey(cfg, resolved)` at `src/agents/model-auth.ts:742`, and `hasAvailableAuthForProvider` does the same at `src/agents/model-auth.ts:774`.
- Impact: This commit breaks the targeted agents test suite. It also leaves `hasAuthForModelProvider` inconsistent with the documented/runtime auth semantics for trusted workspace manifest evidence, so provider availability checks can report no auth even when runtime auth resolution accepts the same config and credential evidence.
- Suggested fix: Make `hasRuntimeAvailableProviderAuth` use the config-aware env lookup, e.g. `resolveConfigAwareEnvApiKey(params.cfg, provider)` or equivalent `resolveEnvApiKey(provider, params.env, { config: params.cfg })`, while preserving explicit env snapshot behavior.
- Confidence: high

## Reviewed

- Diff: `9307affe595f1008e9d4e903dca186a604c577c7..1db2e63519e1f76f813402f7209f7de93c59e952`
- Changed files: `src/agents/model-auth.profiles.test.ts`
- Code read: `src/agents/model-auth.profiles.test.ts`, `src/agents/model-provider-auth.ts`, `src/agents/model-auth.ts`, `src/agents/model-auth-env.ts`, `src/agents/model-auth-env-vars.ts`
- Docs read: `docs/auth-credential-semantics.md`
- Dependencies/web: no dependency files changed; no web lookup needed

## Tests / Live Checks

- `pnpm docs:list` succeeded
- `pnpm test src/agents/model-auth.profiles.test.ts` initially failed because `node_modules` was missing
- `pnpm install` succeeded
- `pnpm test src/agents/model-auth.profiles.test.ts` failed: 1 failed, 42 passed

## Limitations

- Full suite was not run; the focused changed-file test was enough to reproduce the regression.
```
