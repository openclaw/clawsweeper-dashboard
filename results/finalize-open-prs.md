# Open ClawSweeper Repair PR Finalizer

Generated: 2026-06-19T12:41:27.663Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 2 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 1 |
| mergeability_unknown | 0 |
| needs_checks | 2 |
| needs_review | 0 |
| needs_merge_preflight | 2 |
| needs_result_backfill | 1 |

## Dispatch

Enabled: no

Status: report_only

| PR | Cluster | Job | Mode | Blockers |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Open PRs

| PR | Title | Cluster | Mergeable | Merge State | Checks | Blockers | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#94833](https://github.com/openclaw/openclaw/pull/94833) | fix(codex): release timed-out app-server lanes | automerge-openclaw-openclaw-94685 | CONFLICTING | DIRTY | CANCELLED:3 SKIPPED:53 SUCCESS:131 IN_PROGRESS:9 NEUTRAL:1; blockers:10 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; CI / checks-node-core-runtime-infra-approval-exec:IN_PROGRESS; CI / checks-node-core-runtime-infra-process:IN_PROGRESS, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#94784](https://github.com/openclaw/openclaw/pull/94784) | fix(doctor): stop promising --fix for working isolated shell-prompt cron jobs (#94655) | automerge-openclaw-openclaw-94659 | MERGEABLE | UNSTABLE | CANCELLED:2 SKIPPED:36 SUCCESS:138 FAILURE:1 NEUTRAL:1; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; CI / ci-timings-summary:FAILURE, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
