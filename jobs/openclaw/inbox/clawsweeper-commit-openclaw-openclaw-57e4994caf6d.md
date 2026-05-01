---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-57e4994caf6d
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-57e4994caf6d
source: clawsweeper_commit
commit_sha: 57e4994caf6d3f60c2721d411fb3486ebf793100
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/57e4994caf6d3f60c2721d411fb3486ebf793100.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-57e4994caf6d`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/57e4994caf6d3f60c2721d411fb3486ebf793100
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/57e4994caf6d3f60c2721d411fb3486ebf793100.md
- Latest main at intake: 97e2f5b3324bd825aa307c94b97a9b7c45cab4af

## ClawSweeper Report

```md
---
sha: 57e4994caf6d3f60c2721d411fb3486ebf793100
parent: fc2d957923af960400935e6deaead8ec505bb9f1
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-29T19:53:29+01:00"
commit_committed_at: "2026-04-29T19:55:37+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T19:01:15Z
---

# Commit 57e4994

## Summary

Found two release-validation regressions in the new focused live-suite rerun path. The more important one can produce a green focused rerun without executing any requested live suite when `live_suite_filter` is mistyped or not selected by the current profile.

## Findings

### Medium: Invalid `live_suite_filter` values can pass without running a suite

- Kind: reliability
- File: `.github/workflows/openclaw-live-and-e2e-checks-reusable.yml`
- Line: 1695
- Evidence: The new filter is accepted as a free string in the parent workflows and passed through to the reusable workflow. In the reusable workflow, broad job-level guards accept prefixes such as `native-live-` and `live-`, but the actual checkout/setup/run steps all require exact equality with `matrix.suite_id` (`inputs.live_suite_filter == matrix.suite_id`). There is no validation job or script that rejects an unknown filter. For example, a typo like `native-live-src-agent` satisfies the job-level `startsWith(inputs.live_suite_filter, 'native-live-')` guard at line 1695, matches none of the matrix suite ids, skips every matrix step at lines 1874-1954, and can still leave the workflow green after only ref validation.
- Impact: Focused release recovery can record successful evidence for a failed live/E2E shard without rerunning that shard. This is especially risky because the skill text now recommends `-f rerun_group=live-e2e -f live_suite_filter=<suite_id>` for single-shard recovery.
- Suggested fix: Add an early validation step/job that checks non-empty `live_suite_filter` against the known runnable suite ids for the selected `release_test_profile`, and fail if exactly one suite is not selected. Alternatively, generate the matrix from a validated selected-suite list and fail on an empty list.
- Confidence: high

### Low: Focused live-suite reruns still launch the full Docker release-path job

- Kind: regression
- File: `.github/workflows/openclaw-release-checks.yml`
- Line: 408
- Evidence: `live_suite_filter` is passed only to `live_repo_e2e_release_checks` at line 357. The separate `docker_e2e_release_checks` job still runs for every `rerun_group=live-e2e` at line 408, calls the reusable workflow with `include_release_path_suites: true`, `include_live_suites: false`, and does not pass `live_suite_filter` at lines 416-422. This contradicts the updated testing skill guidance that a single failed live/E2E shard rerun should only spend setup and queue time on that suite (`.agents/skills/openclaw-testing/SKILL.md:180`).
- Impact: A supposedly focused native live-suite rerun can still spend release time and Blacksmith capacity on the unrelated Docker release-path matrix.
- Suggested fix: Skip `docker_e2e_release_checks` when `live_suite_filter` is non-empty unless the filter explicitly targets a Docker release-path lane, or add an equivalent Docker lane filter and pass it through.
- Confidence: high

## Reviewed

- Diff: `fc2d957923af960400935e6deaead8ec505bb9f1..57e4994caf6d3f60c2721d411fb3486ebf793100`
- Changed files: all 16 files in the prompt
- Code read: release workflows, reusable live/E2E matrix, QA parity runner path, run-node private QA build path, model catalog/selection paths, Gateway chat/reload tests
- Dependencies/web: installed missing workspace deps with `pnpm install`; queried GitHub check runs for the reviewed SHA; no general web lookup was needed

## Tests / Live Checks

- `pnpm test test/scripts/package-acceptance-workflow.test.ts src/infra/run-node.test.ts src/agents/model-selection.test.ts src/agents/model-catalog.test.ts -- --reporter=verbose` passed
- `pnpm test src/gateway/server-methods/chat.directive-tags.test.ts src/gateway/server.reload.test.ts test/gateway.multi.e2e.test.ts -- --reporter=verbose` passed
- `pnpm exec oxfmt --check --threads=1 ...` on touched TS/test files passed
- `pnpm exec actionlint ...` could not run because `actionlint` is not installed in the workspace

## Limitations

- Did not dispatch live/release GitHub workflows.
- Workflow syntax was reviewed statically; actionlint was unavailable locally.
```
