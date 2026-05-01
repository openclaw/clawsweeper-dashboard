---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-df0ee092f017
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-df0ee092f017
source: clawsweeper_commit
commit_sha: df0ee092f01766ef254de6f536899f105322d00f
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/df0ee092f01766ef254de6f536899f105322d00f.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-df0ee092f017`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/df0ee092f01766ef254de6f536899f105322d00f
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/df0ee092f01766ef254de6f536899f105322d00f.md
- Latest main at intake: d0a798663856a72595b49936b8d6042a6a7bcd88

## ClawSweeper Report

```md
---
sha: df0ee092f01766ef254de6f536899f105322d00f
parent: 98d87b06e0a2ad8f8d447d9cf1e917df78ec5271
repository: openclaw/openclaw
author: "Val Alexander"
committer: "GitHub"
github_author: BunsDev
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-30T21:46:22-05:00"
commit_committed_at: "2026-04-30T21:46:22-05:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T03:07:15Z
---

# Commit df0ee09

## Summary

Found one actionable media-delivery regression: the new Gateway `send.asVoice` field is accepted and converted to `audioAsVoice`, but Telegram’s outbound payload path drops that flag before calling the Telegram sender, so Telegram sends an audio file instead of a voice note.

## Findings

### Medium: Gateway `asVoice` does not reach Telegram voice delivery

- Kind: regression
- File: `src/gateway/server-methods/send.ts`
- Line: 478
- Evidence: `src/gateway/protocol/schema/agent.ts:94` adds public `asVoice`, and `src/gateway/server-methods/send.ts:473` maps it to `audioAsVoice`. `src/infra/outbound/deliver.ts:1123` then routes `audioAsVoice` payloads through channel `sendPayload`. Telegram’s `sendTelegramPayloadMessages` builds `payloadOpts` in `extensions/telegram/src/outbound-adapter.ts:96` and media sends in `extensions/telegram/src/outbound-adapter.ts:111`, but never copies `payload.audioAsVoice` to `asVoice`. The actual Telegram sender only switches to `sendVoice` when `opts.asVoice === true` in `extensions/telegram/src/send.ts:893`.
- Impact: A Gateway client sending Telegram media with `asVoice: true` gets a successful send, but the media is delivered as a normal audio attachment rather than a Telegram voice message.
- Suggested fix: propagate `payload.audioAsVoice === true` into Telegram send options in `sendTelegramPayloadMessages` (and add/extend `extensions/telegram/src/outbound-adapter.test.ts` to assert `asVoice: true` reaches `sendMessageTelegram` for payload media).
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes by code path: call Gateway `send` with `channel: "telegram"`, an audio `mediaUrl`, and `asVoice: true`; the flag reaches core as `audioAsVoice` but is omitted before `sendMessageTelegram`, whose voice branch requires `asVoice: true`.
- Is this the best way to solve the issue? Yes, the narrow fix is in the Telegram outbound adapter, where payload-level delivery options are translated into Telegram sender options.

## Reviewed

- Diff: `98d87b06e0a2ad8f8d447d9cf1e917df78ec5271..df0ee092f01766ef254de6f536899f105322d00f`
- PR: `https://github.com/openclaw/openclaw/pull/74920`
- Changed files read: all changed production files and adjacent tests in the diff summary.
- Extra code read: Telegram outbound adapter/send path, outbound payload planner/deliver path, memory-host-sdk bridge imports, service status JSON path, task maintenance chat-type parser path.
- Dependencies/web: GitHub PR metadata via `gh`; no general web lookup needed.

## Tests / Live Checks

- `pnpm docs:list`
- Initial focused test attempt failed before running because dependencies were missing; ran `pnpm install` once.
- `pnpm test extensions/telegram/src/outbound-adapter.test.ts src/gateway/server-methods/send.test.ts src/infra/outbound/message.test.ts packages/memory-host-sdk/src/host/sqlite-vec.test.ts` passed.
- `pnpm test src/cli/update-cli/restart-helper.test.ts src/commands/status.daemon.test.ts src/commands/status.service-summary.test.ts src/commands/doctor-gateway-services.test.ts src/commands/onboard-non-interactive.gateway.test.ts src/tasks/task-boundaries.test.ts src/infra/update-global.test.ts` passed.
- `pnpm test src/tasks/task-registry.maintenance.issue-60299.test.ts` passed.

## Limitations

- A one-off `tsx` probe for the Telegram payload path hit an unrelated package export error before executing; the finding is based on static path tracing plus existing focused tests.
```
