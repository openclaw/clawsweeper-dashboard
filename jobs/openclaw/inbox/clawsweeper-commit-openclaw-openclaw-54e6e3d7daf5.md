---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-54e6e3d7daf5
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-54e6e3d7daf5
source: clawsweeper_commit
commit_sha: 54e6e3d7daf5d0d857edf756b35628a29d11c7f5
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/54e6e3d7daf5d0d857edf756b35628a29d11c7f5.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-54e6e3d7daf5`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/54e6e3d7daf5d0d857edf756b35628a29d11c7f5
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/54e6e3d7daf5d0d857edf756b35628a29d11c7f5.md
- Latest main at intake: 581fbea1d65355917886babffe4161f8b3178a12

## ClawSweeper Report

```md
---
sha: 54e6e3d7daf5d0d857edf756b35628a29d11c7f5
parent: 126dcb0d9e6a05e219fe737d2aa5b0118d61a326
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T19:22:30+01:00"
commit_committed_at: "2026-04-30T19:22:33+01:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T18:43:31+00:00
---

# Commit 54e6e3d

## Summary

Found one reliability issue in the new Codex app-server silence timeout: unrelated traffic on the shared app-server client can reset the silent-turn timer before the notification/request is scoped to the active turn.

## Findings

### Medium: Unrelated shared app-server traffic can keep a silent Codex turn alive

- Kind: reliability
- File: `extensions/codex/src/app-server/run-attempt.ts`
- Line: 638
- Evidence: `handleNotification` calls `touchTurnCompletionActivity(...)` before checking whether the notification belongs to this run’s `threadId`/`turnId`. That updates `turnCompletionLastActivityAt` and reschedules the new terminal idle timer. The default factory uses `getSharedCodexAppServerClient`, and `CodexAppServerClient` fan-outs every server notification to every registered handler. Since OpenClaw can run multiple sessions concurrently, progress from another Codex turn on the same shared app-server process can refresh this run’s idle deadline even when this turn is silent.
- Impact: the new timeout may not release a genuinely stuck/silent session lane while another Codex session is active, so the run can still wait for the much longer outer timeout.
- Suggested fix: only touch the terminal idle activity for notifications and server requests after confirming they are for the current thread/turn, or split terminal-idle activity from global app-server activity and scope it before resetting the timer.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes in principle: start two concurrent Codex app-server runs on the shared client, make run A accept `turn/start` and emit no scoped progress, then emit periodic scoped progress for run B before A’s `turnTerminalIdleTimeoutMs`. A’s timeout will keep being pushed out because A’s handler receives B’s notifications before filtering.
- Is this the best way to solve the issue? Yes: the timer is meant to detect silence for the accepted turn, so the activity source should be scoped to that turn.

## Reviewed

- Diff: `126dcb0d9e6a05e219fe737d2aa5b0118d61a326..54e6e3d7daf5d0d857edf756b35628a29d11c7f5`
- Changed files: `docs/concepts/agent-loop.md`, `docs/concepts/queue.md`, `extensions/codex/src/app-server/run-attempt.test.ts`, `extensions/codex/src/app-server/run-attempt.ts`
- Code read: full changed implementation/test files; Codex app-server client factory, shared client, client notification fan-out, event projector scoping, queue/concurrency docs.
- Dependencies/web: no external lookup needed.
- Commands: `pnpm docs:list`, `git diff`, `git show`, `pnpm install`, `pnpm test extensions/codex/src/app-server/run-attempt.test.ts`, `git diff --check ...`

## Tests / Live Checks

- `pnpm test extensions/codex/src/app-server/run-attempt.test.ts` passed: 40 tests.
- Initial test run failed because `node_modules` was missing; `pnpm install` succeeded, then the retry passed.

## Limitations

- I did not add a reproducer test because this was a report-only review.
```
