# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-02T21:25:06.054Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 6 |
| ready_candidates | 0 |
| security_hold | 1 |
| needs_rebase | 4 |
| mergeability_unknown | 0 |
| needs_checks | 2 |
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
| [#76183](https://github.com/openclaw/openclaw/pull/76183) | fix(active-memory): fast-fail stalled recall paths | automerge-openclaw-openclaw-75761 | MERGEABLE | CLEAN | CANCELLED:4 SKIPPED:13 SUCCESS:72 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
| [#75469](https://github.com/openclaw/openclaw/pull/75469) | fix: same-session inferred commitments can be starved indefinitely when a normal HEARTBEAT.md... | clawsweeper-commit-openclaw-openclaw-955a0e9c0f7d | CONFLICTING | DIRTY | SUCCESS:76 SKIPPED:9 FAILURE:1 NEUTRAL:1; blockers:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-fast-protocol:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75464](https://github.com/openclaw/openclaw/pull/75464) | fix: RTT wrapper actionable issues | clawsweeper-commit-openclaw-openclaw-e8810c04a46b | CONFLICTING | DIRTY | CANCELLED:1 SKIPPED:5 SUCCESS:4 | security_hold, needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | route to central security triage |
| [#75463](https://github.com/openclaw/openclaw/pull/75463) | fix: edge case in the new prefixed-alias cache behavior | clawsweeper-commit-openclaw-openclaw-173f959613b3 | CONFLICTING | DIRTY | SUCCESS:68 SKIPPED:22 FAILURE:5 NEUTRAL:1; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-agentic-cli:FAILURE; CI / check-additional-boundaries:FAILURE; CI / checks-node-core-support-boundary:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75403](https://github.com/openclaw/openclaw/pull/75403) | fix: making typing start fire-and-forget allows cleanup/idle to run before a persistent typin... | clawsweeper-commit-openclaw-openclaw-45b86450795d | CONFLICTING | DIRTY | SUCCESS:79 SKIPPED:22 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75397](https://github.com/openclaw/openclaw/pull/75397) | fix: targeted hook resolution/cache path provider-runtime regressions | clawsweeper-commit-openclaw-openclaw-354084b1b320 | MERGEABLE | CLEAN | CANCELLED:1 SKIPPED:24 SUCCESS:79 NEUTRAL:1 | needs_merge_preflight | backfill merge preflight: security cleared, comments resolved, Codex /review passed, validation recorded |
