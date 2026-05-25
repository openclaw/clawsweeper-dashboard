# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-25T12:45:29.580Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 3 |
| ready_candidates | 0 |
| security_hold | 1 |
| needs_rebase | 1 |
| mergeability_unknown | 0 |
| needs_checks | 3 |
| needs_review | 0 |
| needs_merge_preflight | 3 |
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
| [#86482](https://github.com/openclaw/openclaw/pull/86482) | fix: guard QMD session stem fallback | automerge-openclaw-openclaw-86327 | MERGEABLE | UNSTABLE | CANCELLED:6 IN_PROGRESS:4 SKIPPED:75 SUCCESS:73 NEUTRAL:1; blockers:4 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:IN_PROGRESS; CodeQL Critical Quality / Critical Quality (network-runtime-boundary):IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#86453](https://github.com/openclaw/openclaw/pull/86453) | fix: Hook ingress token unlocks password-mode gateway auth | automerge-openclaw-openclaw-84338 | MERGEABLE | CLEAN | CANCELLED:2 SKIPPED:31 SUCCESS:76 NEUTRAL:1; blockers:1 | security_hold, needs_checks:Real behavior proof:CANCELLED, needs_merge_preflight | route to central security triage |
| [#86295](https://github.com/openclaw/openclaw/pull/86295) | docs: clarify config default review risk policy | issue-openclaw-openclaw-86288 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:33 SUCCESS:13; blockers:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
