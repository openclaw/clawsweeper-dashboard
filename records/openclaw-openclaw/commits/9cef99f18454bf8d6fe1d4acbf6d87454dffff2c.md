---
sha: 9cef99f18454bf8d6fe1d4acbf6d87454dffff2c
parent: ee61f79b901d48e585c0d377ef893ac98898c33f
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-23T20:12:35+01:00"
commit_committed_at: "2026-05-23T20:12:44+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-23T19:26:48+00:00
---

# Commit 9cef99f

## Summary

One actionable test reliability issue found. The workflow assertion change passed its focused check, but the updated Codex app-server test still hangs until Vitest’s 120s timeout.

## Findings

### Medium: Updated Codex diagnostic cleanup test still hangs until the global test timeout

- Kind: reliability
- File: `extensions/codex/src/app-server/run-attempt.test.ts`
- Line: 3238
- Evidence: The changed test adds cleanup around the run, but still awaits `run` without a bounded timeout after `harness.completeTurn`. Focused verification failed with `Error: Test timed out in 120000ms` at this test: `node scripts/run-vitest.mjs extensions/codex/src/app-server/run-attempt.test.ts -t "clears dynamic tool diagnostics|releases the turn after terminal dynamic tool responses" --run`. The paired terminal-release test passed in the same run, so the failure is isolated to `clears dynamic tool diagnostics after successful app-server tool responses`.
- Impact: This can block the Codex extension test lane for two minutes per failure and still leave the app-server attempt pending, which is exactly the failure mode this cleanup commit appears intended to reduce.
- Suggested fix: Make the final `await run` bounded in this test. Race it with a short cleanup timeout that closes the harness, aborts `abortController`, and then awaits `run.catch(() => {})`; only mark the run complete after `run` actually settles. Alternatively, adjust the test notification sequence so `runCodexAppServerAttempt` deterministically resolves before the unbounded await.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: run `OPENCLAW_VITEST_MAX_WORKERS=1 node scripts/run-vitest.mjs extensions/codex/src/app-server/run-attempt.test.ts -t "clears dynamic tool diagnostics|releases the turn after terminal dynamic tool responses" --run`.
- Is this the best way to solve the issue? yes: the test already injects an abort signal for cleanup, but the current cleanup cannot run while the test is blocked on the pending `run` promise.

## Reviewed

- Diff: `ee61f79b901d48e585c0d377ef893ac98898c33f..9cef99f18454bf8d6fe1d4acbf6d87454dffff2c`
- Changed files: `extensions/codex/src/app-server/run-attempt.test.ts`, `test/scripts/package-acceptance-workflow.test.ts`
- Code read: changed hunks, Codex app-server harness helpers, adjacent dynamic-tool tests, related abort/dynamic-tool paths in `extensions/codex/src/app-server/run-attempt.ts`, workflow assertion block, and `.github/workflows/full-release-validation.yml` dispatch helper.
- Dependencies/web: no web lookup needed; ran `pnpm install` once because the Vitest wrapper initially could not resolve `vitest`.

## Tests / Live Checks

- Failed: `OPENCLAW_VITEST_MAX_WORKERS=1 node scripts/run-vitest.mjs extensions/codex/src/app-server/run-attempt.test.ts -t "clears dynamic tool diagnostics|releases the turn after terminal dynamic tool responses" --run`
- Passed: `OPENCLAW_VITEST_MAX_WORKERS=1 node scripts/run-vitest.mjs test/scripts/package-acceptance-workflow.test.ts -t "requires pinned full release child workflows" --run`

## Dependency / Web Checks

- No dependency or external advisory change in the commit.
- No web checks were needed.

## Limitations

- Full suite not run; focused verification was enough to reproduce the changed Codex test failure.
