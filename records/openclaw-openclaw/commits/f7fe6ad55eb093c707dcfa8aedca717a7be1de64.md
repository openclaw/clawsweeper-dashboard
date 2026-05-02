---
sha: f7fe6ad55eb093c707dcfa8aedca717a7be1de64
parent: d4bdd40c9247ab8ee630de73aa50170296e6b56a
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-02T05:58:29+01:00"
commit_committed_at: "2026-05-02T05:58:57+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-02T05:20:11Z
---

# Commit f7fe6ad

## Summary

Found one low-severity test regression. The production change looks consistent with the upstream `SessionManager` contract, but one existing compact-hook test still mocks the old rotation export.

## Findings

### Low: Compact hook test still mocks the old transcript rotation export

- Kind: regression
- File: `src/agents/pi-embedded-runner/compact.queued.ts`
- Line: 179
- Evidence: The commit changes queued compaction rotation to call `rotateTranscriptFileAfterCompaction(...)`, but `src/agents/pi-embedded-runner/compact.hooks.harness.ts:466` only mocks `rotateTranscriptAfterCompaction`. The focused test `src/agents/pi-embedded-runner/compact.hooks.test.ts:1353` still expects that old mock to be called.
- Impact: The compact-hook test lane now fails for the owns-compaction wrapper rotation path, so changed-gate/CI coverage that includes this test will fail even though the runtime path may be correct.
- Suggested fix: Update the harness to mock `rotateTranscriptFileAfterCompaction` as well, or split the mock assertions so the queued wrapper test verifies the new file-rotation export.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: `pnpm test src/agents/pi-embedded-runner/compact.hooks.test.ts -- -t "rotates in the wrapper when a delegated result echoes the current transcript"` fails with `expected "vi.fn()" to be called 1 times, but got 0 times`.
- Is this the best way to solve the issue? yes: the changed production code intentionally moved away from `SessionManager.open()`, so the test harness should mock the new file-level helper instead of forcing the old helper.

## Reviewed

- Diff: `d4bdd40c9247ab8ee630de73aa50170296e6b56a..f7fe6ad55eb093c707dcfa8aedca717a7be1de64`
- Changed files: `CHANGELOG.md`, `src/agents/pi-embedded-runner/compact.queued.ts`, `compact.ts`, transcript rewrite/rotation/manual-boundary/tool-result files and their tests.
- Code read: changed files in full around transcript file state, rewrite, truncation, manual compaction hardening, queued/direct compaction rotation, and relevant callers.
- Dependencies/web: inspected installed `@mariozechner/pi-coding-agent@0.71.1` session manager source; no web lookup needed because no dependency changed.
- Commands: `pnpm docs:list`, `pnpm install`, focused transcript tests, custom label/rotation equivalence smoke, `git diff --check`, and the failing compact-hook reproducer.

## Tests / Live Checks

- Passed: `pnpm test src/agents/pi-embedded-runner/transcript-rewrite.test.ts src/agents/pi-embedded-runner/tool-result-truncation.test.ts src/agents/pi-embedded-runner/manual-compaction-boundary.test.ts src/agents/pi-embedded-runner/compaction-successor-transcript.test.ts`
- Passed: custom persisted label-remap and rotation equivalence smoke via `pnpm exec tsx --input-type=module --eval ...`
- Passed: `git diff --check d4bdd40c9247ab8ee630de73aa50170296e6b56a..f7fe6ad55eb093c707dcfa8aedca717a7be1de64`
- Failed: `pnpm test src/agents/pi-embedded-runner/compact.hooks.test.ts -- -t "rotates in the wrapper when a delegated result echoes the current transcript"`

## Limitations

- Did not run the full changed gate; the focused failing compact-hook test is already actionable.
