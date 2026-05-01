---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-42d73fd955af
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-42d73fd955af
source: clawsweeper_commit
commit_sha: 42d73fd955afee4a381643b0cf973edbdc3e9c24
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/42d73fd955afee4a381643b0cf973edbdc3e9c24.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-42d73fd955af`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/42d73fd955afee4a381643b0cf973edbdc3e9c24
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/42d73fd955afee4a381643b0cf973edbdc3e9c24.md
- Latest main at intake: ec1b96cdfa084107212d50ae4cb0e9232669095f

## ClawSweeper Report

```md
---
sha: 42d73fd955afee4a381643b0cf973edbdc3e9c24
parent: ffcc0d1fe17147f417eba86f2b8444a101a10322
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-01T06:55:22+01:00"
commit_committed_at: "2026-05-01T06:55:26+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T06:17:35Z
---

# Commit 42d73fd

## Summary

Found two actionable regressions: one changed test assertion now fails under the existing supervised gateway lock-retry behavior, and one Plugin SDK subpath removed a previously exported type without a compatibility alias.

## Findings

### Medium: gateway lock-conflict test now asserts the wrong behavior

- Kind: regression
- File: `src/cli/gateway-cli/run.option-collisions.test.ts`
- Line: 320
- Evidence: The commit changed this test from `await runGatewayCli(...)` to expecting `__exit__:0`. Current runtime still retries expected lock conflicts when a supervisor is detected, and `runGatewayLoopWithSupervisedLockRecovery` returns after a later successful `startLoop` call. With the test’s `startGatewayServer.mockRejectedValueOnce(...)`, the retry succeeds, so the promise resolves. Isolated check fails: `pnpm test src/cli/gateway-cli/run.option-collisions.test.ts` reports `promise resolved "undefined" instead of rejecting` at line 320.
- Impact: The touched CLI test file is red in a systemd-marked environment, blocking focused and changed test gates.
- Suggested fix: Restore the success expectation for this “expected gateway lock conflict” case, or explicitly clear supervisor env and make the mock reject consistently if the test is meant to cover the unmanaged exit path. Keep the `writeDiagnosticStabilityBundleForFailureSync` assertion.
- Confidence: high

### Low: Plugin SDK subpath dropped `KilocodeModelCatalogEntry`

- Kind: compatibility
- File: `src/plugin-sdk/provider-model-shared.ts`
- Line: 42
- Evidence: The parent exported `KilocodeModelCatalogEntry` from `openclaw/plugin-sdk/provider-model-shared`; the commit removed that export and moved the type into `extensions/kilocode/provider-models.ts`. `package.json` still publishes `./plugin-sdk/provider-model-shared`, so external TypeScript consumers importing that type now fail to compile.
- Impact: Third-party provider/plugin code can break on upgrade even though this is a refactor commit.
- Suggested fix: Keep a deprecated compatibility type export in the SDK subpath, or make the removal an intentional versioned SDK break with docs/changelog follow-through.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? yes. The gateway test failure reproduces with `pnpm test src/cli/gateway-cli/run.option-collisions.test.ts`.
- Is this the best way to solve the issue? yes for the test regression: restore the assertion to match current runtime behavior. For the SDK export, the safest fix is a compatibility alias.

## Reviewed

- Diff: `ffcc0d1fe17147f417eba86f2b8444a101a10322..42d73fd955afee4a381643b0cf973edbdc3e9c24`
- Code read: full diff, scoped AGENTS, current gateway lock recovery, Plugin SDK export/package surface, changed auth/model/web/pairing/session helper paths.
- Commands: `pnpm docs:list`; `git diff --check`; `pnpm install`; `pnpm test ...`; `pnpm test src/cli/gateway-cli/run.option-collisions.test.ts`; `pnpm plugin-sdk:api:check`; parent/commit SDK baseline comparison in `/tmp`.
- Dependencies/web: no dependency files changed; no web lookup needed.

## Limitations

- Broad gates were not run. `pnpm plugin-sdk:api:check` fails on current checkout, but generated parent-vs-commit SDK baseline JSONL was identical, so that baseline drift was not attributed to this commit.
```
