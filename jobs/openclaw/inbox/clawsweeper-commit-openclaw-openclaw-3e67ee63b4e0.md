---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0
source: clawsweeper_commit
commit_sha: 3e67ee63b4e0118226f20af75f1ae980df9c156c
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/3e67ee63b4e0118226f20af75f1ae980df9c156c.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-3e67ee63b4e0`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/3e67ee63b4e0118226f20af75f1ae980df9c156c
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/3e67ee63b4e0118226f20af75f1ae980df9c156c.md
- Latest main at intake: 8093ae60292f4d9009b3d48f234b39b5cbc538e5

## ClawSweeper Report

```md
---
sha: 3e67ee63b4e0118226f20af75f1ae980df9c156c
parent: 0260903f7f715b55de29a6c48368b744c5e7b847
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-01T04:14:39+01:00"
commit_committed_at: "2026-05-01T04:14:41+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-01T03:33:42+00:00
---

# Commit 3e67ee63b4

## Summary

Found one command-routing bug: the target workflow’s pre-dispatch grep drops an alias that the ClawSweeper receiver explicitly supports.

## Findings

### Low: `@openclaw-clawsweeper` comments never reach the router

- Kind: bug
- File: `.github/workflows/clawsweeper-dispatch.yml`
- Line: 104
- Evidence: the workflow only dispatches issue comments when grep matches `@clawsweeper` or selected slash commands. The ClawSweeper receiver parser accepts `@openclaw-clawsweeper` and `@openclaw-clawsweeper[bot]`, and its tests cover those aliases, but this target-side prefilter exits before sending `clawsweeper_comment` for either alias. A focused shell check showed `@clawsweeper re-review` matched and `@openclaw-clawsweeper rebase` did not.
- Impact: maintainers using the installed app/bot mention alias get no ClawSweeper action, acknowledgement, or receiver-side authorization path even though the downstream router supports the command.
- Suggested fix: align the prefilter with the receiver parser, e.g. match `@(?:clawsweeper|openclaw-clawsweeper)(?:\[bot\])?\b`, or avoid duplicating parser logic in the target workflow.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: run the workflow grep against `@openclaw-clawsweeper rebase`; it returns no match, while the receiver parser tests expect that command to parse as `rebase`.
- Is this the best way to solve the issue? yes: the target workflow should either share the receiver’s accepted trigger set or use a broader prefilter so supported receiver commands are not dropped before dispatch.

## Reviewed

- Diff: `0260903f7f715b55de29a6c48368b744c5e7b847..3e67ee63b4e0118226f20af75f1ae980df9c156c`
- Changed files: `.github/workflows/clawsweeper-dispatch.yml`
- Code read: full changed workflow on base, commit, and current `main`; receiver workflow/parser/tests in `openclaw/clawsweeper`; related maintainer command reaction workflow.
- Dependencies/web: no dependency changes; no web lookup needed. GitHub API verified commit metadata and recent workflow runs.

## Tests / Live Checks

- `pnpm docs:list`
- `git diff --check 0260903f7f715b55de29a6c48368b744c5e7b847..3e67ee63b4e0118226f20af75f1ae980df9c156c -- .github/workflows/clawsweeper-dispatch.yml`
- `pnpm exec node scripts/check-workflows.mjs`
- Focused `grep -Eiq` command-trigger checks for `@clawsweeper`, `@openclaw-clawsweeper`, and slash commands.

## Limitations

- I did not post or edit a live GitHub comment; reproduction is from the exact workflow grep and receiver parser contract.
```
