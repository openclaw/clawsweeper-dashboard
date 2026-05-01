---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-60c2a9055037
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-60c2a9055037
source: clawsweeper_commit
commit_sha: 60c2a9055037a31c43fc03392b2806031e574413
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/60c2a9055037a31c43fc03392b2806031e574413.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-60c2a9055037`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/60c2a9055037a31c43fc03392b2806031e574413
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/60c2a9055037a31c43fc03392b2806031e574413.md
- Latest main at intake: 2bf272063251d8defdc4012e003295df7878ee68

## ClawSweeper Report

```md
---
sha: 60c2a9055037a31c43fc03392b2806031e574413
parent: c9156cd9a87a00b1099dd65b6b97b21a246f9114
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-04-29T13:05:52-07:00"
commit_committed_at: "2026-04-29T13:09:47-07:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-29T20:15:30+00:00
---

# Commit 60c2a90550

## Summary

Found one low-severity UI localization regression in the markdown renderer cache.

## Findings

### Low: Markdown code-block copy labels stay in the old language after locale changes

- Kind: bug
- File: `ui/src/ui/markdown.ts`
- Line: 484
- Evidence: The commit localizes code-block copy controls with `t("common.copyCode")`, `t("common.copy")`, and `t("common.copied")` at `ui/src/ui/markdown.ts:435` and `ui/src/ui/markdown.ts:461`, but `toSanitizedMarkdownHtml()` still caches rendered HTML by markdown input only at `ui/src/ui/markdown.ts:484` and `ui/src/ui/markdown.ts:515`. A focused jsdom/tsx probe rendered a fenced code block in English, switched to `zh-CN`, then rendered the same markdown again; the second render still contained `>Copy<` and not `>复制<`, while a different markdown string after the switch rendered `>复制<`.
- Impact: Users who change the Control UI language can keep seeing stale code-block copy button text for previously rendered/cached messages until cache eviction or reload.
- Suggested fix: Include `i18n.getLocale()` in the markdown cache key, or clear `markdownCache` on locale changes.
- Confidence: high

## Reviewed

- Diff: `c9156cd9a87a00b1099dd65b6b97b21a246f9114..60c2a9055037a31c43fc03392b2806031e574413`
- Changed source read: `scripts/control-ui-i18n.ts`, `ui/src/ui/app-render.helpers.ts`, `ui/src/ui/app-render.ts`, `ui/src/ui/markdown.ts`, `ui/src/ui/views/cron-quick-create.ts`, `ui/src/ui/views/sessions.ts`, `ui/src/i18n/locales/en.ts`
- Generated outputs checked: locale metadata, locale key parity, raw-copy baseline summary
- Docs read: `docs/web/control-ui.md`
- Scoped instructions read: `ui/AGENTS.md`, `scripts/AGENTS.md`

## Tests / Live Checks

- `pnpm install` after initial missing `node_modules` / `tsx` failure
- `pnpm ui:i18n:check` passed on retry
- `pnpm test ui/src/ui/markdown.test.ts` passed
- `pnpm test ui/src/ui/views/sessions.test.ts ui/src/ui/views/cron-quick-create.node.test.ts` passed
- Focused jsdom/tsx probe reproduced the stale localized markdown cache behavior

## Dependency / Web Checks

- No dependency or external web lookup was needed; dependency files were not changed.

## Limitations

- No full UI browser screenshot or full `pnpm check:changed`; focused review only, per commit-review scope.
```
