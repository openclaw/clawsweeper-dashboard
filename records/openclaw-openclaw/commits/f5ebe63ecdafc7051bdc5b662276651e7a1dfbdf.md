---
sha: f5ebe63ecdafc7051bdc5b662276651e7a1dfbdf
parent: 2d231cef2746886137d9f4f7b838973f8d105658
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-05-14T12:29:04+08:00"
commit_committed_at: "2026-05-14T12:29:30+08:00"
result: findings
confidence: medium
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-14T04:42:10Z
---

# Commit f5ebe63

## Summary

Found one low-severity reliability regression risk: the saturated-key fallback now preserves same-key ordering by tracking every overflow key, but that means `maxTrackedKeys` no longer bounds tracked active keys in this path.

## Findings

### Low: Saturated fallback can grow `keyChains` beyond `maxTrackedKeys`

- Kind: reliability
- File: `src/auto-reply/inbound-debounce.ts`
- Line: 240
- Evidence: `canTrackKey` returns false once the union of buffered keys and active key chains reaches `maxTrackedKeys`, but the saturated branch now always calls `enqueueKeyTask(key, ...)`, which stores the new key in `keyChains` anyway. In the parent, this branch only added an overflow key chain when `serializeImmediate` was enabled; otherwise it ran the immediate flush untracked.
- Impact: a burst of distinct inbound debounce keys while the debounce map is saturated and `onFlush` is slow can create one `keyChains` entry per overflow key until those flushes settle. That defeats the tracked-key cap that this code otherwise uses to bound debounce state, and can amplify memory/state growth under high-cardinality sender/chat bursts.
- Suggested fix: keep the ordering fix for keys that already have a chain, but make first-time overflow chain admission bounded. For example, admit overflow chains only while under a separate cap, otherwise fall back to untracked immediate flush with documented best-effort ordering under saturation.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? No live heap repro was run because `keyChains` is internal, but the code path is direct: fill `buffers` to `maxTrackedKeys`, then enqueue many new debounceable keys whose `onFlush` does not settle quickly.
- Is this the best way to solve the issue? Unclear. Preserving same-key overflow ordering requires tracking first-time overflow keys, so the safest fix is likely a bounded overflow admission policy rather than reverting the ordering behavior outright.

## Reviewed

- Diff: `2d231cef2746886137d9f4f7b838973f8d105658..f5ebe63ecdafc7051bdc5b662276651e7a1dfbdf`
- Changed files: `CHANGELOG.md`, `src/auto-reply/inbound-debounce.ts`
- Code read: full `src/auto-reply/inbound-debounce.ts`, relevant `src/auto-reply/inbound.test.ts` debounce tests, and inbound debounce call sites in Telegram, WhatsApp, Slack, Feishu, MS Teams, Mattermost, Discord, Signal, and iMessage.
- Current main: no later changes to `src/auto-reply/inbound-debounce.ts` after this commit.
- Dependencies/web: no dependency change; no web lookup needed. `gh api` found no associated PR for the commit.

## Tests / Live Checks

- `git diff --check 2d231cef2746886137d9f4f7b838973f8d105658..f5ebe63ecdafc7051bdc5b662276651e7a1dfbdf` passed.
- `pnpm install` was required because `vitest/package.json` was missing.
- `CI=1 node scripts/run-vitest.mjs src/auto-reply/inbound.test.ts --run -t 'same-key overflow|does not serialize keyed turns by default|serializes keyed turns when immediate serialization is enabled' --reporter=verbose` passed.
- `CI=1 node scripts/run-vitest.mjs src/auto-reply/inbound.test.ts --run -t 'createInboundDebouncer' --reporter=verbose` passed.

## Dependency / Web Checks

- No package, lockfile, CI action, or downloaded artifact changed in the reviewed diff.

## Limitations

- Did not run a full suite or remote Testbox gate; the changed surface was narrow and focused debounce tests passed.
- Did not instrument internal `keyChains` size at runtime; the finding is based on source-level control flow and the cap contract implied by `maxTrackedKeys`.
