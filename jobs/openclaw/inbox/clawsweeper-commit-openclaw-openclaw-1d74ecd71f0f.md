---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-1d74ecd71f0f
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-1d74ecd71f0f
source: clawsweeper_commit
commit_sha: 1d74ecd71f0facc2cf5a106f23f8b142c2815522
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/1d74ecd71f0facc2cf5a106f23f8b142c2815522.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-1d74ecd71f0f`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/1d74ecd71f0facc2cf5a106f23f8b142c2815522
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/1d74ecd71f0facc2cf5a106f23f8b142c2815522.md
- Latest main at intake: 231e5c618f8ae700d51d080e4182a57588da888b

## ClawSweeper Report

```md
---
sha: 1d74ecd71f0facc2cf5a106f23f8b142c2815522
parent: aa9db998f7bfb4785e47ba766a749a93691b9c0a
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-04-30T14:35:00-07:00"
commit_committed_at: "2026-04-30T14:35:00-07:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T21:54:19+00:00
---

# Commit 1d74ecd

## Summary

Found one regression: the TTS fallback fix removes the global plugin-disable guard for every capability provider, not just speech/TTS.

## Findings

### Medium: Global plugin disable is bypassed for non-TTS capability providers

- Kind: regression
- File: `src/plugins/capability-provider-runtime.ts`
- Line: 224
- Evidence: The commit removed the `plugins.enabled === false` early returns from both `resolvePluginCapabilityProvider` and `resolvePluginCapabilityProviders`. Those functions now always resolve bundled capability owners, then `withBundledPluginEnablementCompat` rewrites `plugins.enabled: false` to `enabled: true` for fallback loads in `src/plugins/bundled-compat.ts:41`. The new tests also assert this behavior for `memoryEmbeddingProviders`, not just `speechProviders`.
- Impact: `plugins.enabled: false` is documented in `docs/tools/plugin.md:280` as disabling all plugins and skipping discovery/load work. After this commit, callers such as image, video, music, media-understanding, realtime, and memory provider registries can still load bundled plugin providers under a globally disabled config. That can re-enable capabilities and bundled runtime dependency work an operator intentionally disabled.
- Suggested fix: Keep the disabled-plugin bypass narrowly scoped to the TTS/speech fallback path, or add an explicit opt-in parameter used only by TTS provider resolution. Preserve the hard `plugins.enabled: false` behavior for other capability keys.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. The added unit test `loads targeted bundled capability providers through compat when plugins are globally disabled` proves a disabled config resolves a bundled `memoryEmbeddingProviders` provider. The same shared runtime is used by non-TTS capability registries.
- Is this the best way to solve the issue? no. The fix should restore the global-disable guard by default and make the speech/TTS compatibility exception explicit and narrow.

## Reviewed

- Diff: `aa9db998f7bfb4785e47ba766a749a93691b9c0a..1d74ecd71f0facc2cf5a106f23f8b142c2815522`
- Changed files: `CHANGELOG.md`, `src/plugins/capability-provider-runtime.ts`, `src/plugins/capability-provider-runtime.test.ts`
- Code read: capability provider runtime, bundled compat helper, TTS registry, media/image/video/music/realtime/memory provider registries, plugin docs
- Dependencies/web: no external dependency or web lookup needed
- Commands: `pnpm docs:list`; `pnpm install`; `pnpm test src/plugins/capability-provider-runtime.test.ts` passed

## Limitations

- I did not run a full changed gate; the focused test passed and was sufficient for this regression review.
```
