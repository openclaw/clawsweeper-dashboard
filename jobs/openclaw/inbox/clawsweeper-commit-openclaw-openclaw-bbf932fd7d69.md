---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-bbf932fd7d69
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-bbf932fd7d69
source: clawsweeper_commit
commit_sha: bbf932fd7d69c32f800779d98312fbdcc3901c1b
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/bbf932fd7d69c32f800779d98312fbdcc3901c1b.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-bbf932fd7d69`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/bbf932fd7d69c32f800779d98312fbdcc3901c1b
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/bbf932fd7d69c32f800779d98312fbdcc3901c1b.md
- Latest main at intake: bbf932fd7d69c32f800779d98312fbdcc3901c1b

## ClawSweeper Report

```md
---
sha: bbf932fd7d69c32f800779d98312fbdcc3901c1b
parent: 7a2bb2fcda40d2c9cc0ade1ecff9477fe8974be3
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T04:20:35+01:00"
commit_committed_at: "2026-04-30T04:20:40+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T03:24:51Z
---

# Commit bbf932f

## Summary

Found one production/test-runtime contract mismatch in the observe-only prepared-turn path.

## Findings

### Medium: Direct prepared observe-only turns still dispatch in production

- Kind: regression
- File: `src/channels/turn/kernel.ts`
- Line: 256
- Evidence: `PreparedChannelTurn` now exposes `observeOnlyDispatchResult` in `src/channels/turn/types.ts:238`, and the full `run(...)` adapter path suppresses prepared observe-only dispatch by replacing `runDispatch` in `src/channels/turn/kernel.ts:172`. But the public runtime’s direct `runPrepared` entrypoint maps to `runPreparedChannelTurn` in `src/plugins/runtime/runtime-channel.ts:179`, and `runPreparedChannelTurn` still always executes `await params.runDispatch()` at `src/channels/turn/kernel.ts:256`. The SDK mock does the opposite and skips `runDispatch` for `admission.kind === "observeOnly"` in `src/plugin-sdk/test-helpers/plugin-runtime-mock.ts:160`.
- Impact: A channel plugin that uses `runtime.channel.turn.runPrepared({ admission: { kind: "observeOnly" }, ... })` can pass tests with `createPluginRuntimeMock` while production still runs its dispatcher and may send visible replies from passive observer/group flows.
- Suggested fix: Put the observe-only suppression in `runPreparedChannelTurn` itself, using `observeOnlyDispatchResult` there, so direct `runPrepared` and full `run` share the same behavior. Alternatively, if direct `runPrepared` is intentionally dispatcher-owned, remove the mock suppression and document that callers must skip dispatch themselves.
- Confidence: high

## Reviewed

- Diff: `7a2bb2fcda40d2c9cc0ade1ecff9477fe8974be3..bbf932fd7d69c32f800779d98312fbdcc3901c1b`
- Changed files: `CHANGELOG.md`, `src/channels/turn/kernel.test.ts`, `src/channels/turn/kernel.ts`, `src/channels/turn/types.ts`, `src/plugin-sdk/test-helpers/plugin-runtime-mock.ts`, `src/plugins/runtime/runtime-channel.ts`, `src/plugins/runtime/types-channel.ts`
- Code read: changed files in full, scoped `AGENTS.md`, channel-turn docs, channel routing docs, prior commit state for the removed/restored aliases, runtime/plugin SDK call paths
- Dependencies/web: no dependency files changed; no web lookup needed

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because `node_modules` was missing
- `pnpm test src/channels/turn/kernel.test.ts` passed, 12 tests
- `pnpm test src/plugins/runtime/index.test.ts src/plugin-sdk/channel-entry-contract.test.ts` passed, 28 tests across 2 shards
- `pnpm exec oxfmt --check --threads=1 ...` passed
- `git diff --check 7a2bb2fcda40d2c9cc0ade1ecff9477fe8974be3..bbf932fd7d69c32f800779d98312fbdcc3901c1b` passed
- Direct smoke confirmed `runPreparedChannelTurn` with `admission.observeOnly` still records and dispatches

## Limitations

- I did not run broad `pnpm check:changed` or full tsgo gates locally; the review used focused tests and source/runtime tracing.
```
