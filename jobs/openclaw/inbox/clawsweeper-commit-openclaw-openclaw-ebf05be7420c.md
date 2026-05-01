---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-ebf05be7420c
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-ebf05be7420c
source: clawsweeper_commit
commit_sha: ebf05be7420c79533d51cc0e7fd248c8b6a03544
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/ebf05be7420c79533d51cc0e7fd248c8b6a03544.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-ebf05be7420c`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/ebf05be7420c79533d51cc0e7fd248c8b6a03544
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/ebf05be7420c79533d51cc0e7fd248c8b6a03544.md
- Latest main at intake: c500b26bb6a3127a8feb63a19fd4a36475150771

## ClawSweeper Report

```md
---
sha: ebf05be7420c79533d51cc0e7fd248c8b6a03544
parent: c6c518e6e9adb2eda8561038846b9b4e9bf46a61
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "GitHub"
github_author: "clawsweeper[bot]"
github_committer: web-flow
co_authors: ["openclaw-clawsweeper[bot]"]
commit_authored_at: "2026-04-29T22:25:38-07:00"
commit_committed_at: "2026-04-29T22:25:38-07:00"
result: findings
confidence: medium
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T05:45:18+00:00
---

# Commit ebf05be

## Summary

Found one low-severity remaining mixed-block collision in the Slack outbound path touched by this commit. The originally targeted `presentation` + `interactive` action-dispatch case is fixed and covered.

## Findings

### Low: Presentation controls are not offset against native Slack blocks

- Kind: bug
- File: `extensions/slack/src/outbound-adapter.ts`
- Line: 122
- Evidence: `resolveSlackBlocks()` renders `renderedPresentation` before it builds `previousBlocks` from native Slack blocks. `buildSlackPresentationBlocks()` then renders embedded presentation buttons/selects via `buildSlackInteractiveBlocks(interactive)` with no offset at `extensions/slack/src/blocks-render.ts:227`, so a native Slack block using `block_id: "openclaw_reply_buttons_1"` still collides with the first presentation button row. A focused render smoke produced two `openclaw_reply_buttons_1` rows before the separately-rendered interactive row was offset to `openclaw_reply_buttons_2`.
- Impact: Slack’s local `@slack/types` contract says `block_id` should be unique per message. OpenClaw’s interaction cleanup also replaces every action block whose `block_id` matches the clicked block at `extensions/slack/src/monitor/events/interactions.block-actions.ts:724`, so a presentation click can unintentionally confirm/remove a native action row with the same block id.
- Suggested fix: let `buildSlackPresentationBlocks()` accept the same offset options, render presentation-derived controls after resolving offsets from `nativeBlocks`, then render standalone `interactive` after `nativeBlocks + renderedPresentation`.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? yes: construct `channelData.slack.blocks` with an action block using `block_id: "openclaw_reply_buttons_1"`, add a `presentation.blocks` button group, and render through the current block-rendering helpers. The output contains duplicate `openclaw_reply_buttons_1`.
- Is this the best way to solve the issue? yes: offsetting presentation controls from already-present native blocks reuses the commit’s existing approach and keeps generated OpenClaw control IDs unique without changing callback payload values.

## Reviewed

- Diff: `c6c518e6e9adb2eda8561038846b9b4e9bf46a61..ebf05be7420c79533d51cc0e7fd248c8b6a03544`
- Changed files: `extensions/slack/src/blocks-render.ts`, `extensions/slack/src/message-action-dispatch.test.ts`, `extensions/slack/src/message-action-dispatch.ts`, `extensions/slack/src/outbound-adapter.ts`
- Code read: changed files in full; Slack block input/rendering; outbound payload path; reply block path; interaction block-action cleanup; adjacent Slack tests.
- PR context: https://github.com/openclaw/openclaw/pull/74851

## Tests / Live Checks

- `pnpm install`: success after initial targeted test failed due missing `node_modules`.
- `pnpm test extensions/slack/src/message-action-dispatch.test.ts extensions/slack/src/shared-interactive.test.ts extensions/slack/src/outbound-payload.test.ts extensions/slack/src/monitor/replies.test.ts`: passed, 40 tests.
- `pnpm exec oxfmt --check --threads=1 extensions/slack/src/blocks-render.ts extensions/slack/src/message-action-dispatch.ts extensions/slack/src/outbound-adapter.ts extensions/slack/src/message-action-dispatch.test.ts`: passed.
- `git diff --check c6c518e6e9adb2eda8561038846b9b4e9bf46a61..ebf05be7420c79533d51cc0e7fd248c8b6a03544`: passed.
- Live Slack post not run; local payload generation and Slack type contract were enough for this review, and no Slack token env/profile entries were present.

## Dependency / Web Checks

- Inspected local `node_modules/@slack/types/dist/block-kit/blocks.d.ts`; it documents `block_id` uniqueness per message.
- No web lookup was needed.

## Limitations

- The finding is an edge case requiring native Slack blocks with OpenClaw-style generated block IDs mixed with presentation controls. It is concrete, but likely lower frequency than the `presentation` + `interactive` case this commit fixed.

https://github.com/openclaw/openclaw/pull/74851
```
