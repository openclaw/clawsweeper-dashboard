# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-03T00:06:30.590Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 4 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 0 |
| mergeability_unknown | 0 |
| needs_checks | 2 |
| needs_review | 0 |
| needs_merge_preflight | 4 |
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
| [#76321](https://github.com/openclaw/openclaw/pull/76321) | [AI-assisted] fix(feishu): probe status with account credentials | automerge-openclaw-openclaw-74060 | MERGEABLE | CLEAN | CANCELLED:1 IN_PROGRESS:1 SKIPPED:28 SUCCESS:10 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#76319](https://github.com/openclaw/openclaw/pull/76319) | fix(cron): route CLI-runtime cron models through compatible backend | automerge-openclaw-openclaw-75840 | MERGEABLE | CLEAN | CANCELLED:4 SKIPPED:11 SUCCESS:77 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#76318](https://github.com/openclaw/openclaw/pull/76318) | fix(ui): clean up delete confirm popover listener | automerge-openclaw-openclaw-75590 | MERGEABLE | UNSTABLE | CANCELLED:5 SKIPPED:13 SUCCESS:69 FAILURE:2; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-support-boundary:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#76317](https://github.com/openclaw/openclaw/pull/76317) | fix(gateway,agent): only enforce session sendPolicy=deny when delivering | automerge-openclaw-openclaw-73500 | MERGEABLE | UNSTABLE | CANCELLED:2 SKIPPED:23 SUCCESS:77 FAILURE:2 NEUTRAL:1; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-agentic-control-plane-agent-chat:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
