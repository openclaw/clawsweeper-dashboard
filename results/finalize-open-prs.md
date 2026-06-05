# Open ClawSweeper Repair PR Finalizer

Generated: 2026-06-05T03:39:24.429Z

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
| [#90533](https://github.com/openclaw/openclaw/pull/90533) | fix(openai): accept missing content-type on ChatGPT Responses SSE stream | automerge-openclaw-openclaw-90399 | MERGEABLE | CLEAN | CANCELLED:14 IN_PROGRESS:1 SKIPPED:94 SUCCESS:131 NEUTRAL:1; blockers:8 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#90284](https://github.com/openclaw/openclaw/pull/90284) | fix(channels): guard setup wizard text input trimming | gitcrawl-2160-fix-handle-undefined-rawvalue-in-setup-wizard-text-input | CONFLICTING | DIRTY | CANCELLED:11 SKIPPED:59 SUCCESS:131 FAILURE:3 NEUTRAL:1; blockers:9 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
