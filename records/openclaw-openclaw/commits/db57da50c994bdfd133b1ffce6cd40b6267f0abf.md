---
sha: db57da50c994bdfd133b1ffce6cd40b6267f0abf
parent: 18f4a2d9872322092e9fcb22a4f8e0dbc1b17b7b
repository: openclaw/openclaw
author: "Dwayne"
committer: "Sally O'Malley"
github_author: doedewaldt
github_committer: sallyom
co_authors: []
commit_authored_at: "2026-05-11T11:47:01-04:00"
commit_committed_at: "2026-05-11T22:09:20-04:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-12T02:15:29Z
---

# Commit db57da50c9

## Summary

Found one plausible regression in the timeout payload synthesis. The new partial-fragment drop treats any non-empty assistant text on a prompt timeout as partial, even when the attempt has a completed assistant message.

## Findings

### Medium: Completed timeout-edge replies can be discarded as partial fragments

- Kind: bug
- File: `src/agents/pi-embedded-runner/run.ts`
- Line: 2503
- Evidence: `hasPartialAssistantTextAfterPromptTimeout` only checks for non-empty `attempt.assistantTexts` plus absence of tools/messaging/errors. It does not check whether `attempt.lastAssistant` or `attempt.currentAttemptAssistant` is a completed assistant turn. The attempt timeout timer is active until cleanup in `src/agents/pi-embedded-runner/run/attempt.ts:3875`, after prompt completion and follow-up work such as block reply flushing at `src/agents/pi-embedded-runner/run/attempt.ts:3597`, so a timeout can still be recorded after the assistant message was collected.
- Impact: A long but complete text-only response that crosses the run timeout during post-prompt handling can now be replaced with only “Request timed out before a response was generated.” Before this commit, the runner preserved the assistant payload and appended the timeout error.
- Suggested fix: Only drop the assistant payload when there is no completed assistant evidence, for example require no `lastAssistant`/`currentAttemptAssistant` with a normal terminal stop reason, or base the drop on `finalAssistantVisibleText` being empty/incomplete rather than any non-empty `assistantTexts`.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Unclear. The static path is concrete: a mocked attempt with `timedOut: true`, non-empty `assistantTexts`, no tools, and `lastAssistant.stopReason: "end_turn"` would be dropped by the new guard. I did not run a live slow post-prompt timeout reproduction.
- Is this the best way to solve the issue? Yes directionally: preserve completed assistant payloads and drop only genuinely incomplete prompt-timeout fragments.

## Reviewed

- Diff: `18f4a2d9872322092e9fcb22a4f8e0dbc1b17b7b..db57da50c994bdfd133b1ffce6cd40b6267f0abf`
- Changed files: `src/agents/pi-embedded-runner/run.ts`
- Code read: full `src/agents/pi-embedded-runner/run.ts`, timeout attempt flow, payload building, liveness helpers, tool media merge, relevant timeout tests.
- Dependencies/web: none needed.
- Commands: `git show`, `git diff`, `rg`, `git blame`, `pnpm test src/agents/pi-embedded-runner/run.overflow-compaction.loop.test.ts -- --reporter=verbose`

## Tests / Live Checks

- `pnpm test src/agents/pi-embedded-runner/run.overflow-compaction.loop.test.ts -- --reporter=verbose` passed: 22 tests.

## Limitations

- No live provider timeout reproduction was run; finding is based on code-path analysis and existing mocked runner contracts.
