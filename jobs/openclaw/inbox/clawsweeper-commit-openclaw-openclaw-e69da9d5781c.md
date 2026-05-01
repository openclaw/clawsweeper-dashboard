---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-e69da9d5781c
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-e69da9d5781c
source: clawsweeper_commit
commit_sha: e69da9d5781c0f60ee10ffcec6aa78e1994a416c
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/e69da9d5781c0f60ee10ffcec6aa78e1994a416c.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-e69da9d5781c`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/e69da9d5781c0f60ee10ffcec6aa78e1994a416c
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/e69da9d5781c0f60ee10ffcec6aa78e1994a416c.md
- Latest main at intake: eb7d89f4b9d5e7de330073ac835006a7b91148ee

## ClawSweeper Report

```md
---
sha: e69da9d5781c0f60ee10ffcec6aa78e1994a416c
parent: d001c3436bbf284ea0f6201ef5f14ff01b0d9963
repository: openclaw/openclaw
author: "Shakker"
committer: "Shakker"
github_author: shakkernerd
github_committer: shakkernerd
co_authors: []
commit_authored_at: "2026-04-29T19:50:30+01:00"
commit_committed_at: "2026-04-29T19:53:55+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-29T18:58:57Z
---

# Commit e69da9d

## Summary

Found one low-severity diagnostics flag contract issue introduced/exposed by making timeline honor config flags.

## Findings

### Low: Config-enabled timeline cannot be disabled with `OPENCLAW_DIAGNOSTICS=0`

- Kind: bug
- File: `src/infra/diagnostics-timeline.ts`
- Line: 75
- Evidence: This commit now checks `isDiagnosticFlagEnabled("timeline", config, env)` when deciding whether to write timeline events. The shared resolver in `src/infra/diagnostic-flags.ts:45` always merges config flags with parsed env flags, and false-like env values parse to an empty list rather than an override. A focused probe confirms `isDiagnosticsTimelineEnabled({ config: { diagnostics: { flags: ["timeline"] } }, env: { OPENCLAW_DIAGNOSTICS: "0", OPENCLAW_DIAGNOSTICS_TIMELINE_PATH: "/tmp/timeline.jsonl" } })` returns `true`. That conflicts with `docs/diagnostics/flags.md:47`, which documents `OPENCLAW_DIAGNOSTICS=0` as “Disable all flags.”
- Impact: Operators or QA harnesses trying to temporarily suppress diagnostics with `OPENCLAW_DIAGNOSTICS=0` will still write timeline JSONL whenever config contains `diagnostics.flags: ["timeline"]` and the timeline path env var is present. This is especially easy to hit now that the commit documents config-based timeline enablement.
- Suggested fix: Treat false-like `OPENCLAW_DIAGNOSTICS` as an explicit disable override in the diagnostics flag resolver or at least in `isDiagnosticsTimelineEnabled`, and add a regression test for config `timeline` plus env `0`. If additive env semantics are intentional, update the docs to remove the “Disable all flags” promise.
- Confidence: high

## Reviewed

- Diff: `d001c3436bbf284ea0f6201ef5f14ff01b0d9963..e69da9d5781c0f60ee10ffcec6aa78e1994a416c`
- Changed files: `docs/cli/gateway.md`, `docs/diagnostics/flags.md`, `src/gateway/server-startup-plugins.ts`, `src/gateway/server.impl.ts`, `src/infra/diagnostics-timeline.test.ts`, `src/infra/diagnostics-timeline.ts`, `src/plugins/loader.ts`, `src/plugins/plugin-metadata-snapshot.ts`
- Code read: changed files, diagnostics flag resolver/tests, gateway startup config path, plugin metadata snapshot call path, startup trace call sites
- Dependencies/web: no dependency changes; no web lookup needed

## Tests / Live Checks

- `pnpm install` after missing `vitest`
- `pnpm test src/infra/diagnostics-timeline.test.ts` passed
- `pnpm tsgo:core` passed
- `pnpm exec oxfmt --check --threads=1 <changed files>` passed
- `git diff --check d001c3436bbf284ea0f6201ef5f14ff01b0d9963..e69da9d5781c0f60ee10ffcec6aa78e1994a416c` passed
- Focused `tsx` probe confirmed config timeline plus `OPENCLAW_DIAGNOSTICS=0` still enables timeline

## Limitations

- Did not run the full changed gate or full gateway startup smoke; targeted unit, type, format, and direct behavior probes covered the touched diagnostics path.
```
