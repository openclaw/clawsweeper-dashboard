---
sha: 9b53a95d8e5d515aa7ef60ddde96eeaebead36c0
parent: cd1846a313bbd556c543723d8260a84d7b3c0e3a
repository: openclaw/openclaw
author: "samzong"
committer: "Peter Steinberger"
github_author: samzong
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-17T00:28:07+08:00"
commit_committed_at: "2026-05-16T18:57:58+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-16T18:08:17Z
---

# Commit 9b53a95

## Summary

Found two restart-queue edge cases that still exist on current `main`. The focused run-loop tests pass, and a follow-up commit already fixed the most obvious queued-startup hang, but update restart handling still has gaps in the no-server/no-lock and coalescing paths.

## Findings

### Medium: unhealthy update respawn can resume the gateway without reacquiring the lock

- Kind: reliability
- File: `src/cli/gateway-cli/run-loop.ts`
- Line: 197
- Evidence: In the update restart `spawned` fallback, an unhealthy child is killed and the parent only reacquires the gateway lock when `hadLock` is true. The same function now unconditionally reacquires in the other in-process fallback branches at `src/cli/gateway-cli/run-loop.ts:239` and `src/cli/gateway-cli/run-loop.ts:297`, which is the right shape for recovery after restart startup failures.
- Impact: After a restart startup failure, the loop deliberately releases the gateway lock while staying alive. A later `update.run` restart on an unmanaged install can spawn a replacement child; if that child never becomes healthy, this branch skips reacquiring the lock and resolves the loop. The next `params.start()` can bring the parent gateway back without the single-instance lock, weakening daemon management and duplicate-instance protection.
- Suggested fix: Drop the `hadLock &&` guard in the unhealthy spawned-update fallback, matching the disabled/failed update fallback. Add a run-loop test that first releases the lock through a restart-startup failure, then sends an `update.run` SIGUSR1 with `respawnGatewayProcessForUpdate()` returning `spawned` and `waitForHealthyChild()` returning false.
- Confidence: high

### Medium: queued startup restarts cannot be upgraded to `update.run`

- Kind: reliability
- File: `src/cli/gateway-cli/run-loop.ts`
- Line: 593
- Evidence: Once a startup restart is queued, `shuttingDown` is true. The request path only lets a `stop` override `pendingStartupRequest`; any later restart signal is logged as “during shutdown; ignoring.” `update.run` is intentionally priority-preserved elsewhere in restart scheduling, but that priority is lost after the first startup request has been stored.
- Impact: If a generic startup restart is queued first and an `update.run` restart signal arrives before the close handle is available, the pending request remains non-update. Flushing it takes the generic restart path instead of the hard respawn path required after package updates, risking an in-process restart against a replaced on-disk package.
- Suggested fix: When `pendingStartupRequest && !server` and a later restart arrives, merge or replace the pending request when the new request has higher priority, especially `restartReason === "update.run"` or a stronger restart intent. Add a test that queues a generic startup restart, sends an `update.run` SIGUSR1 before startup returns, and asserts the update respawn path is used.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes for the lock issue with a focused unit test using existing run-loop mocks; the update-upgrade issue is also unit-testable by controlling two startup-window SIGUSR1 reasons, though I did not live-run a daemon/update sequence.
- Is this the best way to solve the issue? Yes for the lock issue: it should match the sibling unconditional reacquire fallbacks. For the update-upgrade issue, preserving the highest-priority pending restart is safer than accepting duplicate restart execution.

## Reviewed

- Diff: `cd1846a313bbd556c543723d8260a84d7b3c0e3a..9b53a95d8e5d515aa7ef60ddde96eeaebead36c0`
- Changed files: `src/cli/gateway-cli/run-loop.ts`, `src/cli/gateway-cli/run-loop.test.ts`
- Code read: current `src/cli/gateway-cli/run-loop.ts`, `src/cli/gateway-cli/run-loop.test.ts`, `src/cli/gateway-cli/run.ts`, `src/gateway/server.impl.ts`, `src/infra/process-respawn.ts`, `src/infra/restart.ts`, `src/infra/gateway-lock.ts`, `src/process/command-queue.ts`
- Dependencies/web: no package changes; inspected GitHub issue `openclaw/openclaw#35862` and PR `openclaw/openclaw#82660`
- Commands: `git show`, `git diff`, `rg`, `gh issue view 35862`, `gh pr view 82660`, `pnpm install`, `node scripts/run-vitest.mjs src/cli/gateway-cli/run-loop.test.ts`

## Tests / Live Checks

- `node scripts/run-vitest.mjs src/cli/gateway-cli/run-loop.test.ts`: passed, 26 tests.
- Initial test attempt failed because `vitest` was missing; `pnpm install` completed and left the worktree clean.

## Limitations

- No live unmanaged update/respawn daemon was run; findings are based on code-path tracing plus focused unit-test coverage gaps.
