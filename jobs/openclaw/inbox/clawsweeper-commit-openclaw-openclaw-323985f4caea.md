---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-323985f4caea
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-323985f4caea
source: clawsweeper_commit
commit_sha: 323985f4caea97a3679db12c35c2b9e4ad58d8e5
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/323985f4caea97a3679db12c35c2b9e4ad58d8e5.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-323985f4caea`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/323985f4caea97a3679db12c35c2b9e4ad58d8e5
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/323985f4caea97a3679db12c35c2b9e4ad58d8e5.md
- Latest main at intake: dac72374944f35fb89e21dce0f3f2299f27d03c9

## ClawSweeper Report

```md
---
sha: 323985f4caea97a3679db12c35c2b9e4ad58d8e5
parent: f55b81041263fff1d83e5fc3439aa2a0652344bc
repository: openclaw/openclaw
author: "Val Alexander"
committer: "GitHub"
github_author: BunsDev
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-29T14:33:39-05:00"
commit_committed_at: "2026-04-29T20:33:39+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T19:37:48Z
---

# Commit 323985f

## Summary

Found one regression in the exported transcript mobile sidebar trigger. The Control UI path looks intact.

## Findings

### Medium: Exported mobile transcript hamburger remains hidden

- Kind: regression
- File: `src/auto-reply/reply/export-html/template.css`
- Line: 972
- Evidence: The base rule now uses `#hamburger.sidebar-menu-trigger { display: none; }`, specificity `1,1,0`, while the mobile override remains `#hamburger { display: inline-flex; }` at line 1066, specificity `1,0,0`. At `max-width: 900px`, the lower-specificity override cannot beat the base `display: none`, so the hamburger never appears and the mobile sidebar cannot be opened.
- Impact: Exported session HTML loses sidebar access on mobile/narrow viewports.
- Suggested fix: Make the media override at least as specific, for example `#hamburger.sidebar-menu-trigger { display: inline-flex; }`, or keep the base display selector as `#hamburger` so the later media rule can override it. Add a cascade/computed-style regression test rather than substring-only CSS assertions.
- Confidence: high

## Reviewed

- Diff: `f55b81041263fff1d83e5fc3439aa2a0652344bc..323985f4caea97a3679db12c35c2b9e4ad58d8e5`
- Changed files: `src/auto-reply/reply/export-html/template.css`, `src/auto-reply/reply/export-html/template.html`, `src/auto-reply/reply/export-html/template.security.test.ts`, `ui/src/styles/layout.css`, `ui/src/styles/layout.mobile.css`, `ui/src/styles/layout.mobile.test.ts`, `ui/src/ui/app-render.ts`, `ui/src/ui/navigation.browser.test.ts`
- Code read: changed files, export sidebar JS hook, Control UI nav drawer render/cascade, relevant `docs/web/control-ui.md`
- PR context: PR `#74566`

## Tests / Live Checks

- `pnpm test ui/src/styles/layout.mobile.test.ts ui/src/ui/navigation.browser.test.ts src/auto-reply/reply/export-html/template.security.test.ts` passed after `pnpm install`
- `pnpm exec oxfmt --check --threads=1 ...` passed
- `git diff --check f55b81041263fff1d83e5fc3439aa2a0652344bc..323985f4caea97a3679db12c35c2b9e4ad58d8e5` passed
- Static CSS specificity check confirmed the export cascade winner is still `display: none`

## Limitations

- Browser computed-style smoke was attempted, but the Playwright browser executable was not installed in this workspace.
```
