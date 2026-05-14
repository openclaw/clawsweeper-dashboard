---
sha: bb8aa0cfe2b0bf8ff0f9d00c96df1b129c6a030a
parent: 1fc92ddfb1d715db4a72aa37c3f804a295ecd2de
repository: openclaw/openclaw
author: "samzong"
committer: "web-flow"
github_author: samzong
github_committer: web-flow
co_authors: ["samzong", "jalehman"]
commit_authored_at: "2026-05-14T13:21:46+08:00"
commit_committed_at: "2026-05-13T22:21:46-07:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-14T05:33:48Z
---

# Commit bb8aa0c

## Summary

Found one compatibility regression outside the main Gateway throttle path: deprecated plugin runtime config helpers lost the owning plugin scope. The focused Gateway fanout/abort tests pass.

## Findings

### Medium: Deprecated plugin config helpers no longer run under plugin scope

- Kind: regression
- File: `src/plugins/registry.ts`
- Line: 2401
- Evidence: The proxy now wraps `current`, `mutateConfigFile`, and `replaceConfigFile`, but leaves `loadConfig` and `writeConfigFile` from the `...config` spread unwrapped. Those deprecated helpers still exist in `src/plugins/runtime/types-core.ts:163` and their warning attribution reads `getPluginRuntimeGatewayRequestScope()` in `src/plugins/runtime/runtime-config.ts:15`. A focused probe confirmed `api.runtime.config.current()` sees `{ pluginId: "legacy-plugin", pluginSource: ... }`, while `api.runtime.config.loadConfig()` and `writeConfigFile()` see no plugin scope.
- Impact: Legacy external plugins using `api.runtime.config.loadConfig()` or `writeConfigFile()` still run, but their deprecation warnings become anonymous and dedupe under `anonymous`, so operators lose the plugin id/source for deprecated config reads/writes. This regresses the documented migration behavior in `docs/plugins/sdk-runtime.md:44`.
- Suggested fix: Preserve the old scoped wrappers for `loadConfig` and `writeConfigFile` while keeping the new wrappers for `current`, `mutateConfigFile`, and `replaceConfigFile`; add registry test assertions for all five helpers.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A one-off `node --import tsx -` probe using `createPluginRegistry(...).createApi(record, ...)` showed only `currentScope` had plugin identity; `loadScope` and `writeScope` were `undefined`.
- Is this the best way to solve the issue? yes. The proxy already has `runWithPluginScope`; the safe fix is to keep wrapping the deprecated compatibility methods instead of relying on the spread.

## Reviewed

- Diff: `1fc92ddfb1d715db4a72aa37c3f804a295ecd2de..bb8aa0cfe2b0bf8ff0f9d00c96df1b129c6a030a`
- Changed files: Gateway chat fanout/abort/maintenance/request context tests and code, transcript tests, plugin registry runtime config test/code, changelog.
- Code read: `src/gateway/server-chat.ts`, `src/gateway/chat-abort.ts`, `src/gateway/server-maintenance.ts`, `src/gateway/server-methods/chat.ts`, `src/plugins/registry.ts`, `src/plugins/runtime/runtime-config.ts`, runtime config types/docs, and relevant tests.
- PR context: inspected PR #80335 with `gh pr view`.

## Tests / Live Checks

- `pnpm install` succeeded; lockfile was up to date.
- `git diff --check 1fc92ddf..bb8aa0cf` passed.
- `node scripts/run-vitest.mjs src/plugins/registry.runtime-config.test.ts src/plugins/runtime/runtime-config.test.ts` passed, but does not cover the deprecated helper regression.
- `node scripts/run-vitest.mjs src/gateway/server-chat.agent-events.test.ts src/gateway/chat-abort.test.ts src/gateway/server-methods/chat.abort-authorization.test.ts src/gateway/server-maintenance.test.ts src/gateway/server-startup-early.test.ts src/gateway/server-request-context.test.ts` passed.

## Dependency / Web Checks

- No dependency, lockfile, workflow, or downloaded artifact changes in the commit.
- No general web lookup needed; current external facts did not affect the finding.

## Limitations

- Did not run full `check:changed` or full test suite.
- Did not run an external live Gateway/provider/channel scenario; focused Gateway tests covered the touched server fanout path.
