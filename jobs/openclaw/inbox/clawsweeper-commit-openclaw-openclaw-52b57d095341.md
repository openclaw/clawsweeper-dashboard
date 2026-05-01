---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-52b57d095341
mode: autonomous
allowed_actions:
  - comment
  - label
  - fix
  - raise_pr
blocked_actions:
  - close
  - merge
require_human_for:
  - close
  - merge
canonical: []
candidates: []
cluster_refs: []
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: false
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-52b57d095341
source: clawsweeper_commit
commit_sha: 52b57d0953413891c0fe61e120e6fd88da196ee9
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/52b57d0953413891c0fe61e120e6fd88da196ee9.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-52b57d095341`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/52b57d0953413891c0fe61e120e6fd88da196ee9
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/52b57d0953413891c0fe61e120e6fd88da196ee9.md
- Latest main at intake: fabfab2b84d23bf3089a3fae6859f71f93bfc40e

## ClawSweeper Report

```md
---
sha: 52b57d0953413891c0fe61e120e6fd88da196ee9
parent: 0b59964ec945adaf05d75d1b1a67d510f7208ffa
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T01:16:38+01:00"
commit_committed_at: "2026-04-30T01:16:38+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T00:20:39+00:00
---

# Commit 52b57d0

## Summary

Found one low-severity launcher regression in an environment edge case.

## Findings

### Low: Empty `NODE_COMPILE_CACHE` makes packaged launcher write cache under the caller CWD

- Kind: bug
- File: `openclaw.mjs`
- Line: 76
- Evidence: `resolvePackagedCompileCacheDirectory()` treats `NODE_COMPILE_CACHE` as the base directory whenever the variable is defined, so `NODE_COMPILE_CACHE=` becomes `path.join("", "openclaw", ...)`, a relative `openclaw/...` cache path. The TypeScript helper does not have the same behavior: `src/entry.compile-cache.ts:75` only uses `env.NODE_COMPILE_CACHE` when it is truthy, otherwise it falls back to `os.tmpdir()`.
- Impact: Users or service environments with an empty exported `NODE_COMPILE_CACHE` now create `openclaw/<version>/<marker>/...` cache directories in whatever directory they run `openclaw` from. That can pollute project directories or silently disable the intended temp-cache behavior. Before this commit, `module.enableCompileCache()` with the empty env fell back to `/tmp/node-compile-cache` in the local Node probe.
- Suggested fix: Match `src/entry.compile-cache.ts` in `openclaw.mjs`: only use `process.env.NODE_COMPILE_CACHE` when it is a non-empty string, otherwise use `path.join(os.tmpdir(), "node-compile-cache")`. Add a launcher e2e test for `NODE_COMPILE_CACHE: ""`.
- Confidence: high

## Reviewed

- Diff: `0b59964ec945adaf05d75d1b1a67d510f7208ffa..52b57d0953413891c0fe61e120e6fd88da196ee9`
- Changed files: `CHANGELOG.md`, `openclaw.mjs`, `scripts/lib/workspace-bootstrap-smoke.mjs`, `scripts/release-check.ts`, `src/entry.compile-cache.test.ts`, `src/entry.compile-cache.ts`, `test/openclaw-launcher.e2e.test.ts`, `test/release-check.test.ts`
- Code read: full changed files, previous versions of launcher/cache helper, `src/entry.ts`, `src/entry.respawn.ts`, related compile-cache docs and tests
- GitHub: commit-to-PR lookup returned no associated PRs

## Tests / Live Checks

- `pnpm test src/entry.compile-cache.test.ts test/openclaw-launcher.e2e.test.ts test/release-check.test.ts` passed.
- `pnpm exec oxfmt --check --threads=1 ...` passed for touched files.
- `git diff --check 0b59964ec945adaf05d75d1b1a67d510f7208ffa..52b57d0953413891c0fe61e120e6fd88da196ee9` passed.
- Focused probe reproduced the issue: copied `openclaw.mjs` into a temp packaged fixture, ran it from a separate temp CWD with `NODE_COMPILE_CACHE=`, and observed `module.getCompileCacheDir()` under `<cwd>/openclaw/...`.

## Dependency / Web Checks

- Checked Node’s `node:module` compile-cache contract. Node documents that `enableCompileCache()` uses `NODE_COMPILE_CACHE=dir` when set, otherwise defaults to `path.join(os.tmpdir(), "node-compile-cache")`, and `getCompileCacheDir()` returns the active directory or `undefined`. ([nodejs.org](https://nodejs.org/download/release/v22.17.0/docs/api/module.html))
- Local Node v24.14.1 probes confirmed `NODE_COMPILE_CACHE=` leaves `getCompileCacheDir()` undefined before explicit enablement, while `enableCompileCache()` without an argument falls back to `/tmp/node-compile-cache`.

## Limitations

- Did not run full `pnpm check:changed`; targeted tests covered the touched launcher/cache and release-check helper paths.
```
