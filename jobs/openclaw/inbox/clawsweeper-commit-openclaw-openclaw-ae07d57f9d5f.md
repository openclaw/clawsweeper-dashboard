---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-ae07d57f9d5f
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-ae07d57f9d5f
source: clawsweeper_commit
commit_sha: ae07d57f9d5ffebe56bbe3981afe9cf92aefbd14
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/ae07d57f9d5ffebe56bbe3981afe9cf92aefbd14.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-ae07d57f9d5f`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/ae07d57f9d5ffebe56bbe3981afe9cf92aefbd14
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/ae07d57f9d5ffebe56bbe3981afe9cf92aefbd14.md
- Latest main at intake: be14820b5d64ddde590bbee409dafcacc73bc78e

## ClawSweeper Report

```md
---
sha: ae07d57f9d5ffebe56bbe3981afe9cf92aefbd14
parent: 42d73fd955afee4a381643b0cf973edbdc3e9c24
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-01T07:04:53+01:00"
commit_committed_at: "2026-05-01T07:05:01+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T06:25:08Z
---

# Commit ae07d57

## Summary

Found one current bug in the new `dtmfSequence` initiation path. A separate pre-connect TwiML ordering problem introduced at this SHA is already fixed later on `main` by `ec1b96cdfa`.

## Findings

### Medium: `dtmfSequence` succeeds for non-Twilio providers but is ignored

- Kind: bug
- File: `extensions/voice-call/src/manager/outbound.ts`
- Line: 186
- Evidence: `initiateCall` accepts `dtmfSequence`, validates it, and builds `preConnectTwiml` without checking the active provider. Twilio stores and serves `input.preConnectTwiml` in `extensions/voice-call/src/providers/twilio.ts:553`, but Telnyx and Plivo initiation paths ignore that field in `extensions/voice-call/src/providers/telnyx.ts:256` and `extensions/voice-call/src/providers/plivo.ts:301`.
- Impact: callers using `voicecall.start` or the `voice_call` tool with `dtmfSequence` on Telnyx/Plivo get `{ success: true }`, but the DTMF is never played. That can silently fail Meet dial-in or other phone-tree workflows while reporting a successful call start.
- Suggested fix: reject `dtmfSequence` unless the selected provider supports pre-connect DTMF, or add an explicit provider capability/method and implement it per provider. The narrow fix is to gate this path to Twilio and return a clear error for other providers.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A focused `tsx` smoke using `initiateCall` with a provider named `telnyx` returned success and passed `preConnectTwiml` to the provider input; the real Telnyx/Plivo providers do not use that field.
- Is this the best way to solve the issue? yes for the narrow fix. A capability check is safer than continuing to expose a generic API parameter that only Twilio honors.

## Reviewed

- Diff: `42d73fd955afee4a381643b0cf973edbdc3e9c24..ae07d57f9d5ffebe56bbe3981afe9cf92aefbd14`
- Changed files: `CHANGELOG.md`, `docs/plugins/google-meet.md`, `docs/plugins/voice-call.md`, `extensions/google-meet/*`, `extensions/voice-call/*`
- Code read: Google Meet voice-call gateway, Voice Call tool/RPC entrypoints, outbound manager, TwiML generation, Twilio/Telnyx/Plivo providers, webhook realtime shortcut, related tests.
- Dependency/web: checked Twilio’s official `<Play digits>` docs while reviewing the new TwiML path.

## Tests / Live Checks

- `pnpm test extensions/google-meet/src/voice-call-gateway.test.ts extensions/voice-call/index.test.ts extensions/voice-call/src/manager/outbound.test.ts extensions/voice-call/src/providers/twilio.test.ts extensions/voice-call/src/webhook.test.ts` passed after installing missing dependencies.
- No live telephony test run; no Twilio/Telnyx/Plivo live env names were present in env or `~/.profile`.

## Limitations

- Focused review only; no full changed gate or live provider call.
- `pnpm install` was required because `node_modules` was missing before tests.
```
