---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-29de89a8d98c
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-29de89a8d98c
source: clawsweeper_commit
commit_sha: 29de89a8d98cdfb90fbe93922077ea821bafc9b2
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/29de89a8d98cdfb90fbe93922077ea821bafc9b2.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-29de89a8d98c`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/29de89a8d98cdfb90fbe93922077ea821bafc9b2
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/29de89a8d98cdfb90fbe93922077ea821bafc9b2.md
- Latest main at intake: 59982c2aa5aa983c5646431e51b59260c2c63ebb

## ClawSweeper Report

```md
---
sha: 29de89a8d98cdfb90fbe93922077ea821bafc9b2
parent: 204d200be3f942de95175aaf1ffae34a1b222ad5
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-29T23:58:38+01:00"
commit_committed_at: "2026-04-30T00:51:24+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T23:55:14Z
---

# Commit 29de89a

## Summary

Found one SDK regression in the new wait-status mapping.

## Findings

### Medium: SDK can report terminal Gateway timeouts as still accepted

- Kind: regression
- File: `packages/sdk/src/client.ts`
- Line: 67
- Evidence: The new mapping returns `accepted` for any `agent.wait` payload with `status: "timeout"` unless `stopReason` is timeout-like or `aborted` is present. But Gateway terminal lifecycle snapshots are built as `status: "timeout"` when lifecycle `data.aborted` is true, while `agent.wait` only forwards `status`, `startedAt`, `endedAt`, `error`, `stopReason`, `livenessState`, and `yielded`; it does not forward the original `aborted` flag. Existing SDK tests cover `{ status: "timeout", stopReason: "timeout" }`, but not the Gateway-supported terminal shape `{ status: "timeout", startedAt, endedAt }` with no `stopReason`.
- Impact: SDK callers waiting on a run that actually ended as a timeout can receive `status: "accepted"` and no terminal failure, causing UIs or automation to keep polling, hide the timeout, or treat a finished run as still active.
- Suggested fix: Make the Gateway wait-deadline response unambiguous, or include terminal metadata such as `aborted`/a distinct terminal flag in `agent.wait`. Short-term, the SDK can treat `status: "timeout"` with terminal fields like `endedAt`, `error`, `stopReason`, `livenessState`, or `yielded` as `timed_out`, while preserving bare `{ runId, status: "timeout" }` as the non-terminal wait deadline.
- Confidence: high

## Reviewed

- Diff: `204d200be3f942de95175aaf1ffae34a1b222ad5..29de89a8d98cdfb90fbe93922077ea821bafc9b2`
- Changed files: `apps/macos/Sources/OpenClawProtocol/GatewayModels.swift`, `apps/shared/OpenClawKit/Sources/OpenClawProtocol/GatewayModels.swift`, `docs/reference/openclaw-sdk-api-design.md`, `packages/sdk/src/client.ts`, `packages/sdk/src/index.test.ts`
- Code read: full SDK client/types/tests, SDK event normalization, Gateway `agent.wait`, wait dedupe, lifecycle snapshot code, sessions abort schema/handler, relevant Gateway tests
- Dependencies/web: no external dependency or current web fact affected the review

## Tests / Live Checks

- `pnpm docs:list` passed
- `pnpm install` was needed because `node_modules` was missing; I restored the install-time lockfile drift
- `pnpm test packages/sdk/src/index.test.ts` passed: 12 tests
- `git diff --check 204d200be3f942de95175aaf1ffae34a1b222ad5..29de89a8d98cdfb90fbe93922077ea821bafc9b2` passed
- Final worktree status was clean

## Limitations

- I did not run broad changed gates; the concrete issue is visible from the SDK/Gateway contract path and the focused SDK test does not cover the failing shape.
```
