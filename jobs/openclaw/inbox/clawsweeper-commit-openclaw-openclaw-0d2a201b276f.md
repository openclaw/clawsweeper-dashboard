---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-0d2a201b276f
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-0d2a201b276f
source: clawsweeper_commit
commit_sha: 0d2a201b276f707eb7a542e762aec0a4bf530834
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/0d2a201b276f707eb7a542e762aec0a4bf530834.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-0d2a201b276f`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/0d2a201b276f707eb7a542e762aec0a4bf530834
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/0d2a201b276f707eb7a542e762aec0a4bf530834.md
- Latest main at intake: be14820b5d64ddde590bbee409dafcacc73bc78e

## ClawSweeper Report

```md
---
sha: 0d2a201b276f707eb7a542e762aec0a4bf530834
parent: ae07d57f9d5ffebe56bbe3981afe9cf92aefbd14
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "GitHub"
github_author: clawsweeper[bot]
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-30T23:05:27-07:00"
commit_committed_at: "2026-04-30T23:05:27-07:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T06:24:57Z
---

# Commit 0d2a201b27

## Summary

Found one remaining mid-turn retry bug in the changed path. The new retry prompt override is bypassed on normal reply runs that set `transcriptPrompt`, so those runs can still append the original user request after mid-turn recovery.

## Findings

### Medium: `transcriptPrompt` makes mid-turn recovery resubmit the original user prompt

- Kind: regression
- File: `src/agents/pi-embedded-runner/run.ts`
- Line: 1050
- Evidence: the commit sets `nextAttemptPromptOverride` for mid-turn precheck recovery, and `basePrompt` uses it at `src/agents/pi-embedded-runner/run.ts:968`. But the retry still passes `transcriptPrompt: params.transcriptPrompt` at `src/agents/pi-embedded-runner/run.ts:1050`. In `src/agents/pi-embedded-runner/run/attempt.ts:2597`, `resolveRuntimeContextPromptParts()` gives precedence to `transcriptPrompt` when it differs from `effectivePrompt`; its implementation returns `{ prompt: transcriptPrompt, runtimeContext: effectivePrompt }` at `src/agents/pi-embedded-runner/run/runtime-context-prompt.ts:45`. Normal message-channel runs do set this field via `src/auto-reply/reply/get-reply-run.ts:913` and pass it through at `src/auto-reply/reply/agent-runner-execution.ts:1284` and `src/auto-reply/reply/agent-runner-execution.ts:1421`.
- Impact: for the main reply path, a mid-turn precheck retry after truncation or compaction can still append the original user prompt after the tool result instead of the intended continuation prompt. That preserves the duplicated-prompt failure this commit is meant to fix for affected surfaces.
- Suggested fix: when using `nextAttemptPromptOverride`, also override or suppress `transcriptPrompt` for that attempt. Prefer passing the continuation text as the attempt transcript prompt so runtime context extraction does not restore the original user request.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A focused `tsx` check against `resolveRuntimeContextPromptParts()` with `effectivePrompt` set to the new continuation prompt and `transcriptPrompt` set to a user request returns `prompt: <original user request>`, proving the retry prompt submitted to Pi is still the original request.
- Is this the best way to solve the issue? yes, directionally. The bug is at the boundary where the outer runner changes `prompt` but keeps the old transcript prompt, so the narrow fix is to keep those two fields aligned for the one retry attempt.

## Reviewed

- Diff: `ae07d57f9d5ffebe56bbe3981afe9cf92aefbd14..0d2a201b276f707eb7a542e762aec0a4bf530834`
- Changed files: `src/agents/pi-embedded-runner/run.overflow-compaction.loop.test.ts`, `src/agents/pi-embedded-runner/run.ts`, `src/agents/pi-embedded-runner/run/attempt.spawn-workspace.context-engine.test.ts`, `src/agents/pi-embedded-runner/run/attempt.ts`, `src/agents/pi-embedded-runner/run/types.ts`
- Code read: touched files, current `main` around retry and prompt assembly, reply-run callers that populate `transcriptPrompt`, Pi agent prompt/continue source, and compaction docs.
- PR context: https://github.com/openclaw/openclaw/pull/75146

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm test src/agents/pi-embedded-runner/run.overflow-compaction.loop.test.ts src/agents/pi-embedded-runner/run/attempt.spawn-workspace.context-engine.test.ts` passed: 2 files, 44 tests.
- `git diff --check ae07d57f9d5ffebe56bbe3981afe9cf92aefbd14..0d2a201b276f707eb7a542e762aec0a4bf530834` passed.
- Focused `pnpm exec tsx` check showed `resolveRuntimeContextPromptParts({ effectivePrompt: <continuation>, transcriptPrompt: "Please list files" })` returns `prompt: "Please list files"`.

## Dependency / Web Checks

- Read local `@mariozechner/pi-agent-core@0.70.6` docs/source for `prompt()` and `continue()` behavior.
- No external web lookup was needed.

## Limitations

- I did not run a live model/tool-loop reproduction; the finding is based on the current runner control flow plus a focused prompt-part resolver check.

https://github.com/openclaw/openclaw/commit/0d2a201b276f707eb7a542e762aec0a4bf530834
```
