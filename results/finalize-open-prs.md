# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-25T13:36:30.907Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 5 |
| ready_candidates | 0 |
| security_hold | 1 |
| needs_rebase | 2 |
| mergeability_unknown | 0 |
| needs_checks | 4 |
| needs_review | 0 |
| needs_merge_preflight | 5 |
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
| [#86500](https://github.com/openclaw/openclaw/pull/86500) | fix(qqbot): derive outbound watchdog from configured timeouts (#85267) | automerge-openclaw-openclaw-85271 | MERGEABLE | UNSTABLE | CANCELLED:3 QUEUED:1 IN_PROGRESS:3 SKIPPED:92 SUCCESS:65 NEUTRAL:1; blockers:3 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:IN_PROGRESS; CodeQL Critical Quality / Critical Quality (network-runtime-boundary):IN_PROGRESS; CI / checks-node-agentic-agents:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#86497](https://github.com/openclaw/openclaw/pull/86497) | Guard OpenAI chat payload turns | automerge-openclaw-openclaw-86177 | MERGEABLE | CLEAN | CANCELLED:11 IN_PROGRESS:1 SKIPPED:93 SUCCESS:76 NEUTRAL:1; blockers:4 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#86482](https://github.com/openclaw/openclaw/pull/86482) | fix: guard QMD session stem fallback | automerge-openclaw-openclaw-86327 | CONFLICTING | DIRTY | SUCCESS:76 SKIPPED:21 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#86453](https://github.com/openclaw/openclaw/pull/86453) | fix: Hook ingress token unlocks password-mode gateway auth | automerge-openclaw-openclaw-84338 | MERGEABLE | CLEAN | CANCELLED:4 SKIPPED:39 SUCCESS:78 NEUTRAL:1; blockers:2 | security_hold, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | route to central security triage |
| [#86295](https://github.com/openclaw/openclaw/pull/86295) | docs: clarify config default review risk policy | issue-openclaw-openclaw-86288 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:33 SUCCESS:13; blockers:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
