---
sha: aeb1ba9a53a82bdfa3fa9a3dee3cf1adac1fdfa0
parent: c3f1f0c315c0bec4f67a0f1696380b2ef5677f97
repository: openclaw/openclaw
author: "Pavan Kumar Gondhi"
committer: "GitHub"
github_author: pgondhi987
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-05-12T15:19:43+05:30"
commit_committed_at: "2026-05-12T15:19:43+05:30"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-12T09:54:36+00:00
---

# Commit aeb1ba9a

## Summary

The code change correctly narrows `wiki.ingest` from write scope to admin scope, and focused gateway/scope tests pass. I found one remaining contract regression: the memory-wiki Gateway RPC docs still tell callers that `wiki.ingest` is a write method.

## Findings

### Low: `wiki.ingest` docs still advertise write scope after admin-only change

- Kind: compatibility
- File: `extensions/memory-wiki/README.md`
- Line: 162
- Evidence: `extensions/memory-wiki/src/gateway.ts:221` registers `wiki.ingest` with `LOCAL_FILE_INGEST_SCOPE`, which resolves to `operator.admin`, while `extensions/memory-wiki/README.md:158` lists `wiki.ingest` under “Write methods”. The Gateway scope docs say `operator.admin` is a distinct administrative scope and each RPC’s least-privilege method scope decides whether a request reaches the handler.
- Impact: operators or clients following the plugin README may request or mint only `operator.write` and then fail when calling `wiki.ingest`, which is now admin-only.
- Suggested fix: update the memory-wiki README Gateway RPC section to move `wiki.ingest` into an admin-scoped section, or explicitly mark local-file ingest as requiring `operator.admin`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes, by static contract comparison: current `main` registers `wiki.ingest` as admin-only, and the README still classifies it as write-scoped.
- Is this the best way to solve the issue? yes. The code authorization change is at the right seam; the remaining fix is to align the plugin’s documented RPC scope.

## Reviewed

- Diff: `c3f1f0c315c0bec4f67a0f1696380b2ef5677f97..aeb1ba9a53a82bdfa3fa9a3dee3cf1adac1fdfa0`
- Changed files: `CHANGELOG.md`, `extensions/memory-wiki/src/gateway.test.ts`, `extensions/memory-wiki/src/gateway.ts`
- Code read: `extensions/memory-wiki/src/gateway.ts`, `extensions/memory-wiki/src/gateway.test.ts`, `extensions/memory-wiki/src/ingest.ts`, `extensions/memory-wiki/index.ts`, `extensions/memory-wiki/index.test.ts`, `src/gateway/method-scopes.ts`, `src/gateway/method-scopes.test.ts`, `src/shared/gateway-method-policy.ts`, `src/plugins/registry.ts`, `src/plugins/types.ts`, `extensions/memory-wiki/README.md`, `docs/gateway/operator-scopes.md`, `docs/gateway/protocol.md`
- GitHub: inspected PR `#80897` with `gh pr view`; `gitcrawl` was unavailable in this worker.
- Dependencies/web: no dependency files changed; no external web lookup needed.

## Tests / Live Checks

- `pnpm test extensions/memory-wiki/src/gateway.test.ts src/gateway/method-scopes.test.ts -- --reporter=verbose` passed: 2 Vitest shards, 72 tests.
- `pnpm docs:list` completed; relevant docs were read.
- The first `pnpm test` invocation installed missing workspace dependencies via Corepack/pnpm before running tests.

## Limitations

- I did not start a live Gateway and perform an end-to-end `wiki.ingest` RPC with write-only and admin tokens; the finding is based on source, tests, and docs contract evidence.

https://github.com/openclaw/openclaw/pull/80897
