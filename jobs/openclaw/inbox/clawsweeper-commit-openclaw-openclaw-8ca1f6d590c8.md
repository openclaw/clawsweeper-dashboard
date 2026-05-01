---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-8ca1f6d590c8
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-8ca1f6d590c8
source: clawsweeper_commit
commit_sha: 8ca1f6d590c80e501086478ba9d951520135a225
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/8ca1f6d590c80e501086478ba9d951520135a225.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-8ca1f6d590c8`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/8ca1f6d590c80e501086478ba9d951520135a225
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/8ca1f6d590c80e501086478ba9d951520135a225.md
- Latest main at intake: 554b32feeac0366da28275a586d86a539e2bd15d

## ClawSweeper Report

```md
---
sha: 8ca1f6d590c80e501086478ba9d951520135a225
parent: d18fdecd53093c5bf0c460c6514dd636c2cca446
repository: openclaw/openclaw
author: "Otto Deng"
committer: "GitHub"
github_author: ottodeng
github_committer: web-flow
co_authors: ["Otto Deng", "vincentkoc"]
commit_authored_at: "2026-04-30T14:56:19+08:00"
commit_committed_at: "2026-04-29T23:56:19-07:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T07:15:59Z
---

# Commit 8ca1f6d590

## Summary

Found one remaining regression in current `main`: grouped skill candidates are counted against `maxSkillsLoadedPerSource` before they are validated or successfully loaded, so invalid nested candidates can hide valid sibling skills.

## Findings

### Low: Invalid grouped skill candidates can consume the source quota and skip valid skills

- Kind: regression
- File: `src/agents/skills/workspace.ts`
- Line: 561
- Evidence: The grouped scan appends nested directories to `candidateDirs` after only `SKILL.md` existence and containment checks, then breaks when `candidateDirs.length >= maxSkillsLoadedPerSource` at `src/agents/skills/workspace.ts:561` and `src/agents/skills/workspace.ts:566`. Actual parsing, required-description validation, size checks, and loading happen later at `src/agents/skills/workspace.ts:571` onward, where invalid candidates can be discarded without scanning later siblings.
- Impact: A source like `skills/00-group/{a,b}/SKILL.md` with invalid frontmatter plus `skills/01-valid/SKILL.md` can omit `01-valid` when the source limit is reached by the invalid grouped candidates. Before this commit, `00-group` had no direct `SKILL.md`, so it did not consume load slots and the direct valid sibling could still load.
- Suggested fix: Count successfully loaded records, not pre-validation candidates, toward `maxSkillsLoadedPerSource`; keep scanning later siblings until the loaded-record cap is reached or the candidate scan cap is exhausted.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A temp-workspace `pnpm exec tsx` smoke with `maxSkillsLoadedPerSource: 2`, two invalid nested candidates under `skills/00-group`, and a valid direct sibling at `skills/01-valid` returned `[]` for workspace skills.
- Is this the best way to solve the issue? yes. The loader should preserve the existing source cap while applying it after validation/load, because candidate directories are not equivalent to loaded skills.

## Reviewed

- Diff: `d18fdecd53093c5bf0c460c6514dd636c2cca446..8ca1f6d590c80e501086478ba9d951520135a225`
- Changed files: `CHANGELOG.md`, `docs/tools/skills.md`, `src/agents/skills.loadworkspaceskillentries.test.ts`, `src/agents/skills/workspace.ts`
- Code read: full current `src/agents/skills/workspace.ts`, `src/agents/skills/local-loader.ts`, `src/agents/skills-status.ts`, relevant CLI/gateway callers, adjacent skill tests/docs
- GitHub context: issue `#56915`, PR `#72534`, and current follow-up commit `a093b5b2de`
- Dependencies/web: no dependency files changed; no general web lookup needed

## Tests / Live Checks

- `pnpm docs:list` ran first per repo instructions.
- `pnpm test src/agents/skills.loadworkspaceskillentries.test.ts src/agents/skills.buildworkspaceskillsnapshot.test.ts` initially could not start because dependencies were missing; ran `pnpm install`, then reran successfully: 2 files, 24 tests passed.
- Focused temp-workspace `tsx` smoke reproduced the quota/invalid-candidate regression on current `main`.

## Limitations

- Full suite not run; focused review covered the touched loader, docs, tests, callers, and a live repro.

https://github.com/openclaw/openclaw/pull/72534
```
