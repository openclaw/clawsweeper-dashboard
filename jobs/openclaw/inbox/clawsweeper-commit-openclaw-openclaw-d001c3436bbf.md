---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-d001c3436bbf
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-d001c3436bbf
source: clawsweeper_commit
commit_sha: d001c3436bbf284ea0f6201ef5f14ff01b0d9963
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/d001c3436bbf284ea0f6201ef5f14ff01b0d9963.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-d001c3436bbf`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/d001c3436bbf284ea0f6201ef5f14ff01b0d9963
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/d001c3436bbf284ea0f6201ef5f14ff01b0d9963.md
- Latest main at intake: eb7d89f4b9d5e7de330073ac835006a7b91148ee

## ClawSweeper Report

```md
---
sha: d001c3436bbf284ea0f6201ef5f14ff01b0d9963
parent: 097eed8cd8b44ef8a3d1cebddf319e9cebf5e10d
repository: openclaw/openclaw
author: "Shakker"
committer: "Shakker"
github_author: shakkernerd
github_committer: shakkernerd
co_authors: []
commit_authored_at: "2026-04-29T19:37:57+01:00"
commit_committed_at: "2026-04-29T19:53:55+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-29T18:57:59Z
---

# Commit d001c34

## Summary

Found one low-severity compatibility regression in the diagnostics timeline env gate.

## Findings

### Low: `OPENCLAW_DIAGNOSTICS=yes/on` no longer enables timeline output

- Kind: compatibility
- File: `src/infra/diagnostics-timeline.ts`
- Line: 59
- Evidence: This commit changed timeline enablement from `isTruthyEnvValue(env.OPENCLAW_DIAGNOSTICS)` to `isDiagnosticFlagEnabled("timeline", undefined, env) || isDiagnosticFlagEnabled("diagnostics.timeline", undefined, env)`. The repo’s truthy env helper accepts `1`, `true`, `yes`, and `on` (`src/infra/env.ts:69`, covered by `src/infra/env.test.ts:63`). The diagnostic flag parser only maps `1`, `true`, `all`, and `*` to wildcard enablement (`src/infra/diagnostic-flags.ts:18`). A focused smoke check showed `timeline`, `diagnostics.timeline`, `1`, `true`, `all`, and `*` enable the timeline, but `yes` and `on` now return false.
- Impact: Existing QA harnesses or local scripts using `OPENCLAW_DIAGNOSTICS=yes` or `OPENCLAW_DIAGNOSTICS=on` with `OPENCLAW_DIAGNOSTICS_TIMELINE_PATH` silently stop writing timeline JSONL after this commit.
- Suggested fix: Preserve the old env truthy aliases by treating `yes` and `on` like `true` in `parseEnvFlags`, or explicitly preserve legacy truthy handling in `isDiagnosticsTimelineEnabled` while still rejecting unrelated flag names such as `telegram.http`.
- Confidence: high

## Reviewed

- Diff: `097eed8cd8b44ef8a3d1cebddf319e9cebf5e10d..d001c3436bbf284ea0f6201ef5f14ff01b0d9963`
- Changed files: `docs/cli/gateway.md`, `docs/diagnostics/flags.md`, `src/infra/diagnostics-timeline.ts`, `src/infra/diagnostics-timeline.test.ts`
- Code read: full changed source/test files, `src/infra/diagnostic-flags.ts`, `src/infra/env.ts`, `src/infra/env.test.ts`, gateway and plugin timeline call sites
- Dependencies/web: no external web lookup needed; dependency install used existing lockfile

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` after initial test failed because `node_modules` was missing
- `pnpm test src/infra/diagnostics-timeline.test.ts src/infra/diagnostic-flags.test.ts` passed
- `pnpm exec tsx -e ...isDiagnosticsTimelineEnabled...` confirmed the env-value behavior above
- `git diff --check 097eed8cd8b44ef8a3d1cebddf319e9cebf5e10d..d001c3436bbf284ea0f6201ef5f14ff01b0d9963` passed

## Limitations

- Did not run a full changed gate; the touched surface was small and focused infra tests covered the changed behavior.
```
