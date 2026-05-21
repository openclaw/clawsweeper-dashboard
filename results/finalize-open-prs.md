# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-21T05:41:10.705Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 7 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 5 |
| mergeability_unknown | 0 |
| needs_checks | 6 |
| needs_review | 0 |
| needs_merge_preflight | 7 |
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
| [#84815](https://github.com/openclaw/openclaw/pull/84815) | [Fix] Keep node systemd tokens out of unit files | automerge-openclaw-openclaw-84408 | MERGEABLE | CLEAN | CANCELLED:24 SKIPPED:121 SUCCESS:78 NEUTRAL:1; blockers:11 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84814](https://github.com/openclaw/openclaw/pull/84814) | fix(agents): classify embedded provider business denials for fallback | automerge-openclaw-openclaw-83042 | MERGEABLE | CLEAN | CANCELLED:15 SKIPPED:92 SUCCESS:78 NEUTRAL:1; blockers:6 | needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#84798](https://github.com/openclaw/openclaw/pull/84798) | fix(agents): disable pi-coding-agent auto-retry to prevent tool call replay loops | automerge-openclaw-openclaw-74434 | CONFLICTING | DIRTY | SUCCESS:73 SKIPPED:24 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84764](https://github.com/openclaw/openclaw/pull/84764) | fix(minimax): stream music generation responses | automerge-openclaw-openclaw-84561 | CONFLICTING | DIRTY | CANCELLED:19 SKIPPED:110 SUCCESS:72 NEUTRAL:1; blockers:11 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84362](https://github.com/openclaw/openclaw/pull/84362) | fix(doctor): preserve explicit agentRuntime pin during codex model migration [AI-assisted] | automerge-openclaw-openclaw-84142 | CONFLICTING | DIRTY | CANCELLED:4 SKIPPED:47 SUCCESS:80 NEUTRAL:1; blockers:2 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84353](https://github.com/openclaw/openclaw/pull/84353) | fix(agents): abandon hung in-flight write lock on attempt cleanup (#84193) | automerge-openclaw-openclaw-84220 | CONFLICTING | DIRTY | CANCELLED:25 SKIPPED:130 SUCCESS:79 NEUTRAL:1; blockers:12 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#84321](https://github.com/openclaw/openclaw/pull/84321) | fix(embedded-runner): preserve provider errors on cleanup takeover | automerge-openclaw-openclaw-84056 | CONFLICTING | DIRTY | CANCELLED:26 SKIPPED:112 SUCCESS:78 FAILURE:1 NEUTRAL:1; blockers:14 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight, needs_result_backfill | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
