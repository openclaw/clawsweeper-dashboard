# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-03T01:25:48.787Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 4 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 0 |
| mergeability_unknown | 0 |
| needs_checks | 3 |
| needs_review | 0 |
| needs_merge_preflight | 4 |
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
| [#76351](https://github.com/openclaw/openclaw/pull/76351) | fix(gateway): preserve err.stack when chat.send/agent attachment parsing fails | automerge-openclaw-openclaw-75135 | MERGEABLE | UNSTABLE | CANCELLED:5 SKIPPED:26 SUCCESS:73 FAILURE:2 IN_PROGRESS:2 NEUTRAL:1; blockers:4 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-fast-contracts-plugins-c:FAILURE; CI / checks-node-core-runtime-infra:IN_PROGRESS; CI / check-additional-boundaries:IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#76330](https://github.com/openclaw/openclaw/pull/76330) | fix(slack): enable preview streaming in flat DMs (replyToMode: off) | automerge-openclaw-openclaw-56544 | MERGEABLE | CLEAN | CANCELLED:1 SKIPPED:24 SUCCESS:80 NEUTRAL:1 | needs_merge_preflight, needs_result_backfill | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#76318](https://github.com/openclaw/openclaw/pull/76318) | fix(ui): clean up delete confirm popover listener | automerge-openclaw-openclaw-75590 | MERGEABLE | UNSTABLE | CANCELLED:1 SUCCESS:64 SKIPPED:9 FAILURE:6; blockers:7 | needs_merge_state:UNSTABLE, needs_checks:ClawSweeper Dispatch / dispatch:CANCELLED; CI / checks-fast-contracts-plugins-c:FAILURE; CI / check-additional-boundaries:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#76317](https://github.com/openclaw/openclaw/pull/76317) | fix(gateway,agent): only enforce session sendPolicy=deny when delivering | automerge-openclaw-openclaw-73500 | MERGEABLE | UNSTABLE | SUCCESS:75 SKIPPED:22 FAILURE:4 NEUTRAL:1; blockers:4 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-fast-contracts-plugins-c:FAILURE; CI / check-additional-boundaries:FAILURE; CI / checks-fast-contracts-plugins:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
