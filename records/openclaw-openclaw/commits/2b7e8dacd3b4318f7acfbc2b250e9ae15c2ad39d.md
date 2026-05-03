---
sha: 2b7e8dacd3b4318f7acfbc2b250e9ae15c2ad39d
parent: 01e2755dc3c74ebb2338d8ed97c4f01656e54b44
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-03T19:24:23+01:00"
commit_committed_at: "2026-05-03T19:24:38+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-03T18:29:35Z
---

# Commit 2b7e8dac

## Summary

Found one diagnostic-regression edge case: a liveness sample that is now debug-only can still consume the warning cooldown and suppress a later queued-work warning.

## Findings

### Low: Debug-only active liveness samples can throttle later blocking warnings

- Kind: reliability
- File: `src/logging/diagnostic.ts`
- Line: 297
- Evidence: `shouldEmitDiagnosticLivenessWarning` updates `lastDiagnosticLivenessWarnAt` for any open diagnostic work before the new severity predicate runs. The new `emitDiagnosticLivenessWarning` branch only calls `diag.warn` when work is queued/waiting or active work has sustained P99 event-loop delay; otherwise it logs debug. In `startDiagnosticHeartbeat`, a report is emitted only when either the event cooldown or warning cooldown allows it. So an active background sample with `eventLoopDelayP99Ms=21` and `eventLoopDelayMaxMs=1500` now logs debug but still sets both liveness cooldowns. If queued work arrives on the next heartbeat inside the 120s cooldown, the queued-work liveness warning is suppressed entirely until the cooldown expires. The added tests cover idle samples not suppressing later warnings, but idle samples do not set `lastDiagnosticLivenessWarnAt`; the active-debug case does.
- Impact: Gateway operators can miss the first liveness warning for newly queued or waiting work for up to `DEFAULT_LIVENESS_WARN_COOLDOWN_MS` after a benign active-work max-delay spike. That undercuts the commit’s stated split between quiet nonblocking diagnostics and preserved warnings for blocking work.
- Suggested fix: make the cooldown predicate use the same “console warning-worthy” condition as `emitDiagnosticLivenessWarning`, or only update `lastDiagnosticLivenessWarnAt` after deciding to call `diag.warn`. Keep the structured event cooldown separate if debug-only samples should still be recorded.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: with fake timers, start the heartbeat using a sample returning `p99=21/max=1500`, mark one session `processing`, advance 30s, then queue a message and return a queued/sustained liveness sample before 120s elapses. The second sample will not call `diagnosticLogger.warn` because both cooldown predicates have already been consumed.
- Is this the best way to solve the issue? yes: the low-risk fix is to align cooldown accounting with the same severity predicate introduced by this commit, rather than changing diagnostic event payloads or the public logging contract.

## Reviewed

- Diff: `01e2755dc3c74ebb2338d8ed97c4f01656e54b44..2b7e8dacd3b4318f7acfbc2b250e9ae15c2ad39d`
- Changed files: `CHANGELOG.md`, `docs/gateway/diagnostics.md`, `src/logging/diagnostic.test.ts`, `src/logging/diagnostic.ts`
- Code read: full `src/logging/diagnostic.ts`, full `src/logging/diagnostic.test.ts`, `src/logging/diagnostic-session-attention.ts`, relevant `src/logging/diagnostic-stability.ts`, `src/infra/diagnostic-events.ts`, docs diagnostics page
- Dependencies/web: no external dependency or web evidence was needed; `gh pr list` found no matching PR for the SHA

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because `node_modules` was missing
- `pnpm test src/logging/diagnostic.test.ts` passed: 28 tests
- `git diff --check 01e2755dc3c74ebb2338d8ed97c4f01656e54b44..2b7e8dacd3b4318f7acfbc2b250e9ae15c2ad39d` passed

## Limitations

- I did not add a temporary regression test to the worktree because this was a report-only review.
