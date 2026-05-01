---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-d117ed183aaa
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-d117ed183aaa
source: clawsweeper_commit
commit_sha: d117ed183aaa0381070f97d45bc8d579794404a6
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/d117ed183aaa0381070f97d45bc8d579794404a6.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-d117ed183aaa`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/d117ed183aaa0381070f97d45bc8d579794404a6
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/d117ed183aaa0381070f97d45bc8d579794404a6.md
- Latest main at intake: 9f0bf1c71ea24a269f10015baf928fdc811959a9

## ClawSweeper Report

```md
---
sha: d117ed183aaa0381070f97d45bc8d579794404a6
parent: 005eeca06f3cf29a80d42814be5001912e30e133
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "GitHub"
github_author: vincentkoc
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-30T02:01:02-07:00"
commit_committed_at: "2026-04-30T02:01:02-07:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T09:20:54Z
---

# Commit d117ed183a

## Summary

Found two medium-risk bugs in the manual stale-closure backfill. The workflow syntax and live dispatch path are valid, but the backfill can select more PRs than the scheduled `actions/stale` policy would close, and `max_closures=0` disables the cap instead of selecting zero items.

## Findings

### Medium: Assigned PR backfill ignores the close grace window

- Kind: bug
- File: `.github/workflows/stale.yml`
- Line: 390
- Evidence: The backfill marks any assigned stale PR eligible when `created_at` is older than 34 days. The scheduled `actions/stale` lane uses `ignore-pr-updates` only for stale marking; its close phase still checks whether the issue/PR was updated inside `days-before-pr-close`, and `actions/stale@v10` documents `days-before-pr-close` as the wait before closing a stale PR. ([github.com](https://github.com/actions/stale?utm_source=openai)) A focused local check with a PR created 35 days ago but updated yesterday produced `backfillEligible: true` while the scheduled close window was still active.
- Impact: A maintainer running the manual backfill with `dry_run=false` can close an assigned PR that still has the `stale` label but had recent activity, whereas the scheduled action would leave it open or remove the stale label on its next pass.
- Suggested fix: For assigned PRs, gate closure on `updated_at` being older than `days-before-pr-close` as well, or mirror the scheduled action’s stale-label/comment/update logic instead of using `created_at + staleLabel` as the close condition.
- Confidence: high

### Medium: `max_closures=0` closes all candidates

- Kind: data_loss
- File: `.github/workflows/stale.yml`
- Line: 425
- Evidence: The input is described as “Maximum items to close when dry_run is false,” but the code uses `maxClosures === 0 ? candidates : candidates.slice(0, maxClosures)`. A focused Node check showed input `"0"` selects `[1,2,3]`, and `"-1"` is clamped to `0` and also selects every candidate.
- Impact: An operator trying to run a no-close or safety-capped dispatch with `dry_run=false` and `max_closures=0` would instead close every eligible item.
- Suggested fix: Treat `0` as zero selected items, and add a separate explicit value or boolean if “unlimited” is desired.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes. The first issue reproduces with a stale-labeled assigned PR created more than 34 days ago but updated inside the 7-day close window; the backfill predicate selects it while the scheduled action would not close it. The second reproduces by evaluating the `selected` expression with `MAX_CLOSURES=0`.
- Is this the best way to solve the issue? Yes for the fix direction: align the backfill with the scheduled close predicate and make the numeric cap literal. A safer alternative is to remove the hand-rolled backfill closure logic and run `actions/stale` with bounded debug/close settings, but that is a larger change.

## Reviewed

- Diff: `005eeca06f3cf29a80d42814be5001912e30e133..d117ed183aaa0381070f97d45bc8d579794404a6`
- Changed files: `.github/workflows/stale.yml`
- Code read: full base, reviewed commit version, and current `main` version of `.github/workflows/stale.yml`; relevant `actions/stale@v10` action metadata/source behavior; PR #74988 metadata and checks.
- Dependencies/web: `actions/stale@v10`, `actions/github-script@v9`, GitHub Actions workflow syntax, and recent Stale workflow runs.
- Current-main status: `main` is `9f0bf1c71e`; follow-up commit skips maintainer assignees but leaves both findings’ code paths in place.

## Tests / Live Checks

- `pnpm docs:list`
- `git diff --check 005eeca06f3cf29a80d42814be5001912e30e133..d117ed183aaa0381070f97d45bc8d579794404a6`
- `pnpm check:workflows`
- `gh run view 25157225157 --repo openclaw/openclaw --json ...` confirmed the d117 manual backfill job succeeded.
- `gh run view 25157429927 --repo openclaw/openclaw --log` confirmed the current workflow ran with `dry_run=false` and closed 7 assigned PR candidates.
- Focused Node checks for the assigned-PR predicate and `max_closures` selection.

## Limitations

- I did not mutate the repository or dispatch any workflows.
- I did not attempt to reopen or inspect every PR closed by the current backfill run; the findings are based on the workflow logic and focused checks.

https://github.com/openclaw/openclaw/pull/74988
```
