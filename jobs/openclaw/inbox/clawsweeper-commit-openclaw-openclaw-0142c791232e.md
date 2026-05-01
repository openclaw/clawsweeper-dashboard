---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-0142c791232e
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-0142c791232e
source: clawsweeper_commit
commit_sha: 0142c791232e00b619a5dd0068eb2567e776123d
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/0142c791232e00b619a5dd0068eb2567e776123d.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-0142c791232e`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/0142c791232e00b619a5dd0068eb2567e776123d
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/0142c791232e00b619a5dd0068eb2567e776123d.md
- Latest main at intake: 3224075edc21279454acc1cf5cdfbd7d12b4650e

## ClawSweeper Report

```md
---
sha: 0142c791232e00b619a5dd0068eb2567e776123d
parent: 4b3f91c686968994d0af5629bbd29e48c22d60f1
repository: openclaw/openclaw
author: "Shubhankar Tripathy"
committer: "GitHub"
github_author: lonexreb
github_committer: web-flow
co_authors: ["Peter Steinberger"]
commit_authored_at: "2026-04-29T23:21:09-05:00"
commit_committed_at: "2026-04-30T04:21:09Z"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T04:42:55Z
---

# Commit 0142c79123

## Summary

One low-severity generated-baseline issue found. The runtime/schema fix itself matches the existing browser tab cleanup contract, but the committed config docs baseline hash does not match the current generator output.

## Findings

### Low: config docs baseline hash is stale

- Kind: reliability
- File: `docs/.generated/config-baseline.sha256`
- Line: 1
- Evidence: `pnpm config:docs:check` fails on current `main` with `Config baseline drift detected`. The checked-in hash has `c3bcb3... config-baseline.json` and `aca321... config-baseline.plugin.json`; the generator currently emits `d4b34f... config-baseline.json` and `6005cf... config-baseline.plugin.json`. `config-baseline.core.json` matches, so the added `browser.tabCleanup` core schema appears correctly generated, but the committed combined/plugin baseline is not what the check expects.
- Impact: Developers or CI lanes that run `pnpm config:docs:check` will fail until the hash is regenerated or the generator nondeterminism is fixed.
- Suggested fix: Re-run `pnpm config:docs:gen` in a clean Node 24 checkout and commit the resulting `docs/.generated/config-baseline.sha256`; if CI and local still disagree, fix the config baseline generator so plugin baseline ordering/content is deterministic.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: after `pnpm install`, run `pnpm config:docs:check`.
- Is this the best way to solve the issue? unclear: if clean CI/Testbox emits the same hashes as local, regenerating is enough; if environments disagree, the safer fix is generator determinism.

## Reviewed

- Diff: `4b3f91c686968994d0af5629bbd29e48c22d60f1..0142c791232e00b619a5dd0068eb2567e776123d`
- Changed files: `CHANGELOG.md`, `docs/.generated/config-baseline.sha256`, `src/config/config.schema-regressions.test.ts`, `src/config/schema.base.generated.ts`, `src/config/zod-schema.ts`
- Code read: `src/config/zod-schema.ts`, `src/config/config.schema-regressions.test.ts`, `src/config/types.browser.ts`, `src/config/schema.help.ts`, `src/config/schema.labels.ts`, `src/config/doc-baseline.ts`, `extensions/browser/src/browser/config.ts`, `extensions/browser/src/browser/session-tab-cleanup.ts`
- GitHub: PR #74638 and issue #74577 inspected with `gh`

## Tests / Live Checks

- `pnpm test src/config/config.schema-regressions.test.ts`: passed, 21 tests
- `pnpm config:schema:check`: passed
- `pnpm exec oxfmt --check --threads=1 src/config/zod-schema.ts src/config/config.schema-regressions.test.ts src/config/schema.base.generated.ts`: passed
- `git diff --check 4b3f91c686968994d0af5629bbd29e48c22d60f1..0142c791232e00b619a5dd0068eb2567e776123d`: passed
- `pnpm config:docs:check`: failed with config baseline drift

## Limitations

- Full suite was not run; focused checks were sufficient for the touched config schema surface.
- The PR status showed green checks, so the baseline mismatch may expose environment-sensitive generation rather than a simple missed regeneration.

https://github.com/openclaw/openclaw/pull/74638
```
