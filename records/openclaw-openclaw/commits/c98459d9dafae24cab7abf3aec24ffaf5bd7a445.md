---
sha: c98459d9dafae24cab7abf3aec24ffaf5bd7a445
parent: 376a792100607e174b6f66cc266ffe269dd3829d
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-05-15T08:52:15+08:00"
commit_committed_at: "2026-05-15T08:52:15+08:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-15T01:01:33Z
---

# Commit c98459d

## Summary

Found one incomplete-fix regression: the commit adds a test/changelog claim that malformed Microsoft Graph JSON is wrapped with a Teams-owned error, but the main `fetchGraphJson` path still calls `Response.json()` directly and leaks raw `SyntaxError`.

## Findings

### Medium: Primary Graph JSON path still leaks raw parser errors

- Kind: regression
- File: `extensions/msteams/src/graph.ts`
- Line: 73
- Evidence: The added test expects `fetchGraphJson({ path: "/teams/team-1/channels" })` to throw `Graph /teams/team-1/channels failed: malformed JSON response` for a malformed 200 JSON response (`extensions/msteams/src/graph.test.ts:197`). But `fetchGraphJson` calls `readOptionalGraphJson`, and `readOptionalGraphJson` still returns `await res.json()` directly at `extensions/msteams/src/graph.ts:73`. The new `readProviderJsonResponse` wrapper is only used by `fetchGraphAbsoluteUrl` at `extensions/msteams/src/graph.ts:122`. A direct Node probe of `new Response("{ nope").json()` throws `SyntaxError: Expected property name or '}' in JSON...`, not the stable Graph-prefixed error.
- Impact: Most Teams Graph calls still leak raw JSON parser errors on malformed successful Graph responses, despite the changelog saying “Microsoft Teams: report malformed Graph ... JSON with channel-owned errors.” This also leaves the newly added `fetchGraphJson` malformed-JSON test inconsistent with production code.
- Suggested fix: Route `readOptionalGraphJson` through a wrapper that preserves the existing 204/content-length-zero behavior, but catches JSON parse failures with the relevant Graph label. Pass the label from `fetchGraphJson`, `postGraphJson`, `postGraphBetaJson`, and `patchGraphJson` so method-specific errors remain stable.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Mock `globalThis.fetch` to return `new Response("{ nope", { status: 200, headers: { "content-type": "application/json" } })`, then call `fetchGraphJson({ token, path: "/teams/team-1/channels" })`; the current code reaches `res.json()` directly.
- Is this the best way to solve the issue? yes. The existing `readProviderJsonResponse` helper already implements the intended wrapping, but the optional-empty Graph helper needs to use that behavior after its empty-response checks.

## Reviewed

- Diff: `376a792100607e174b6f66cc266ffe269dd3829d..c98459d9dafae24cab7abf3aec24ffaf5bd7a445`
- Changed files: `CHANGELOG.md`, `extensions/msteams/src/graph.test.ts`, `extensions/msteams/src/graph.ts`, `extensions/msteams/src/oauth.test.ts`, `extensions/msteams/src/oauth.token.ts`
- Code read: Teams Graph/OAuth helpers and tests, Graph callers, SDK `readProviderJsonResponse`, provider HTTP export surface.
- Dependencies/web: no dependency files changed; no web lookup needed.

## Tests / Live Checks

- `pnpm install --frozen-lockfile`: passed after missing `vitest` dependency blocked the first focused test attempt.
- `node scripts/run-vitest.mjs ...`: first attempt omitted `run` and entered watch-like behavior; stopped.
- `PATH="/opt/hostedtoolcache/node/22.22.2/x64/bin:$PATH" OPENCLAW_VITEST_NO_OUTPUT_TIMEOUT_MS=30000 node scripts/run-vitest.mjs run extensions/msteams/src/graph.test.ts extensions/msteams/src/oauth.test.ts --reporter=verbose`: produced no useful output after ~50s; stopped.
- `git diff --check 376a792100607e174b6f66cc266ffe269dd3829d..c98459d9dafae24cab7abf3aec24ffaf5bd7a445`: passed.
- Direct Node `Response.json()` malformed-body probe confirmed the unwrapped error is a raw `SyntaxError`.

## Limitations

- Focused Vitest did not complete in this environment, so the finding is based on source tracing plus a direct runtime probe rather than captured Vitest failure output.
