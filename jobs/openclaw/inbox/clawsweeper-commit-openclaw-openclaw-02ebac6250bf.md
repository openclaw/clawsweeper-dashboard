---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-02ebac6250bf
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-02ebac6250bf
source: clawsweeper_commit
commit_sha: 02ebac6250bfe2ebd7abaeaa006ce119951372a1
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/02ebac6250bfe2ebd7abaeaa006ce119951372a1.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-02ebac6250bf`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/02ebac6250bfe2ebd7abaeaa006ce119951372a1
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/02ebac6250bfe2ebd7abaeaa006ce119951372a1.md
- Latest main at intake: c538906b727837d4eca94faa3e6e6efc4ddf8aaa

## ClawSweeper Report

```md
---
sha: 02ebac6250bfe2ebd7abaeaa006ce119951372a1
parent: f94d970cee3f2fadeaf307f6c12d60093cec21c4
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T02:58:31+01:00"
commit_committed_at: "2026-04-30T02:58:40+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T02:06:53+00:00
---

# Commit 02ebac6

## Summary

Found one actionable regression: the committed Plugin SDK API baseline hash does not match the public SDK surface generated from this commit, so the SDK API check fails.

## Findings

### Medium: Plugin SDK API baseline hash is stale

- Kind: regression
- File: `docs/.generated/plugin-sdk-api-baseline.sha256`
- Line: 1
- Evidence: `pnpm plugin-sdk:api:check` fails with `Plugin SDK API baseline drift detected` and `Hash mismatch: docs/.generated/plugin-sdk-api-baseline.sha256`. Re-rendering the baseline from this commit computes `d26a70c9ea3bd277135a1712556f07195fb464b5cd846d04f18c2166c319a73d` for `plugin-sdk-api-baseline.json` and `9fe2cb122fb3de17eaaf54c7768f268aa689063cf9091bd4b0be9422550a70a8` for `plugin-sdk-api-baseline.jsonl`, but the committed file contains `ae28566c...` and `79446b23...`.
- Impact: SDK/API validation will fail for this commit, blocking the generated API drift gate and leaving the tracked SDK surface hash inconsistent with the exported helper added through `src/plugin-sdk/channel-contract-testing.ts` and `src/plugin-sdk/testing.ts`.
- Suggested fix: regenerate the SDK API baseline from this exact source state with `pnpm plugin-sdk:api:gen` and commit the updated `docs/.generated/plugin-sdk-api-baseline.sha256`.
- Confidence: high

## Reviewed

- Diff: `f94d970cee3f2fadeaf307f6c12d60093cec21c4..02ebac6250bfe2ebd7abaeaa006ce119951372a1`
- Changed files: core turn dispatch/result types, Plugin SDK inbound/contract testing helpers, and Discord/iMessage/LINE/Matrix/Microsoft Teams/Signal/Slack/Telegram/WhatsApp dispatch call sites.
- Code read: changed files plus dispatcher/count sources in `src/auto-reply/reply/dispatch-from-config.ts`, `src/auto-reply/dispatch.ts`, and `src/auto-reply/reply/reply-dispatcher.ts`.
- Dependencies/web: no web lookup needed; package exports checked locally.

## Tests / Live Checks

- `pnpm docs:list`: passed.
- Initial targeted test run failed because `node_modules` was missing; ran `pnpm install` once per repo instructions.
- `pnpm test src/channels/turn/kernel.test.ts src/plugin-sdk/inbound-reply-dispatch.test.ts src/plugin-sdk/channel-contract-testing.test.ts`: passed.
- `pnpm test extensions/discord/src/monitor/message-handler.process.test.ts extensions/slack/src/monitor/message-handler/dispatch.preview-fallback.test.ts extensions/whatsapp/src/auto-reply/monitor/inbound-dispatch.test.ts extensions/telegram/src/bot-message-dispatch.test.ts extensions/matrix/src/matrix/monitor/handler.test.ts extensions/msteams/src/monitor-handler.adaptive-card.test.ts extensions/signal/src/monitor/event-handler.inbound-context.test.ts extensions/imessage/src/monitor/inbound-processing.test.ts extensions/line/src/monitor.lifecycle.test.ts`: passed.
- `pnpm plugin-sdk:check-exports`: passed.
- `pnpm plugin-sdk:api:check`: failed as described above.

## Limitations

- Full `pnpm check:changed` was not run; focused tests and the relevant SDK API/export checks were run instead.
```
