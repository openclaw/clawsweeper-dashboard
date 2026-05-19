# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-19T03:23:20.782Z

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
| [#83944](https://github.com/openclaw/openclaw/pull/83944) | fix: retry config snapshot after rejection | automerge-openclaw-openclaw-83931 | MERGEABLE | UNSTABLE | IN_PROGRESS:15 SUCCESS:5 SKIPPED:16; blockers:13 | needs_merge_state:UNSTABLE, needs_checks:CI / preflight:IN_PROGRESS; CodeQL / Security High (core-auth-secrets):IN_PROGRESS; OpenGrep — PR Diff / Scan changed paths (precise):IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#83941](https://github.com/openclaw/openclaw/pull/83941) | fix: include gateway plugin commands in TUI autocomplete | automerge-openclaw-openclaw-83640 | CONFLICTING | DIRTY | CANCELLED:11 IN_PROGRESS:1 SKIPPED:101 SUCCESS:79 NEUTRAL:1; blockers:7 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
