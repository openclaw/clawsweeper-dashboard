---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-ffe67e9cdc9e
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-ffe67e9cdc9e
source: clawsweeper_commit
commit_sha: ffe67e9cdc9e986c0d879bca8a80445877b2bad7
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/ffe67e9cdc9e986c0d879bca8a80445877b2bad7.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-ffe67e9cdc9e`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/ffe67e9cdc9e986c0d879bca8a80445877b2bad7
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/ffe67e9cdc9e986c0d879bca8a80445877b2bad7.md
- Latest main at intake: a89fe0f5a0ce8b48e3c388aef01da71eafbeca34

## ClawSweeper Report

```md
---
sha: ffe67e9cdc9e986c0d879bca8a80445877b2bad7
parent: 6e73101df3f572233e339c4aad157a81edae2ee2
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T04:08:44+01:00"
commit_committed_at: "2026-04-30T04:08:47+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T03:13:03+00:00
---

# Commit ffe67e9c

## Summary

Found two actionable regressions in the new channel turn runtime surface.

## Findings

### Medium: Documented PluginRuntime turn compatibility aliases were removed

- Kind: compatibility
- File: `src/plugins/runtime/runtime-channel.ts`
- Line: 173
- Evidence: The injected runtime now exposes only `run`, `buildContext`, and `runPrepared`. The matching public type in `src/plugins/runtime/types-channel.ts:154` also removes `runResolved` and `dispatchAssembled`. However `docs/plugins/sdk-channel-turn.md:16` says this runtime type is exported for third-party native plugins, and `docs/plugins/sdk-channel-turn.md:71` still documents both older helpers as compatibility aliases that “remain available”.
- Impact: Any external channel plugin still calling `runtime.channel.turn.runResolved(...)` or `runtime.channel.turn.dispatchAssembled(...)` will fail at compile time against the new SDK type and at runtime with `undefined is not a function` after upgrading.
- Suggested fix: Restore deprecated aliases on `PluginRuntimeChannel` and `createRuntimeChannel()`. Re-add `runResolvedChannelTurn` as a wrapper around `runChannelTurn`, and keep `dispatchAssembled` wired to `dispatchAssembledChannelTurn` until a versioned breaking SDK release removes them.
- Confidence: high

### Medium: `observeOnly` does not suppress visible delivery for prepared turns

- Kind: bug
- File: `src/channels/turn/kernel.ts`
- Line: 358
- Evidence: `ChannelTurnResolved` now accepts `PreparedChannelTurn` from `resolveTurn` (`src/channels/turn/types.ts:243`). For `observeOnly`, `runChannelTurn` injects `delivery: createNoopChannelTurnDeliveryAdapter()`, but `dispatchResolvedChannelTurn` immediately routes prepared turns to `runPreparedChannelTurn` based on `"runDispatch" in value` (`src/channels/turn/kernel.ts:160`). Prepared turns ignore `delivery`, so the no-op adapter has no effect. An ad hoc focused repro returned `{"admission":{"kind":"observeOnly","reason":"observer"},"dispatched":true,"visible":1}`.
- Impact: A channel using the new prepared-turn path plus `observeOnly` admission can still send visible replies, violating the documented “sends nothing visible” contract and risking observer/broadcast agents speaking in rooms unexpectedly.
- Suggested fix: Either reject `observeOnly` for prepared turns unless the prepared turn provides an explicit silent dispatch, or add a prepared-turn no-op/silent dispatch contract that the kernel can enforce. Add a kernel test covering prepared `observeOnly` specifically.
- Confidence: high

## Reviewed

- Diff: `6e73101df3f572233e339c4aad157a81edae2ee2..ffe67e9cdc9e986c0d879bca8a80445877b2bad7`
- Changed files: 31 files, primarily channel/plugin inbound dispatch paths plus `src/channels/turn/*`, plugin runtime types, and test helpers.
- Code read: turn kernel/types, plugin SDK inbound dispatch, runtime channel/type surface, affected Discord/Slack/Telegram/Matrix/Mattermost/MSTeams/Feishu/iMessage/Signal/WhatsApp/LINE/QQBot dispatch paths, relevant test helper updates.
- Docs read: `docs/channels/channel-routing.md`, `docs/channels/groups.md`, `docs/reference/test.md`, `docs/plugins/sdk-channel-turn.md`.
- Dependencies/web: no external web lookup needed; no dependency manifests changed.

## Tests / Live Checks

- `pnpm docs:list`: ran successfully.
- `pnpm install`: required because `node_modules` was missing before tests.
- `pnpm test src/channels/turn/kernel.test.ts src/plugin-sdk/inbound-reply-dispatch.test.ts`: passed, 2 Vitest shards, 13 tests.
- `pnpm exec tsx -e ...`: ad hoc repro confirmed prepared `observeOnly` still executed visible dispatch.

## Limitations

- Did not run the full changed gate or full extension suite; this was a report-only commit review and the focused checks covered the touched kernel/SDK behavior.

https://github.com/openclaw/openclaw/commit/ffe67e9cdc9e986c0d879bca8a80445877b2bad7
```
