---
sha: 6b82eaa2cd03a969b2bca10bb42fbbae8f2f28d3
parent: 70e51b81cff8f7626acca33bad2e0cb5cd551b06
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-20T02:36:28+01:00"
commit_committed_at: "2026-05-20T02:36:52+01:00"
result: findings
confidence: high
highest_severity: high
check_conclusion: failure
reviewed_at: 2026-05-20T01:47:47Z
---

# Commit 6b82eaa

## Summary

Found one concrete regression: the commit adds nullable package-version values directly into `NodeJS.ProcessEnv`, breaking core TypeScript checking.

## Findings

### High: Nullable compatibility host version breaks core typecheck

- Kind: regression
- File: `src/cli/update-cli/update-command.ts`
- Line: 1425
- Evidence: `readPackageVersion()` returns `Promise<string | null>`, but the new `OPENCLAW_COMPATIBILITY_HOST_VERSION: candidateHostVersion` env assignment requires `string | undefined`. The same issue exists in `src/infra/update-runner.ts:1490`. `node scripts/run-tsgo.mjs -p tsconfig.core.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/core.tsbuildinfo` fails with TS2322 at both lines.
- Impact: core typecheck is red on `main`, blocking the normal TS gate and any release/build path that requires it.
- Suggested fix: normalize before assigning to `ProcessEnv`, e.g. `OPENCLAW_COMPATIBILITY_HOST_VERSION: candidateHostVersion ?? undefined`, or spread the key only when the version is non-null. That preserves `resolveCompatibilityHostVersion()` fallback behavior when no candidate package version is available.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: run `node scripts/run-tsgo.mjs -p tsconfig.core.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/core.tsbuildinfo`.
- Is this the best way to solve the issue? yes: the new value is optional compatibility metadata, and the existing resolver already falls back when the env key is absent.

## Reviewed

- Diff: `70e51b81cff8f7626acca33bad2e0cb5cd551b06..6b82eaa2cd03a969b2bca10bb42fbbae8f2f28d3`
- Changed files: `src/cli/update-cli.test.ts`, `src/cli/update-cli/update-command.ts`, `src/commands/doctor.e2e-harness.ts`, `src/infra/update-runner.test.ts`, `src/infra/update-runner.ts`
- Code read: update package install paths, package update step verification, package version reader, command env typing, compatibility host version consumers.
- Dependencies/web: no web lookup needed; this is an internal TypeScript contract issue.

## Tests / Live Checks

- `pnpm install`: passed; no repo file changes.
- `node scripts/run-vitest.mjs src/infra/update-runner.test.ts src/cli/update-cli.test.ts`: passed, 157 tests.
- `node scripts/run-tsgo.mjs -p tsconfig.core.json --incremental --tsBuildInfoFile .artifacts/tsgo-cache/core.tsbuildinfo`: failed with TS2322 at `src/cli/update-cli/update-command.ts:1425` and `src/infra/update-runner.ts:1490`.
- `git diff --check 70e51b81cff8f7626acca33bad2e0cb5cd551b06..6b82eaa2cd03a969b2bca10bb42fbbae8f2f28d3`: passed.

## Dependency / Web Checks

- No dependency files changed.
- No external facts were required.

## Limitations

- Full suite and remote Crabbox/Testbox proof were not run because the focused core typecheck already produced a concrete blocking failure.
