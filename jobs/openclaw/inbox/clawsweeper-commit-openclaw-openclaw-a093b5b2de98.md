---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-a093b5b2de98
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-a093b5b2de98
source: clawsweeper_commit
commit_sha: a093b5b2de98bf8f18ddda919aa539c7f53d3791
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/a093b5b2de98bf8f18ddda919aa539c7f53d3791.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-a093b5b2de98`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/a093b5b2de98bf8f18ddda919aa539c7f53d3791
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/a093b5b2de98bf8f18ddda919aa539c7f53d3791.md
- Latest main at intake: 25f0b5dda36daa9f0ae30f1bbe0ec2f43ebad909

## ClawSweeper Report

```md
---
sha: a093b5b2de98bf8f18ddda919aa539c7f53d3791
parent: 02597caa8bff86503e4d2241d9835d64c438f95f
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-04-30T00:03:19-07:00"
commit_committed_at: "2026-04-30T00:03:19-07:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T07:23:23+00:00
---

# Commit a093b5b2

## Summary

Found one actionable regression in the new bounded directory scan: ignored raw entries can consume the configured candidate budget before valid skill directories are considered.

## Findings

### Medium: Raw files can hide valid grouped skills from discovery

- Kind: regression
- File: `src/agents/skills/workspace.ts`
- Line: 188
- Evidence: `listChildDirectories()` increments `scannedEntryCount` before filtering ignored entries and non-directories, then stops at `maxEntriesToScan`. The outer and nested grouped scans pass `maxCandidatesPerRoot` as that raw entry limit at `src/agents/skills/workspace.ts:459` and `src/agents/skills/workspace.ts:516`. But the config contract describes `maxCandidatesPerRoot` as the max number of immediate child directories, and docs advertise `skills/<group>/<skill>/SKILL.md` grouped roots.
- Impact: A grouped skill folder containing ordinary files before valid skill directories in filesystem iteration order can load no grouped skills, even when the configured candidate limit is high enough for all actual skill directories. This affects `openclaw skills list`, runtime skill availability, skill status, remote bin collection, and security audit surfaces that all call `loadWorkspaceSkillEntries()`.
- Suggested fix: Apply the candidate limit after filtering to visible child directories or symlinked directories, while preserving a separate raw-entry hard cap for pathological directories. Keep deterministic sorting for the candidate set before truncation where feasible.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A focused `node --import tsx` smoke created `skills/group/` with 20 plain files and 3 valid `skill-*/SKILL.md` directories. With `maxCandidatesPerRoot: 3`, current main returned `(none)` for the nested skills; with `maxCandidatesPerRoot: 100`, it returned `nested-0,nested-1,nested-2`.
- Is this the best way to solve the issue? unclear. The commit is right to avoid unbounded grouped scans, but the bound now applies to raw directory entries instead of candidate directories. A separate raw scan safety cap would preserve the performance goal without changing candidate-limit semantics.

## Reviewed

- Diff: `02597caa8bff86503e4d2241d9835d64c438f95f..a093b5b2de98bf8f18ddda919aa539c7f53d3791`
- Changed files: `src/agents/skills/workspace.ts`, `src/agents/skills.loadworkspaceskillentries.test.ts`
- Code read: full changed files, `src/agents/skills/local-loader.ts`, `src/agents/skills-status.ts`, `src/infra/skills-remote.ts`, `src/security/audit-extra.async.ts`, `src/gateway/server-methods/skills.ts`, config skill-limit types/schema, adjacent skill snapshot tests, `docs/tools/skills.md`
- GitHub context: inspected issue `#56915` and PR `#72534`
- Dependencies/web: no dependency changes; no general web lookup needed

## Tests / Live Checks

- `pnpm install` to restore missing `node_modules`
- `pnpm test src/agents/skills.loadworkspaceskillentries.test.ts` passed
- `pnpm test src/agents/skills.buildworkspaceskillsnapshot.test.ts` passed
- `pnpm test src/agents/skills.loadworkspaceskillentries.test.ts src/agents/skills.buildworkspaceskillsnapshot.test.ts` passed
- `git diff --check 02597caa8bff86503e4d2241d9835d64c438f95f..a093b5b2de98bf8f18ddda919aa539c7f53d3791` passed
- Focused `node --import tsx` reproduction confirmed the candidate-budget regression

## Limitations

- Full `pnpm check:changed` was not run; focused tests covered the touched skill loader paths.

https://github.com/openclaw/openclaw/commit/a093b5b2de98bf8f18ddda919aa539c7f53d3791
```
