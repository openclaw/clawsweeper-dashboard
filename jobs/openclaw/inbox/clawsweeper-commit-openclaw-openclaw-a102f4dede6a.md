---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-a102f4dede6a
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-a102f4dede6a
source: clawsweeper_commit
commit_sha: a102f4dede6af52523473ac29575c7e442493d15
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/a102f4dede6af52523473ac29575c7e442493d15.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-a102f4dede6a`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/a102f4dede6af52523473ac29575c7e442493d15
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/a102f4dede6af52523473ac29575c7e442493d15.md
- Latest main at intake: a102f4dede6af52523473ac29575c7e442493d15

## ClawSweeper Report

```md
---
sha: a102f4dede6af52523473ac29575c7e442493d15
parent: e47a7448e90ff75f2d21082a1c33a18695b49162
repository: openclaw/openclaw
author: "Val Alexander"
committer: "GitHub"
github_author: BunsDev
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-30T19:35:48-05:00"
commit_committed_at: "2026-04-30T19:35:48-05:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T00:55:53Z
---

# Commit a102f4dede

## Summary

Found one concrete API correctness issue: the new artifact RPCs advertise `runId` and `taskId` lookup, but normal transcript messages are not tagged with that provenance, so those scopes return no artifacts for ordinary runs/tasks even when the session contains downloadable media.

## Findings

### Medium: `runId` and `taskId` artifact queries drop normal transcript artifacts

- Kind: bug
- File: `src/gateway/server-methods/artifacts.ts`
- Line: 226
- Evidence: `collectArtifactsFromMessages` filters out every message when `params.runId` is set unless the message itself has `__openclaw.runId` or `message.runId`, and similarly filters `taskId` unless the message has `messageTaskId`/`taskId`. But `readSessionMessages` only attaches transcript `id` and `seq` metadata when loading normal SessionManager entries (`src/gateway/session-utils.fs.ts:134`, `src/gateway/session-utils.fs.ts:172`). Gateway agent runs register `runId -> sessionKey` separately (`src/gateway/server-methods/agent.ts:1084`) and create tracked task records (`src/gateway/server-methods/agent.ts:393`), but the transcript appends shown in `src/agents/command/attempt-execution.ts:211`, `src/agents/command/attempt-execution.ts:219`, and `src/gateway/server-methods/chat-transcript-inject.ts:74` do not persist `runId` or `taskId` on the message. The focused artifact test suite also locks this behavior in with the passing case that scoped `runId` queries return `[]` for untagged session artifacts.
- Impact: The issue/PR acceptance criteria say artifacts can be queried by `runId`, `sessionKey`, or `taskId`, and the SDK exposes all three scopes. In practice, external app clients using the natural `runId` or `taskId` returned by `agent`, `sessions.send`, or task tracking cannot discover artifacts from ordinary transcript media; they must already know and use the session key, which defeats the new run/task API surface.
- Suggested fix: Persist artifact provenance when transcript messages are appended, ideally under `__openclaw` with `runId` and the tracked task id/message task id, or maintain an exact run/task-to-message span index. Keep the current filtering once provenance is actually written; do not simply return all session artifacts for a run/task scope because shared sessions can contain older artifacts from unrelated runs.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Create or load a session transcript containing an image/audio/file content block without per-message `runId`; `artifacts.list({ sessionKey })` returns it, while `artifacts.list({ runId })` resolves the owning session and then filters it out. The existing targeted test `does not return untagged session artifacts for scoped runId queries` demonstrates the empty result path.
- Is this the best way to solve the issue? no. The current implementation correctly avoids leaking unrelated session artifacts, but it does not add the provenance needed to make run/task scopes useful. The safer fix is to tag or index transcript messages at append time.

## Reviewed

- Diff: `e47a7448e90ff75f2d21082a1c33a18695b49162..a102f4dede6af52523473ac29575c7e442493d15`
- Changed files: gateway artifact handler/schema/registration/scope files, SDK client/types/tests/docs, generated Swift protocol models, changelog, generated config schema version.
- Code read: `src/gateway/server-methods/artifacts.ts`, `src/gateway/server-methods/artifacts.test.ts`, `src/gateway/session-utils.fs.ts`, `src/gateway/server-methods/agent.ts`, `src/gateway/server-methods/chat.ts`, `src/gateway/server-methods/chat-transcript-inject.ts`, `src/agents/command/attempt-execution.ts`, `packages/sdk/src/client.ts`, `packages/sdk/src/types.ts`, protocol schema exports, docs.
- Issue/PR context: `https://github.com/openclaw/openclaw/issues/74706`, `https://github.com/openclaw/openclaw/pull/74898`

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm test src/gateway/server-methods/artifacts.test.ts packages/sdk/src/index.test.ts` passed: 2 Vitest shards, 27 tests.
- `git diff --check e47a7448e90ff75f2d21082a1c33a18695b49162..a102f4dede6af52523473ac29575c7e442493d15` passed.

## Dependency / Web Checks

- No dependency changes in this commit.
- Used `gh` to inspect #74706 and PR #74898; no general web lookup was needed.

## Limitations

- I did not run the full changed gate; this was a focused commit review with targeted tests.

https://github.com/openclaw/openclaw/commit/a102f4dede6af52523473ac29575c7e442493d15
```
