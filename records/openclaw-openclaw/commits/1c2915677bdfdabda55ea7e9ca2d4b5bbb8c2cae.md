---
sha: 1c2915677bdfdabda55ea7e9ca2d4b5bbb8c2cae
parent: 9e7fd27577be4d30e531bbd27daff248cdd69d87
repository: openclaw/openclaw
author: "Alex Knight"
committer: "GitHub"
github_author: amknight
github_committer: web-flow
co_authors: ["Alex Knight"]
commit_authored_at: "2026-05-06T20:13:31+10:00"
commit_committed_at: "2026-05-06T20:13:31+10:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-06T10:22:33+00:00
---

# Commit 1c29156

## Summary

Found one concrete follow-up risk in the new session-branch fallback.

## Findings

### Medium: Branch fallback can resummarize history that was already compacted away

- Kind: regression
- File: `src/agents/pi-hooks/compaction-safeguard.ts`
- Line: 867
- Evidence: When prepared compaction input has no real messages, the new fallback calls `collectSessionBranchMessages(ctx.sessionManager)` and then assigns the entire returned branch to `baseMessagesToSummarize`. `collectSessionBranchMessages` maps every `message`, `custom_message`, and `branch_summary` from the live branch, but it does not honor the latest prior `compaction` boundary or that compaction entry’s `firstKeptEntryId`. Pi 0.73.0’s compaction/session contract keeps entries before the previous compaction boundary out of current context and carries them through `preparation.previousSummary`; this fallback drops the boundary and can feed those old raw entries to the summarizer again.
- Impact: In a long session that has already compacted once, a later custom-message-only fallback can reintroduce stale/dropped transcript prefix into the new summary. That can bloat the summarization request, duplicate or revive stale context, and partially defeat the compaction fix this commit is trying to make reliable.
- Suggested fix: When falling back to branch entries, derive the same effective window as `prepareCompaction`: start no earlier than the latest compaction’s `firstKeptEntryId` boundary, preserve `preparation.previousSummary` as the carrier for earlier history, and preferably use `event.branchEntries` rather than another `getBranch()` call.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes for the code path shape: create a branch with an earlier `compaction` entry whose `firstKeptEntryId` points after an older visible `custom_message`, then trigger this fallback with empty `messagesToSummarize`/`turnPrefixMessages`; the fallback currently collects the older custom message too. I did not run a full live OpenClaw session reproduction for this edge case.
- Is this the best way to solve the issue? Unclear; the safest direction is to preserve Pi’s compaction boundary semantics while still recovering custom/branch messages that preparation omitted.

## Reviewed

- Diff: `9e7fd27577be4d30e531bbd27daff248cdd69d87..1c2915677bdfdabda55ea7e9ca2d4b5bbb8c2cae`
- Changed files: `CHANGELOG.md`, `src/agents/compaction-real-conversation.ts`, `src/agents/pi-embedded-runner/compact.hooks.test.ts`, `src/agents/pi-hooks/compaction-safeguard.test.ts`, `src/agents/pi-hooks/compaction-safeguard.ts`
- Code read: changed files in full, `src/agents/pi-embedded-runner/compact.ts`, `src/agents/internal-runtime-context.ts`, `src/agents/pi-embedded-runner/transcript-file-state.ts`, `src/agents/pi-embedded-runner/transcript-rewrite.ts`, Pi 0.73.0 session-manager/compaction/message conversion package source.
- GitHub: PR #78390 and issue #78300.

## Tests / Live Checks

- `pnpm install`
- `pnpm test src/agents/pi-hooks/compaction-safeguard.test.ts src/agents/pi-embedded-runner/compact.hooks.test.ts` passed: 2 files, 128 tests.
- `git diff --check 9e7fd27577be4d30e531bbd27daff248cdd69d87..1c2915677bdfdabda55ea7e9ca2d4b5bbb8c2cae` passed.
- A throwaway `tsx --eval` smoke attempt was inconclusive due local module export/loader resolution, not due the reviewed code.

## Dependency / Web Checks

- Installed and inspected local `@mariozechner/pi-coding-agent@0.73.0` and `@mariozechner/pi-agent-core@0.73.0` source/types.
- No general web lookup was needed.

## Limitations

- No full live gateway/CLI compaction reproduction was run for the prior-compaction fallback edge case.

https://github.com/openclaw/openclaw/pull/78390
