---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-70ddeef0e8cd
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-70ddeef0e8cd
source: clawsweeper_commit
commit_sha: 70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-70ddeef0e8cd`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29.md
- Latest main at intake: fabfab2b84d23bf3089a3fae6859f71f93bfc40e

## ClawSweeper Report

```md
---
sha: 70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29
parent: 52b57d0953413891c0fe61e120e6fd88da196ee9
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T01:18:14+01:00"
commit_committed_at: "2026-04-30T01:18:18+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T00:21:34+00:00
---

# Commit 70ddeef0

## Summary

The commit updates test expectations, but the checked-out code still returns `available: false` for the affected unauthenticated model-list rows. The focused test file now fails on `main`.

## Findings

### Medium: Updated model-list availability expectations fail against current implementation

- Kind: regression
- File: `src/commands/models/list.list-command.forward-compat.test.ts`
- Line: 575
- Evidence: `pnpm test src/commands/models/list.list-command.forward-compat.test.ts packages/sdk/src/index.test.ts` fails three assertions. The received rows are `available: false`, but this commit changed expectations to `available: true` at lines 575, 676, and 824. The implementation still computes availability from `availableKeys` or provider auth in `src/commands/models/list.model-row.ts:53`, so the unauthenticated `moonshot` and `anthropic` fixtures remain unavailable.
- Impact: The targeted command/model test lane is red on this commit, so CI or changed-file validation will fail before maintainers can rely on the suite.
- Suggested fix: Revert these three expectations to `available: false`, or intentionally change the runtime availability semantics and update the docs/tests together.
- Confidence: high

## Reviewed

- Diff: `52b57d0953413891c0fe61e120e6fd88da196ee9..70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29`
- Changed files: `packages/sdk/src/index.test.ts`, `src/commands/models/list.list-command.forward-compat.test.ts`
- Code read: full changed tests, `src/commands/models/list.list-command.ts`, `list.row-sources.ts`, `list.rows.ts`, `list.model-row.ts`, `list.auth-index.ts`, `list.source-plan.ts`, `list.registry-load.ts`
- Docs read: `docs/cli/models.md`
- Dependency/web: no dependency changes; no web lookup needed

## Tests / Live Checks

- `pnpm docs:list` succeeded.
- `pnpm install` succeeded after the first test attempt found missing `node_modules`.
- `pnpm test src/commands/models/list.list-command.forward-compat.test.ts packages/sdk/src/index.test.ts` failed: SDK tests passed, model forward-compat tests failed 3 assertions.
- `git diff --check 52b57d0953413891c0fe61e120e6fd88da196ee9..70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29` passed.

## Limitations

- I did not run a broad gate because the focused changed-file test already reproduces the regression.
```
