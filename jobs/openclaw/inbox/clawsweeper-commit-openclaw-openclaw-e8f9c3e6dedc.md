---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-e8f9c3e6dedc
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-e8f9c3e6dedc
source: clawsweeper_commit
commit_sha: e8f9c3e6dedc8b664317264a0a15f6862488edf3
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/e8f9c3e6dedc8b664317264a0a15f6862488edf3.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-e8f9c3e6dedc`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/e8f9c3e6dedc8b664317264a0a15f6862488edf3
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/e8f9c3e6dedc8b664317264a0a15f6862488edf3.md
- Latest main at intake: e8810c04a46bb5b68bc441e425be77e8212309ea

## ClawSweeper Report

```md
---
sha: e8f9c3e6dedc8b664317264a0a15f6862488edf3
parent: 4ea0556f642825d6eb4b711b27ec309714a8a024
repository: openclaw/openclaw
author: "Ben"
committer: "GitHub"
github_author: PfanP
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-05-01T14:25:36+09:00"
commit_committed_at: "2026-05-01T06:25:36+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-01T05:49:27+00:00
---

# Commit e8f9c3e6de

## Summary

One actionable issue found: a newly added voice-call media stream test is order-sensitive and hangs when the full test file runs locally. I did not find a concrete production regression in the STT startup behavior itself.

## Findings

### Low: Added media-stream test can hang the full file

- Kind: reliability
- File: `extensions/voice-call/src/media-stream.test.ts`
- Line: 588
- Evidence: `pnpm test extensions/voice-call/src/media-stream.test.ts` failed with `forwards early Twilio media into the STT session before readiness` timing out after 120000ms. The same failure also occurred when running the touched media-stream and webhook tests together. The single test passes when isolated with `-t`, so this is an order-sensitive test reliability problem rather than a deterministic product failure.
- Impact: Developers or changed-test lanes that run the whole file can burn two minutes and fail on a test introduced by this commit. The test also hangs instead of reporting the likely failed assertion because `server.close()` at line 659 waits while the client WebSocket remains open if an earlier assertion or wait fails before lines 656-657 close it.
- Suggested fix: Make the test wait deterministically for `sendAudio` to observe the `"early"` payload instead of relying on `await flush()` at line 645, and close the client WebSocket from `finally` before awaiting `server.close()`. That will both remove the timing race and preserve the original assertion failure if the media frame is not processed.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes. After `pnpm install`, run `pnpm test extensions/voice-call/src/media-stream.test.ts`; it timed out in the added test. Running only `pnpm test extensions/voice-call/src/media-stream.test.ts -- -t "forwards early Twilio media into the STT session before readiness"` passed, which confirms the failure is file-order/timing sensitive.
- Is this the best way to solve the issue? Yes for the test issue: use an explicit deferred/event for media receipt and robust cleanup. The production change’s stream registration, STT readiness notification, and failure-close path are consistent with the shared realtime transcription WebSocket session contract.

## Reviewed

- Diff: `4ea0556f642825d6eb4b711b27ec309714a8a024..e8f9c3e6dedc8b664317264a0a15f6862488edf3`
- Changed files: `CHANGELOG.md`, `docs/plugins/voice-call.md`, `extensions/voice-call/src/media-stream.test.ts`, `extensions/voice-call/src/media-stream.ts`, `extensions/voice-call/src/webhook.test.ts`, `extensions/voice-call/src/webhook.ts`
- Code read: full touched voice-call media stream and webhook files, relevant tests, Twilio provider stream/TTS methods, call manager initial-message flow, shared realtime transcription provider types/session, bundled OpenAI/Deepgram/Mistral/ElevenLabs/xAI realtime transcription providers
- Dependencies/web: local upstream/provider source inspected; no external web lookup needed. PR #75257 and issue #75197 inspected with `gh`.

## Tests / Live Checks

- `pnpm docs:list` succeeded.
- `pnpm install` succeeded after the initial test command reported missing `vitest/package.json`.
- `pnpm test extensions/voice-call/src/media-stream.test.ts extensions/voice-call/src/webhook.test.ts` failed due the media-stream test timeout; webhook tests passed in that run.
- `pnpm test extensions/voice-call/src/media-stream.test.ts` failed with the same timeout.
- `pnpm test extensions/voice-call/src/media-stream.test.ts -- -t "forwards early Twilio media into the STT session before readiness"` passed.
- `git diff --check 4ea0556f642825d6eb4b711b27ec309714a8a024..e8f9c3e6dedc8b664317264a0a15f6862488edf3` passed.

## Limitations

- I did not run a live Twilio/OpenAI carrier call. The runtime review is source-level plus focused local tests.

https://github.com/openclaw/openclaw/pull/75257
```
