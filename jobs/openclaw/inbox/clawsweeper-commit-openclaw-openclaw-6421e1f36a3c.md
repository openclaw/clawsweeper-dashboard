---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-6421e1f36a3c
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-6421e1f36a3c
source: clawsweeper_commit
commit_sha: 6421e1f36a3cfdf3ab1b4502b36fe718e0d662d3
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/6421e1f36a3cfdf3ab1b4502b36fe718e0d662d3.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-6421e1f36a3c`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/6421e1f36a3cfdf3ab1b4502b36fe718e0d662d3
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/6421e1f36a3cfdf3ab1b4502b36fe718e0d662d3.md
- Latest main at intake: a6390efeba3ce19869c0d2d2eb53be2aa3092ae3

## ClawSweeper Report

```md
---
sha: 6421e1f36a3cfdf3ab1b4502b36fe718e0d662d3
parent: 57a3d7f6e897f25073e313d5c24b6fb6f60575ae
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T03:34:32+01:00"
commit_committed_at: "2026-04-30T03:35:09+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T02:39:04Z
---

# Commit 6421e1f

## Summary

Found one regression in the new gateway model catalog cache: it treats an empty catalog as a successful cached catalog, which breaks the underlying retry-on-empty contract.

## Findings

### Medium: Gateway caches transient empty model catalogs until reload/restart

- Kind: regression
- File: `src/gateway/server-model-catalog.ts`
- Line: 49
- Evidence: `startGatewayModelCatalogRefresh()` assigns `lastSuccessfulCatalog = catalog` for every resolved array, including `[]`. Later, `loadGatewayModelCatalog()` returns `lastSuccessfulCatalog` whenever it is truthy, and empty arrays are truthy in JS. The underlying loader explicitly avoids caching empty results at `src/agents/model-catalog.ts:215` because an empty catalog can come from transient dependency/filesystem/provider issues and should be retried.
- Impact: if the first gateway catalog load returns `[]`, `models.list`, TUI model surfaces, session/model metadata helpers, and related gateway callers keep seeing no models until a model config reload or process restart. This is worse than the prior behavior, where the next request retried immediately.
- Suggested fix: preserve the underlying no-cache-on-empty behavior in the gateway wrapper. Do not mark an empty result as fresh; keep the cache stale or clear it so the next call retries. Add a regression test where the injected loader returns `[]` once and a non-empty catalog on the second call.
- Confidence: high

## Reviewed

- Diff: `57a3d7f6e897f25073e313d5c24b6fb6f60575ae..6421e1f36a3cfdf3ab1b4502b36fe718e0d662d3`
- Changed files: `CHANGELOG.md`, `src/gateway/server-model-catalog.ts`, `src/gateway/server-model-catalog.test.ts`, `src/gateway/server-reload-handlers.ts`
- Code read: gateway model catalog wrapper, underlying `src/agents/model-catalog.ts`, reload handling, request context wiring, `models.list`, HTTP model override, session/model support call paths
- GitHub refs read: https://github.com/openclaw/openclaw/issues/74135, https://github.com/openclaw/openclaw/issues/74630, https://github.com/openclaw/openclaw/issues/74633

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` after the first targeted test failed because `node_modules` was missing
- `pnpm test src/gateway/server-model-catalog.test.ts -- --reporter=verbose` passed
- Injected smoke with first loader call returning `[]` and second returning a model produced `{"first":[],"second":[],"calls":1}`, confirming the retry is suppressed
- `git diff --check 57a3d7f6e897f25073e313d5c24b6fb6f60575ae..6421e1f36a3cfdf3ab1b4502b36fe718e0d662d3`

## Dependency / Web Checks

- No dependency files changed.
- No general web lookup needed; GitHub issue context was sufficient.

## Limitations

- Full suite and live gateway smoke were not run; review used focused gateway tests and an injected runtime proof.
```
