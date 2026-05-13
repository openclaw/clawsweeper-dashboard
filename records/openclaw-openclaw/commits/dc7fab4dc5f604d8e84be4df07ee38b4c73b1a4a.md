---
sha: dc7fab4dc5f604d8e84be4df07ee38b4c73b1a4a
parent: b10b946b125d3147b4237e46033d9ae48f4af88e
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-14T00:12:53+01:00"
commit_committed_at: "2026-05-14T00:13:29+01:00"
result: findings
confidence: medium
highest_severity: high
check_conclusion: neutral
reviewed_at: 2026-05-13T23:25:59Z
---

# Commit dc7fab4

## Summary

Found one concrete regression risk in the new PI discovery-store cache: it caches a mutable `AuthStorage` instance that the run auth path mutates with per-run runtime credentials. That can let concurrent same-agent runs overwrite each other’s runtime auth override.

## Findings

### High: Cached AuthStorage can leak per-run runtime credentials across concurrent runs

- Kind: security
- File: `src/agents/pi-embedded-runner/model-discovery-cache.ts`
- Line: 102
- Evidence: `discoverCachedPiStores()` returns the cached `authStorage` object unchanged on a fingerprint hit (`src/agents/pi-embedded-runner/model-discovery-cache.ts:102`). The embedded-run auth controller writes per-run credentials into that object with `setRuntimeApiKey()` (`src/agents/pi-embedded-runner/run/auth-controller.ts:430`, `src/agents/pi-embedded-runner/run/auth-controller.ts:445`). For runtime-auth exchanges, `run.ts` intentionally leaves `resolvedApiKey` unset when `runtimeAuthState` exists (`src/agents/pi-embedded-runner/run.ts:1211`), so stream wrappers later read the key from `authStorage.getApiKey()` (`src/agents/pi-embedded-runner/stream-resolution.ts:222`). The pinned `@earendil-works/pi-coding-agent@0.74.0` `AuthStorage` stores runtime overrides in a mutable map, and `getApiKey()` checks that map first.
- Impact: two overlapping runs for the same agent/provider can share the same cached `AuthStorage`; whichever run calls `setRuntimeApiKey()` last can change the credential used by the other run’s stream wrapper. That can send one session’s request under another profile/token, affecting privacy, billing, and auth isolation. Before this commit, each model resolution created a fresh `AuthStorage`, so these runtime overrides were per-run.
- Suggested fix: do not cache the mutable PI `AuthStorage` instance. Cache only immutable discovery inputs/model data, or create a fresh per-run `AuthStorage`/`ModelRegistry` wrapper from cached parsed state. At minimum, ensure runtime overrides cannot persist on cached stores and cannot be shared between active runs.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Partially. I reproduced the primitive with a focused smoke: two cache hits return the same `authStorage` object, and a runtime override written through the first result is visible through the second: `{"sameAuthStorage":true,"sameModelRegistry":true,"secondRuntimeKey":"runtime-one"}`. I did not run a full concurrent embedded-agent stream race.
- Is this the best way to solve the issue? Yes for direction: mutable per-run auth state should not live in a cross-run discovery cache. A safer design is to cache parsed model-discovery data without sharing `AuthStorage.runtimeOverrides`.

## Reviewed

- Diff: `b10b946b125d3147b4237e46033d9ae48f4af88e..dc7fab4dc5f604d8e84be4df07ee38b4c73b1a4a`
- Changed files: `CHANGELOG.md`, `package.json`, `scripts/perf/issue-78851-model-resolution.ts`, `src/agents/pi-embedded-runner/model-discovery-cache.ts`, `src/agents/pi-embedded-runner/model.test.ts`, `src/agents/pi-embedded-runner/model.ts`, `src/agents/pi-model-discovery.test.ts`, `src/agents/pi-model-discovery.ts`, `src/plugins/synthetic-auth.runtime.test.ts`, `src/plugins/synthetic-auth.runtime.ts`
- Code read: changed files, current `main` call paths through embedded run model resolution, auth controller, stream key resolution, auth-profile storage, and PI `AuthStorage`/`ModelRegistry` source from the pinned dependency.
- Dependencies/web: inspected npm registry tarball for `@earendil-works/pi-coding-agent@0.74.0`; inspected GitHub issue #78851 with `gh issue view`.

## Tests / Live Checks

- `pnpm install`: passed.
- `git diff --check b10b946b125d3147b4237e46033d9ae48f4af88e..dc7fab4dc5f604d8e84be4df07ee38b4c73b1a4a`: passed.
- `pnpm test src/agents/pi-embedded-runner/model.test.ts src/agents/pi-model-discovery.test.ts src/plugins/synthetic-auth.runtime.test.ts -- --reporter=verbose`: passed.
- Focused cache-mutability smoke: confirmed cached `authStorage` and `modelRegistry` object identity is reused and runtime overrides persist across cache hits.

## Limitations

- I did not run a full live provider race with two concurrent embedded-agent streams; the finding is based on source tracing plus the focused cache-mutability smoke.
