---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-ffcc0d1fe171
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-ffcc0d1fe171
source: clawsweeper_commit
commit_sha: ffcc0d1fe17147f417eba86f2b8444a101a10322
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/ffcc0d1fe17147f417eba86f2b8444a101a10322.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-ffcc0d1fe171`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/ffcc0d1fe17147f417eba86f2b8444a101a10322
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/ffcc0d1fe17147f417eba86f2b8444a101a10322.md
- Latest main at intake: d23c8a8eba1f88ed22d3e8100881f4d9bf5810a7

## ClawSweeper Report

```md
---
sha: ffcc0d1fe17147f417eba86f2b8444a101a10322
parent: e8810c04a46bb5b68bc441e425be77e8212309ea
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-01T06:55:16+01:00"
commit_committed_at: "2026-05-01T06:55:22+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T06:15:16+00:00
---

# Commit ffcc0d1

## Summary

Found one regression that remains in current `main`: the realtime Voice Call greeting suppression was applied globally, so inbound realtime calls without an explicit initial message no longer get the automatic opening greeting they had before this commit.

## Findings

### Medium: Inbound realtime calls no longer greet callers

- Kind: regression
- File: `extensions/voice-call/src/webhook/realtime-handler.ts`
- Line: 44
- Evidence: This commit changed `buildGreetingInstructions()` to return `undefined` when there is no `metadata.initialMessage`, and changed `triggerGreetingOnReady` to `Boolean(initialGreetingInstructions)`. Before the commit, missing greeting text fell back to `baseInstructions` and `triggerGreetingOnReady` was always true. The new test only covers an outbound silent call, but `registerCallInManager()` uses the same path for inbound calls, which normally have no `initialMessage`.
- Impact: A Twilio inbound realtime caller can be connected to the realtime bridge and hear silence until they speak first. That is a behavior regression from the previous automatic realtime greeting.
- Suggested fix: Keep silent behavior for outbound no-message calls, but preserve the old fallback for inbound calls. For example, pass direction into the greeting decision and use `baseInstructions` when `callerMeta.direction !== "outbound"` and no explicit greeting is present.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: add a unit case mirroring `does not emit an outbound realtime greeting without an initial message`, but return a `CallRecord` with `direction: "inbound"` and empty metadata; after `callbacks.onReady()`, current code does not call `triggerGreeting`, while the parent commit would have.
- Is this the best way to solve the issue? yes: the intended Google Meet behavior is outbound silent dialing, so the narrow fix is to condition greeting suppression on outbound direction rather than changing the helper for all realtime calls.

## Reviewed

- Diff: `e8810c04a46bb5b68bc441e425be77e8212309ea..ffcc0d1fe17147f417eba86f2b8444a101a10322`
- Changed files: changelog/docs, Google Meet runtime/config/gateway/tests, Voice Call gateway methods, webhook, realtime handler/tests.
- Code read: `extensions/google-meet/src/runtime.ts`, `extensions/google-meet/src/voice-call-gateway.ts`, `extensions/voice-call/index.ts`, `extensions/voice-call/src/webhook.ts`, `extensions/voice-call/src/webhook/realtime-handler.ts`, `extensions/voice-call/src/manager/outbound.ts`, realtime voice session/provider implementations.
- Follow-up checked: current `main` includes `ae07d57f9d` for DTMF sequencing, but the inbound greeting regression remains.

## Tests / Live Checks

- `pnpm install`
- `pnpm test extensions/voice-call/src/webhook/realtime-handler.test.ts` passed.
- `pnpm test extensions/google-meet/src/voice-call-gateway.test.ts extensions/google-meet/index.test.ts extensions/google-meet/index.create.test.ts extensions/voice-call/index.test.ts extensions/voice-call/src/manager/outbound.test.ts` passed.

## Dependency / Web Checks

- Inspected in-repo realtime bridge/session implementations.
- No external web lookup was needed; the finding is based on local contract/code behavior.

## Limitations

- No live Twilio or realtime provider call was placed; this is a code-path and focused-test review.
```
