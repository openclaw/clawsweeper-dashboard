---
sha: d8da04e58eeddc19c53a0df3ecee7b21dce6f263
parent: 8412b189df0a5c4698bce101430fa39b84b1e712
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-04T07:28:47+01:00"
commit_committed_at: "2026-05-04T07:28:57+01:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-04T06:35:03Z
---

# Commit d8da04e

## Summary

Found two actionable release-tooling issues that still exist on current `main`: the new beta smoke helper can lose the dispatched Telegram workflow run id, and the Parallels summary metadata misses npm tarball URLs for registry targets.

## Findings

### Medium: Telegram workflow dispatch can succeed but the helper fails before polling it

- Kind: reliability
- File: `scripts/release-beta-smoke.ts`
- Line: 183
- Evidence: `dispatchTelegram()` only parses `/actions/runs/<id>` from `gh workflow run` stdout and throws when absent. `gh workflow run --help` says the run URL is returned “if available”, and existing repo dispatch wrappers in `.github/workflows/full-release-validation.yml` first parse dispatch output, then fall back to `gh run list` before/after id discovery.
- Impact: `pnpm release:beta-smoke -- --beta betaN` can dispatch `NPM Telegram Beta E2E` successfully, then fail with `could not parse workflow run id`, leaving the run unpolled and its artifact/report undownloaded. In the default path this happens after the long Parallels phase, so the advertised full post-publish smoke does not produce its final Telegram proof.
- Suggested fix: capture `gh workflow run` stderr/stdout, but also snapshot `gh run list --workflow npm-telegram-beta-e2e.yml --event workflow_dispatch` before dispatch and fall back to locating the new run id, matching the existing workflow helper pattern.
- Confidence: medium

### Low: Registry tarball metadata is parsed from the wrong JSON shape

- Kind: bug
- File: `scripts/e2e/parallels/npm-update-smoke.ts`
- Line: 482
- Evidence: `resolveRegistryPackageMetadata()` runs `npm view <spec> version dist.tarball gitHead --json` but reads `parsed.dist?.tarball`. A live focused check returned JSON shaped as `{ "version": "2026.5.3-beta.4", "dist.tarball": "https://registry.npmjs.org/..." }`, so `metadata.tarball` stays empty.
- Impact: published beta/stable Parallels summaries report `update target tarball: n/a` and cannot fall back to extracting `dist/build-info.json` from the tarball when `gitHead` is absent. That weakens the provenance evidence this commit added for release validation.
- Suggested fix: either read `parsed["dist.tarball"]` or request `dist` from npm and parse `parsed.dist.tarball`; keep the existing nested handling if other npm versions return that shape.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Partially. The npm metadata issue was reproduced with `npm view openclaw@beta version dist.tarball gitHead --json`. I did not live-dispatch `NPM Telegram Beta E2E` because this is report-only and dispatching would mutate GitHub state; the failure path is static and matches repo code that already implements a fallback.
- Is this the best way to solve the issue? Yes for both: use the repo’s existing before/after run-list discovery pattern for dispatch robustness, and parse npm’s actual JSON key for tarball provenance.

## Reviewed

- Diff: `8412b189df0a5c4698bce101430fa39b84b1e712..d8da04e58eeddc19c53a0df3ecee7b21dce6f263`
- Changed files: `.agents/skills/openclaw-parallels-smoke/SKILL.md`, `.agents/skills/openclaw-qa-testing/SKILL.md`, `.github/workflows/npm-telegram-beta-e2e.yml`, `docs/help/testing.md`, `docs/reference/RELEASING.md`, `package.json`, `scripts/e2e/npm-telegram-live-docker.sh`, `scripts/e2e/parallels/npm-update-smoke.ts`, `scripts/release-beta-smoke.ts`
- Code read: changed files in current `main`, Parallels common/package helpers, Docker E2E helpers, Telegram live runner, existing workflow dispatch monitors, package acceptance caller.
- Dependencies/web: `gh workflow run --help`; live `npm view openclaw@beta version dist.tarball gitHead --json`.
- Commands: `pnpm docs:list`; `git show`; `git diff`; `rg`; `gh workflow list/run list`; `npm view`; `git diff --check`; `bash -n`; `node --check`; `package.json` JSON parse.

## Tests / Live Checks

- `git diff --check 8412b189df0a5c4698bce101430fa39b84b1e712..d8da04e58eeddc19c53a0df3ecee7b21dce6f263` passed.
- `bash -n scripts/e2e/npm-telegram-live-docker.sh scripts/e2e/parallels-npm-update-smoke.sh` passed.
- `node --check scripts/release-beta-smoke.ts` passed.
- Did not run Parallels, Docker live Telegram, or workflow dispatch because they are long-running and/or mutating.

## Dependency / Web Checks

- `gh` is available as `2.89.0`; help documents run URL return as conditional.
- `npm view openclaw@beta version dist.tarball gitHead --json` returned a dotted `dist.tarball` key, not nested `dist.tarball`.

## Limitations

- `node_modules` is not installed in this checkout, so I did not execute `pnpm release:beta-smoke` or TSX-backed package scripts.
- No GitHub workflow was dispatched, and no VM/Docker live lane was started, to keep the review read-only.
