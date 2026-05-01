---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-173f959613b3
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-173f959613b3
source: clawsweeper_commit
commit_sha: 173f959613b35195c8e4e662b9e0138831cfb4d2
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/173f959613b35195c8e4e662b9e0138831cfb4d2.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-173f959613b3`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/173f959613b35195c8e4e662b9e0138831cfb4d2
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/173f959613b35195c8e4e662b9e0138831cfb4d2.md
- Latest main at intake: ae07d57f9d5ffebe56bbe3981afe9cf92aefbd14

## ClawSweeper Report

```md
---
sha: 173f959613b35195c8e4e662b9e0138831cfb4d2
parent: 1b6f2969aab46093bd9ef40564f30d60578f9e8f
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "GitHub"
github_author: clawsweeper[bot]
github_committer: web-flow
co_authors: ["openclaw-clawsweeper[bot]"]
commit_authored_at: "2026-04-30T22:44:21-07:00"
commit_committed_at: "2026-04-30T22:44:21-07:00"
result: findings
confidence: medium
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-01T06:03:25+00:00
---

# Commit 173f959

## Summary

Found one low-severity edge case in the new prefixed-alias cache behavior: concurrent mixed bare and `p:n/...` lookups can still leave the prefixed alias uncached.

## Findings

### Low: Prefixed aliases are skipped when a deduped bare lookup wins the race

- Kind: reliability
- File: `extensions/bluebubbles/src/monitor-reply-fetch.ts`
- Line: 86
- Evidence: `fetchBlueBubblesReplyContext()` dedupes in-flight fetches by sanitized bare id (`accountId:replyToId`) before preserving the original raw id. The alias write at lines 180-185 only runs inside the first caller’s `runFetch(params, replyToId)`. If a bare `msg-race` fetch starts first and a concurrent `p:0/msg-race` fetch joins the same promise, the second caller never gets its raw prefixed id cached. I confirmed this with an in-process fake client: one request was made, `msg-race` was cached, and `p:0/msg-race` was not.
- Impact: This does not break the current caller’s fetched reply body/sender, but it makes the commit’s new alias guarantee race-dependent. Later replies using the prefixed id can miss RAM, lose the short-id mapping for that alias, and hit the BlueBubbles API again.
- Suggested fix: Track alias ids per in-flight bare key, or on an `existing` in-flight hit attach a continuation that caches the current caller’s validated `p:n/<bare>` alias when the shared fetch resolves successfully.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes: start `fetchBlueBubblesReplyContext({ replyToId: "msg-race" })`, then before its fake request resolves start `fetchBlueBubblesReplyContext({ replyToId: "p:0/msg-race" })`; after resolving the shared response, `resolveReplyContextFromCache(... "msg-race")` is present and `resolveReplyContextFromCache(... "p:0/msg-race")` is null.
- Is this the best way to solve the issue? Unclear; the safest direction is to keep the current bare-id network dedupe, but make alias caching independent of which raw id created the shared promise.

## Reviewed

- Diff: `1b6f2969aab46093bd9ef40564f30d60578f9e8f..173f959613b35195c8e4e662b9e0138831cfb4d2`
- Changed files: `extensions/bluebubbles/src/monitor-reply-fetch.ts`, `extensions/bluebubbles/src/monitor-reply-fetch.test.ts`
- Code read: changed files, `extensions/bluebubbles/src/monitor-reply-cache.ts`, relevant `monitor-processing.ts`, `monitor-normalize.ts`, send/reaction/media reply paths, adjacent BlueBubbles tests.
- Dependencies/web: checked BlueBubbles send/reply parameter docs for context around `selectedMessageGuid` and `partIndex`.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because `node_modules` was missing.
- `pnpm test extensions/bluebubbles/src/monitor-reply-fetch.test.ts` passed: 25 tests.
- `pnpm exec tsx -e <focused fake-client concurrency probe>` reproduced the alias miss: `{"factoryCalls":1,"bare":true,"prefixed":false}`.

## Limitations

- No live BlueBubbles server/webhook run; the finding is based on local code tracing plus a focused fake-client check.
```
