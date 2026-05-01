---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-464e57360262
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-464e57360262
source: clawsweeper_commit
commit_sha: 464e57360262b7e0f9a705431bedd402fe8c356b
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/464e57360262b7e0f9a705431bedd402fe8c356b.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-464e57360262`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/464e57360262b7e0f9a705431bedd402fe8c356b
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/464e57360262b7e0f9a705431bedd402fe8c356b.md
- Latest main at intake: 42d73fd955afee4a381643b0cf973edbdc3e9c24

## ClawSweeper Report

```md
---
sha: 464e57360262b7e0f9a705431bedd402fe8c356b
parent: e8f9c3e6dedc8b664317264a0a15f6862488edf3
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-01T06:35:36+01:00"
commit_committed_at: "2026-05-01T06:35:36+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T05:54:50Z
---

# Commit 464e573

## Summary

Found two actionable regressions in the new voice-call CLI gateway delegation path. The main issue is a fixed 5s gateway request timeout applied to operations that can legitimately wait much longer.

## Findings

### Medium: Gateway-delegated `voicecall continue` times out long before the voice-call turn timeout

- Kind: reliability
- File: `extensions/voice-call/src/cli.ts`
- Line: 48
- Evidence: The CLI now sends every delegated voice-call gateway RPC with `timeout: "5000"` via `callVoiceCallGateway`. That includes `voicecall.continue` at `extensions/voice-call/src/cli.ts:438`. But `continueCall` speaks, starts listening, and then awaits `waitForFinalTranscript` at `extensions/voice-call/src/manager/outbound.ts:377`; the configured transcript timeout defaults to `180000` ms in `extensions/voice-call/src/config.ts:343`.
- Impact: In normal conversational use, waiting more than 5 seconds for the caller to answer is expected. The CLI will return `gateway request timeout for voicecall.continue` while the gateway-side turn may keep running until the real transcript timeout. The operator loses the transcript result and may retry into an already-active turn.
- Suggested fix: Do not use the same 5s timeout for long-running voice-call RPCs. Use the voice-call config timeout for `continue`, a larger provider-operation timeout for `start`/`call`, or split long operations into accepted/operation-id polling.
- Confidence: high

### Low: Delegated CLI failures lose actionable voice-call error messages

- Kind: regression
- File: `extensions/voice-call/index.ts`
- Line: 305
- Evidence: The voice-call gateway handlers report failures as `respond(false, { error: "..." })`, for example missing call/message data at `extensions/voice-call/index.ts:305`, manager failures at `extensions/voice-call/index.ts:310`, and `to required` at `extensions/voice-call/index.ts:459`. Gateway responses carry errors in the third `error` argument, and the client rejects failed frames using `parsed.error?.message ?? "unknown error"` at `src/gateway/client.ts:865`. The new CLI delegation rethrows non-transport gateway errors at `extensions/voice-call/src/cli.ts:95`.
- Impact: When the gateway is reachable but the voice-call operation fails, the CLI can report `unknown error` instead of the real cause such as `to required`, `fromNumber not configured`, provider setup errors, or `Already waiting for transcript`. The pre-commit local-runtime path surfaced those manager errors directly.
- Suggested fix: Return gateway failures with the protocol error argument, for example `respond(false, undefined, errorShape(..., message))`, or otherwise update the gateway method wrapper/client contract so plugin `{ error }` payload failures preserve their message for CLI callers.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. For the timeout, run `openclaw voicecall continue --call-id <active-call> --message <text>` against a running gateway and delay the caller response past 5 seconds; the CLI request times out before the voice-call manager’s 180s transcript timeout. For the error-shape issue, invoke a delegated gateway path that returns `respond(false, { error: ... })`, such as a failed `continue` or missing configured outbound number, and observe the gateway client’s fallback to `unknown error`.
- Is this the best way to solve the issue? yes for the direction: preserve gateway delegation, but set per-operation timeouts that match the voice-call contract and return gateway failures through the protocol error field.

## Reviewed

- Diff: `e8f9c3e6dedc8b664317264a0a15f6862488edf3..464e57360262b7e0f9a705431bedd402fe8c356b`
- Changed files: `CHANGELOG.md`, `docs/cli/voicecall.md`, `docs/plugins/voice-call.md`, `extensions/voice-call/index.test.ts`, `extensions/voice-call/index.ts`, `extensions/voice-call/src/cli.ts`
- Code read: changed files in full, current `main` versions of touched files, gateway RPC client/server framing, plugin service startup, voice-call manager outbound/timer/config paths
- Issue context: `https://github.com/openclaw/openclaw/issues/72345`

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because `node_modules` was missing
- `pnpm test extensions/voice-call/index.test.ts` passed: 25 tests
- `pnpm exec oxfmt --check --threads=1 extensions/voice-call/src/cli.ts extensions/voice-call/index.ts extensions/voice-call/index.test.ts docs/cli/voicecall.md docs/plugins/voice-call.md CHANGELOG.md` passed

## Dependency / Web Checks

- No dependency or general web lookup was needed.
- Used `gh issue view 72345 --repo openclaw/openclaw` for commit-linked issue context.

## Limitations

- Did not run a live Gateway plus phone-provider call. The findings are from source-level contract tracing and focused tests.
```
