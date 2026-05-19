# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-19T23:21:57.162Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 8 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 3 |
| mergeability_unknown | 0 |
| needs_checks | 8 |
| needs_review | 0 |
| needs_merge_preflight | 8 |
| needs_result_backfill | 6 |

## Dispatch

Enabled: no

Status: report_only

| PR | Cluster | Job | Mode | Blockers |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Open PRs

| PR | Title | Cluster | Mergeable | Merge State | Checks | Blockers | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#84353](https://github.com/openclaw/openclaw/pull/84353) | fix(agents): abandon hung in-flight write lock on attempt cleanup (#84193) | automerge-openclaw-openclaw-84220 | MERGEABLE | UNSTABLE | CANCELLED:16 IN_PROGRESS:15 SKIPPED:98 SUCCESS:60 NEUTRAL:1; blockers:22 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84321](https://github.com/openclaw/openclaw/pull/84321) | fix(embedded-runner): preserve provider errors on cleanup takeover | automerge-openclaw-openclaw-84056 | CONFLICTING | DIRTY | CANCELLED:26 SKIPPED:112 SUCCESS:78 FAILURE:1 NEUTRAL:1; blockers:14 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84312](https://github.com/openclaw/openclaw/pull/84312) | Preserve disabled Discord presentation buttons | automerge-openclaw-openclaw-84188 | MERGEABLE | UNSTABLE | IN_PROGRESS:11 SUCCESS:64 SKIPPED:22 NEUTRAL:1; blockers:11 | needs_merge_state:UNSTABLE, needs_checks:CodeQL / Security High (core-auth-secrets):IN_PROGRESS; CodeQL / Security High (channel-runtime-boundary):IN_PROGRESS; CodeQL / Security High (network-ssrf-boundary):IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84311](https://github.com/openclaw/openclaw/pull/84311) | fix(cron): use structured denial signals | automerge-openclaw-openclaw-84067 | CONFLICTING | DIRTY | CANCELLED:26 SKIPPED:112 SUCCESS:79 NEUTRAL:1; blockers:13 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84310](https://github.com/openclaw/openclaw/pull/84310) | feat(ui): tool name style in usage panel | automerge-openclaw-openclaw-42197 | MERGEABLE | UNSTABLE | SUCCESS:62 SKIPPED:10 IN_PROGRESS:1; blockers:1 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84309](https://github.com/openclaw/openclaw/pull/84309) | fix(twitch): export clearRegistryForTest for cross-test isolation (#83887) | automerge-openclaw-openclaw-84244 | CONFLICTING | DIRTY | CANCELLED:16 SKIPPED:94 SUCCESS:74 NEUTRAL:1; blockers:8 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84308](https://github.com/openclaw/openclaw/pull/84308) | fix(cron): keep recovered tool warnings diagnostic | automerge-openclaw-openclaw-84045 | MERGEABLE | UNSTABLE | SUCCESS:57 IN_PROGRESS:17 SKIPPED:23 NEUTRAL:1; blockers:17 | needs_merge_state:UNSTABLE, needs_checks:CodeQL / Security High (channel-runtime-boundary):IN_PROGRESS; CodeQL / Security High (actions):IN_PROGRESS; CI / build-artifacts:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84169](https://github.com/openclaw/openclaw/pull/84169) | fix(discord): preserve streamed replies after tool warnings | automerge-openclaw-openclaw-83844 | MERGEABLE | CLEAN | CANCELLED:29 SKIPPED:125 SUCCESS:76 NEUTRAL:1; blockers:15 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
