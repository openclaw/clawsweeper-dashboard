# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-03T16:08:45.932Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 2 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 1 |
| mergeability_unknown | 0 |
| needs_checks | 1 |
| needs_review | 0 |
| needs_merge_preflight | 2 |
| needs_result_backfill | 0 |

## Dispatch

Enabled: no

Status: report_only

| PR | Cluster | Job | Mode | Blockers |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Open PRs

| PR | Title | Cluster | Mergeable | Merge State | Checks | Blockers | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#76797](https://github.com/openclaw/openclaw/pull/76797) | Fix doctor memory plugin false alarm with gateway-ready runtime | issue-openclaw-openclaw-76792 | MERGEABLE | UNSTABLE | CANCELLED:3 IN_PROGRESS:52 SKIPPED:25 SUCCESS:25 FAILURE:1 NEUTRAL:1; blockers:53 | needs_merge_state:UNSTABLE, needs_checks:CodeQL / Security High (core-auth-secrets):IN_PROGRESS; CodeQL / Security High (channel-runtime-boundary):IN_PROGRESS; CodeQL / Security High (network-ssrf-boundary):IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#76744](https://github.com/openclaw/openclaw/pull/76744) | docs: standardize ACP behavior spelling | issue-openclaw-openclaw-76734 | CONFLICTING | DIRTY | SUCCESS:11 SKIPPED:25 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
