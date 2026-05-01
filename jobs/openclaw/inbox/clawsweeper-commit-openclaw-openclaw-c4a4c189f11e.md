---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-c4a4c189f11e
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-c4a4c189f11e
source: clawsweeper_commit
commit_sha: c4a4c189f11e1a41b9245b10c3169a22dc5b16ca
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/c4a4c189f11e1a41b9245b10c3169a22dc5b16ca.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-c4a4c189f11e`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/c4a4c189f11e1a41b9245b10c3169a22dc5b16ca
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/c4a4c189f11e1a41b9245b10c3169a22dc5b16ca.md
- Latest main at intake: d18fdecd53093c5bf0c460c6514dd636c2cca446

## ClawSweeper Report

```md
---
sha: c4a4c189f11e1a41b9245b10c3169a22dc5b16ca
parent: e0c75cd0bd22c0cbd1b1727204bd69212bf34ea5
repository: openclaw/openclaw
author: "Galin Iliev"
committer: "web-flow"
github_author: galiniliev
github_committer: web-flow
co_authors: ["Galin Iliev", "Copilot"]
commit_authored_at: "2026-04-29T23:32:20-07:00"
commit_committed_at: "2026-04-29T23:32:20-07:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T06:51:48+00:00
---

# Commit c4a4c189

## Summary

Found one low-severity test regression: an existing doctor-contract Windows loader test still expects Jiti to be called for `contract-api.js`, but this commit now takes the direct native-require fast path before Jiti.

## Findings

### Low: Doctor contract Windows test now fails against the new native fast path

- Kind: regression
- File: `src/plugins/doctor-contract-registry.ts`
- Line: 51
- Evidence: `loadPluginDoctorContractModule()` now calls `tryNativeRequireJavaScriptModule(modulePath, { allowWindows: true })` before falling back to Jiti. The existing test at `src/plugins/doctor-contract-registry.test.ts:39` writes a Windows `contract-api.js` fixture and still asserts `mocks.createJiti` is called once at line 58. Running `pnpm test src/plugins/doctor-contract-registry.test.ts src/plugins/setup-registry.test.ts src/channels/plugins/module-loader.test.ts src/plugin-sdk/facade-loader.test.ts` fails with `expected "vi.fn()" to be called 1 times, but got 0 times`.
- Impact: focused plugin/doctor validation now has a failing existing test on current `main`. The runtime change itself appears intentional, but the stale test can block maintainers or hide the intended Windows contract for doctor contract loading.
- Suggested fix: update the doctor-contract test to assert the new native JS path on Windows, and add a separate fallback case using a `.ts` fixture or a mocked native helper returning `{ ok: false }` if the Jiti boundary still needs coverage.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: run `pnpm test src/plugins/doctor-contract-registry.test.ts` on current `main` with installed deps.
- Is this the best way to solve the issue? yes: the code change intentionally avoids Jiti for compatible JS, so the test should be realigned rather than reverting the fast path.

## Reviewed

- Diff: `e0c75cd0bd22c0cbd1b1727204bd69212bf34ea5..c4a4c189f11e1a41b9245b10c3169a22dc5b16ca`
- Changed files: `CHANGELOG.md`, `src/plugins/doctor-contract-registry.ts`, `src/plugins/jiti-loader-cache.test.ts`, `src/plugins/jiti-loader-cache.ts`, `src/plugins/loader.ts`, `src/plugins/public-surface-loader.test.ts`, `src/plugins/sdk-alias.test.ts`, `src/plugins/sdk-alias.ts`, `src/test-utils/jiti-runtime.ts`
- Code read: changed files plus `src/plugins/native-module-require.ts`, `src/plugins/public-surface-loader.ts`, `src/plugins/runtime/runtime-plugin-boundary.ts`, `src/plugins/bundled-capability-runtime.ts`, `src/channels/plugins/module-loader.ts`, adjacent doctor/setup/channel/facade tests.
- Dependencies/web: inspected local `jiti` 2.6.1 package metadata, README, types, and bundled source for `tryNative`; no external web lookup was needed.
- Commands: `pnpm docs:list`, `gh pr view 74173`, `gh issue view 68656`, focused `pnpm test` commands.

## Tests / Live Checks

- Passed: `pnpm test src/plugins/jiti-loader-cache.test.ts src/plugins/sdk-alias.test.ts src/plugins/public-surface-loader.test.ts` (65 tests).
- Failed as above: adjacent suite including `src/plugins/doctor-contract-registry.test.ts`.
- Passed after excluding the failing file: `pnpm test src/plugins/setup-registry.test.ts src/channels/plugins/module-loader.test.ts src/plugin-sdk/facade-loader.test.ts`.

## Limitations

- No Windows host or live Gateway startup timing was available in this environment.
- No full `pnpm check:changed` or `pnpm build` run; focused tests were used for this report-only review.

https://github.com/openclaw/openclaw/commit/c4a4c189f11e1a41b9245b10c3169a22dc5b16ca
```
