# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-28T17:04:56.624Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 3 |
| ready_candidates | 0 |
| security_hold | 0 |
| needs_rebase | 0 |
| mergeability_unknown | 0 |
| needs_checks | 2 |
| needs_review | 0 |
| needs_merge_preflight | 3 |
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
| [#87706](https://github.com/openclaw/openclaw/pull/87706) | fix(native-hook-relay): prune stale bridge files on registration | automerge-openclaw-openclaw-87563 | MERGEABLE | CLEAN | SUCCESS:74 SKIPPED:25 NEUTRAL:1 | needs_merge_preflight, needs_result_backfill | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#87550](https://github.com/openclaw/openclaw/pull/87550) | fix(diagnostics): clear stale session activity | automerge-openclaw-openclaw-87374 | MERGEABLE | UNSTABLE | CANCELLED:4 SKIPPED:38 SUCCESS:76 FAILURE:1 NEUTRAL:1; blockers:3 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; CI / checks-node-agentic-control-plane-runtime:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#87423](https://github.com/openclaw/openclaw/pull/87423) | fix(tui): force repaint final chat events | automerge-openclaw-openclaw-87348 | MERGEABLE | UNSTABLE | CANCELLED:11 SKIPPED:86 SUCCESS:75 FAILURE:2 NEUTRAL:1; blockers:7 | needs_merge_state:UNSTABLE, needs_checks:Real behavior proof:CANCELLED; Real behavior proof:CANCELLED; Real behavior proof:CANCELLED, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
