# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-20T01:53:50.628Z

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
| [#84369](https://github.com/openclaw/openclaw/pull/84369) | Fix Codex image generation tool timeout | automerge-openclaw-openclaw-84254 | MERGEABLE | UNSTABLE | SUCCESS:58 SKIPPED:24 FAILURE:6 IN_PROGRESS:3; blockers:9 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:FAILURE; CodeQL Critical Quality / Critical Quality (network-runtime-boundary):IN_PROGRESS; CI / check-guards:IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84362](https://github.com/openclaw/openclaw/pull/84362) | fix(doctor): preserve explicit agentRuntime pin during codex model migration [AI-assisted] | automerge-openclaw-openclaw-84142 | MERGEABLE | UNSTABLE | SUCCESS:65 SKIPPED:24 FAILURE:8 NEUTRAL:1; blockers:8 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:FAILURE; CI / check-guards:FAILURE; CI / check-prod-types:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84354](https://github.com/openclaw/openclaw/pull/84354) | fix(channels): suppress verbose failed-tool dumps | automerge-openclaw-openclaw-84303 | CONFLICTING | DIRTY | CANCELLED:14 SKIPPED:129 SUCCESS:83 FAILURE:1 NEUTRAL:1; blockers:11 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84353](https://github.com/openclaw/openclaw/pull/84353) | fix(agents): abandon hung in-flight write lock on attempt cleanup (#84193) | automerge-openclaw-openclaw-84220 | CONFLICTING | DIRTY | CANCELLED:25 SKIPPED:130 SUCCESS:79 NEUTRAL:1; blockers:12 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84321](https://github.com/openclaw/openclaw/pull/84321) | fix(embedded-runner): preserve provider errors on cleanup takeover | automerge-openclaw-openclaw-84056 | CONFLICTING | DIRTY | CANCELLED:26 SKIPPED:112 SUCCESS:78 FAILURE:1 NEUTRAL:1; blockers:14 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
