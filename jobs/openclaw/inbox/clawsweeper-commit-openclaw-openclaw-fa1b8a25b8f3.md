---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-fa1b8a25b8f3
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-fa1b8a25b8f3
source: clawsweeper_commit
commit_sha: fa1b8a25b8f34c506acb57b4b2758ed660add14b
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/fa1b8a25b8f34c506acb57b4b2758ed660add14b.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-fa1b8a25b8f3`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/fa1b8a25b8f34c506acb57b4b2758ed660add14b
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/fa1b8a25b8f34c506acb57b4b2758ed660add14b.md
- Latest main at intake: 1a9763f578085e54e0380337dea2b14825ad350e

## ClawSweeper Report

```md
---
sha: fa1b8a25b8f34c506acb57b4b2758ed660add14b
parent: ccb43f95cb179a15dee61ebbdb93a50eb51599e9
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "GitHub"
github_author: clawsweeper[bot]
github_committer: web-flow
co_authors: ["openclaw-clawsweeper[bot]"]
commit_authored_at: "2026-04-29T22:06:02-07:00"
commit_committed_at: "2026-04-29T22:06:02-07:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T05:24:33Z
---

# Commit fa1b8a25b8

## Summary

Found one actionable test-gap issue. The commit adds a cache-removal guard, but the guard only checks for the old action-input syntax and misses the current `docker buildx` `type=gha` cache path still present in the Install Smoke workflow.

## Findings

### Medium: Docker cache-removal guard misses the buildx GHA cache still in use

- Kind: test_gap
- File: `test/scripts/test-install-sh-docker.test.ts`
- Line: 214
- Evidence: The new assertions only reject literal `cache-from: type=gha,scope=openclaw-dockerfile-smoke` and `cache-to: type=gha,scope=openclaw-dockerfile-smoke`. Current `main` still sets `dockerfile_cache_scope="openclaw-dockerfile-smoke"` in `.github/workflows/install-smoke.yml:84`, passes it through `CACHE_SCOPE` at `.github/workflows/install-smoke.yml:257`, and invokes `docker buildx build` with `--cache-from "type=gha,scope=${CACHE_SCOPE}"` and `--cache-to "type=gha,scope=${CACHE_SCOPE},mode=max"` at `.github/workflows/install-smoke.yml:263`. A focused local check confirmed the added test passes while `type=gha` remains present.
- Impact: This guard can greenlight the same CI reliability behavior it is meant to prevent. Blacksmith’s Docker cache docs say external `cache-from`/`cache-to` directives can be removed when using the Blacksmith builder, and Docker documents `type=gha` as GitHub Actions cache backend usage with possible cache export timeout/rate-limit failures. ([docs.blacksmith.sh](https://docs.blacksmith.sh/blacksmith-caching/docker-builds))
- Suggested fix: Either remove the remaining `--cache-from/--cache-to type=gha` flags from the root smoke image build, or make the test assert against the actual current forms, such as `type=gha`, `--cache-from`, and `--cache-to` within the root Dockerfile smoke build. If the `buildx` GHA cache is intentional, rename/update the guard so it does not claim cache removal.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. `pnpm test test/scripts/test-install-sh-docker.test.ts` passes, while `rg -n "type=gha|cache-from|cache-to" .github/workflows/install-smoke.yml test/scripts/test-install-sh-docker.test.ts` shows the workflow still contains the variable-based `type=gha` cache flags.
- Is this the best way to solve the issue? yes for the stated guard: the regression test should match the actual workflow syntax, and the workflow should not retain the cache exporter if the intended behavior is removal.

## Reviewed

- Diff: `ccb43f95cb179a15dee61ebbdb93a50eb51599e9..fa1b8a25b8f34c506acb57b4b2758ed660add14b`
- Changed files: `test/scripts/test-install-sh-docker.test.ts`
- Code read: full touched test, current and parent `.github/workflows/install-smoke.yml`, `docs/ci.md`, `docs/help/testing.md`, adjacent install-smoke test history, PR 74585 body/checks.
- Dependencies/web: Blacksmith Docker build cache docs and Docker `gha` cache backend docs. ([docs.blacksmith.sh](https://docs.blacksmith.sh/blacksmith-caching/docker-builds))

## Tests / Live Checks

- `pnpm docs:list`
- `git diff --check ccb43f95cb179a15dee61ebbdb93a50eb51599e9..fa1b8a25b8f34c506acb57b4b2758ed660add14b -- test/scripts/test-install-sh-docker.test.ts`
- `pnpm test test/scripts/test-install-sh-docker.test.ts` after `pnpm install`: passed, 12 tests.
- Node text check: confirmed the added literal assertions are true while `type=gha` remains present.

## Limitations

- Did not run the live Blacksmith Install Smoke workflow.
- Initial focused test run failed because `node_modules` was missing; per repo instructions, `pnpm install` was run once and the same targeted test then passed.

https://github.com/openclaw/openclaw/pull/74585
```
