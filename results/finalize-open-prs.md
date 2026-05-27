# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-27T21:37:44.762Z

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
| [#87423](https://github.com/openclaw/openclaw/pull/87423) | fix(tui): force repaint final chat events | automerge-openclaw-openclaw-87348 | MERGEABLE | UNSTABLE | CANCELLED:10 SKIPPED:86 SUCCESS:73 IN_PROGRESS:3 FAILURE:1 QUEUED:2; blockers:10 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#86954](https://github.com/openclaw/openclaw/pull/86954) | fix(ui): keep terminal webchat run status after stale session rows | issue-openclaw-openclaw-86939 | CONFLICTING | DIRTY | CANCELLED:10 SKIPPED:86 SUCCESS:75 FAILURE:1 NEUTRAL:1; blockers:6 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
