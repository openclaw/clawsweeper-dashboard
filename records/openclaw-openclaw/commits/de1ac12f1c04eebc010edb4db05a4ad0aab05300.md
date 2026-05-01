---
sha: de1ac12f1c04eebc010edb4db05a4ad0aab05300
parent: d6e568ec956d3a218571c3552520250509924be3
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T16:11:34+01:00"
commit_committed_at: "2026-04-30T16:11:42+01:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-04-30T15:31:17Z
---

# Commit de1ac12

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.

## Reviewed

- Diff: `d6e568ec956d3a218571c3552520250509924be3..de1ac12f1c04eebc010edb4db05a4ad0aab05300`
- Changed files: `CHANGELOG.md`, `docs/channels/telegram.md`, `extensions/telegram/src/bot-core.ts`, `extensions/telegram/src/bot.create-telegram-bot.test.ts`, `extensions/telegram/src/bot.types.ts`, `extensions/telegram/src/polling-session.test.ts`, `extensions/telegram/src/polling-session.ts`, `extensions/telegram/src/request-timeouts.ts`
- Code read: Telegram timeout resolution, polling session creation/restart path, webhook bot creation, outbound send client options, Telegram config type, relevant tests/docs/changelog sections.
- Dependencies/web: inspected installed `grammy@1.42.0` and `@grammyjs/runner@2.0.3` source; `gh issue view 75114` for issue context.
- Commands: `pnpm docs:list`; `pnpm install`; `pnpm test extensions/telegram/src/bot.create-telegram-bot.test.ts extensions/telegram/src/polling-session.test.ts extensions/telegram/src/request-timeouts.test.ts` passed, 3 files / 92 tests; `pnpm exec oxfmt --check --threads=1 ...` passed; `git diff --check ...` passed.

## Limitations

- No live Telegram socket probe was run; no real Telegram token was found in `~/.profile` or local env files.
