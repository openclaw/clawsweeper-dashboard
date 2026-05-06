---
sha: a1b49c4b20027c42abbfeeeafbc34fa4379d3ef0
parent: 2eaf8ad7126b373a57ec10b169b49cd63780096e
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-06T09:16:40+01:00"
commit_committed_at: "2026-05-06T09:18:20+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-06T08:25:27Z
---

# Commit a1b49c4b20

## Summary

Found one actionable timing regression in the Google Meet Twilio path. The commit adds a 12-second PIN-derived DTMF wait, but the intro speech request still fires after only the fixed post-DTMF speech delay from `voicecall.start`, not after the pre-connect DTMF TwiML has actually completed.

## Findings

### Medium: Intro speech can fire before the new default DTMF wait finishes

- Kind: regression
- File: `extensions/google-meet/src/voice-call-gateway.ts`
- Line: 131
- Evidence: PIN joins now prefix DTMF with `voiceCall.dtmfDelayMs`, defaulting to 12 seconds (`extensions/google-meet/src/runtime.ts:492`, `extensions/google-meet/src/config.ts:219`). That produces 24 lowercase `w` digits (`extensions/google-meet/src/transports/twilio.ts:52`), which Twilio documents as 0.5-second pauses in `<Play digits>`. But `joinMeetViaVoiceCallGateway` still sleeps only `postDtmfSpeechDelayMs` before calling `voicecall.speak` (`extensions/google-meet/src/voice-call-gateway.ts:131`). With defaults, the speech request is attempted about 5 seconds after `voicecall.start`, while Twilio is still in the 12-second pre-connect `<Play>` wait before the redirect that serves realtime TwiML (`extensions/voice-call/src/manager/twiml.ts:11`, `extensions/voice-call/src/providers/twilio/twiml-policy.ts:55`). In realtime-enabled setups, `voicecall.speak` returns `{ success: false }` when the realtime bridge is not active and Google Meet permanently marks the intro skipped (`extensions/voice-call/index.ts:541`, `extensions/google-meet/src/voice-call-gateway.ts:155`). In non-realtime fallback setups, updating a live call with TwiML can interrupt the current call flow, which risks replacing the pre-connect DTMF before the PIN is sent. Twilio documents both the lowercase `w` pause semantics and in-progress call modification with new TwiML. ([twilio.com](https://www.twilio.com/docs/voice/twiml/play))
- Impact: Default PIN-based Twilio joins can either never play the configured intro greeting, or in fallback mode can race the DTMF sequence that is supposed to get the phone leg into the Meet room. The new tests mock `voicecall.speak` as immediately successful, so they do not cover the real wait/redirect/stream ordering.
- Suggested fix: Make the intro trigger depend on the pre-connect flow actually reaching realtime handling. Safer options: pass the intro as an initial message to Voice Call and let Voice Call speak it on stream connect, or poll/wait for the active realtime bridge before `voicecall.speak`. A minimal fallback is to include the generated leading DTMF wait in the speech delay, but stream-readiness is less brittle than timing math.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes for the code path: default config plus `pin` produces 24 `w` wait digits and `voicecall.speak` is attempted after only 5 seconds. I did not run a live Twilio/Meet call.
- Is this the best way to solve the issue? unclear; the best fix is likely to move intro ownership to Voice Call’s stream-connect lifecycle instead of adding more fixed sleep.

## Reviewed

- Diff: `2eaf8ad7126b373a57ec10b169b49cd63780096e..a1b49c4b20027c42abbfeeeafbc34fa4379d3ef0`
- Changed files: changelog, Google Meet docs/config/runtime/tests, Twilio transport helper, Voice Call gateway wrapper/tests.
- Code read: changed Google Meet files in full, Voice Call gateway methods, Voice Call Twilio provider/TwiML policy, manager outbound lifecycle, gateway scope handling.
- Dependencies/web: Twilio `<Play digits>` and Call Resource update docs.
- Commands: `pnpm docs:list`; `git show`; `git diff`; `pnpm install`; targeted tests below; `git diff --check`.

## Tests / Live Checks

- Initial `pnpm test extensions/google-meet/src/voice-call-gateway.test.ts extensions/google-meet/index.test.ts` failed because dependencies were missing.
- Ran `pnpm install`, then reran successfully: 2 files, 100 tests passed.
- Ran `pnpm test extensions/voice-call/index.test.ts extensions/voice-call/src/manager/outbound.test.ts extensions/voice-call/src/providers/twilio/twiml-policy.test.ts`: 3 files, 54 tests passed.
- `git diff --check` passed.

## Limitations

- No live Twilio/Google Meet call was run; the finding is based on deterministic local code flow plus Twilio’s documented DTMF and call-modification behavior.
