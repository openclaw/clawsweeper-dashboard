---
sha: 0b1fbeabed8e4b03c542fb4ca81e00267fb4bcde
parent: fd5e6ae9f16ff273a3f78c8344a90d76d89a1d4d
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-03T13:30:18+01:00"
commit_committed_at: "2026-05-03T13:30:35+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-03T12:36:07Z
---

# Commit 0b1fbea

## Summary

Found one concrete startup regression in the lazy cron wrapper, plus one related lifecycle race worth fixing in the same area.

## Findings

### Medium: Wake requests can be silently dropped before lazy cron has loaded

- Kind: bug
- File: `src/gateway/server-cron-lazy.ts`
- Line: 86
- Evidence: `wake()` now returns `{ ok: false }` and only kicks off `load()` when `loaded` is still null; it does not forward the wake after loading. The added test at `src/gateway/server-cron-lazy.test.ts:65` asserts that exact behavior and also asserts the real cron `wake` is not called. The gateway `wake` handler then responds successfully with that result at `src/gateway/server-methods/cron.ts:179`, while `openclaw system event` prints plain `ok` for any successful RPC result at `src/cli/system-cli.ts:60`. This regresses the documented contract that `openclaw system event` enqueues a main-session system event and optionally triggers heartbeat immediately (`docs/cli/system.md:34`). The startup window is real because the server starts listening at `src/gateway/server.impl.ts:1290`, but cron is not started until `src/gateway/server.impl.ts:1429`, and `wake` is not in `STARTUP_UNAVAILABLE_GATEWAY_METHODS`.
- Impact: A CLI, tool, or RPC client that sends `wake` during that startup window can get a successful RPC response while the system event and immediate heartbeat are not enqueued.
- Suggested fix: Do not use `{ ok: false }` as a lazy-load placeholder for valid wake input. Either implement `wake` in the lazy wrapper using the lightweight enqueue/request-heartbeat dependencies, or make the handler await cron loading and forward the call before responding.
- Confidence: high

### Low: Stop/reload does not cancel an in-flight lazy cron start

- Kind: concurrency
- File: `src/gateway/server-cron-lazy.ts`
- Line: 47
- Evidence: `start()` awaits `load()` and then starts the resolved cron service, but `stop()` only calls through when `loaded` is already set. If close or config reload calls `stop()` while the dynamic import is still in flight, it is a no-op. The close path calls `params.cron.stop()` at `src/gateway/server-close.ts:296`; cron reload similarly stops the current service before replacing it at `src/gateway/server-reload-handlers.ts:333`.
- Impact: A shutdown or cron-restarting config reload racing with lazy import can leave the old cron service starting after it was supposed to be stopped, potentially leaving a timer alive or briefly running two cron schedulers after reload.
- Suggested fix: Track `stopRequested`/generation state in the lazy wrapper. If stop happens during `loading`, apply it when loading resolves and prevent `start()` from arming the old service.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes for the wake loss: the added `server-cron-lazy` test proves a valid wake before load returns `{ ok: false }` and is not replayed. A full live reproduction would connect after HTTP bind and before the delayed cron start.
- Is this the best way to solve the issue? Yes directionally: valid wake requests should be executed or explicitly rejected, not accepted and dropped. The least invasive fix is to make lazy `wake` preserve the old synchronous behavior.

## Reviewed

- Diff: `fd5e6ae9f16ff273a3f78c8344a90d76d89a1d4d..0b1fbeabed8e4b03c542fb4ca81e00267fb4bcde`
- Changed files: `src/gateway/server-cron-lazy.ts`, `src/gateway/server-cron.ts`, `src/gateway/server-runtime-services.ts`, `src/gateway/server-startup-post-attach.ts`, `src/gateway/server.impl.ts`, and related tests.
- Code read: lazy cron wrapper, cron service contract/ops/timer, gateway wake handler, CLI system event path, startup unavailable methods, server startup/reload/close paths.
- Docs read: `docs/automation/cron-jobs.md`, `docs/cli/system.md`.
- Current main checked: commit is an ancestor of current `HEAD` (`706132c65518653c3acbd12cb8e59f1af6a718cd`).

## Tests / Live Checks

- `pnpm docs:list`
- `git diff --check fd5e6ae9f16ff273a3f78c8344a90d76d89a1d4d..0b1fbeabed8e4b03c542fb4ca81e00267fb4bcde`
- Initial targeted test failed because `node_modules` was missing.
- Ran `pnpm install`, then retried:
  `pnpm test src/gateway/server-cron-lazy.test.ts src/gateway/server-runtime-services.test.ts src/gateway/server-startup-post-attach.test.ts src/gateway/server-import-boundary.test.ts`
- Result: 4 files passed, 28 tests passed.

## Dependency / Web Checks

- No dependency files changed.
- No web lookup was needed.

## Limitations

- I did not run a full gateway live startup race or broad changed gate; this was a focused report-only commit review.
