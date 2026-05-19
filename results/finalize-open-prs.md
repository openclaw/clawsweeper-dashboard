# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-19T23:24:12.826Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 10 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 1 |
| mergeability_unknown | 0 |
| needs_checks | 9 |
| needs_review | 0 |
| needs_merge_preflight | 10 |
| needs_result_backfill | 7 |

## Dispatch

Enabled: no

Status: report_only

| PR | Cluster | Job | Mode | Blockers |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Open PRs

| PR | Title | Cluster | Mergeable | Merge State | Checks | Blockers | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#84355](https://github.com/openclaw/openclaw/pull/84355) | gateway: use identity.name in agent summaries when name is unset | automerge-openclaw-openclaw-57835 | MERGEABLE | UNSTABLE | CANCELLED:8 IN_PROGRESS:33 SKIPPED:86 SUCCESS:37 QUEUED:6 NEUTRAL:1; blockers:45 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84354](https://github.com/openclaw/openclaw/pull/84354) | fix(channels): suppress verbose failed-tool dumps | automerge-openclaw-openclaw-84303 | MERGEABLE | UNSTABLE | CANCELLED:9 QUEUED:1 SKIPPED:113 SUCCESS:63 IN_PROGRESS:16 NEUTRAL:1; blockers:24 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84353](https://github.com/openclaw/openclaw/pull/84353) | fix(agents): abandon hung in-flight write lock on attempt cleanup (#84193) | automerge-openclaw-openclaw-84220 | MERGEABLE | UNSTABLE | CANCELLED:16 IN_PROGRESS:5 SKIPPED:98 SUCCESS:70 NEUTRAL:1; blockers:12 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84321](https://github.com/openclaw/openclaw/pull/84321) | fix(embedded-runner): preserve provider errors on cleanup takeover | automerge-openclaw-openclaw-84056 | CONFLICTING | DIRTY | CANCELLED:26 SKIPPED:112 SUCCESS:78 FAILURE:1 NEUTRAL:1; blockers:14 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84312](https://github.com/openclaw/openclaw/pull/84312) | Preserve disabled Discord presentation buttons | automerge-openclaw-openclaw-84188 | MERGEABLE | UNSTABLE | SUCCESS:71 SKIPPED:22 IN_PROGRESS:4 NEUTRAL:1; blockers:4 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:IN_PROGRESS; CodeQL Critical Quality / Critical Quality (network-runtime-boundary):IN_PROGRESS; CI / checks-node-agentic-control-plane-startup-runtime:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84311](https://github.com/openclaw/openclaw/pull/84311) | fix(cron): use structured denial signals | automerge-openclaw-openclaw-84067 | MERGEABLE | UNSTABLE | IN_PROGRESS:55 SUCCESS:11 QUEUED:8 SKIPPED:23; blockers:63 | needs_merge_state:UNSTABLE, needs_checks:CodeQL / Security High (core-auth-secrets):IN_PROGRESS; OpenGrep — PR Diff / Scan changed paths (precise):IN_PROGRESS; CodeQL / Security High (channel-runtime-boundary):QUEUED, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84310](https://github.com/openclaw/openclaw/pull/84310) | feat(ui): tool name style in usage panel | automerge-openclaw-openclaw-42197 | MERGEABLE | CLEAN | SUCCESS:63 SKIPPED:10 | needs_merge_preflight, needs_result_backfill | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#84309](https://github.com/openclaw/openclaw/pull/84309) | fix(twitch): export clearRegistryForTest for cross-test isolation (#83887) | automerge-openclaw-openclaw-84244 | MERGEABLE | UNSTABLE | CANCELLED:2 IN_PROGRESS:49 SKIPPED:30 SUCCESS:17 QUEUED:1; blockers:51 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; OpenGrep — PR Diff / Scan changed paths (precise):IN_PROGRESS; CI / build-artifacts:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84308](https://github.com/openclaw/openclaw/pull/84308) | fix(cron): keep recovered tool warnings diagnostic | automerge-openclaw-openclaw-84045 | MERGEABLE | UNSTABLE | SUCCESS:70 SKIPPED:23 IN_PROGRESS:4 NEUTRAL:1; blockers:4 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:IN_PROGRESS; CodeQL Critical Quality / Critical Quality (network-runtime-boundary):IN_PROGRESS; CI / check-guards:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84169](https://github.com/openclaw/openclaw/pull/84169) | fix(discord): preserve streamed replies after tool warnings | automerge-openclaw-openclaw-83844 | MERGEABLE | CLEAN | CANCELLED:29 SKIPPED:125 SUCCESS:76 NEUTRAL:1; blockers:15 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
