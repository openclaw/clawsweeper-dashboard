---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-395ad91323c2
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-395ad91323c2
source: clawsweeper_commit
commit_sha: 395ad91323c2aabfbbb32b6a524dbde773fe80a2
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/395ad91323c2aabfbbb32b6a524dbde773fe80a2.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-395ad91323c2`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/395ad91323c2aabfbbb32b6a524dbde773fe80a2
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/395ad91323c2aabfbbb32b6a524dbde773fe80a2.md
- Latest main at intake: 3224075edc21279454acc1cf5cdfbd7d12b4650e

## ClawSweeper Report

```md
---
sha: 395ad91323c2aabfbbb32b6a524dbde773fe80a2
parent: c4f9cf1a27f18d9fb2a46f95c904dd6a305cc524
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T05:16:25+01:00"
commit_committed_at: "2026-04-30T05:16:25+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T04:35:10Z
---

# Commit 395ad91

## Summary

One actionable issue found. The new Slack approval update cap uses the generic Slack send limit of 8,000 characters, but Slack’s `chat.update` API documents `msg_too_long` when `text` exceeds 4,000 characters, so approval updates between 4,001 and 8,000 characters can still be rejected and leave stale approval cards.

## Findings

### Medium: Slack approval updates are still too long for `chat.update`

- Kind: bug
- File: `extensions/slack/src/approval-handler.runtime.ts`
- Line: 234
- Evidence: `updateMessage` now sends `text: truncateSlackText(params.text, SLACK_TEXT_LIMIT)`, and `extensions/slack/src/limits.ts:1` defines that shared limit as `8000`. The new test also asserts an 8,000-character update fallback in `extensions/slack/src/approval-handler.runtime.test.ts:162`. Slack’s current `chat.update` docs list `msg_too_long` as “The `text` field cannot exceed 4,000 characters,” and also document that when blocks are supplied Slack renders blocks while using `text` for notifications. ([docs.slack.dev](https://docs.slack.dev/reference/methods/chat.update))
- Impact: The commit’s intended fix is incomplete. A resolved or expired approval whose fallback text is 4,001-8,000 characters will still call `chat.update` with an invalid `text` value, so Slack can reject the update and the original interactive approval card can remain stale.
- Suggested fix: Add/use a `chat.update`-specific fallback cap of 4,000 characters for approval updates, keep blocks unchanged, and update the test to assert 4,000 plus a mid-range case such as 5,000 characters.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A focused in-process smoke of `slackApprovalNativeRuntime.transport.updateEntry` produced a `chat.update` payload with text length `5031` for a 5,000-character command, and `8000` for a 9,000-character command.
- Is this the best way to solve the issue? yes. The bug is at the Slack API boundary, so the narrow fix is to use the documented `chat.update` text limit at that boundary rather than the broader send fallback limit.

## Reviewed

- Diff: `c4f9cf1a27f18d9fb2a46f95c904dd6a305cc524..395ad91323c2aabfbbb32b6a524dbde773fe80a2`
- Changed files: `CHANGELOG.md`, `extensions/slack/src/approval-handler.runtime.ts`, `extensions/slack/src/approval-handler.runtime.test.ts`
- Code read: changed files in full, `extensions/slack/src/limits.ts`, `extensions/slack/src/truncate.ts`, `extensions/slack/src/send.ts`, approval runtime adapter/types, adjacent Discord approval update path
- Dependencies/web: Slack Developer Docs for `chat.update`
- Commands: `pnpm docs:list`; `git show`; `git diff`; `pnpm install`; `pnpm test extensions/slack/src/approval-handler.runtime.test.ts`; focused `pnpm exec tsx` runtime smokes

## Tests / Live Checks

- Initial focused test failed because `node_modules` was missing.
- Ran `pnpm install`, then `pnpm test extensions/slack/src/approval-handler.runtime.test.ts`: passed, 4 tests.
- Checked Slack env/profile presence for live validation; Slack credentials were absent, so no live Slack API call was run.

## Limitations

- No live Slack workspace call was performed because no Slack credentials were present in env or `~/.profile`.
```
