---
sha: 0acfb7ba13ba81febfc7c1d7257d117b48fe1bee
parent: 4ee8a2ac2ea53582b7d75ff82ba9ce30933d1d9f
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-22T10:23:32+01:00"
commit_committed_at: "2026-05-22T10:32:12+01:00"
result: findings
confidence: medium
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-22T09:59:39+00:00
---

# Commit 0acfb7b

## Summary

Found one edge-case regression in the new direct-thread parsing. Current `main` has a follow-up fix for route-bound direct thread sessions, but the parser still unconditionally treats any final `:thread:` segment in a direct key as a suffix, including direct peer IDs that existing tests show may legitimately contain non-numeric `:thread:` markers.

## Findings

### Low: Direct peer IDs containing `:thread:` are truncated before main-DM event routing

- Kind: regression
- File: `src/infra/event-session-routing.ts`
- Line: 70
- Evidence: `parseDirectAgentSessionTarget` now calls `parseThreadSessionSuffix(sessionKey)` and parses only `baseSessionKey`. For `agent:main:telegram:dm:user:thread:abc`, that means the direct peer becomes `user` instead of the prior `user:thread:abc`. Existing coverage in `src/agents/pi-embedded-runner/history.test.ts:57` explicitly preserves non-numeric `:thread:` markers as part of direct-message IDs, and `buildAgentPeerSessionKey` still serializes direct peer IDs without escaping colon segments in `src/routing/session-key.ts:211`.
- Impact: A single-owner `dmScope=main` config with `allowFrom: ["user:thread:abc"]` no longer remaps events for `agent:main:telegram:dm:user:thread:abc` to `agent:main:main`; the pinned owner comparison sees target peer `user` and strands the event in the stale/direct key. The inverse case can also route a distinct `user:thread:*` peer as `user` if the allowlist contains only `user`.
- Suggested fix: Preserve both interpretations for direct keys. Prefer the full direct peer ID when it matches the pinned owner or route binding, and only use the stripped base peer for keys known to be real thread sessions.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes by adding a focused case around `resolveEventSessionRoutingPolicy` and `resolveEventSessionKeyForPolicy` with `allowFrom: ["user:thread:abc"]`; I did not execute that new case because this was report-only.
- Is this the best way to solve the issue? Unclear; the safest direction is to avoid discarding the original direct peer candidate before allowlist/route checks, because generic thread IDs can also be non-numeric.

## Reviewed

- Diff: `4ee8a2ac2ea53582b7d75ff82ba9ce30933d1d9f..0acfb7ba13ba81febfc7c1d7257d117b48fe1bee`
- Changed files: `src/infra/event-session-routing.ts`, `src/infra/event-session-routing.test.ts`
- Code read: `src/infra/event-session-routing.ts`, `src/routing/session-key.ts`, `src/sessions/session-key-utils.ts`, `src/security/dm-policy-shared.ts`, event callers in `src/gateway/server-node-events.ts`, `src/agents/cli-runner/execute.ts`, `src/agents/bash-tools.exec-runtime.ts`, adjacent routing/history/thread tests
- Dependencies/web: no dependency changes; no web lookup needed
- Commands: `git show --stat --format=fuller`, `git diff`, `rg`, `sed`, `nl -ba`, `git diff --check`

## Tests / Live Checks

- `git diff --check 4ee8a2ac2ea53582b7d75ff82ba9ce30933d1d9f..0acfb7ba13ba81febfc7c1d7257d117b48fe1bee` passed.
- `node scripts/run-vitest.mjs src/infra/event-session-routing.test.ts` could not run: `Cannot find module 'vitest/package.json'`.

## Limitations

- Focused Vitest execution was blocked by missing local dependencies in this checkout.
