# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-20T00:19:56.560Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 11 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 2 |
| mergeability_unknown | 0 |
| needs_checks | 11 |
| needs_review | 0 |
| needs_merge_preflight | 11 |
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
| [#84369](https://github.com/openclaw/openclaw/pull/84369) | Fix Codex image generation tool timeout | automerge-openclaw-openclaw-84254 | MERGEABLE | UNSTABLE | CANCELLED:9 SKIPPED:101 SUCCESS:69 FAILURE:1 NEUTRAL:1; blockers:6 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84368](https://github.com/openclaw/openclaw/pull/84368) | fix(code-mode): sharpen exec tool description so models stop wasting turns rediscovering constraints | automerge-openclaw-openclaw-84269 | MERGEABLE | UNSTABLE | CANCELLED:12 SKIPPED:102 SUCCESS:77 FAILURE:1 NEUTRAL:1; blockers:9 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84362](https://github.com/openclaw/openclaw/pull/84362) | fix(doctor): preserve explicit agentRuntime pin during codex model migration [AI-assisted] | automerge-openclaw-openclaw-84142 | MERGEABLE | UNSTABLE | CANCELLED:4 SKIPPED:86 SUCCESS:75 FAILURE:1 NEUTRAL:1; blockers:4 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84355](https://github.com/openclaw/openclaw/pull/84355) | gateway: use identity.name in agent summaries when name is unset | automerge-openclaw-openclaw-57835 | MERGEABLE | UNSTABLE | SUCCESS:72 SKIPPED:24 FAILURE:1 NEUTRAL:1; blockers:1 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84354](https://github.com/openclaw/openclaw/pull/84354) | fix(channels): suppress verbose failed-tool dumps | automerge-openclaw-openclaw-84303 | CONFLICTING | DIRTY | CANCELLED:14 SKIPPED:129 SUCCESS:83 FAILURE:1 NEUTRAL:1; blockers:11 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84353](https://github.com/openclaw/openclaw/pull/84353) | fix(agents): abandon hung in-flight write lock on attempt cleanup (#84193) | automerge-openclaw-openclaw-84220 | MERGEABLE | CLEAN | CANCELLED:25 SKIPPED:130 SUCCESS:79 NEUTRAL:1; blockers:12 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84321](https://github.com/openclaw/openclaw/pull/84321) | fix(embedded-runner): preserve provider errors on cleanup takeover | automerge-openclaw-openclaw-84056 | CONFLICTING | DIRTY | CANCELLED:26 SKIPPED:112 SUCCESS:78 FAILURE:1 NEUTRAL:1; blockers:14 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84311](https://github.com/openclaw/openclaw/pull/84311) | fix(cron): use structured denial signals | automerge-openclaw-openclaw-84067 | MERGEABLE | UNSTABLE | CANCELLED:5 SKIPPED:39 SUCCESS:76 FAILURE:1 IN_PROGRESS:1 NEUTRAL:1; blockers:4 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; CI / build-artifacts:FAILURE, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84309](https://github.com/openclaw/openclaw/pull/84309) | fix(twitch): export clearRegistryForTest for cross-test isolation (#83887) | automerge-openclaw-openclaw-84244 | MERGEABLE | UNSTABLE | SUCCESS:65 SKIPPED:23 IN_PROGRESS:4 NEUTRAL:1; blockers:4 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:IN_PROGRESS; CodeQL Critical Quality / Critical Quality (network-runtime-boundary):IN_PROGRESS; CI / check-lint:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84308](https://github.com/openclaw/openclaw/pull/84308) | fix(cron): keep recovered tool warnings diagnostic | automerge-openclaw-openclaw-84045 | MERGEABLE | UNSTABLE | SUCCESS:73 SKIPPED:23 FAILURE:1 NEUTRAL:1; blockers:1 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:FAILURE, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84169](https://github.com/openclaw/openclaw/pull/84169) | fix(discord): preserve streamed replies after tool warnings | automerge-openclaw-openclaw-83844 | MERGEABLE | CLEAN | CANCELLED:29 SKIPPED:125 SUCCESS:76 NEUTRAL:1; blockers:15 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
