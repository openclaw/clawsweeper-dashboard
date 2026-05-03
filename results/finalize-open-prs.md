# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-03T00:16:56.185Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 6 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 3 |
| mergeability_unknown | 0 |
| needs_checks | 5 |
| needs_review | 0 |
| needs_merge_preflight | 6 |
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
| [#76328](https://github.com/openclaw/openclaw/pull/76328) | fix(cron): persist manual run ids in history | automerge-openclaw-openclaw-76288 | MERGEABLE | UNSTABLE | CANCELLED:8 SKIPPED:13 SUCCESS:73 IN_PROGRESS:2 NEUTRAL:1; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:IN_PROGRESS; CI / check-additional-boundaries:IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#76321](https://github.com/openclaw/openclaw/pull/76321) | [AI-assisted] fix(feishu): probe status with account credentials | automerge-openclaw-openclaw-74060 | MERGEABLE | UNSTABLE | CANCELLED:2 SKIPPED:24 SUCCESS:44 IN_PROGRESS:21; blockers:21 | needs_merge_state:UNSTABLE, needs_checks:CI / build-artifacts:IN_PROGRESS; CI / checks-fast-contracts-plugins-a:IN_PROGRESS; CI / checks-fast-contracts-plugins-d:IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#76319](https://github.com/openclaw/openclaw/pull/76319) | fix(cron): route CLI-runtime cron models through compatible backend | automerge-openclaw-openclaw-75840 | MERGEABLE | CLEAN | CANCELLED:4 SKIPPED:11 SUCCESS:77 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#76318](https://github.com/openclaw/openclaw/pull/76318) | fix(ui): clean up delete confirm popover listener | automerge-openclaw-openclaw-75590 | CONFLICTING | DIRTY | CANCELLED:5 SKIPPED:13 SUCCESS:69 FAILURE:2; blockers:2 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-core-support-boundary:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#76317](https://github.com/openclaw/openclaw/pull/76317) | fix(gateway,agent): only enforce session sendPolicy=deny when delivering | automerge-openclaw-openclaw-73500 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:23 SUCCESS:77 FAILURE:2 NEUTRAL:1; blockers:2 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-agentic-control-plane-agent-chat:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75469](https://github.com/openclaw/openclaw/pull/75469) | fix: same-session inferred commitments can be starved indefinitely when a normal HEARTBEAT.md... | clawsweeper-commit-openclaw-openclaw-955a0e9c0f7d | CONFLICTING | DIRTY | SUCCESS:76 SKIPPED:9 FAILURE:1 NEUTRAL:1; blockers:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-fast-protocol:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
