---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-56155e5048a2
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-56155e5048a2
source: clawsweeper_commit
commit_sha: 56155e5048a250ed2d75e1f6c485b51597eabfeb
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/56155e5048a250ed2d75e1f6c485b51597eabfeb.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-56155e5048a2`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/56155e5048a250ed2d75e1f6c485b51597eabfeb
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/56155e5048a250ed2d75e1f6c485b51597eabfeb.md
- Latest main at intake: d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591

## ClawSweeper Report

```md
---
sha: 56155e5048a250ed2d75e1f6c485b51597eabfeb
parent: 0603c2327d3e09540b4488596aa3062c6acfc550
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T05:04:45+01:00"
commit_committed_at: "2026-04-30T05:04:49+01:00"
result: findings
confidence: medium
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T04:08:51Z
---

# Commit 56155e5

## Summary

Found one low-severity test-harness regression risk. No runtime or security surface changed.

## Findings

### Low: Conformance canary now accepts the invalid-probe diagnostic set

- Kind: regression
- File: `scripts/e2e/lib/kitchen-sink-plugin/assertions.mjs`
- Line: 149
- Evidence: The changed condition now sends `surfaceMode === "conformance"` through the same exact-diagnostic assertion used by `full` and `adversarial`, requiring all messages in `expectedErrorMessages`. But the kitchen-sink Docker scenario sets `npm-latest-conformance` to personality `conformance` in `scripts/e2e/kitchen-sink-plugin-docker.sh:14`, and the current npm package `@openclaw/kitchen-sink@0.2.2` describes `conformance` as loading only valid runtime surfaces and skipping intentionally invalid probes. Its packaged `src/personality.js` also has `conformance: []`.
- Impact: This weakens or inverts the intended clean conformance canary. If the conformance personality starts emitting invalid-probe diagnostics, this assertion will accept them; if the conformance run is actually clean, the assertion requires unrelated/full-mode errors and fails. Either way, `npm-latest-conformance` no longer reliably proves a clean external-plugin install.
- Suggested fix: Keep `conformance` on the no-error path, and prevent default/full install-time diagnostics from contaminating the conformance assertion. For example, configure `KITCHEN_SINK_PERSONALITY` before `plugins install`, or filter persisted install diagnostics separately from the post-config `plugins list/inspect` diagnostics.
- Confidence: medium

## Reviewed

- Diff: `0603c2327d3e09540b4488596aa3062c6acfc550..56155e5048a250ed2d75e1f6c485b51597eabfeb`
- Changed files: `scripts/e2e/lib/kitchen-sink-plugin/assertions.mjs`
- Code read: full changed assertion file; `scripts/e2e/lib/kitchen-sink-plugin/sweep.sh`; `scripts/e2e/kitchen-sink-plugin-docker.sh`; prerelease plan tests; plugin registry diagnostic call paths.
- Dependencies/web: checked npm metadata and packed `@openclaw/kitchen-sink@0.2.2` to inspect its README, manifest, `src/personality.js`, and runtime registration behavior.

## Tests / Live Checks

- `pnpm docs:list`: completed.
- `pnpm test test/scripts/plugin-prerelease-test-plan.test.ts`: initially failed because `node_modules` was missing.
- `pnpm install`: completed, retry allowed by repo instructions.
- `pnpm test test/scripts/plugin-prerelease-test-plan.test.ts`: passed, 9 tests.
- `git diff --check 0603c2327d3e09540b4488596aa3062c6acfc550..56155e5048a250ed2d75e1f6c485b51597eabfeb`: passed.
- `git status --short`: clean.

## Limitations

- Did not run the full Docker kitchen-sink lane because it is a broad/heavy E2E lane; used focused source, package, and unit-test evidence instead.
```
