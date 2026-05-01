---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-52bf20b07d6e
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-52bf20b07d6e
source: clawsweeper_commit
commit_sha: 52bf20b07d6e08b92f670c23ab55637fcb3f1035
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/52bf20b07d6e08b92f670c23ab55637fcb3f1035.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-52bf20b07d6e`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/52bf20b07d6e08b92f670c23ab55637fcb3f1035
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/52bf20b07d6e08b92f670c23ab55637fcb3f1035.md
- Latest main at intake: e47a7448e90ff75f2d21082a1c33a18695b49162

## ClawSweeper Report

```md
---
sha: 52bf20b07d6e08b92f670c23ab55637fcb3f1035
parent: 1e87f6bf703dd3571bb719900e29a160d2e911a7
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-01T00:50:15+01:00"
commit_committed_at: "2026-05-01T00:50:15+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T00:10:15+00:00
---

# Commit 52bf20b

## Summary

Found one actionable issue: the Windows stale-import guard still generates an invalid PowerShell regex, so the intended tolerated update failure still fails the Parallels npm update smoke.

## Findings

### Medium: Windows stale-import guard still emits an invalid PowerShell regex

- Kind: bug
- File: `scripts/e2e/parallels/npm-update-scripts.ts`
- Line: 118
- Evidence: `windowsUpdateScript(...)` generates `$updateText -match 'node_modules\openclaw\dist\[^\]+-[A-Za-z0-9_-]+\.js'`. In PowerShell, that regex throws `Unrecognized escape sequence \o` before it can return true or false.
- Impact: when `openclaw update` exits nonzero with the expected stale post-swap `ERR_MODULE_NOT_FOUND`, the Windows update script throws a regex parser error instead of continuing to the post-update health checks.
- Suggested fix: escape the path separator backslashes for both TypeScript and PowerShell regex layers, for example generate `node_modules\\openclaw\\dist\\[^\\]+-[A-Za-z0-9_-]+\.js`; in the current TypeScript template that means using `node_modules\\\\openclaw\\\\dist\\\\[^\\\\]+-[A-Za-z0-9_-]+\\.js`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Importing `windowsUpdateScript` shows the generated PowerShell line has single regex backslashes for path separators, and a focused `pwsh` probe with representative `ERR_MODULE_NOT_FOUND` text throws the invalid-pattern error.
- Is this the best way to solve the issue? yes. The failure is at the string escaping boundary; fixing the generated regex or constructing it with explicit escaping is the narrow fix.

## Reviewed

- Diff: `1e87f6bf703dd3571bb719900e29a160d2e911a7..52bf20b07d6e08b92f670c23ab55637fcb3f1035`
- Changed files: `scripts/e2e/parallels/npm-update-scripts.ts`
- Code read: full changed file, `scripts/e2e/parallels/npm-update-smoke.ts`, adjacent `test/scripts/parallels-npm-update-smoke.test.ts`, relevant PowerShell helper
- Dependencies/web: no dependency files changed; no web lookup needed
- Commands: `pnpm docs:list`, `git show`, `git diff`, `pnpm install`, `pnpm exec tsx ...`, focused `pwsh` regex probe, `pnpm test test/scripts/parallels-npm-update-smoke.test.ts`, `git diff --check`

## Tests / Live Checks

- `pnpm test test/scripts/parallels-npm-update-smoke.test.ts` passed, but it only checks source substrings and does not validate the generated PowerShell regex.
- Focused PowerShell reproduction failed with the invalid-pattern error.
- `git diff --check` passed.

## Limitations

- Did not run the full Parallels guest npm update smoke; it requires the VM/live environment. The focused generated-script and PowerShell checks cover the failing branch directly.
```
