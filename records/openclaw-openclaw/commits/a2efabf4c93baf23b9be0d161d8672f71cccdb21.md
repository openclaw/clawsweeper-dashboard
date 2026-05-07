---
sha: a2efabf4c93baf23b9be0d161d8672f71cccdb21
parent: 7dc597b92176c253fcc85ab349d59d718e38293f
repository: openclaw/openclaw
author: "NVIDIAN"
committer: "GitHub"
github_author: ai-hpc
github_committer: web-flow
co_authors: ["Marcus Castro"]
commit_authored_at: "2026-05-06T23:15:19-07:00"
commit_committed_at: "2026-05-07T03:15:19-03:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-07T06:22:05Z
---

# Commit a2efabf

## Summary

Found two actionable regressions in the new WhatsApp media-only coalescer. The intended single-media caption dedupe path is covered, but the coalescer now drops whole pending multi-media payloads on partial overlap and moves deferred delivery outside the shared dispatcher error path.

## Findings

### Medium: Partial media overlap drops unrelated attachments

- Kind: bug
- File: `extensions/whatsapp/src/auto-reply/monitor/inbound-dispatch.ts`
- Line: 171
- Evidence: `flushExceptDuplicateMedia` drops an entire pending media-only payload when `hasWhatsAppMediaUrlOverlap(candidate.mediaUrls, mediaUrls)` is true. If a pending tool/block payload contains `["a.png", "b.png"]` and a later captioned payload contains only `["a.png"]`, the coalescer discards the pending payload wholesale, so `b.png` is never delivered. WhatsApp delivery supports multi-attachment lists via `sendMediaWithLeadingCaption`, which iterates every `mediaUrls` entry.
- Impact: A later captioned duplicate of one attachment can silently suppress other generated attachments from the same interim media payload. That changes the prior behavior from “send all generated media, even with a duplicate” to “lose every attachment bundled with the duplicate.”
- Suggested fix: When there is overlap, split or filter the pending payload instead of dropping it. Drop only URLs present in the later payload, then deliver the pending payload if any media remains.
- Confidence: high

### Medium: Deferred media-only delivery bypasses dispatcher failure handling

- Kind: reliability
- File: `extensions/whatsapp/src/auto-reply/monitor/inbound-dispatch.ts`
- Line: 583
- Evidence: Non-final media-only payloads now return from the dispatcher callback after `mediaOnlyCoalescer.defer(...)`, then `flushAll()` performs the real `deliverNormalizedPayload(...)` after `dispatchReplyWithBufferedBlockDispatcher` has completed. Before this commit, `params.deliverReply(...)` ran inside the shared reply dispatcher callback, whose send chain catches delivery errors and invokes `onError`; `finalizeDispatchResult` then subtracts failed counts. In the new path, a deferred media-only send exception escapes directly from `flushAll()` and does not call `logWhatsAppReplyDeliveryError`.
- Impact: A failed deferred media-only WhatsApp send can turn a per-reply delivery failure into a dispatch error and lose the existing contextual “auto-reply delivery failed” logging/count adjustment. This affects tool/block media-only replies, including the same class of media payloads this commit defers.
- Suggested fix: Flush deferred payloads through the same dispatcher error/accounting path, or wrap `flushAll()`/`flushExceptDuplicateMedia()` delivery in the same error handling used by `onError` and preserve failed delivery semantics.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes for the first finding by feeding a deferred media-only payload with multiple URLs followed by a captioned payload sharing only one URL. The existing test harness already captures the dispatcher `deliver` callback and can be extended directly.
- Is this the best way to solve the issue? No. The narrow fix should still live in the WhatsApp inbound dispatcher, but the coalescer needs URL-level filtering and dispatcher-equivalent error handling rather than whole-payload dropping after the shared dispatcher has gone idle.

## Reviewed

- Diff: `7dc597b92176c253fcc85ab349d59d718e38293f..a2efabf4c93baf23b9be0d161d8672f71cccdb21`
- Changed files: `CHANGELOG.md`, `extensions/whatsapp/src/auto-reply/monitor/inbound-dispatch.ts`, `extensions/whatsapp/src/auto-reply/monitor/inbound-dispatch.test.ts`
- Code read: changed files in full, prior base implementation, WhatsApp delivery path, reply dispatcher error/count handling, channel turn dispatch handling, reply payload media helpers
- PR/issue context: PR `#78770`, issue `#78767`
- Author context: NVIDIAN (`@ai-hpc`, account created 2024-10-04); OpenClaw activity helper reported 13 PRs, 6 issues, 9 commits in the last 12 months

## Tests / Live Checks

- `pnpm test extensions/whatsapp/src/auto-reply/monitor/inbound-dispatch.test.ts` passed, 35 tests.
- Initial test attempt failed because `node_modules` was missing; ran `pnpm install` once per repo instruction, then retried successfully.

## Dependency / Web Checks

- No dependency changes.
- No general web lookup needed; GitHub context was inspected with `gh`.

## Limitations

- I did not run a live WhatsApp account. The findings are source-backed and target paths the current unit tests do not cover.

https://github.com/openclaw/openclaw/pull/78770
