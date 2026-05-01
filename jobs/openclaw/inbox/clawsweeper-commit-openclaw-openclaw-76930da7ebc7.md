---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-76930da7ebc7
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-76930da7ebc7
source: clawsweeper_commit
commit_sha: 76930da7ebc71404a4bca38405ba0a47ca18545f
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/76930da7ebc71404a4bca38405ba0a47ca18545f.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-76930da7ebc7`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/76930da7ebc71404a4bca38405ba0a47ca18545f
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/76930da7ebc71404a4bca38405ba0a47ca18545f.md
- Latest main at intake: 4ea0556f642825d6eb4b711b27ec309714a8a024

## ClawSweeper Report

```md
---
sha: 76930da7ebc71404a4bca38405ba0a47ca18545f
parent: eabab1f64f9e06642014eb93b1e82c7acdfc95af
repository: openclaw/openclaw
author: "Cole"
committer: "GitHub"
github_author: coletebou
github_committer: web-flow
co_authors: ["coletebou", "omarshahine"]
commit_authored_at: "2026-05-01T01:01:26-04:00"
commit_committed_at: "2026-04-30T22:01:26-07:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-01T05:20:44Z
---

# Commit 76930da

## Summary

Found one low-severity cache-key regression in the new BlueBubbles reply-context fallback. It does not break the first reply-context fetch, but it prevents the promised cache amortization for `p:0/<guid>` reply ids.

## Findings

### Low: Prefixed reply ids never hit the cache populated by the fallback

- Kind: reliability
- File: `extensions/bluebubbles/src/monitor-reply-fetch.ts`
- Line: 155
- Evidence: `fetchBlueBubblesReplyContext` strips `p:0/<guid>` to `<guid>` before the API request and stores the successful result under the stripped `messageId`. The monitor lookup still calls `resolveReplyContextFromCache` with the original `replyToId`, and `resolveReplyContextFromCache` only trims, it does not strip the part prefix. A focused live check after one fallback fetch printed `{ "prefixed": false, "bare": true }`, confirming the cache entry is reachable by `msg-guid` but not by the original `p:0/msg-guid`.
- Impact: For BlueBubbles payloads that use part-index reply ids, repeated replies to the same original message keep missing RAM and issuing another HTTP fallback request. This weakens the feature’s stated coalescing/amortization behavior and can add avoidable 5s best-effort waits under slow or unavailable BlueBubbles servers.
- Suggested fix: Normalize the reply id through the same strip/validation helper before both cache lookup and `getShortIdForUuid`, or store aliases for both the original prefixed id and the stripped bare guid after a successful fallback. Add a regression test that fetches `p:0/msg-guid` and then resolves the cache with the same prefixed id.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: run the helper with `replyToId: "p:0/msg-guid"` and a fake successful client, then compare `resolveReplyContextFromCache({ replyToId: "p:0/msg-guid" })` with `resolveReplyContextFromCache({ replyToId: "msg-guid" })`.
- Is this the best way to solve the issue? yes: the fallback already has one normalization rule; reusing it at cache lookup avoids divergent keys without changing the HTTP contract.

## Reviewed

- Diff: `eabab1f64f9e06642014eb93b1e82c7acdfc95af..76930da7ebc71404a4bca38405ba0a47ca18545f`
- Changed files: `CHANGELOG.md`, `docs/channels/bluebubbles.md`, `extensions/bluebubbles/src/config-schema.ts`, `extensions/bluebubbles/src/monitor-processing.ts`, `extensions/bluebubbles/src/monitor-reply-fetch.test.ts`, `extensions/bluebubbles/src/monitor-reply-fetch.ts`, `extensions/bluebubbles/src/setup-surface.test.ts`, `extensions/bluebubbles/src/types.ts`
- Code read: touched files, `monitor-reply-cache.ts`, `monitor-normalize.ts`, `client.ts`, `accounts.ts`, `accounts-normalization.ts`, scoped `AGENTS.md`
- PR inspected: `#71820` via `gh pr view`

## Tests / Live Checks

- Initial `pnpm test ...` failed because `node_modules` was missing and `vitest/package.json` could not be resolved.
- Ran `pnpm install`, then `pnpm test extensions/bluebubbles/src/monitor-reply-fetch.test.ts extensions/bluebubbles/src/setup-surface.test.ts`: 78 passed.
- Ran `pnpm test extensions/bluebubbles/src/monitor.test.ts extensions/bluebubbles/src/monitor.webhook-auth.test.ts`: 104 passed.
- Ran focused `pnpm exec tsx` cache-key probe for `p:0/msg-guid`: reproduced the cache alias miss.

## Dependency / Web Checks

- Consulted BlueBubbles REST API docs for response-container/auth shape and BlueBubbles server README for `MessageResponse` fields while checking the new fallback parser. ([docs.bluebubbles.app](https://docs.bluebubbles.app/server/developer-guides/rest-api-and-webhooks))

## Limitations

- No live BlueBubbles server was available; the reproduction used the typed helper’s injected client seam.

https://github.com/openclaw/openclaw/pull/71820
```
