---
sha: aac9ebd4f3efff9de3176e36bd7bda00cc0f8df5
parent: 428cc541640f81ecc3c66469abfb9a5f1849debb
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-10T05:09:16+01:00"
commit_committed_at: "2026-05-10T05:09:26+01:00"
result: findings
confidence: medium
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-10T15:36:00Z
---

# Commit aac9ebd

## Summary

Found one narrow data-loss risk in the new pre-build cleanup. It is limited to untracked source-tree declaration files under `extensions/`, so I would not fail the commit check, but it is concrete and reproducible.

## Findings

### Low: build can delete untracked hand-written plugin declaration files

- Kind: data_loss
- File: `scripts/tsdown-build.mjs`
- Line: 135
- Evidence: `pruneUntrackedGeneratedSourceDeclarations()` asks Git for all untracked `extensions/**/*.d.ts` files, then removes any candidate with a same-basename `.ts`, `.tsx`, `.mts`, `.cts`, `.js`, `.mjs`, or `.cjs` sibling. This runs automatically before every `scripts/tsdown-build.mjs` build. The focused probe I ran in a temporary Git repo with `extensions/probe/index.js` and an untracked `extensions/probe/index.d.ts` returned `{"removed":1,"dtsExists":false}`. The build entry collector also treats top-level `.js`, `.mjs`, and `.cjs` files as valid plugin public surface entries in `scripts/lib/bundled-plugin-build-entries.mjs`.
- Impact: a developer adding or editing a bundled plugin that uses JavaScript plus a hand-written declaration file can lose the untracked `.d.ts` simply by running `pnpm build` before staging it. The same applies to any intentionally hand-written same-stem declaration beside a TypeScript source file. Because the cleanup is silent and uses `force: true`, there is no warning or recovery path unless the file was staged or backed up elsewhere.
- Suggested fix: only prune files that can be proven generated, for example by checking a generated-file banner or a dedicated generated output location. If that is not available, exclude JS-family siblings and avoid deleting untracked source-tree files without an explicit opt-in.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? yes. In a temp Git repo, create `extensions/probe/index.js` and untracked `extensions/probe/index.d.ts`, then call `pruneUntrackedGeneratedSourceDeclarations({ cwd })`; the declaration file is removed.
- Is this the best way to solve the issue? unclear. The cleanup addresses a real stale-generated-file problem, but matching only by basename is not enough to distinguish generated declarations from hand-written source declarations.

## Reviewed

- Diff: `428cc541640f81ecc3c66469abfb9a5f1849debb..aac9ebd4f3efff9de3176e36bd7bda00cc0f8df5`
- Changed files: `scripts/tsdown-build.mjs`, `test/scripts/tsdown-build.test.ts`
- Code read: full changed files, `scripts/AGENTS.md`, `extensions/AGENTS.md`, `scripts/lib/bundled-plugin-build-entries.mjs`, relevant plugin entrypoint docs and discovery/runtime build code
- Dependencies/web: no dependency changes; no web lookup needed

## Tests / Live Checks

- `pnpm test test/scripts/tsdown-build.test.ts` passed after `pnpm install`
- `git diff --check 428cc541640f81ecc3c66469abfb9a5f1849debb..aac9ebd4f3efff9de3176e36bd7bda00cc0f8df5` passed
- Temp-repo cleanup probe reproduced the deletion behavior

## Limitations

- I did not run the full build or broad changed gate; this review focused on the touched build wrapper and its direct contracts.
