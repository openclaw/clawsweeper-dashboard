---
sha: c1a42dce86cba23fb7ceb5994a83ddf82bdd754e
parent: b48f6ca1fcb9aa0d9bde89c78dd582c8ad6d7aab
repository: openclaw/openclaw
author: "Devin Robison"
committer: "GitHub"
github_author: drobison00
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-29T09:54:09-06:00"
commit_committed_at: "2026-04-29T09:54:09-06:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T15:59:24Z
---

# Commit c1a42dce

## Summary

Found one concrete scope-bypass gap in the new `/focus` enforcement: it protects `:subagent:` requester keys, but not ACP sessions that are persisted as subagent envelopes with `subagentControlScope: "none"`.

## Findings

### Medium: `/focus` still treats ACP leaf subagent envelopes as unrestricted controllers

- Kind: security
- File: `src/auto-reply/reply/commands-subagents/action-focus.ts`
- Line: 79
- Evidence: The new focus guard calls `resolveCommandSubagentController(params, ctx.requesterKey)` and only rejects when `controlScope !== "children"`. That helper classifies only `isSubagentSessionKey(requesterKey)` as a subagent; any ACP key, including `agent:main:acp:*`, returns `callerIsSubagent: false` and `controlScope: "children"` from `src/auto-reply/reply/commands-subagents/shared.ts:235`. ACP spawn code does persist subagent envelope fields, including `subagentRole` and `subagentControlScope`, for ACP children in `src/agents/acp-spawn.ts:805`. A temp-file probe confirmed an ACP entry with `subagentRole: "leaf"` and `subagentControlScope: "none"` is recognized by `resolveStoredSubagentCapabilities` as `controlScope: "none"`, but `resolveCommandSubagentController` returns `callerIsSubagent: false` and `controlScope: "children"` for the same requester key.
- Impact: A leaf ACP subagent session can still pass the new `/focus` controller check. Because `resolveFocusTargetSession` only adds the `spawnedBy` visibility filter when `isSubagentSessionKey(requesterKey)` is true, ACP subagent requesters also keep unscoped gateway fallback resolution. That leaves a session-routing/control path outside the boundary this commit is trying to enforce.
- Suggested fix: Make the command controller resolver use the stored subagent envelope contract, not only `isSubagentSessionKey`. For ACP requesters, call `isSubagentEnvelopeSession` / `resolveStoredSubagentCapabilities` and carry an explicit `restrictToSpawned` or `callerIsSubagent` flag into `resolveFocusTargetSession`, then add tests for ACP leaf rejection and ACP orchestrator child-only fallback resolution.
- Confidence: high

## Reviewed

- Diff: `b48f6ca1fcb9aa0d9bde89c78dd582c8ad6d7aab..c1a42dce86cba23fb7ceb5994a83ddf82bdd754e`
- Changed files: `CHANGELOG.md`, `src/auto-reply/reply/commands-subagents-focus.test.ts`, `src/auto-reply/reply/commands-subagents-shared-focus.test.ts`, `src/auto-reply/reply/commands-subagents/action-focus.ts`, `src/auto-reply/reply/commands-subagents/shared.ts`
- Code read: focus action, subagent command dispatch/shared helpers, session binding input/state routing, gateway `sessions.resolve`, subagent/ACP capability and spawn code, adjacent scope tests.
- PR context: inspected PR #73613 with `gh pr view`.

## Tests / Live Checks

- `pnpm docs:list` ran before source review.
- `pnpm test src/auto-reply/reply/commands-subagents-focus.test.ts src/auto-reply/reply/commands-subagents-shared-focus.test.ts --reporter=dot` initially failed because `vitest/package.json` was missing.
- `pnpm install` completed; retry of the same targeted test command passed: 2 files, 13 tests.
- `git diff --check b48f6ca1fcb9aa0d9bde89c78dd582c8ad6d7aab..c1a42dce86cba23fb7ceb5994a83ddf82bdd754e` passed.
- Temp `tsx` probes confirmed the ACP envelope classification mismatch described above.

## Dependency / Web Checks

- No package or lockfile changes in this commit.
- No general web lookup needed; PR metadata and CI status were checked with `gh`.
- PR CI check rollup had failing aggregate/dist shard jobs; focused local tests for the touched files passed.

## Limitations

- Did not run full `pnpm check` or a full auto-reply integration suite.
- Did not download the underlying CI artifact for the failed PR dist shard; the visible failed logs only showed aggregate shard failure.
