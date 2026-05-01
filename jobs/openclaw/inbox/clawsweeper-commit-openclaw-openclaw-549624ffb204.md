---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-549624ffb204
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-549624ffb204
source: clawsweeper_commit
commit_sha: 549624ffb2046e5c1ca8a4e2c1057e9dbf294100
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/549624ffb2046e5c1ca8a4e2c1057e9dbf294100.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-549624ffb204`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/549624ffb2046e5c1ca8a4e2c1057e9dbf294100
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/549624ffb2046e5c1ca8a4e2c1057e9dbf294100.md
- Latest main at intake: 4b3f91c686968994d0af5629bbd29e48c22d60f1

## ClawSweeper Report

```md
---
sha: 549624ffb2046e5c1ca8a4e2c1057e9dbf294100
parent: 34d62b065067d3b8bb23d8b5d062eca890c4f9fb
repository: openclaw/openclaw
author: "HCL"
committer: "Peter Steinberger"
github_author: hclsys
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T07:22:11+08:00"
commit_committed_at: "2026-04-30T05:10:32+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T04:14:27+00:00
---

# Commit 549624f

## Summary

Found one concrete regression: the commit updates the implementation shape to include `skipped: false` on gateway-probe error paths, but two exact test expectations were not updated. The focused command test lane now fails.

## Findings

### Medium: Focused doctor gateway health tests fail after adding `skipped: false`

- Kind: regression
- File: `src/commands/doctor-gateway-health.test.ts`
- Line: 128
- Evidence: `probeGatewayMemoryStatus` now returns `skipped: false` for non-outer-timeout errors in `src/commands/doctor-gateway-health.ts:120`, but the expectations at `src/commands/doctor-gateway-health.test.ts:128` and `src/commands/doctor-gateway-health.test.ts:138` still use exact `toEqual` objects without that field. Running `OPENCLAW_VITEST_MAX_WORKERS=1 pnpm test src/commands/doctor-gateway-health.test.ts src/commands/doctor-memory-search.test.ts` fails both tests with received `+ "skipped": false`.
- Impact: The changed command test lane is red for this commit, so CI/changed-gate validation will fail even though the production behavior appears intentional.
- Suggested fix: Add `skipped: false` to the two stale expectations, or change them to `expect.objectContaining(...)` if exact return shape is not part of the assertion.
- Confidence: high

## Reviewed

- Diff: `34d62b065067d3b8bb23d8b5d062eca890c4f9fb..549624ffb2046e5c1ca8a4e2c1057e9dbf294100`
- Changed files: `src/commands/doctor-gateway-health.ts`, `src/commands/doctor-gateway-health.test.ts`, `src/commands/doctor-memory-search.ts`, `src/commands/doctor-memory-search.test.ts`
- Code read: changed files in full; `src/flows/doctor-health-contributions.ts`; `src/gateway/server-methods/doctor.ts`; relevant memory manager probe/cache contracts in `extensions/memory-core/src/memory/manager.ts`, `extensions/memory-core/src/memory/search-manager.ts`, and `packages/memory-host-sdk/src/host/types.ts`
- Issue context: inspected GitHub issue `https://github.com/openclaw/openclaw/issues/74608`
- Dependencies/web: no dependency changes; no external web lookup needed

## Tests / Live Checks

- `pnpm docs:list` succeeded
- `git diff --check 34d62b065067d3b8bb23d8b5d062eca890c4f9fb..549624ffb2046e5c1ca8a4e2c1057e9dbf294100` succeeded
- `pnpm install` was required because `node_modules` was missing
- `OPENCLAW_VITEST_MAX_WORKERS=1 pnpm test src/commands/doctor-gateway-health.test.ts src/commands/doctor-memory-search.test.ts` failed with the two stale expectations above

## Limitations

- Full suite not run after the focused changed-surface test failure.
```
