---
sha: fc8fafbd2f59366c27b1a58185bbb5a83fdadbd2
parent: 8aed80d2fabf0c5de120b723215e8152445ff248
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T03:19:34+01:00"
commit_committed_at: "2026-04-30T03:20:19+01:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T02:24:36Z
---

# Commit fc8fafb

## Summary

Found one likely regression in the new Slack select value cap. The code drops values over 75 characters, but current Slack Block Kit docs list option `value` max as 150 characters, so valid select options can disappear.

## Findings

### Medium: Slack select options between 76 and 150 chars are silently dropped

- Kind: regression
- File: `extensions/slack/src/blocks-render.ts`
- Line: 16
- Evidence: `SLACK_OPTION_VALUE_MAX` is now `75`, and `buildSlackInteractiveBlocks` filters select options with `option.value.length <= SLACK_OPTION_VALUE_MAX` at `extensions/slack/src/blocks-render.ts:105`. A focused runtime check returns no blocks for a single select option with a 100-character value: `buildSlackInteractiveBlocks({ blocks: [{ type: "select", options: [{ label: "valid-by-docs", value: "v".repeat(100) }] }] })` -> `[]`. Current Slack Developer Docs for the Block Kit option object say `value` has maximum length 150 characters, while static/external selects allow up to 100 options. ([docs.slack.dev](https://docs.slack.dev/reference/block-kit/block-elements/select-menu-element/))
- Impact: Agent-authored or tool-authored Slack selects with callback values in the documented-valid 76-150 character range are removed. If every option is in that range, the whole select block is omitted, so users lose the intended action rather than receiving a valid Slack control.
- Suggested fix: Use `150` for Slack option values, and add boundary tests that keep 150-character select values and drop 151-character values. If live Slack validation has proven a stricter limit than the current docs, add that evidence in a code comment and test name.
- Confidence: medium, because installed `@slack/types@2.20.1` comments locally say 75, but the current official Slack docs say 150 and no live Slack credentials were available to resolve the discrepancy.

## Reviewed

- Diff: `8aed80d2fabf0c5de120b723215e8152445ff248..fc8fafbd2f59366c27b1a58185bbb5a83fdadbd2`
- Changed files: `CHANGELOG.md`, `extensions/slack/src/blocks-render.ts`, `extensions/slack/src/monitor/slash.ts`, `extensions/slack/src/monitor/slash.test.ts`, `extensions/slack/src/shared-interactive.test.ts`
- Code read: Slack block renderer, slash argument menu builder/handler, shared interactive payload types, Slack interaction dispatch, outbound/reply block merge paths, approval interactive rendering, adjacent Slack tests.
- Dependencies/web: checked installed `@slack/types@2.20.1` comments and Slack Developer Docs for button values, option values, select option counts, action block element counts, and message block counts. ([docs.slack.dev](https://docs.slack.dev/reference/block-kit/block-elements/select-menu-element/))

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm test extensions/slack/src/shared-interactive.test.ts extensions/slack/src/monitor/slash.test.ts` passed: 42 tests.
- `pnpm test extensions/slack/src/channel.test.ts extensions/slack/src/monitor/replies.test.ts extensions/slack/src/outbound-payload.test.ts extensions/slack/src/monitor/events/interactions.test.ts` passed: 88 tests.
- `git diff --check 8aed80d2fabf0c5de120b723215e8152445ff248..fc8fafbd2f59366c27b1a58185bbb5a83fdadbd2` passed.
- Focused `tsx` smoke reproduced the drop for a 100-character select value.

## Dependency / Web Checks

- Slack Developer Docs currently document button `value` max 2000 characters and action block max 25 elements, matching this commit’s button/action caps. 
- Slack Developer Docs currently document option `value` max 150 characters, conflicting with the new 75-character cap. 

## Limitations

- No `SLACK_BOT_TOKEN`/live Slack credentials were found in shell profiles, so I did not live-submit a Block Kit payload to Slack.
