---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-df4faac71fd9
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-df4faac71fd9
source: clawsweeper_commit
commit_sha: df4faac71fd90abb61a0f74e24c97037f68436c9
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/df4faac71fd90abb61a0f74e24c97037f68436c9.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-df4faac71fd9`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/df4faac71fd90abb61a0f74e24c97037f68436c9
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/df4faac71fd90abb61a0f74e24c97037f68436c9.md
- Latest main at intake: 2d1523e573a821c71689677912a76e09c6c12ec4

## ClawSweeper Report

```md
---
sha: df4faac71fd90abb61a0f74e24c97037f68436c9
parent: c403ea906345edc62e0c623491e74eabb345481f
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T03:46:04+01:00"
commit_committed_at: "2026-04-30T03:46:18+01:00"
result: findings
confidence: high
highest_severity: high
check_conclusion: failure
reviewed_at: 2026-04-30T02:50:19+00:00
---

# Commit df4faac71f

## Summary

Found one high-confidence regression in the new package entry-file validation. It rejects valid npm packages whose `main` relies on Node’s normal extension resolution, and `jszip` is already in OpenClaw’s mirrored runtime-deps plan.

## Findings

### High: Valid `main` entries without a literal extension now fail runtime-deps repair

- Kind: regression
- File: `src/plugins/bundled-runtime-deps-materialization.ts`
- Line: 80
- Evidence: `hasInstalledRuntimeDepEntryFiles` now checks only `fs.existsSync(path.resolve(packageDir, main))`. The root package mirrors `jszip` (`package.json:1628`, `package.json:1753`), and `jszip@3.10.1` declares `"main": "./lib/index"` while the real file is `lib/index.js`. Local proof: `require.resolve('jszip')` resolves to `node_modules/jszip/lib/index.js`, but `isRuntimeDepSatisfied(root, { name: "jszip", version: "3.10.1" })` returned `false`; `assertBundledRuntimeDepsInstalled(root, ["jszip@^3.10.1"])` threw `package manager install did not place bundled runtime deps ... jszip@^3.10.1`.
- Impact: Packaged bundled-plugin runtime-deps plans include mirrored root deps via `collectMirroredPackageRuntimeDeps`, so any install/repair plan containing `jszip` can fail after npm/pnpm successfully installs a complete package. That can break bundled plugin startup/runtime-deps repair instead of only repairing incomplete `ajv`.
- Suggested fix: Validate package entrypoints with Node-compatible file resolution for `main` (`main`, `main.js`, `main.json`, `main.node`, and directory/package/index handling), or use `createRequire(packageJsonPath).resolve(depName)` with containment checks rather than literal `existsSync(mainPath)`.
- Confidence: high

## Reviewed

- Diff: `c403ea906345edc62e0c623491e74eabb345481f..df4faac71fd90abb61a0f74e24c97037f68436c9`
- Changed files: `CHANGELOG.md`, `src/plugins/bundled-runtime-deps-materialization.ts`, `src/plugins/bundled-runtime-deps.test.ts`
- Code read: runtime-deps materialization, install/finalize path, package-root mirroring selection, install-root planning, runtime root preparation, relevant test sections and fixtures
- Issue context: `gh issue view 74630`

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm test src/plugins/bundled-runtime-deps.test.ts -- --reporter=verbose` initially failed because `node_modules` was missing.
- `pnpm install`
- `pnpm test src/plugins/bundled-runtime-deps.test.ts -- --reporter=verbose` passed: 107 tests.
- Focused local probes confirmed `jszip` is valid for Node resolution but rejected by the new satisfaction check.

## Dependency / Web Checks

- Used installed lockfile dependency metadata for `jszip@3.10.1`; no web lookup was needed.

## Limitations

- Did not run broad `pnpm check:changed` because this is report-only and the focused test plus direct runtime-deps probes were enough to confirm the regression.

https://github.com/openclaw/openclaw/issues/74630
```
