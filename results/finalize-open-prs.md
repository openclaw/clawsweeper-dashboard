# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-03T00:01:31.659Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 7 |
| ready_candidates | 0 |
| security_hold | 1 |
| needs_rebase | 3 |
| mergeability_unknown | 0 |
| needs_checks | 6 |
| needs_review | 0 |
| needs_merge_preflight | 7 |
| needs_result_backfill | 3 |

## Dispatch

Enabled: no

Status: report_only

| PR | Cluster | Job | Mode | Blockers |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Open PRs

| PR | Title | Cluster | Mergeable | Merge State | Checks | Blockers | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#76320](https://github.com/openclaw/openclaw/pull/76320) | fix(slack): ignore no_reaction in remove helpers | automerge-openclaw-openclaw-76304 | MERGEABLE | UNSTABLE | IN_PROGRESS:53 SKIPPED:26 SUCCESS:10 QUEUED:2; blockers:54 | needs_merge_state:UNSTABLE, needs_checks:OpenGrep — PR Diff / Scan changed paths (precise):IN_PROGRESS; CI / build-artifacts:IN_PROGRESS; CI / checks-fast-bundled:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#76319](https://github.com/openclaw/openclaw/pull/76319) | fix(cron): route CLI-runtime cron models through compatible backend | automerge-openclaw-openclaw-75840 | MERGEABLE | UNSTABLE | CANCELLED:4 IN_PROGRESS:57 SKIPPED:11 SUCCESS:12; blockers:57 | needs_merge_state:UNSTABLE, needs_checks:CodeQL / Security High (core-auth-secrets):IN_PROGRESS; CodeQL / Security High (channel-runtime-boundary):IN_PROGRESS; CodeQL / Security High (network-ssrf-boundary):IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#76318](https://github.com/openclaw/openclaw/pull/76318) | fix(ui): clean up delete confirm popover listener | automerge-openclaw-openclaw-75590 | MERGEABLE | UNSTABLE | CANCELLED:5 SKIPPED:13 SUCCESS:41 IN_PROGRESS:22; blockers:22 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:IN_PROGRESS; CI / checks-fast-contracts-plugins-a:IN_PROGRESS; CI / checks-fast-contracts-channels-a:IN_PROGRESS, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#76317](https://github.com/openclaw/openclaw/pull/76317) | fix(gateway,agent): only enforce session sendPolicy=deny when delivering | automerge-openclaw-openclaw-73500 | MERGEABLE | UNSTABLE | CANCELLED:2 SKIPPED:23 SUCCESS:74 IN_PROGRESS:2 FAILURE:1 NEUTRAL:1; blockers:3 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:IN_PROGRESS; CI / checks-node-agentic-control-plane-agent-chat:FAILURE; CI / check-additional-boundaries:IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#75469](https://github.com/openclaw/openclaw/pull/75469) | fix: same-session inferred commitments can be starved indefinitely when a normal HEARTBEAT.md... | clawsweeper-commit-openclaw-openclaw-955a0e9c0f7d | CONFLICTING | DIRTY | SUCCESS:76 SKIPPED:9 FAILURE:1 NEUTRAL:1; blockers:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-fast-protocol:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75464](https://github.com/openclaw/openclaw/pull/75464) | fix: RTT wrapper actionable issues | clawsweeper-commit-openclaw-openclaw-e8810c04a46b | CONFLICTING | DIRTY | CANCELLED:1 SKIPPED:5 SUCCESS:4 | security_hold, needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | route to central security triage |
| [#75463](https://github.com/openclaw/openclaw/pull/75463) | fix: edge case in the new prefixed-alias cache behavior | clawsweeper-commit-openclaw-openclaw-173f959613b3 | CONFLICTING | DIRTY | SUCCESS:68 SKIPPED:22 FAILURE:5 NEUTRAL:1; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-agentic-cli:FAILURE; CI / check-additional-boundaries:FAILURE; CI / checks-node-core-support-boundary:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
