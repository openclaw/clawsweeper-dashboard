---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-45b86450795d
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-45b86450795d
source: clawsweeper_commit
commit_sha: 45b86450795d8bd3d1e548c8815cd97d6583199d
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/45b86450795d8bd3d1e548c8815cd97d6583199d.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-45b86450795d`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/45b86450795d8bd3d1e548c8815cd97d6583199d
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/45b86450795d8bd3d1e548c8815cd97d6583199d.md
- Latest main at intake: 8093ae60292f4d9009b3d48f234b39b5cbc538e5

## ClawSweeper Report

```md
---
sha: 45b86450795d8bd3d1e548c8815cd97d6583199d
parent: 40b0b1bfe051072f47d0160eb078afa3b17cef48
repository: openclaw/openclaw
author: "Ayaan Zaidi"
committer: "Ayaan Zaidi"
github_author: obviyus
github_committer: obviyus
co_authors: []
commit_authored_at: "2026-05-01T07:34:30+05:30"
commit_committed_at: "2026-05-01T08:33:02+05:30"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T03:22:06Z
---

# Commit 45b8645

## Summary

Found one concrete regression: making typing start fire-and-forget allows cleanup/idle to run before a persistent typing indicator has finished starting, so the stop path can no-op and leave the indicator behind.

## Findings

### Medium: Pending typing start can outlive cleanup and leave persistent indicators stuck

- Kind: regression
- File: `src/channels/typing.ts`
- Line: 79
- Evidence: `onReplyStart` now starts `fireStart()` in the background and returns after one microtask at `src/channels/typing.ts:79-87`, while `fireStop` immediately marks the callbacks closed and calls `stop` at `src/channels/typing.ts:90-98`. For Feishu, `start` assigns `typingState` only after `await addTypingIndicator(...)` at `extensions/feishu/src/reply-dispatcher.ts:176`; `stop` returns without doing anything if `typingState` is still unset at `extensions/feishu/src/reply-dispatcher.ts:183-185`. A fast cleanup while `addTypingIndicator` is still in flight therefore calls stop too early, then the delayed start completes and records a persistent reaction with no later removal.
- Impact: Feishu typing reactions are explicitly persistent until removed. A quick reply, `NO_REPLY`, empty-message cleanup, cancellation, or send-policy path can leave a visible typing reaction/indicator on the parent message after the run is already finished.
- Suggested fix: keep typing start off the reply critical path, but serialize cleanup against the pending start. For example, track the current start promise and, if stop/cleanup happens while it is pending, run `stop` again after the promise settles when a start actually completed. Alternatively make persistent-indicator channels expose an abortable/pending-aware start helper.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A focused probe using `createTypingCallbacks` with a delayed `start` and Feishu-like `stop` semantics produced `{"state":true,"stops":0}` after `onReplyStart()`, immediate `onIdle()`, then resolving the start promise.
- Is this the best way to solve the issue? yes, directionally. The intended behavior is non-blocking start, but stop must still be ordered after any successful persistent start; otherwise channels with explicit stop semantics cannot clean up reliably.

## Reviewed

- Diff: `40b0b1bfe051072f47d0160eb078afa3b17cef48..45b86450795d8bd3d1e548c8815cd97d6583199d`
- Changed files: `src/auto-reply/reply/typing.ts`, `src/channels/typing.ts`, `src/channels/typing.test.ts`
- Code read: changed files in full; `src/channels/typing-lifecycle.ts`; `src/channels/typing-start-guard.ts`; `src/auto-reply/reply/reply-dispatcher.ts`; `src/auto-reply/reply/get-reply.ts`; `src/auto-reply/reply/get-reply-run.ts`; `src/auto-reply/reply/agent-runner.ts`; relevant channel typing call sites, including Feishu, Matrix, Telegram, Discord, Signal, Mattermost, MSTeams, Zalo, and heartbeat typing.
- Dependencies/web: no dependency files changed; no web lookup needed.

## Tests / Live Checks

- `pnpm install` was needed because `vitest/package.json` was missing.
- `pnpm test src/channels/typing.test.ts src/auto-reply/reply/typing-persistence.test.ts src/auto-reply/reply/reply-utils.test.ts` passed.
- `pnpm test extensions/feishu/src/reply-dispatcher.test.ts` passed.
- Focused `pnpm exec tsx -e ...` race probe reproduced the stale persistent-state ordering.

## Limitations

- I did not run a live Feishu API test; the finding is based on the current callback ordering and Feishu’s local persistent-reaction state contract.
```
