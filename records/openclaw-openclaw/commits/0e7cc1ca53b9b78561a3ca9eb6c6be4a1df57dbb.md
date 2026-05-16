---
sha: 0e7cc1ca53b9b78561a3ca9eb6c6be4a1df57dbb
parent: efabae2f9bf03a5ef1be8915ee235cce6f8d8106
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-05-16T08:47:05+08:00"
commit_committed_at: "2026-05-16T08:47:05+08:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-16T00:59:43Z
---

# Commit 0e7cc1c

## Summary

Found one low-severity local test-runner regression in the new Git-backed gateway target discovery.

## Findings

### Low: Gateway full-suite sharding now ignores untracked gateway server tests

- Kind: regression
- File: `scripts/test-projects.test-support.mjs`
- Line: 593
- Evidence: `listGatewayFilesFromGit()` calls `git ls-files -- src/gateway`, and `resolveGatewayServerFullSuiteTargets()` uses that result whenever Git exits successfully. In a temp Git repo with `src/gateway/server-old.test.ts` staged and `src/gateway/server-new.test.ts` untracked, `buildFullSuiteVitestRunPlans([], cwd)` returned only `server-old.test.ts`. With the staged file deleted from disk but not from the index, it still returned the deleted path.
- Impact: Local untargeted full-suite leaf runs can silently skip newly-created, untracked gateway server tests before they are added to Git, and can try to run deleted-but-unstaged tests. CI on a clean tracked checkout is likely unaffected, but local proof for gateway changes is less trustworthy than before this commit.
- Suggested fix: Keep the Git-backed path, but include working-tree state: combine cached and untracked files with ignored-file filtering, and filter returned paths to existing files before chunking.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. The temp Git repo checks above reproduce both the skipped untracked test and stale deleted-path behavior.
- Is this the best way to solve the issue? yes. Including untracked non-ignored files and filtering existing paths preserves the intended “avoid walking `src/gateway`” optimization while matching the previous filesystem-discovery behavior more closely.

## Reviewed

- Diff: `efabae2f9bf03a5ef1be8915ee235cce6f8d8106..0e7cc1ca53b9b78561a3ca9eb6c6be4a1df57dbb`
- Changed files: `scripts/test-projects.test-support.mjs`, `test/scripts/test-projects.test.ts`
- Code read: changed files in full, `scripts/test-projects.mjs`, adjacent full-suite sharding tests, scoped `scripts/AGENTS.md`
- Current tracked target sanity: current main produces 4 gateway-server plans, 103 unique targets, chunk sizes 26/26/26/25
- Dependencies/web: no dependency files changed; no web lookup needed

## Tests / Live Checks

- `pnpm install` after the first focused test attempt found missing `vitest`
- `node scripts/run-vitest.mjs test/scripts/test-projects.test.ts --reporter=verbose` passed: 82 tests
- `git diff --check efabae2f9bf03a5ef1be8915ee235cce6f8d8106..0e7cc1ca53b9b78561a3ca9eb6c6be4a1df57dbb` passed
- Temp Git repo probes confirmed the working-tree-only target selection regression

## Limitations

- Did not run the full suite or CI; the reviewed change is narrow and the focused runner test passed.
