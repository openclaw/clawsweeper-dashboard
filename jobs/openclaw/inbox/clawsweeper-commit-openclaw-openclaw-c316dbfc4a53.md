---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-c316dbfc4a53
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-c316dbfc4a53
source: clawsweeper_commit
commit_sha: c316dbfc4a5330364a9d518121516273f0846f1d
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/c316dbfc4a5330364a9d518121516273f0846f1d.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-c316dbfc4a53`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/c316dbfc4a5330364a9d518121516273f0846f1d
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/c316dbfc4a5330364a9d518121516273f0846f1d.md
- Latest main at intake: eea964330c0773798c80248c3e5c2f5f689e5460

## ClawSweeper Report

```md
---
sha: c316dbfc4a5330364a9d518121516273f0846f1d
parent: 035b70aed195e9e313a5e5ff5fc49d1216ed8a27
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T04:08:17+01:00"
commit_committed_at: "2026-04-30T05:12:03+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T04:31:22+00:00
---

# Commit c316dbfc4a

## Summary

Found one low-severity regression in the mixed-controls edge case introduced by merging presentation and interactive Slack blocks.

## Findings

### Low: Merged presentation and interactive controls reuse Slack block/action ids

- Kind: regression
- File: `extensions/slack/src/message-action-dispatch.ts`
- Line: 47
- Evidence: `buildSlackPresentationBlocks()` renders presentation button/select blocks by calling `buildSlackInteractiveBlocks()`, and the new send path then appends a second separately rendered `interactiveBlocks` array. Each render starts counters at 1, so a message with both presentation buttons and interactive buttons now emits duplicate `block_id: "openclaw_reply_buttons_1"` and duplicate `action_id: "openclaw:reply_button:1:1"`. A focused smoke using `handleSlackMessageAction` reproduced exactly those duplicate IDs. The Slack type docs in `node_modules/@slack/types/dist/block-kit/blocks.d.ts` say `block_id` should be unique per message, and the local interaction cleanup path replaces every action block matching the clicked `block_id` in `extensions/slack/src/monitor/events/interactions.block-actions.ts:726`.
- Impact: if a structured presentation contains controls and the separate interactive payload also contains controls, clicking one control can remove or confirm both rows because the message update matches both duplicate `block_id`s. It also makes Slack interaction payloads ambiguous for same-message controls.
- Suggested fix: render presentation-derived controls and interactive controls through one shared Slack render state, or let `buildSlackInteractiveBlocks` accept an offset/prefix so merged arrays get unique `block_id` and `action_id` values. Add a regression test with controls in both `presentation` and `interactive`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Calling `handleSlackMessageAction` with `presentation.blocks: [{ type: "buttons", ... }]` and `interactive.blocks: [{ type: "buttons", ... }]` produces two action blocks with the same `block_id` and `action_id`.
- Is this the best way to solve the issue? yes. The fix should preserve the intended merge while making the Slack IDs unique at render time; dropping either control set would reintroduce the behavior this commit was trying to fix.

## Reviewed

- Diff: `035b70aed195e9e313a5e5ff5fc49d1216ed8a27..c316dbfc4a5330364a9d518121516273f0846f1d`
- Changed files: `CHANGELOG.md`, `extensions/slack/src/message-action-dispatch.ts`, `extensions/slack/src/message-action-dispatch.test.ts`
- Code read: Slack dispatch, block rendering, block validation, outbound adapter, send runtime, action runtime, interaction handling, message action runner, relevant Slack docs.
- Dependencies/web: inspected installed `@slack/web-api`/`@slack/types` 7.15.1 local types; no web lookup needed.
- Commands: `pnpm docs:list`, `pnpm install`, `pnpm test extensions/slack/src/message-action-dispatch.test.ts`, focused `pnpm exec tsx` payload smoke.

## Tests / Live Checks

- `pnpm test extensions/slack/src/message-action-dispatch.test.ts`: passed, 7 tests.
- Live Slack check not run: `SLACK_BOT_TOKEN`, `SLACK_APP_TOKEN`, and `SLACK_SIGNING_SECRET` were unset and not mentioned in `~/.profile`.

## Limitations

- No live Slack API post was performed; the finding is based on local payload generation, Slack SDK type contract, and local interaction-update behavior.
```
