---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-58153d38af57
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-58153d38af57
source: clawsweeper_commit
commit_sha: 58153d38af574e45175dba71efe8430bea8bbffd
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/58153d38af574e45175dba71efe8430bea8bbffd.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-58153d38af57`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/58153d38af574e45175dba71efe8430bea8bbffd
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/58153d38af574e45175dba71efe8430bea8bbffd.md
- Latest main at intake: 35264ca034f7ccde248e761e49d186428c10efd2

## ClawSweeper Report

```md
---
sha: 58153d38af574e45175dba71efe8430bea8bbffd
parent: 1a103088ba70552289babf7e27e021c15b770aed
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T03:06:01+01:00"
commit_committed_at: "2026-04-30T03:06:26+01:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T02:12:02Z
---

# Commit 58153d3

## Summary

Found one concrete risk in the fix: the new terminal flush sends debounced steering via `turn/steer` after receiving `turn/completed`, but the Codex protocol treats `turn/steer` as requiring the currently active turn. That can still drop the queued follow-up the user was told was accepted.

## Findings

### Medium: Completion flush can send queued steering after the turn is no longer steerable

- Kind: bug
- File: `extensions/codex/src/app-server/run-attempt.ts`
- Line: 594
- Evidence: `turn/completed` now calls `await steeringQueue?.flushPending()`, and `flushPending()` sends `turn/steer` with `expectedTurnId` at `extensions/codex/src/app-server/run-attempt.ts:155`. The generated protocol for `TurnSteerParams` says `expectedTurnId` is an active-turn precondition and the request fails when it does not match the currently active turn. The new test masks this by using `createStartedThreadHarness`, whose default request handler returns `{}` for `turn/steer` even after `completeTurn()` at `extensions/codex/src/app-server/run-attempt.test.ts:1102`.
- Impact: A follow-up accepted by `queueAgentHarnessMessage()` during the debounce window can still be lost when the Codex turn completes before the timer fires: cleanup flushes it as `turn/steer`, Codex rejects the now-terminal turn, `enqueueSend()` catches/logs the error at debug level, and no follow-up queue fallback is created.
- Suggested fix: When terminal completion races with pending debounced steering, move those pending texts into the normal follow-up/backlog queue instead of sending `turn/steer`, or flush only while the runtime is still known to be inside an active steerable turn. Update the regression test so `turn/steer` after `turn/completed` rejects like the real active-turn contract.
- Confidence: medium

## Reviewed

- Diff: `1a103088ba70552289babf7e27e021c15b770aed..58153d38af574e45175dba71efe8430bea8bbffd`
- Changed files: `CHANGELOG.md`, `extensions/codex/src/app-server/run-attempt.ts`, `extensions/codex/src/app-server/run-attempt.test.ts`
- Code read: full changed production/test files, Codex app-server protocol types, active embedded run queue registry, auto-reply steering path, Codex conversation control/binding paths, app-server client request/notification handling.
- Dependencies/web: checked `@openai/codex` 0.125.0 package metadata and ran a focused app-server JSON-RPC smoke against the installed binary; no general web lookup was needed.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm test extensions/codex/src/app-server/run-attempt.test.ts` passed: 39 tests.
- `git diff --check 1a103088ba70552289babf7e27e021c15b770aed..58153d38af574e45175dba71efe8430bea8bbffd -- CHANGELOG.md extensions/codex/src/app-server/run-attempt.test.ts extensions/codex/src/app-server/run-attempt.ts` passed.
- Live app-server smoke confirmed invalid `turn/steer` requests return JSON-RPC errors rather than being queued implicitly.

## Dependency / Web Checks

- `extensions/codex/package.json` and `pnpm-lock.yaml` pin `@openai/codex` 0.125.0.
- `npm view @openai/codex@0.125.0` and `npm pack @openai/codex@0.125.0-linux-x64` were used to inspect the exact app-server binary package.

## Limitations

- I did not run a full live authenticated Codex turn, so the post-`turn/completed` rejection is inferred from the generated active-turn protocol, local active-turn cleanup behavior, and the app-server invalid-steer smoke rather than from a completed authenticated model run.
```
