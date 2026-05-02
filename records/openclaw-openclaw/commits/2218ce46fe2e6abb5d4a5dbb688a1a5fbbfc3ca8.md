---
sha: 2218ce46fe2e6abb5d4a5dbb688a1a5fbbfc3ca8
parent: bca4e440bbade729569be5328c240665777e4f33
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-02T05:29:57+01:00"
commit_committed_at: "2026-05-02T05:30:13+01:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-02T04:49:35Z
---

# Commit 2218ce4

## Summary

Found one medium-confidence regression risk in the new no-completion cleanup shortcut: it bypasses descendant-drain handling that the announce flow previously performed.

## Findings

### Medium: No-completion delete cleanup can remove an orchestrator before its descendants settle

- Kind: regression
- File: `src/agents/subagent-registry-lifecycle.ts`
- Line: 602
- Evidence: The new `entry.expectsCompletionMessage === false` branch skips `runSubagentAnnounceFlow` entirely and immediately calls `deleteSubagentSessionForCleanup` for `cleanup === "delete"`, then finalizes cleanup with `skipAnnounce`/`skipDeliveryStatus`. That bypasses the existing descendant gating in `runSubagentAnnounceFlow` (`countPendingDescendantRuns(...) > 0` returns `false` without deleting) and the deferred cleanup decision in `finalizeSubagentCleanup`.
- Impact: A fire-and-forget subagent that acts as a nested orchestrator can spawn descendants and finish before those descendants settle. With `cleanup: "delete"`, the new branch deletes the orchestrator session and removes its run record before child completions arrive, so descendant announce fallback can no longer resolve the orchestrator’s requester. That can drop nested child results or leave descendant cleanup retrying until give-up.
- Suggested fix: Preserve the “no parent handoff” behavior, but before deleting/finalizing a no-completion run, keep the existing descendant drain check. If `countPendingDescendantRuns(entry.childSessionKey) > 0`, defer cleanup and wake/retry the run only as needed without delivering to the parent.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? No. I did not build a live nested orchestration repro, but the failure path is concrete from the current control flow: new no-completion shortcut bypasses the only descendant-drain checks.
- Is this the best way to solve the issue? Unclear. The safest fix direction is to keep suppression of parent delivery while retaining descendant cleanup gating; maintainers should confirm whether explicit no-completion is also meant to suppress descendant aggregation.

## Reviewed

- Diff: `bca4e440bbade729569be5328c240665777e4f33..2218ce46fe2e6abb5d4a5dbb688a1a5fbbfc3ca8`
- Changed files: `CHANGELOG.md`, `src/agents/subagent-announce.ts`, `src/agents/subagent-registry-lifecycle.test.ts`, `src/agents/subagent-registry-lifecycle.ts`, `src/agents/subagent-registry.ts`, `src/agents/subagent-session-cleanup.ts`
- Code read: changed files, current `subagent-registry` lifecycle/run-manager/query paths, nested subagent tests, session delete implementation, relevant subagent docs.
- Dependencies/web: no external web lookup needed; inspected GitHub issue `#75848` with `gh`.

## Tests / Live Checks

- `pnpm test src/agents/subagent-registry-lifecycle.test.ts src/agents/openclaw-tools.subagents.sessions-spawn.lifecycle.test.ts src/agents/subagent-announce.test.ts src/agents/subagent-announce-dispatch.test.ts` passed: 4 files, 45 tests.
- `pnpm exec oxfmt --check --threads=1 ...` passed.
- `git diff --check` passed.
- First test attempt failed because dependencies were missing; ran `pnpm install` once, then retried successfully. Repo status remained clean.

## Limitations

- No full `pnpm check:changed`; targeted review only.
- No live nested no-completion/delete orchestration repro was run.

https://github.com/openclaw/openclaw/commit/2218ce46fe2e6abb5d4a5dbb688a1a5fbbfc3ca8
