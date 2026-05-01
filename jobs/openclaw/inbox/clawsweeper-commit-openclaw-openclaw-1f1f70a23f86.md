---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-1f1f70a23f86
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-1f1f70a23f86
source: clawsweeper_commit
commit_sha: 1f1f70a23f86a6c40290005030f83eeda571c88d
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/1f1f70a23f86a6c40290005030f83eeda571c88d.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-1f1f70a23f86`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/1f1f70a23f86a6c40290005030f83eeda571c88d
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/1f1f70a23f86a6c40290005030f83eeda571c88d.md
- Latest main at intake: d80a8eb3adb6b26fb345fdc7b658dbd39f085e35

## ClawSweeper Report

```md
---
sha: 1f1f70a23f86a6c40290005030f83eeda571c88d
parent: e6abd9e3d8c451477f1c93c091a205d30aed4d92
repository: openclaw/openclaw
author: "Val Alexander"
committer: "GitHub"
github_author: BunsDev
github_committer: web-flow
co_authors: ["Val Alexander"]
commit_authored_at: "2026-04-29T22:55:19-05:00"
commit_committed_at: "2026-04-29T22:55:19-05:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T04:00:27Z
---

# Commit 1f1f70a

## Summary

Found one regression in the abort/wait semantics this commit is trying to stabilize. The new cancel snapshot can still be overwritten by the underlying run completion after `sessions.abort` returns.

## Findings

### Medium: Aborted runs can later overwrite the cancel wait snapshot as ok/error

- Kind: regression
- File: `src/gateway/chat-abort.ts`
- Line: 181
- Evidence: `abortChatRunById` now sets `chatAbortedRuns`, aborts the controller, then emits a lifecycle `end` event with `aborted: true` at `src/gateway/chat-abort.ts:173` and `src/gateway/chat-abort.ts:181`. The Gateway agent-event handler treats that aborted lifecycle as final cleanup and deletes the same aborted marker from `chatRunState.abortedRuns` at `src/gateway/server-chat.ts:343`. That map is passed into request context as `context.chatAbortedRuns`, so the `chat.send` completion guard added at `src/gateway/server-methods/chat.ts:2522` can become false before the underlying send promise finishes, allowing it to write `chat:<runId>` with `status: "ok"` at `src/gateway/server-methods/chat.ts:2523`. The agent RPC path has the same durability problem: `sessions.abort` writes a timeout snapshot at `src/gateway/server-methods/sessions.ts:1357`, but `dispatchAgentRunFromGateway` still unconditionally overwrites `agent:<idempotencyKey>` with `status: "ok"` on a resolved result at `src/gateway/server-methods/agent.ts:430`, even when `result.meta.aborted === true` is detected at `src/gateway/server-methods/agent.ts:417`, or with `status: "error"` on abort rejection at `src/gateway/server-methods/agent.ts:459`.
- Impact: an SDK/UI client can call `Run.cancel()` / `sessions.abort`, receive an `aborted` response, and initially see `agent.wait` report `timeout` + `stopReason: "rpc"`, but a later retry or wait after the runner drains can observe `ok` or `error` for the same run. That recreates the cancel/wait disagreement called out by the PR and can flip app state back to completed after a cancel.
- Suggested fix: make the abort terminal snapshot authoritative until the underlying run settles. For chat-send, do not let the lifecycle finalizer clear the marker used by the completion guard, or use a separate cancelled-run map/terminal dedupe check that completion cannot erase. For agent runs, have completion preserve an existing `agent:<runId>` timeout/cancel snapshot, and map `result.meta.aborted` / abort errors to the same cancelled timeout result instead of unconditional `ok`/`error`. Add a regression test that aborts, waits once, lets the blocked underlying run resolve/reject, then calls `agent.wait` again and asserts the cancel snapshot still wins.
- Confidence: high

## Reviewed

- Diff: `e6abd9e3d8c451477f1c93c091a205d30aed4d92..1f1f70a23f86a6c40290005030f83eeda571c88d`
- Changed files: `src/gateway/chat-abort.ts`, `src/gateway/server-methods/chat.ts`, `src/gateway/server-methods/sessions.ts`, and the three changed Gateway tests.
- Code read: abort controller registry, `sessions.abort`, `chat.abort`, `chat.send` completion, `agent.wait` dedupe, `dispatchAgentRunFromGateway`, Gateway agent-event subscription/finalization, and the changed tests.
- GitHub context: PR `#74751` and related issue `#74704`.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because `node_modules` was missing.
- `pnpm test src/gateway/chat-abort.test.ts src/gateway/server.chat.gateway-server-chat.test.ts -- -t "sessions.abort stops active dashboard runs|abortChatRunById"` passed: 2 files, 4 tests, 22 skipped.
- Existing tests only cover the immediate wait after abort; they do not cover a second wait after the underlying run promise settles.

## Dependency / Web Checks

- No dependency or lockfile changes in this commit.
- No external package/web lookup was needed.

## Limitations

- I did not run the full suite or Testbox for this report-only review.
```
