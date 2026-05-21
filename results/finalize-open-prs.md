# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-21T00:33:04.479Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 5 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 3 |
| mergeability_unknown | 0 |
| needs_checks | 5 |
| needs_review | 0 |
| needs_merge_preflight | 5 |
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
| [#84742](https://github.com/openclaw/openclaw/pull/84742) | fix(doctor): warn when sandbox hides MCP tools | automerge-openclaw-openclaw-84699 | MERGEABLE | UNSTABLE | CANCELLED:11 IN_PROGRESS:4 SKIPPED:113 SUCCESS:70 NEUTRAL:1; blockers:11 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84741](https://github.com/openclaw/openclaw/pull/84741) | Route JSON-mode plugin registration logs to stderr | automerge-openclaw-openclaw-84684 | MERGEABLE | UNSTABLE | CANCELLED:11 IN_PROGRESS:2 SKIPPED:108 SUCCESS:73 NEUTRAL:1; blockers:3 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:IN_PROGRESS; CodeQL Critical Quality / Critical Quality (network-runtime-boundary):IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84362](https://github.com/openclaw/openclaw/pull/84362) | fix(doctor): preserve explicit agentRuntime pin during codex model migration [AI-assisted] | automerge-openclaw-openclaw-84142 | CONFLICTING | DIRTY | CANCELLED:4 SKIPPED:47 SUCCESS:80 NEUTRAL:1; blockers:2 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84353](https://github.com/openclaw/openclaw/pull/84353) | fix(agents): abandon hung in-flight write lock on attempt cleanup (#84193) | automerge-openclaw-openclaw-84220 | CONFLICTING | DIRTY | CANCELLED:25 SKIPPED:130 SUCCESS:79 NEUTRAL:1; blockers:12 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84321](https://github.com/openclaw/openclaw/pull/84321) | fix(embedded-runner): preserve provider errors on cleanup takeover | automerge-openclaw-openclaw-84056 | CONFLICTING | DIRTY | CANCELLED:26 SKIPPED:112 SUCCESS:78 FAILURE:1 NEUTRAL:1; blockers:14 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
