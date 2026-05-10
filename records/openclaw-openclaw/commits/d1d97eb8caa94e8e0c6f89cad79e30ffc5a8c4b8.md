---
sha: d1d97eb8caa94e8e0c6f89cad79e30ffc5a8c4b8
parent: 5534c2e480c14779316db5ed111d13a4ead730e3
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-10T07:52:19+01:00"
commit_committed_at: "2026-05-10T07:52:24+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-10T20:08:30Z
---

# Commit d1d97eb8ca

## Summary

I found one low-severity test regression in the matcher cleanup. Runtime Telegram dispatch code was not changed.

## Findings

### Low: Single-reply assertions no longer reject extra batched replies

- Kind: test_gap
- File: `extensions/telegram/src/bot-message-dispatch.test.ts`
- Line: 327
- Evidence: `expectDeliveredReply()` only checks `replies[index]`. The commit replaced several prior assertions shaped as `replies: [expect.objectContaining(...)]`, which also rejected extra items in the same `replies` array. Current covered paths such as progress-mode final delivery, media fallback, and error fallback now pass as long as `replies[0]` is correct, even if the dispatch code adds a second stale or duplicate reply in the same delivery call.
- Impact: A concrete Telegram regression where one final response path emits an extra message in a single `deliverReplies({ replies: [...] })` call would no longer be caught by these tests. Current dispatch still sends normal payloads as a one-item array at `extensions/telegram/src/bot-message-dispatch.ts:1024`, so this is a test coverage regression rather than a live runtime regression from this commit.
- Suggested fix: Make `expectDeliveredReply()` assert the expected reply count by default, or add a separate helper for single-reply delivery that checks `replies` length before validating the indexed item.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes, by inspection: if a tested path calls `deliverReplies` with `[expectedReply, extraReply]`, the new helper still passes because it only reads `replies[0]`.
- Is this the best way to solve the issue? yes, keeping the helper while adding an exact-count assertion preserves the cleanup intent and restores the old single-reply guard.

## Reviewed

- Diff: `5534c2e480c14779316db5ed111d13a4ead730e3..d1d97eb8caa94e8e0c6f89cad79e30ffc5a8c4b8`
- Changed files: `extensions/telegram/src/bot-message-dispatch.test.ts`
- Code read: changed test file, current `extensions/telegram/src/bot-message-dispatch.ts`, Telegram delivery call paths
- Dependencies/web: no dependency changes; no web lookup needed
- Commands: `git show`, `git diff`, `rg`, `sed`, `nl`, `git diff --check`, `pnpm install`, `pnpm test extensions/telegram/src/bot-message-dispatch.test.ts`

## Tests / Live Checks

- `pnpm test extensions/telegram/src/bot-message-dispatch.test.ts` passed: 48 tests.
- Initial test run was blocked by missing `node_modules`; `pnpm install` completed with the lockfile already up to date, then the retry passed.

## Dependency / Web Checks

- No dependency files changed.
- No external facts were needed.

## Limitations

- I did not run the full suite because the commit is a narrow test-only change.
