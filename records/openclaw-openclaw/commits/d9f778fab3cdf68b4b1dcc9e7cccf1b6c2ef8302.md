---
sha: d9f778fab3cdf68b4b1dcc9e7cccf1b6c2ef8302
parent: a483e43f80595755ba7876f0095318a38a7d3c46
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-02T08:35:19+01:00"
commit_committed_at: "2026-05-02T08:35:22+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-02T07:55:55Z
---

# Commit d9f778f

## Summary

Found one low-severity test regression. The changed compact-wrapper assertion now says delegated compaction should stay on the active transcript, but the test is not actually checking the rotation function used by current production code.

## Findings

### Low: Compact wrapper test no longer covers the rotation path it describes

- Kind: test_gap
- File: `src/agents/pi-embedded-runner/compact.hooks.test.ts`
- Line: 1353
- Evidence: The changed test asserts `rotateTranscriptAfterCompactionMock` is not called and expects no successor `sessionId`/`sessionFile`. But current `compactEmbeddedPiSession` wrapper imports and calls `rotateTranscriptFileAfterCompaction` when `truncateAfterCompaction` is true and the delegated result echoes the current `sessionId`/`sessionFile` (`src/agents/pi-embedded-runner/compact.queued.ts:176`). The harness only mocks `rotateTranscriptAfterCompaction`, not `rotateTranscriptFileAfterCompaction` (`src/agents/pi-embedded-runner/compact.hooks.harness.ts:461`), so the test can pass while the real wrapper still attempts rotation.
- Impact: This can hide the exact behavior the renamed test claims to protect. In a real transcript file, the wrapper may still rotate the active transcript and pass the successor transcript to maintenance, while the test reports that no rotation happens.
- Suggested fix: Either update production to skip `rotateTranscriptFileAfterCompaction` for delegated same-transcript results and assert that function is not called, or keep the old rotation contract and make the test explicitly mock/assert `rotateTranscriptFileAfterCompaction`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes. The source condition at `compact.queued.ts:176` matches the test setup: `result.ok`, `result.compacted`, `truncateAfterCompaction: true`, and delegated `sessionId`/`sessionFile` equal to params, so production calls `rotateTranscriptFileAfterCompaction`. The focused test suite still passes because it asserts the wrong mocked symbol.
- Is this the best way to solve the issue? Unclear. The right fix depends on intended contract: if delegated same-transcript compaction should stay active, production should change; if wrapper rotation is intended, the test expectation should revert and cover `rotateTranscriptFileAfterCompaction`.

## Reviewed

- Diff: `a483e43f80595755ba7876f0095318a38a7d3c46..d9f778fab3cdf68b4b1dcc9e7cccf1b6c2ef8302`
- Changed files: `src/agents/pi-embedded-runner/compact.hooks.test.ts`, `src/agents/pi-embedded-runner/run/attempt.spawn-workspace.context-engine.test.ts`, `src/agents/subagent-spawn.mode-session-diagnostics.test.ts`
- Code read: changed test files, compact wrapper, compaction successor transcript helpers, runtime context prompt helper, embedded attempt prompt path, subagent spawn/session diagnostics paths
- GitHub: reviewed issue `https://github.com/openclaw/openclaw/issues/67400`

## Tests / Live Checks

- `pnpm docs:list`
- `git diff --check a483e43f80595755ba7876f0095318a38a7d3c46..d9f778fab3cdf68b4b1dcc9e7cccf1b6c2ef8302`
- `pnpm test src/agents/pi-embedded-runner/compact.hooks.test.ts src/agents/pi-embedded-runner/run/attempt.spawn-workspace.context-engine.test.ts src/agents/subagent-spawn.mode-session-diagnostics.test.ts` passed: 3 files, 72 tests
- `pnpm install` was needed first because `node_modules` was missing

## Dependency / Web Checks

- No dependency files changed.
- No general web lookup needed.

## Limitations

- Full suite not run; this was a focused tests-only commit review.
