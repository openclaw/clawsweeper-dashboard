---
sha: e8df05ed4fda70e1c1628f95dddaabff5e39d98a
parent: 9765a5777c73b5bb9ec56608b242b138e90a9733
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "GitHub"
github_author: "clawsweeper[bot]"
github_committer: web-flow
co_authors: ["clawsweeper", "bob"]
commit_authored_at: "2026-05-03T01:30:36Z"
commit_committed_at: "2026-05-03T01:30:36Z"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-03T01:36:20Z
---

# Commit e8df05e

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.
- I checked the main risk in the changed behavior: flat inbound Slack DMs use `replyTarget: channel:${message.channel}`, so the draft stream edits the concrete `D...` DM channel from the inbound event, not a user `U...` target. Slack docs also distinguish `chat.postMessage` user-ID posting from `chat.update` requiring a DM ID for direct messages, which matches the current inbound-DM target choice. 

## Reviewed

- Diff: `9765a5777c73b5bb9ec56608b242b138e90a9733..e8df05ed4fda70e1c1628f95dddaabff5e39d98a`
- Changed files: `CHANGELOG.md`, Slack docs, config metadata, Slack config hints, Slack dispatch code/tests, raw-fetch guard, plugin runtime dependency contract.
- Code read: `extensions/slack/src/monitor/message-handler/dispatch.ts`, `prepare.ts`, `draft-stream.ts`, `stream-mode.ts`, `threading.ts`, `replies.ts`, `send.ts`, `actions.ts`, `preview-finalize.ts`, and adjacent tests.
- GitHub context: PR `#76330`, source PR `#56544`, issue `#56480`.
- Dependencies/web: Slack Developer Docs for `chat.postMessage` and `chat.update`.

## Commands

- `pnpm docs:list`
- `git show`, `git diff`, `git diff --check`
- `gh pr view 76330`, `gh issue view 56480`, `gh pr view 56544`
- `pnpm install` after missing `node_modules`
- `pnpm test extensions/slack/src/monitor/message-handler/dispatch.streaming.test.ts extensions/slack/src/draft-stream.test.ts extensions/slack/src/monitor/message-handler/prepare.test.ts src/plugins/contracts/extension-runtime-dependencies.contract.test.ts` - passed
- `node scripts/check-no-raw-channel-fetch.mjs` - passed
- `pnpm exec oxfmt --check --threads=1 ...` - passed

## Limitations

- No live Slack API test was run; `SLACK_BOT_TOKEN`, `SLACK_APP_TOKEN`, and `OPENCLAW_LIVE_TEST` were absent from env and `~/.profile`.
