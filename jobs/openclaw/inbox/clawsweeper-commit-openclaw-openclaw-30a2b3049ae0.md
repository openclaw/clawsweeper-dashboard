---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-30a2b3049ae0
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-30a2b3049ae0
source: clawsweeper_commit
commit_sha: 30a2b3049ae04c695e6e65308196c55189c78d25
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/30a2b3049ae04c695e6e65308196c55189c78d25.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-30a2b3049ae0`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/30a2b3049ae04c695e6e65308196c55189c78d25
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/30a2b3049ae04c695e6e65308196c55189c78d25.md
- Latest main at intake: 1ead1b2d181fec6d95c76e027434fa25d35a1093

## ClawSweeper Report

```md
---
sha: 30a2b3049ae04c695e6e65308196c55189c78d25
parent: fabfab2b84d23bf3089a3fae6859f71f93bfc40e
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T01:22:20+01:00"
commit_committed_at: "2026-04-30T01:22:43+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T00:29:36+00:00
---

# Commit 30a2b30

## Summary

Found one concrete regression in the Codex app-server steering path: a queued user message can be accepted by OpenClaw and then silently dropped if the active Codex turn completes before the new debounce timer flushes.

## Findings

### Medium: Codex batched steering can drop queued input on turn completion

- Kind: bug
- File: `extensions/codex/src/app-server/run-attempt.ts`
- Line: 188
- Evidence: default Codex steering now buffers text in `batchedTexts` and only sends `turn/steer` after `setTimeout(..., debounceMs)` at `extensions/codex/src/app-server/run-attempt.ts:188`. If the active turn completes first, cleanup calls `steeringQueue.cancel()` at `extensions/codex/src/app-server/run-attempt.ts:1002`, and `cancel()` clears `batchedTexts` without sending or returning them. The caller has already treated the message as handled: `queueEmbeddedPiMessage()` returns `true` immediately after `void handle.queueMessage(...)` at `src/agents/pi-embedded-runner/runs.ts:86`, and `runReplyAgent()` returns without enqueueing a followup when `steered && !shouldFollowup` at `src/auto-reply/reply/agent-runner.ts:1006`.
- Impact: in the default `messages.queue.mode: "steer"` path for Codex app-server runs, a chat message sent while the run is active but within the 500ms quiet window before completion can disappear: no `turn/steer`, no followup run, no user-visible failure.
- Suggested fix: make pending Codex steering durable until either `turn/steer` is accepted or a followup fallback is scheduled. Concretely, avoid clearing unsent `batchedTexts` in cleanup; flush or return pending text and route it through the existing followup queue when the turn is already terminal or `turn/steer` rejects.
- Confidence: high

## Reviewed

- Diff: `fabfab2b84d23bf3089a3fae6859f71f93bfc40e..30a2b3049ae04c695e6e65308196c55189c78d25`
- Changed files: queue config/docs, Codex app-server run attempt, Pi embedded run registry, subagent announcement delivery, queue directive tests, config schema/help.
- Code read: full relevant queue settings/normalize/state/drain paths; active run queue policy; `runPreparedReply()` and `runReplyAgent()` steering/followup path; Codex app-server steering queue and cleanup; Pi embedded active run registry; subagent announce steering paths.
- Dependencies/web: inspected locked `@mariozechner/pi-coding-agent@0.70.6` and `@mariozechner/pi-agent-core@0.70.6` tarballs via `npm pack`; verified Pi core queue drains `"all"` vs `"one-at-a-time"` at runtime. Used `gh api` only for commit metadata.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm test extensions/codex/src/app-server/run-attempt.test.ts src/agents/pi-embedded-runner/runs.test.ts -- -t "queued steering|steering options|default queued steering|legacy queue steering"`: passed
- `pnpm test src/auto-reply/reply/queue/settings.test.ts src/auto-reply/reply/queue-policy.test.ts src/auto-reply/reply/directive-handling.queue-validation.test.ts src/auto-reply/reply.directive.parse.test.ts src/auto-reply/reply/agent-runner.media-paths.test.ts -- -t "queue|steer"`: passed
- `git diff --check fabfab2b84d23bf3089a3fae6859f71f93bfc40e..30a2b3049ae04c695e6e65308196c55189c78d25`: passed

## Limitations

- Did not run full `pnpm check:changed` or a live Codex app-server smoke; the finding is from source-level control-flow evidence and focused tests around the touched behavior.

https://github.com/openclaw/openclaw/commit/30a2b3049ae04c695e6e65308196c55189c78d25
```
