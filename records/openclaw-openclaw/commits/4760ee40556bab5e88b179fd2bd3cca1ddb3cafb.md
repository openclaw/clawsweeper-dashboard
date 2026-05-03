---
sha: 4760ee40556bab5e88b179fd2bd3cca1ddb3cafb
parent: 2b82c05a7fb1de35da58fb84e4db55e813391713
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-03T13:20:23+01:00"
commit_committed_at: "2026-05-03T13:20:26+01:00"
result: findings
confidence: medium
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-03T12:25:54Z
---

# Commit 4760ee4

## Summary

Found one low-severity privacy regression in the `.dockerignore` cleanup. The DMG asset move itself looks consistent: current references point at `apps/macos/Packaging/*`, the files exist, and the deleted root assets have no remaining source references.

## Findings

### Low: Docker context no longer excludes accidental root `Users/` trees

- Kind: privacy
- File: `.dockerignore`
- Line: 60
- Evidence: The commit removes the prior `Users/` ignore entry from the large-root-tree ignore block. The main `Dockerfile` still does `COPY . .` at `Dockerfile:84`, so any accidental repo-root `Users/` directory is now sent in the Docker build context and copied into the build stage.
- Impact: On a local daemon this is usually contained, but with a remote/shared BuildKit builder it can leak locally copied home-directory contents or other private files outside the workstation. This is especially risky because the old ignore explicitly protected that path and the cleanup was about tracked root assets, not local home-directory clutter.
- Suggested fix: Restore `Users/` in `.dockerignore`; consider restoring the other non-asset local clutter ignores (`Peekaboo/`, `Core/`) separately from deleting the obsolete `assets/` entry.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes: create an untracked repo-root `Users/alice/secret.txt`, then build with the main Dockerfile; `.dockerignore` no longer excludes it before `COPY . .`.
- Is this the best way to solve the issue? Yes. Re-adding `Users/` is narrow, preserves the root asset cleanup, and avoids changing Docker build behavior elsewhere.

## Reviewed

- Diff: `2b82c05a7fb1de35da58fb84e4db55e813391713..4760ee40556bab5e88b179fd2bd3cca1ddb3cafb`
- Changed files: `.dockerignore`, `.oxfmtrc.jsonc`, `.oxlintrc.json`, `apps/macos/Packaging/dmg-background*.png`, deleted `assets/*`, `package.json`, `scripts/changed-lanes.mjs`, `scripts/create-dmg.sh`, changed tests.
- Code read: `scripts/changed-lanes.mjs`, `scripts/create-dmg.sh`, `scripts/package-mac-dist.sh`, `scripts/ci-changed-scope.mjs`, related tests, Docker ignore block, `Dockerfile`.
- Commands: `pnpm docs:list`; `git show`; `git diff`; `rg`; `git grep`; `node scripts/changed-lanes.mjs --base ... --head ... --json`; `git diff --check`; `pnpm install`; `pnpm test test/scripts/changed-lanes.test.ts src/scripts/ci-changed-scope.test.ts`; `pnpm exec oxfmt --check --threads=1 ...`; `bash -n scripts/create-dmg.sh scripts/package-mac-dist.sh`.

## Tests / Live Checks

- Passed: `pnpm test test/scripts/changed-lanes.test.ts src/scripts/ci-changed-scope.test.ts` (2 files, 56 tests).
- Passed: `git diff --check`.
- Passed: targeted `oxfmt --check`.
- Passed: shell syntax check for DMG packaging scripts and existence check for moved DMG background files.

## Dependency / Web Checks

- No web lookup needed.
- `package.json` only removed the obsolete `assets/` package file entry; lockfile unchanged.
- `pnpm install` was run once because `node_modules` was missing before targeted tests.

## Limitations

- Did not run macOS DMG creation in this Linux review environment; reviewed the packaging caller, script syntax, and moved asset paths instead.
