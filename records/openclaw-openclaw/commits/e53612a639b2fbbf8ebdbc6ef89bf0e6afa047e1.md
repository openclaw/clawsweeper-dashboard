---
sha: e53612a639b2fbbf8ebdbc6ef89bf0e6afa047e1
parent: d24cfcfa214c8ad357f46e5d7bfa6b866ebaf482
repository: openclaw/openclaw
author: "Kaspre"
committer: "Peter Steinberger"
github_author: Kaspre
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-18T16:02:04-04:00"
commit_committed_at: "2026-05-22T10:32:12+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-22T09:41:12Z
---

# Commit e53612a

## Summary

Found one remaining compatibility regression in the new event-session routing helper. The fix routes single-owner `session.dmScope=main` direct event keys only when `allowFrom` entries already exactly match the raw peer id. Several channel contracts accept normalized owner entries with prefixes or mentions, so those configurations still strand exec/cron/ACP events in the old direct-DM queue.

## Findings

### Low: Event routing ignores channel-specific DM owner normalization

- Kind: regression
- File: `src/infra/event-session-routing.ts`
- Line: 63
- Evidence: `resolveMainScopedEventSessionKey` derives the pinned owner through `resolvePinnedMainDmOwnerFromAllowlist`, but passes a generic `normalizeEntry` that only lowercases (`src/infra/event-session-routing.ts:63`, `src/infra/event-session-routing.ts:217`). Inbound main-DM routing uses channel-specific normalization instead: Telegram strips `telegram:` / `tg:` before matching (`extensions/telegram/src/bot-message-context.session.ts:577`, `extensions/telegram/src/bot-access.ts:45`), Discord strips `discord:` / `user:` and mention syntax (`extensions/discord/src/monitor/message-handler.context.ts:127`, `extensions/discord/src/security.ts:19`), and Slack strips `slack:` / `user:` (`extensions/slack/src/security.ts:20`). The public Telegram docs also show `allowFrom: ["tg:123456789"]` (`docs/gateway/config-channels.md:167`).
- Impact: A single-owner config such as `session.dmScope="main"` with `channels.telegram.allowFrom: ["tg:123456789"]` can still receive event keys like `agent:main:telegram:default:direct:123456789`, but the helper compares `tg:123456789` to `123456789` and returns `null`. That leaves the same queue/wake mismatch this commit was meant to fix for documented or accepted allowlist forms.
- Suggested fix: Carry the channel’s DM policy normalizer into `EventSessionRoutingPolicy`, or resolve the channel security/DM policy metadata and use its `normalizeEntry` for both allowlist entries and target peer ids. Keep the fallback generic normalizer only for channels without a policy normalizer.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Add a focused case beside `src/infra/event-session-routing.test.ts` with `cfg = { session: { dmScope: "main" }, channels: { telegram: { allowFrom: ["tg:123"] } } }` and `sessionKey = "agent:main:telegram:default:direct:123"`; current source takes the generic lowercase path and does not route to `agent:main:main`.
- Is this the best way to solve the issue? yes, directionally. The event helper should use the same channel-owned DM owner normalization as inbound routing; hardcoding Telegram/Discord/Slack prefixes in core would widen plugin policy ownership.

## Reviewed

- Diff: `d24cfcfa214c8ad357f46e5d7bfa6b866ebaf482..e53612a639b2fbbf8ebdbc6ef89bf0e6afa047e1`
- Changed files: `src/infra/event-session-routing.ts`, heartbeat, cron, node event, exec, CLI watchdog, ACP parent-stream callers, and related tests.
- Code read: current `src/infra/event-session-routing.ts`; touched caller regions in `src/infra/heartbeat-runner.ts`, `src/gateway/server-cron.ts`, `src/gateway/server-node-events.ts`, `src/agents/*`; session-key helpers; system-event queue; channel owner normalization for Telegram, Discord, Slack.
- GitHub: inspected PR `https://github.com/openclaw/openclaw/pull/83743` and issue `https://github.com/openclaw/openclaw/issues/71581`.

## Tests / Live Checks

- Attempted `node scripts/run-vitest.mjs src/infra/event-session-routing.test.ts --reporter=verbose`; blocked because local dependencies are missing (`Cannot find module 'vitest/package.json'`).
- No repository files were modified; `git status -sb` remained clean.

## Dependency / Web Checks

- No dependency files changed in this commit.
- No general web lookup needed; GitHub issue/PR context was inspected with `gh`.

## Limitations

- I did not install dependencies or run the focused Vitest shard after the missing-dependency failure.
- I did not run a live Telegram/Discord/Slack transport check; the finding is from shared helper and channel normalization source evidence.
