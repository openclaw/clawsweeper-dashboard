# Open ClawSweeper Repair PR Finalizer

Generated: 2026-06-07T12:42:39.439Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 3 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 1 |
| mergeability_unknown | 0 |
| needs_checks | 3 |
| needs_review | 0 |
| needs_merge_preflight | 3 |
| needs_result_backfill | 2 |

## Dispatch

Enabled: no

Status: report_only

| PR | Cluster | Job | Mode | Blockers |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Open PRs

| PR | Title | Cluster | Mergeable | Merge State | Checks | Blockers | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#91087](https://github.com/openclaw/openclaw/pull/91087) | Fix Control UI CJK IME composition | automerge-openclaw-openclaw-86036 | CONFLICTING | DIRTY | CANCELLED:19 SKIPPED:121 SUCCESS:134 FAILURE:2 NEUTRAL:1; blockers:12 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#90889](https://github.com/openclaw/openclaw/pull/90889) | fix: cap session context overrides by model window | gitcrawl-13603-switching-to-a-smaller-context-model-mid-session-causes-hard-cra | MERGEABLE | CLEAN | CANCELLED:13 SKIPPED:89 SUCCESS:138 NEUTRAL:1; blockers:8 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#90812](https://github.com/openclaw/openclaw/pull/90812) | fix(voice-call): preserve live Twilio streams in stale reaper | automerge-openclaw-openclaw-90620 | MERGEABLE | CLEAN | CANCELLED:3 SKIPPED:43 SUCCESS:127; blockers:1 | needs_checks:Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
