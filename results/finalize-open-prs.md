# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-19T23:26:22.080Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 9 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 1 |
| mergeability_unknown | 0 |
| needs_checks | 9 |
| needs_review | 0 |
| needs_merge_preflight | 9 |
| needs_result_backfill | 5 |

## Dispatch

Enabled: no

Status: report_only

| PR | Cluster | Job | Mode | Blockers |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Open PRs

| PR | Title | Cluster | Mergeable | Merge State | Checks | Blockers | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#84355](https://github.com/openclaw/openclaw/pull/84355) | gateway: use identity.name in agent summaries when name is unset | automerge-openclaw-openclaw-57835 | MERGEABLE | UNSTABLE | CANCELLED:8 SKIPPED:87 SUCCESS:68 IN_PROGRESS:8 NEUTRAL:1; blockers:14 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84354](https://github.com/openclaw/openclaw/pull/84354) | fix(channels): suppress verbose failed-tool dumps | automerge-openclaw-openclaw-84303 | MERGEABLE | UNSTABLE | CANCELLED:9 QUEUED:1 SKIPPED:113 SUCCESS:73 IN_PROGRESS:6 NEUTRAL:1; blockers:14 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84353](https://github.com/openclaw/openclaw/pull/84353) | fix(agents): abandon hung in-flight write lock on attempt cleanup (#84193) | automerge-openclaw-openclaw-84220 | MERGEABLE | UNSTABLE | CANCELLED:17 SKIPPED:98 SUCCESS:74 IN_PROGRESS:1 NEUTRAL:1; blockers:9 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84321](https://github.com/openclaw/openclaw/pull/84321) | fix(embedded-runner): preserve provider errors on cleanup takeover | automerge-openclaw-openclaw-84056 | CONFLICTING | DIRTY | CANCELLED:26 SKIPPED:112 SUCCESS:78 FAILURE:1 NEUTRAL:1; blockers:14 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84312](https://github.com/openclaw/openclaw/pull/84312) | Preserve disabled Discord presentation buttons | automerge-openclaw-openclaw-84188 | MERGEABLE | UNSTABLE | SUCCESS:73 SKIPPED:22 IN_PROGRESS:2 NEUTRAL:1; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-agentic-control-plane-startup-runtime:IN_PROGRESS; CI / check-additional-extension-package-boundary:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84311](https://github.com/openclaw/openclaw/pull/84311) | fix(cron): use structured denial signals | automerge-openclaw-openclaw-84067 | MERGEABLE | UNSTABLE | SUCCESS:60 IN_PROGRESS:14 SKIPPED:23 NEUTRAL:1; blockers:14 | needs_merge_state:UNSTABLE, needs_checks:CodeQL / Security High (channel-runtime-boundary):IN_PROGRESS; CodeQL / Security High (network-ssrf-boundary):IN_PROGRESS; CodeQL / Security High (mcp-process-tool-boundary):IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84309](https://github.com/openclaw/openclaw/pull/84309) | fix(twitch): export clearRegistryForTest for cross-test isolation (#83887) | automerge-openclaw-openclaw-84244 | MERGEABLE | UNSTABLE | CANCELLED:2 SKIPPED:30 SUCCESS:64 IN_PROGRESS:4 NEUTRAL:1; blockers:5 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; CI / build-artifacts:IN_PROGRESS; CodeQL Critical Quality / Critical Quality (network-runtime-boundary):IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84308](https://github.com/openclaw/openclaw/pull/84308) | fix(cron): keep recovered tool warnings diagnostic | automerge-openclaw-openclaw-84045 | MERGEABLE | UNSTABLE | SUCCESS:73 SKIPPED:23 IN_PROGRESS:1 NEUTRAL:1; blockers:1 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84169](https://github.com/openclaw/openclaw/pull/84169) | fix(discord): preserve streamed replies after tool warnings | automerge-openclaw-openclaw-83844 | MERGEABLE | CLEAN | CANCELLED:29 SKIPPED:125 SUCCESS:76 NEUTRAL:1; blockers:15 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
