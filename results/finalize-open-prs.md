# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-19T23:49:52.482Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 9 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 5 |
| mergeability_unknown | 0 |
| needs_checks | 7 |
| needs_review | 0 |
| needs_merge_preflight | 9 |
| needs_result_backfill | 4 |

## Dispatch

Enabled: no

Status: report_only

| PR | Cluster | Job | Mode | Blockers |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Open PRs

| PR | Title | Cluster | Mergeable | Merge State | Checks | Blockers | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#84362](https://github.com/openclaw/openclaw/pull/84362) | fix(doctor): preserve explicit agentRuntime pin during codex model migration [AI-assisted] | automerge-openclaw-openclaw-84142 | MERGEABLE | UNSTABLE | CANCELLED:3 IN_PROGRESS:16 SKIPPED:85 SUCCESS:58 NEUTRAL:1; blockers:18 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84355](https://github.com/openclaw/openclaw/pull/84355) | gateway: use identity.name in agent summaries when name is unset | automerge-openclaw-openclaw-57835 | MERGEABLE | UNSTABLE | CANCELLED:1 SUCCESS:72 SKIPPED:24 FAILURE:1 NEUTRAL:1; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:ClawSweeper Dispatch / dispatch:CANCELLED; CI / build-artifacts:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84354](https://github.com/openclaw/openclaw/pull/84354) | fix(channels): suppress verbose failed-tool dumps | automerge-openclaw-openclaw-84303 | CONFLICTING | DIRTY | CANCELLED:14 SKIPPED:129 SUCCESS:83 FAILURE:1 NEUTRAL:1; blockers:11 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84353](https://github.com/openclaw/openclaw/pull/84353) | fix(agents): abandon hung in-flight write lock on attempt cleanup (#84193) | automerge-openclaw-openclaw-84220 | MERGEABLE | CLEAN | CANCELLED:21 SKIPPED:114 SUCCESS:77 NEUTRAL:1; blockers:10 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84321](https://github.com/openclaw/openclaw/pull/84321) | fix(embedded-runner): preserve provider errors on cleanup takeover | automerge-openclaw-openclaw-84056 | CONFLICTING | DIRTY | CANCELLED:26 SKIPPED:112 SUCCESS:78 FAILURE:1 NEUTRAL:1; blockers:14 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84311](https://github.com/openclaw/openclaw/pull/84311) | fix(cron): use structured denial signals | automerge-openclaw-openclaw-84067 | CONFLICTING | DIRTY | SUCCESS:74 SKIPPED:23 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84309](https://github.com/openclaw/openclaw/pull/84309) | fix(twitch): export clearRegistryForTest for cross-test isolation (#83887) | automerge-openclaw-openclaw-84244 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:30 SUCCESS:68 NEUTRAL:1; blockers:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84308](https://github.com/openclaw/openclaw/pull/84308) | fix(cron): keep recovered tool warnings diagnostic | automerge-openclaw-openclaw-84045 | CONFLICTING | DIRTY | SUCCESS:74 SKIPPED:23 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84169](https://github.com/openclaw/openclaw/pull/84169) | fix(discord): preserve streamed replies after tool warnings | automerge-openclaw-openclaw-83844 | MERGEABLE | CLEAN | CANCELLED:29 SKIPPED:125 SUCCESS:76 NEUTRAL:1; blockers:15 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
