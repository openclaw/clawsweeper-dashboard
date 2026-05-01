---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-dac72374944f
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-dac72374944f
source: clawsweeper_commit
commit_sha: dac72374944f35fb89e21dce0f3f2299f27d03c9
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/dac72374944f35fb89e21dce0f3f2299f27d03c9.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-dac72374944f`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/dac72374944f35fb89e21dce0f3f2299f27d03c9
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/dac72374944f35fb89e21dce0f3f2299f27d03c9.md
- Latest main at intake: 7c51cd2baf1cca8de20b0133bc6bb00d2dc95dea

## ClawSweeper Report

```md
---
sha: dac72374944f35fb89e21dce0f3f2299f27d03c9
parent: fdba408bce35e9008573bd8046957e8af7db2e87
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-29T20:40:32+01:00"
commit_committed_at: "2026-04-29T20:40:42+01:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T19:50:00Z
---

# Commit dac7237

## Summary

Found one CI reliability regression risk in the install-smoke Docker cache change.

## Findings

### Medium: Install smoke now depends on GitHub Actions cache export despite using Blacksmith Docker caching

- Kind: reliability
- File: `.github/workflows/install-smoke.yml`
- Line: 117
- Evidence: The commit adds `cache-from: type=gha,scope=openclaw-dockerfile-smoke` and `cache-to: type=gha,scope=openclaw-dockerfile-smoke,mode=max` to the Blacksmith `useblacksmith/build-push-action` root Dockerfile smoke builds at `.github/workflows/install-smoke.yml:117` and `.github/workflows/install-smoke.yml:233`. Those jobs already set up `useblacksmith/setup-docker-builder`, and Blacksmith documents that Docker layer caching is provided by its Docker actions/sticky disk flow; it also says the GitHub Actions cache option in Docker build-push remains redirected to GitHub’s backend. Docker documents `type=gha` cache exports as GitHub cache backend usage and notes cache API throttling/export timeout failures can fail the build. ([docs.blacksmith.sh](https://docs.blacksmith.sh/blacksmith-caching/docker-builds))
- Impact: A successful smoke image build can still fail during cache export, blocking scheduled or release install-smoke validation for a non-product issue. This also does not match the new comment’s “Blacksmith builder hot” rationale, because the added `gha` exporter is not the Blacksmith Docker cache path.
- Suggested fix: Remove the explicit `cache-from`/`cache-to` entries and rely on `useblacksmith/setup-docker-builder`, or make the external exporter non-blocking with `ignore-error=true` if a secondary GitHub cache is intentionally desired.
- Confidence: medium

## Reviewed

- Diff: `fdba408bce35e9008573bd8046957e8af7db2e87..dac72374944f35fb89e21dce0f3f2299f27d03c9`
- Changed files: `.github/workflows/install-smoke.yml`, `.github/workflows/openclaw-live-and-e2e-checks-reusable.yml`, `scripts/docker/install-sh-e2e/run.sh`, `scripts/test-install-sh-e2e-docker.sh`, and the three touched `test/scripts/*.test.ts` files
- Code read: changed files, release workflow callers, live shard selector, gateway/video live-test env filters
- Dependencies/web: Blacksmith Docker/cache docs and Docker `gha` cache backend docs

## Tests / Live Checks

- `pnpm install`
- `bash -n scripts/docker/install-sh-e2e/run.sh scripts/test-install-sh-e2e-docker.sh`
- `git diff --check fdba408bce35e9008573bd8046957e8af7db2e87..dac72374944f35fb89e21dce0f3f2299f27d03c9`
- `pnpm test test/scripts/docker-build-helper.test.ts test/scripts/package-acceptance-workflow.test.ts test/scripts/test-install-sh-docker.test.ts`
- `pnpm exec oxfmt --check --threads=1 test/scripts/docker-build-helper.test.ts test/scripts/package-acceptance-workflow.test.ts test/scripts/test-install-sh-docker.test.ts`
- YAML parse check for the two touched workflows
- `node scripts/test-live-shard.mjs native-live-src-gateway-profiles --list`
- `node scripts/test-live-shard.mjs native-live-extensions-media-video --list`

## Limitations

- Did not run Blacksmith install-smoke or release workflows live.
- `actionlint` is not installed in this checkout.
```
