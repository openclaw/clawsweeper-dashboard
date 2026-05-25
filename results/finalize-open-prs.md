# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-25T11:56:37.264Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 2 |
| ready_candidates | 0 |
| security_hold | 1 |
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
| [#86453](https://github.com/openclaw/openclaw/pull/86453) | fix: Hook ingress token unlocks password-mode gateway auth | automerge-openclaw-openclaw-84338 | MERGEABLE | UNSTABLE | SUCCESS:71 SKIPPED:23 IN_PROGRESS:2 FAILURE:1 NEUTRAL:1; blockers:3 | security_hold, needs_merge_state:UNSTABLE, needs_checks:CodeQL Critical Quality / Critical Quality (network-runtime-boundary):IN_PROGRESS; CI / checks-node-agentic-agents:IN_PROGRESS; CI / check-dependencies:FAILURE, needs_merge_preflight | route to central security triage |
| [#86295](https://github.com/openclaw/openclaw/pull/86295) | docs: clarify config default review risk policy | issue-openclaw-openclaw-86288 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:33 SUCCESS:13; blockers:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
