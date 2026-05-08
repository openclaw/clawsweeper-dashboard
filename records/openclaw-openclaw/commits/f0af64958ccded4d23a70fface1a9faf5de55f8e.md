---
sha: f0af64958ccded4d23a70fface1a9faf5de55f8e
parent: 828de037ff3be5daae7a3ee183b576f89cc36361
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-08T12:31:03+01:00"
commit_committed_at: "2026-05-08T12:31:03+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-08T11:40:04Z
---

# Commit f0af649

## Summary

Found one low-severity test issue: the new Matrix assertion is ineffective because it checks a Vitest mock that the bundled entry loader does not call.

## Findings

### Low: Matrix runtime assertion does not observe the actual setter

- Kind: test_gap
- File: `extensions/matrix/index.test.ts`
- Line: 79
- Evidence: The test calls `entry.setChannelRuntime({ marker: "runtime" } as never)` and then asserts `runtimeMocks.setMatrixRuntime` was not called. But `entry.setChannelRuntime` is implemented by `defineBundledChannelEntry` through `loadBundledEntryExportSync`, which loads and calls the real `runtime-setter-api` export. A direct probe showed `getOptionalMatrixRuntime()` changed from `null` to `{ marker: "runtime" }` after calling `entry.setChannelRuntime`, while the test’s mock still stayed uncalled.
- Impact: The strengthened assertion gives false confidence. It passes because the mock is not wired into the loader path, not because the runtime setter was avoided. If this test is meant to prove setup-only registration avoids runtime mutation or avoids loading the wrong runtime surface, it does not currently prove that behavior.
- Suggested fix: Align the assertion with the actual contract. If direct `setChannelRuntime` should set the runtime, assert the runtime store changed and separately assert heavyweight bootstrap/CLI mocks stayed untouched. If setup-only registration should avoid runtime mutation, test the setup registration path directly instead of calling `entry.setChannelRuntime`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. `pnpm exec tsx -e "import entry from './extensions/matrix/index.ts'; import { getOptionalMatrixRuntime } from './extensions/matrix/src/runtime.ts'; console.log('before', getOptionalMatrixRuntime()); entry.setChannelRuntime?.({ marker: 'runtime' } as never); console.log('after', getOptionalMatrixRuntime());"` prints `before null` and `after { marker: 'runtime' }`.
- Is this the best way to solve the issue? unclear. The right fix depends on the intended contract, but the current assertion should either observe the real runtime store or be rewritten to test the actual setup-only registration path.

## Reviewed

- Diff: `828de037ff3be5daae7a3ee183b576f89cc36361..f0af64958ccded4d23a70fface1a9faf5de55f8e`
- Changed files: `extensions/codex/index.test.ts`, `extensions/matrix/index.test.ts`, `extensions/slack/src/http/plugin-routes.test.ts`
- Code read: changed test files in full, plus `extensions/codex/index.ts`, `extensions/matrix/index.ts`, `extensions/matrix/runtime-setter-api.ts`, `extensions/matrix/src/runtime.ts`, `src/plugin-sdk/channel-entry-contract.ts`, `extensions/slack/src/http/plugin-routes.ts`, `extensions/slack/src/http/registry.ts`
- Dependencies/web: no dependency files changed; no web lookup needed.

## Tests / Live Checks

- `pnpm test extensions/codex/index.test.ts extensions/matrix/index.test.ts extensions/slack/src/http/plugin-routes.test.ts` initially failed because `node_modules` was missing.
- Ran `pnpm install` once per repo guidance.
- Retried `pnpm test extensions/codex/index.test.ts extensions/matrix/index.test.ts extensions/slack/src/http/plugin-routes.test.ts`: passed 3 Vitest shards.
- Ran the focused `tsx` runtime-store probe described above.

## Dependency / Web Checks

- No package manifests or lockfiles changed.
- No external dependency or advisory lookup was relevant.

## Limitations

- I did not run the full suite because this commit only changes three focused test files and the touched shards passed.
