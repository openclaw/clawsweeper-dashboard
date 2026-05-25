# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-25T14:19:08.188Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 5 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 2 |
| mergeability_unknown | 0 |
| needs_checks | 4 |
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
| [#86515](https://github.com/openclaw/openclaw/pull/86515) | fix(ollama): strip inline kimi cloud reasoning leak | automerge-openclaw-openclaw-86286 | MERGEABLE | UNSTABLE | CANCELLED:18 SKIPPED:102 SUCCESS:68 IN_PROGRESS:2; blockers:12 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | repair failing checks or document unrelated main flake with touched-surface proof |
| [#86500](https://github.com/openclaw/openclaw/pull/86500) | fix(qqbot): derive outbound watchdog from configured timeouts (#85267) | automerge-openclaw-openclaw-85271 | MERGEABLE | UNSTABLE | SUCCESS:68 SKIPPED:23 IN_PROGRESS:1 NEUTRAL:1; blockers:1 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-agentic-agents:IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#86497](https://github.com/openclaw/openclaw/pull/86497) | Guard OpenAI chat payload turns | automerge-openclaw-openclaw-86177 | MERGEABLE | UNSTABLE | IN_PROGRESS:61 SUCCESS:13 SKIPPED:23; blockers:61 | needs_merge_state:UNSTABLE, needs_checks:CodeQL / Security High (core-auth-secrets):IN_PROGRESS; CodeQL / Security High (channel-runtime-boundary):IN_PROGRESS; CodeQL / Security High (network-ssrf-boundary):IN_PROGRESS, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#86482](https://github.com/openclaw/openclaw/pull/86482) | fix: guard QMD session stem fallback | automerge-openclaw-openclaw-86327 | CONFLICTING | DIRTY | SUCCESS:76 SKIPPED:21 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#86295](https://github.com/openclaw/openclaw/pull/86295) | docs: clarify config default review risk policy | issue-openclaw-openclaw-86288 | CONFLICTING | DIRTY | CANCELLED:2 SKIPPED:33 SUCCESS:13; blockers:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
