---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-82ca6ecdde80
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-82ca6ecdde80
source: clawsweeper_commit
commit_sha: 82ca6ecdde801a4a858cf63f6400d25bec004308
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/82ca6ecdde801a4a858cf63f6400d25bec004308.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-82ca6ecdde80`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/82ca6ecdde801a4a858cf63f6400d25bec004308
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/82ca6ecdde801a4a858cf63f6400d25bec004308.md
- Latest main at intake: 46888f5afbe9132608d990a2ef18e2014a9edff8

## ClawSweeper Report

```md
---
sha: 82ca6ecdde801a4a858cf63f6400d25bec004308
parent: 8b665e0d7066dd524fa87d08592e259b465a005f
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T14:46:07+01:00"
commit_committed_at: "2026-04-30T14:54:34+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T14:14:53Z
---

# Commit 82ca6ecd

## Summary

Found one user-visible bug in the new fallback path: some channel flows still keep replies private even when the `message` tool is unavailable, so the intended “surface private group replies” behavior is bypassed.

## Findings

### Medium: Pre-resolved channel reply modes bypass the message-tool-unavailable fallback

- Kind: bug
- File: `src/auto-reply/reply/source-reply-delivery-mode.ts`
- Line: 27
- Evidence: `resolveSourceReplyDeliveryMode` returns `params.requested` before checking `messageToolAvailable === false` at lines 57-58. Discord and Slack compute the default group/channel mode first, then pass it into dispatch as `replyOptions.sourceReplyDeliveryMode`: Discord at `extensions/discord/src/monitor/message-handler.process.ts:154` and `extensions/discord/src/monitor/message-handler.process.ts:519`, Slack at `extensions/slack/src/monitor/message-handler/dispatch.ts:298` and `extensions/slack/src/monitor/message-handler/dispatch.ts:1027`. The focused probe `resolveSourceReplyDeliveryMode({ cfg: {}, ctx: { ChatType: "channel" }, requested: "message_tool_only", messageToolAvailable: false })` returned `message_tool_only`.
- Impact: In Discord/Slack group or channel rooms where the `message` tool is filtered out, the agent still receives `sourceReplyDeliveryMode: "message_tool_only"`, final replies stay suppressed, and the model cannot send the visible room reply the new fallback was meant to restore. The new dispatch test covers only callers that do not pre-resolve `replyOptions.sourceReplyDeliveryMode`.
- Suggested fix: Do not pass a computed default as an explicit `requested` override, or make the resolver distinguish “caller precomputed default” from an actual explicit override. The effective mode used by Discord/Slack preview/ack logic and by core dispatch should be computed from the same final availability signal.
- Confidence: high

### Medium: Message tool availability does not match the real tool policy pipeline

- Kind: bug
- File: `src/auto-reply/reply/dispatch-from-config.ts`
- Line: 620
- Evidence: The new `messageToolAvailable` check only evaluates profile/provider/global/agent policies (`src/auto-reply/reply/dispatch-from-config.ts:620-627`). The actual tool list also applies group policy, sandbox policy, and subagent policy (`src/agents/pi-tools.ts:388-401`, `src/agents/pi-tools.ts:704-713`), plus runtime allowlists such as `toolsAllow` in the embedded runner. A group-scoped `tools.allow` that omits `message` can remove the real `message` tool while this new check still reports it available.
- Impact: Even outside Discord/Slack’s pre-resolved-mode path, group/channel turns can remain in `message_tool_only` mode when the actual tool set cannot send messages. That leaves final replies private with no visible fallback.
- Suggested fix: Reuse or extract the same effective tool-availability computation used for agent tool construction, including group, sandbox, subagent, and runtime allowlist inputs. Add regression coverage for group-scoped and sandbox-scoped policies that remove `message`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes. For the first finding, the direct resolver probe shows `requested: "message_tool_only"` overrides `messageToolAvailable: false`, and Discord/Slack pass their computed default through that `requested` field. For the second, compare the new dispatch availability list with the production tool-policy pipeline that includes group/sandbox/subagent filters.
- Is this the best way to solve the issue? The safest direction is to centralize effective source-reply mode calculation after real tool availability is known, then have channel preview/ack behavior consume that same result or a compatible preflight helper.

## Reviewed

- Diff: `8b665e0d7066dd524fa87d08592e259b465a005f..82ca6ecdde801a4a858cf63f6400d25bec004308`
- Changed files: `CHANGELOG.md`, `docs/.generated/config-baseline.sha256`, `docs/channels/groups.md`, `docs/gateway/config-channels.md`, `src/agents/tools/gateway-tool.ts`, `src/auto-reply/reply/dispatch-from-config.ts`, `src/auto-reply/reply/source-reply-delivery-mode.ts`, tests, `src/plugin-sdk/channel-reply-pipeline.ts`
- Code read: changed files, Discord/Slack callers, dispatch wrapper, tool policy resolver/pipeline, group policy resolver, tool catalog/profile definitions
- Dependencies/web: no external dependency or web lookup needed
- Commands: `pnpm docs:list`; `pnpm install`; `pnpm test src/auto-reply/reply/source-reply-delivery-mode.test.ts src/auto-reply/reply/dispatch-from-config.test.ts`; `pnpm exec tsx -e ...`

## Tests / Live Checks

- `pnpm test src/auto-reply/reply/source-reply-delivery-mode.test.ts src/auto-reply/reply/dispatch-from-config.test.ts` passed: 108 tests.
- Initial test attempt could not start before install because `node_modules` was missing; `pnpm install` completed with lockfile already up to date.
- Probe result: pre-resolved `message_tool_only` plus `messageToolAvailable: false` still returns `message_tool_only`.

## Dependency / Web Checks

- No dependency change required review.
- No web lookup used.

## Limitations

- I did not run full channel integration tests for Discord/Slack; the finding is based on direct code path tracing plus the focused resolver probe.
```
