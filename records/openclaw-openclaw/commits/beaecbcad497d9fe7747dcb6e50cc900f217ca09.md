---
sha: beaecbcad497d9fe7747dcb6e50cc900f217ca09
parent: f62cca91e6421b6881326e047cc3634bb71401ef
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "GitHub"
github_author: steipete
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-05-09T05:40:30-04:00"
commit_committed_at: "2026-05-09T05:40:30-04:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-09T09:48:31Z
---

# Commit beaecbca

## Summary

Found one compatibility regression around the remaining `transport: "websocket"` config surface for public OpenAI Responses runs.

## Findings

### Medium: Public OpenAI `transport: "websocket"` is now silently ignored

- Kind: regression
- File: `src/agents/pi-embedded-runner/stream-resolution.ts`
- Line: 46
- Evidence: Before this commit, `shouldUseOpenAIWebSocketTransportForAttempt()` selected the custom WebSocket stream for `provider: "openai"` + `api: "openai-responses"` unless the effective params explicitly forced SSE. This commit deletes that selector and only routes PI-native WebSocket-capable transport when `model.provider === "openai-codex"` and `model.api === "openai-codex-responses"` (`stream-resolution.ts:46-60`). Public `openai/*` Responses falls through to `boundary-aware:openai-responses` (`stream-resolution.ts:83-92`), whose implementation always calls `client.responses.create(...)` with `transport: "stream"` and does not branch on `options.transport` (`src/agents/openai-transport-stream.ts:752-809`). The config layer still accepts and forwards `transport: "websocket"` (`src/agents/pi-embedded-runner/extra-params.ts:382-429`), and docs still advertise `"websocket"` as “Force WebSocket only” for `openai/*` (`docs/providers/openai.md:803-816`).
- Impact: Users who explicitly set `agents.defaults.models["openai/<model>"].params.transport = "websocket"` no longer get WebSocket behavior; the setting becomes a no-op and the run goes through the HTTP/SSE Responses path. That is a silent compatibility break for users relying on WebSocket-only behavior or testing WebSocket-specific transport failures.
- Suggested fix: Either restore a consuming WebSocket path for public `openai-responses` runs, likely by routing only the appropriate public OpenAI models through a PI-native/openai WebSocket-capable stream when `transport !== "sse"`, or remove/deprecate `websocket` for public `openai/*` in schema/docs and reject/warn on the unsupported value instead of preserving it.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes by inspection and focused tests: the current tests verify the `transport` option is preserved in extra params, but they do not assert that the final public OpenAI Responses stream consumes it. A direct runtime reproduction would require a live OpenAI request, which I did not run.
- Is this the best way to solve the issue? Unclear. If public OpenAI WebSocket support was intentionally removed with the custom planner, the safer fix is to remove or warn on the config surface. If it should remain supported, the fix belongs in stream resolution/transport selection rather than more extra-param forwarding.

## Reviewed

- Diff: `f62cca91e6421b6881326e047cc3634bb71401ef..beaecbcad497d9fe7747dcb6e50cc900f217ca09`
- Changed files: transport resolver, PI extra params, OpenAI provider hooks/tests, deleted `src/agents/openai-ws-*`, docs, package manifests, lockfile
- Code read: `src/agents/pi-embedded-runner/stream-resolution.ts`, `src/agents/pi-embedded-runner/extra-params.ts`, `src/agents/pi-embedded-runner/run/attempt.ts`, `src/agents/openai-transport-stream.ts`, `src/agents/provider-transport-stream.ts`, `extensions/openai/shared.ts`, `extensions/openai/openai-provider.ts`, relevant tests/docs, and PI 0.73.1 package source under `node_modules/@mariozechner/*`
- Dependencies/web: `npm view` for PI 0.73.1 metadata; `pnpm audit --prod --json` reviewed. Hono advisories are present through unchanged `@modelcontextprotocol/sdk`, not introduced by this commit.
- PR/issue context: inspected #79726 and #78055.

## Tests / Live Checks

- `pnpm install --frozen-lockfile` succeeded.
- `pnpm test src/agents/pi-embedded-runner/stream-resolution.test.ts src/agents/pi-embedded-runner-extraparams.test.ts src/agents/transport-params-runtime-contract.test.ts extensions/openai/openai-provider.test.ts` passed, 178 tests across 2 shards.
- No live OpenAI network request was run.

## Limitations

- I did not run a live OpenAI WebSocket/SSE comparison with real credentials.
- The finding is scoped to public OpenAI PI Responses transport config; the explicit `openai-codex/*` PI-native Codex transport path appears intentionally covered by PI 0.73.1.

https://github.com/openclaw/openclaw/pull/79726
