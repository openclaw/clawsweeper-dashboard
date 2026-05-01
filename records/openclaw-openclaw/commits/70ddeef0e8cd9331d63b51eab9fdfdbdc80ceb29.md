---
sha: 70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29
parent: 52b57d0953413891c0fe61e120e6fd88da196ee9
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T01:18:14+01:00"
commit_committed_at: "2026-04-30T01:18:18+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T00:21:34+00:00
---

# Commit 70ddeef0

## Summary

The commit updates test expectations, but the checked-out code still returns `available: false` for the affected unauthenticated model-list rows. The focused test file now fails on `main`.

## Findings

### Medium: Updated model-list availability expectations fail against current implementation

- Kind: regression
- File: `src/commands/models/list.list-command.forward-compat.test.ts`
- Line: 575
- Evidence: `pnpm test src/commands/models/list.list-command.forward-compat.test.ts packages/sdk/src/index.test.ts` fails three assertions. The received rows are `available: false`, but this commit changed expectations to `available: true` at lines 575, 676, and 824. The implementation still computes availability from `availableKeys` or provider auth in `src/commands/models/list.model-row.ts:53`, so the unauthenticated `moonshot` and `anthropic` fixtures remain unavailable.
- Impact: The targeted command/model test lane is red on this commit, so CI or changed-file validation will fail before maintainers can rely on the suite.
- Suggested fix: Revert these three expectations to `available: false`, or intentionally change the runtime availability semantics and update the docs/tests together.
- Confidence: high

## Reviewed

- Diff: `52b57d0953413891c0fe61e120e6fd88da196ee9..70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29`
- Changed files: `packages/sdk/src/index.test.ts`, `src/commands/models/list.list-command.forward-compat.test.ts`
- Code read: full changed tests, `src/commands/models/list.list-command.ts`, `list.row-sources.ts`, `list.rows.ts`, `list.model-row.ts`, `list.auth-index.ts`, `list.source-plan.ts`, `list.registry-load.ts`
- Docs read: `docs/cli/models.md`
- Dependency/web: no dependency changes; no web lookup needed

## Tests / Live Checks

- `pnpm docs:list` succeeded.
- `pnpm install` succeeded after the first test attempt found missing `node_modules`.
- `pnpm test src/commands/models/list.list-command.forward-compat.test.ts packages/sdk/src/index.test.ts` failed: SDK tests passed, model forward-compat tests failed 3 assertions.
- `git diff --check 52b57d0953413891c0fe61e120e6fd88da196ee9..70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29` passed.

## Limitations

- I did not run a broad gate because the focused changed-file test already reproduces the regression.
