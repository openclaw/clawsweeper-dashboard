---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-d7396d4ffa2f
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-d7396d4ffa2f
source: clawsweeper_commit
commit_sha: d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-d7396d4ffa2f`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591.md
- Latest main at intake: c4f9cf1a27f18d9fb2a46f95c904dd6a305cc524

## ClawSweeper Report

```md
---
sha: d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591
parent: 2a6809467acda345e3e7ed1b13c4d298d5f5f160
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T05:08:21+01:00"
commit_committed_at: "2026-04-30T05:08:32+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T04:14:11Z
---

# Commit d7396d4ffa

## Summary

Found one concrete gap: the Google Chat portion of the status/read-only SecretRef fix is incomplete. The new Google Chat config accessors avoid credential resolution, but `status --all` still resolves the full Google Chat account before it reaches those accessors and crashes on a SecretRef-backed service account.

## Findings

### Medium: Google Chat status still crashes on SecretRef-backed service account

- Kind: bug
- File: `extensions/googlechat/src/accounts.ts`
- Line: 110
- Evidence: `buildChannelsTable` still calls account inspection for each configured channel. For Google Chat there is no safe `inspectAccount`, so `src/channels/account-inspection.ts:55` falls back to `plugin.config.resolveAccount(...)`; `resolveGoogleChatAccount` then calls `resolveCredentialsFromConfig` at `extensions/googlechat/src/accounts.ts:152`, which throws on `serviceAccount` / `serviceAccountRef` SecretRefs at `extensions/googlechat/src/accounts.ts:110`. A focused live smoke with `channels.googlechat.serviceAccount` as a file SecretRef failed with `channels.googlechat.accounts.default.serviceAccount: unresolved SecretRef ...`.
- Impact: `openclaw status --all` / channel summaries can still hard-fail for Google Chat users who store service-account credentials in SecretRefs, even though this commit’s changelog says Telegram, Slack, and Google Chat status paths no longer resolve SecretRef-backed runtime credentials.
- Suggested fix: add a Google Chat read-only inspector analogous to Slack/Telegram that reports configured-unavailable credential status without resolving non-env SecretRefs, or otherwise keep the generic status account-resolution path off the runtime credential resolver for Google Chat. Add a status-table regression test with `channels.googlechat.serviceAccount` as a SecretRef, not only a direct `googlechatPlugin.config.resolveAllowFrom` accessor test.
- Confidence: high

## Reviewed

- Diff: `2a6809467acda345e3e7ed1b13c4d298d5f5f160..d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591`
- Changed files: `CHANGELOG.md`, Google Chat account/config files, Slack account/config files, Telegram shared/config files, `src/plugin-sdk/channel-config-helpers.test.ts`
- Code read: changed channel adapters/accounts/tests, `src/plugin-sdk/channel-config-helpers.ts`, status account inspection/summary code, outbound target accessors, Slack/Telegram inspect/token paths, related Discord fix pattern
- Related GitHub context: inspected PR `https://github.com/openclaw/openclaw/pull/74737`

## Tests / Live Checks

- `pnpm docs:list`: ran first per repo instructions
- `pnpm test extensions/slack/src/shared.test.ts extensions/telegram/src/shared.test.ts extensions/googlechat/src/channel-config.test.ts src/plugin-sdk/channel-config-helpers.test.ts --run`: passed 4 Vitest shards
- `git diff --check 2a6809467acda345e3e7ed1b13c4d298d5f5f160..d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591`: passed
- `node --import tsx --eval ... buildChannelsTable(...)` with Slack + Telegram SecretRefs: passed and reported configured-unavailable warnings
- `node --import tsx --eval ... buildChannelsTable(...)` with Google Chat service-account SecretRef: failed with the unresolved SecretRef error above
- Initial test run failed because `node_modules` was missing; ran `pnpm install` once and retried successfully

## Dependency / Web Checks

- No dependency or lockfile changes.
- No general web lookup needed; only repository/PR context via `gh`.

## Limitations

- I did not run broad gates such as `pnpm check:changed`; targeted tests and focused status smokes were sufficient to isolate the changed behavior.
```
