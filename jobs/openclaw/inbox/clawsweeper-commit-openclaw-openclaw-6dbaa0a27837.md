---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-6dbaa0a27837
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-6dbaa0a27837
source: clawsweeper_commit
commit_sha: 6dbaa0a27837c0d2825f374503eb8531d266104b
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/6dbaa0a27837c0d2825f374503eb8531d266104b.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-6dbaa0a27837`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/6dbaa0a27837c0d2825f374503eb8531d266104b
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/6dbaa0a27837c0d2825f374503eb8531d266104b.md
- Latest main at intake: 43ca7399e5baa8d2087bc8c8ede0dcc3a432bf5a

## ClawSweeper Report

```md
---
sha: 6dbaa0a27837c0d2825f374503eb8531d266104b
parent: fbc145440f287411919d2b1fd0f90b0ce4d548d5
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "GitHub"
github_author: clawsweeper[bot]
github_committer: web-flow
co_authors: ["openclaw-clawsweeper[bot]"]
commit_authored_at: "2026-04-29T23:15:47-07:00"
commit_committed_at: "2026-04-29T23:15:47-07:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T06:35:49+00:00
---

# Commit 6dbaa0a

## Summary

Found one actionable issue: the change disables bundled dependency repair when `plugins.enabled: false`, but the same fallback path can still load and register the disabled bundled capability plugin if its dependencies are already present.

## Findings

### Medium: Global plugin disable still allows bundled capability runtime snapshot loads

- Kind: regression
- File: `src/plugins/capability-provider-runtime.ts`
- Line: 294
- Evidence: `resolvePluginCapabilityProviders` still builds a compat config and calls `resolveRuntimePluginRegistry(loadOptions)` even when the source config has `plugins.enabled === false`. The new helper only adds `installBundledRuntimeDeps: false` at `src/plugins/capability-provider-runtime.ts:99`, while `withBundledPluginEnablementCompat` rewrites the compat config from disabled to `plugins.enabled: true` and adds `{ enabled: true }` entries for the targeted bundled plugins in `src/plugins/bundled-compat.ts:41`. The loader then sees that compat config as enabled, creates a registration plan, and imports/registers the plugin; the new flag only skips the dependency staging block in `src/plugins/loader.ts:1466`.
- Impact: `plugins.enabled: false` is documented as disabling all plugins and skipping plugin discovery/load work (`docs/tools/plugin.md:280`). After this commit, disabled configs no longer repair missing bundled deps, but bundled capability plugins can still execute/register if their runtime deps are already installed. That can make disabled providers appear in TTS/media/memory capability registries and violates the operator’s master-disable contract.
- Suggested fix: short-circuit capability fallback loading when `params.cfg?.plugins?.enabled === false`, or pass the original disabled config as the activation source while avoiding the enablement compat override. Add a test where `resolveRuntimePluginRegistry` returns a provider for the fallback load and assert the disabled source config still returns no provider and does not call the loader.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? No live repro. The focused unit suite passes, but the newly added tests only assert the loader is called with `installBundledRuntimeDeps: false`; they do not assert disabled providers stay unavailable if the loader returns one.
- Is this the best way to solve the issue? Unclear. The safest direction is to make the master disable block the fallback load entirely, unless there is a documented reason capability discovery must still import bundled runtime code under `plugins.enabled: false`.

## Reviewed

- Diff: `fbc145440f287411919d2b1fd0f90b0ce4d548d5..6dbaa0a27837c0d2825f374503eb8531d266104b`
- Changed files: `src/plugins/capability-provider-runtime.ts`, `src/plugins/capability-provider-runtime.test.ts`
- Code read: capability runtime, bundled compat helpers, plugin loader registration/dependency path, plugin activation policy, capability callers, plugin docs.
- Dependencies/web: no external dependency or web lookup needed.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm test src/plugins/capability-provider-runtime.test.ts` passed: 27 tests.
- A real `tsx` smoke for disabled media providers hung during plugin loading and was killed; not used as evidence.

## Limitations

- I did not run broad changed gates; this was a report-only commit review with one focused test file.
- The finding is based on traced control flow, not a completed live end-to-end reproduction.
```
