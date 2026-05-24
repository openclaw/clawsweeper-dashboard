---
sha: 8deb1ef7db7f8deb5ddb4ed0151c68a1b2477eb9
parent: d0751111a47202245956b597507cc47fd5cc1bce
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "web-flow"
github_author: clawsweeper[bot]
github_committer: web-flow
co_authors: ["Andy Ye", "clawsweeper", "clawsweeper[bot]", "takhoffman"]
commit_authored_at: "2026-05-24T04:05:45Z"
commit_committed_at: "2026-05-24T04:05:45Z"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-24T04:14:30Z
---

# Commit 8deb1ef

## Summary

The boot session isolation works for the covered gateway unit path, but the new `suppressPromptPersistence: true` flag is not honored by CLI-backed agent runtimes. If an agent's selected runtime is `claude-cli` or another CLI runner, each `BOOT.md` startup still mirrors the full synthetic boot prompt into a generated boot transcript file.

## Findings

### Medium: CLI-backed boot runs still persist the BOOT.md prompt

- Kind: privacy
- File: `src/gateway/boot.ts`
- Line: 187
- Evidence: `runBootOnce` now passes `suppressPromptPersistence: true`, but CLI results use `executionTrace.runner: "cli"` and are later mirrored through `persistCliTurnTranscript` in `src/agents/agent-command.ts:1600`. That call does not pass any suppression flag. `persistCliTurnTranscript` forwards `body: params.body` to `persistTextTurnTranscript`, which appends it as a `role: "user"` message whenever `promptText` is non-empty in `src/agents/command/attempt-execution.ts:211`.
- Impact: agents configured to use a CLI runtime still write the full generated `BOOT.md` prompt, including the BOOT body, to disk on startup. The mapping is restored afterward, so this is less severe than main-session pollution, but repeated restarts can leave orphaned boot transcript files containing startup instructions or sensitive local project context.
- Suggested fix: thread `suppressPromptPersistence` into the CLI transcript mirror path and have `persistCliTurnTranscript` pass an empty prompt body when suppression is requested, or run boot checks with an internal/non-visible transcript mode that applies uniformly across embedded, ACP, and CLI runners. Add a regression with a `runner: "cli"` result.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A focused temporary script called `persistCliTurnTranscript` with a BOOT-style body and `executionTrace.runner: "cli"`; it reported `wroteTranscript: true` and `wroteBootBody: true`.
- Is this the best way to solve the issue? yes. The bug is not the boot session key itself; it is that prompt suppression stops at the embedded attempt path and does not reach the CLI transcript mirroring helper.

## Reviewed

- Diff: `d0751111a47202245956b597507cc47fd5cc1bce..8deb1ef7db7f8deb5ddb4ed0151c68a1b2477eb9`
- Changed files: `CHANGELOG.md`, `src/gateway/boot.ts`, `src/gateway/boot.test.ts`, `src/gateway/server-startup-post-attach.test.ts`
- Code read: gateway boot runner/tests, boot-md hook caller, startup task dispatch, session-key resolution, agent command session resolution, embedded/CLI persistence paths
- GitHub context: PR `#85919`, source PR `#85479`, issue `#84970`
- Dependencies/web: no web lookup; `pnpm install` was needed because local deps were missing

## Tests / Live Checks

- `node scripts/run-vitest.mjs src/gateway/boot.test.ts` passed: 3 files, 36 tests.
- Temporary CLI transcript proof passed and reproduced the issue: BOOT marker and BOOT body were written to `boot-proof-session.jsonl`.
- Initial checks failed before execution because `vitest` and `tsx` were missing; `pnpm install` completed successfully, then checks were retried.

## Limitations

- I did not run a full real gateway restart with a configured CLI provider.
- I did not run broad changed gates; the finding is from a focused source trace plus a direct transcript persistence proof.
