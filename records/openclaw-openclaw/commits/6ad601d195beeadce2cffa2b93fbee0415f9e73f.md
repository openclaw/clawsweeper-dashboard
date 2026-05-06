---
sha: 6ad601d195beeadce2cffa2b93fbee0415f9e73f
parent: 8b9b849b19c46db8bbeb346123b311a8ed63df14
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-06T03:04:26+01:00"
commit_committed_at: "2026-05-06T03:04:27+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-06T02:10:18Z
---

# Commit 6ad601d

## Summary

The commit changes one archive hardlink test expectation, but the current locked archive implementation still returns the previous `destination-symlink-traversal` archive error. The focused test fails on current `main`.

## Findings

### Medium: archive hardlink guard test now expects the wrong error code

- Kind: regression
- File: `src/infra/archive.test.ts`
- Line: 283
- Evidence: The commit changed the expected rejection code to `"hardlink"`, but `@openclaw/fs-safe@0.1.1`’s `mergeExtractedTreeIntoDestination` catches `FsSafeError` codes `"hardlink"` and `"path-alias"` and rethrows `ArchiveSecurityError("destination-symlink-traversal")`. Running `pnpm test src/infra/archive.test.ts` fails this test with received code `"destination-symlink-traversal"`.
- Impact: The infra archive test lane is red on POSIX platforms, so changed-test or full test gates will fail even though the runtime behavior still matches the prior archive security contract.
- Suggested fix: Restore the expectation to `code: "destination-symlink-traversal"` with `Partial<ArchiveSecurityError>`, unless the intended contract is actually to expose `FsSafeError("hardlink")`; in that case, update `@openclaw/fs-safe` archive staging behavior first and then align the test.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: `pnpm test src/infra/archive.test.ts` fails at `src/infra/archive.test.ts:283` with `ArchiveSecurityError { code: "destination-symlink-traversal" }`.
- Is this the best way to solve the issue? yes: the base version expected `"destination-symlink-traversal"`, and the locked dependency still explicitly maps hardlink/path-alias failures to that archive-level error.

## Reviewed

- Diff: `8b9b849b19c46db8bbeb346123b311a8ed63df14..6ad601d195beeadce2cffa2b93fbee0415f9e73f`
- Changed files: `src/infra/archive.test.ts`
- Code read: `src/infra/archive.test.ts`, `src/infra/archive.ts`, `src/infra/fs-safe.ts`, `node_modules/@openclaw/fs-safe/dist/archive.js`, `node_modules/@openclaw/fs-safe/dist/archive-staging.js`, `node_modules/@openclaw/fs-safe/dist/root.js`, `node_modules/@openclaw/fs-safe/dist/errors.d.ts`
- Dependencies/web: installed and inspected locked `@openclaw/fs-safe@0.1.1`; no web lookup needed because the relevant behavior is in the lockfile-installed package.
- Commands: `pnpm docs:list`; `pnpm install`; `pnpm test src/infra/archive.test.ts`; `git diff --check 8b9b849b19c46db8bbeb346123b311a8ed63df14..6ad601d195beeadce2cffa2b93fbee0415f9e73f`

## Tests / Live Checks

- `pnpm test src/infra/archive.test.ts` failed: 1 failed, 15 passed.

## Limitations

- I did not run broader gates after the focused test reproduced the regression.
