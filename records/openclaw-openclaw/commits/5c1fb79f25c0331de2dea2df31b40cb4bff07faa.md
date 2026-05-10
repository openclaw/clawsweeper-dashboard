---
sha: 5c1fb79f25c0331de2dea2df31b40cb4bff07faa
parent: 08b4f86803ab8290cebd5582b14e067be122a02b
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-10T17:28:01+01:00"
commit_committed_at: "2026-05-10T17:28:01+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-10T16:33:06Z
---

# Commit 5c1fb79

## Summary

Found one low-severity test regression: the refactor drops payload array cardinality checks, including in a test whose contract is explicitly that multiple media URLs remain a single outbound payload.

## Findings

### Low: `lastDeliveryPayload()` no longer proves single-payload delivery

- Kind: test_gap
- File: `src/auto-reply/reply/route-reply.test.ts`
- Line: 125
- Evidence: `lastDeliveryPayload()` only asserts that `payloads` is an array and returns `payloads[index]`; it never checks array length. The prior matcher for `payloads: [expect.objectContaining(...)]` failed when an extra payload was present. A focused matcher probe confirmed the old-style array assertion fails for a two-payload array while the new helper pattern passes.
- Impact: The test at `src/auto-reply/reply/route-reply.test.ts:539` is named “preserves multiple mediaUrls as a single outbound payload”, but it would now pass if `routeReply` sent the expected first payload plus an extra second payload. That could hide a future regression in the current production contract, which sends `payloads: [externalPayload]` at `src/auto-reply/reply/route-reply.ts:237`.
- Suggested fix: Have `lastDeliveryPayload()` assert `payloads` length when using the default index, or add `expect(lastDelivery().payloads).toHaveLength(1)` to tests that rely on single-payload delivery, especially the multiple-media-URLs case.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes; compare the old one-element array matcher against the new first-payload-only assertion using a two-element payload array.
- Is this the best way to solve the issue? yes; restoring an explicit payload count assertion preserves the intent without returning to broad object matchers.

## Reviewed

- Diff: `08b4f86803ab8290cebd5582b14e067be122a02b..5c1fb79f25c0331de2dea2df31b40cb4bff07faa`
- Changed files: `src/auto-reply/reply/route-reply.test.ts`
- Code read: full changed test file, base version of touched assertions, `src/auto-reply/reply/route-reply.ts`, `src/channels/message/runtime.ts`, `src/channels/message/send.ts`, `src/infra/outbound/session-context.ts`
- Dependencies/web: no dependency or web checks needed; no dependency files changed.

## Tests / Live Checks

- `pnpm test src/auto-reply/reply/route-reply.test.ts` initially failed because `node_modules` was missing.
- `pnpm install`
- `pnpm test src/auto-reply/reply/route-reply.test.ts` passed: 26 tests.
- Focused Node matcher probe confirmed old array assertion fails with an extra payload while the new helper-style assertion passes.

## Limitations

- Full suite not run; this was a test-only commit and the focused route-reply test passed.
