# Open ClawSweeper Repair PR Finalizer

Generated: 2026-05-02T07:07:28.072Z

## Summary

| Metric | Count |
| --- | ---: |
| open_prs | 9 |
| ready_candidates | 0 |
| security_hold | 1 |
| needs_rebase | 7 |
| mergeability_unknown | 0 |
| needs_checks | 4 |
| needs_review | 0 |
| needs_merge_preflight | 9 |
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
| [#75941](https://github.com/openclaw/openclaw/pull/75941) | fix(mcp): normalize empty parameter-free tool schema before sending to OpenAI (#75362) | automerge-openclaw-openclaw-75401 | CONFLICTING | DIRTY | CANCELLED:1 SKIPPED:12 SUCCESS:71 FAILURE:6 NEUTRAL:1; blockers:6 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / check-lint:FAILURE; CI / check-dependencies:FAILURE; CI / check-test-types:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75469](https://github.com/openclaw/openclaw/pull/75469) | fix: same-session inferred commitments can be starved indefinitely when a normal HEARTBEAT.md... | clawsweeper-commit-openclaw-openclaw-955a0e9c0f7d | MERGEABLE | UNSTABLE | SUCCESS:76 SKIPPED:9 FAILURE:1 NEUTRAL:1; blockers:1 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-fast-protocol:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#75464](https://github.com/openclaw/openclaw/pull/75464) | fix: RTT wrapper actionable issues | clawsweeper-commit-openclaw-openclaw-e8810c04a46b | CONFLICTING | DIRTY | CANCELLED:1 SKIPPED:5 SUCCESS:4 | security_hold, needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | route to central security triage |
| [#75463](https://github.com/openclaw/openclaw/pull/75463) | fix: edge case in the new prefixed-alias cache behavior | clawsweeper-commit-openclaw-openclaw-173f959613b3 | CONFLICTING | DIRTY | SUCCESS:68 SKIPPED:22 FAILURE:5 NEUTRAL:1; blockers:5 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_checks:CI / checks-node-agentic-cli:FAILURE; CI / check-additional-boundaries:FAILURE; CI / checks-node-core-support-boundary:FAILURE, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75403](https://github.com/openclaw/openclaw/pull/75403) | fix: making typing start fire-and-forget allows cleanup/idle to run before a persistent typin... | clawsweeper-commit-openclaw-openclaw-45b86450795d | CONFLICTING | DIRTY | SUCCESS:79 SKIPPED:22 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75397](https://github.com/openclaw/openclaw/pull/75397) | fix: targeted hook resolution/cache path provider-runtime regressions | clawsweeper-commit-openclaw-openclaw-354084b1b320 | CONFLICTING | DIRTY | SUCCESS:79 SKIPPED:22 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75388](https://github.com/openclaw/openclaw/pull/75388) | fix: commit removes the runtime warning for the default group/channel private-reply behavior... | clawsweeper-commit-openclaw-openclaw-8989ceee50ab | CONFLICTING | DIRTY | SUCCESS:77 SKIPPED:9 NEUTRAL:1 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
| [#75315](https://github.com/openclaw/openclaw/pull/75315) | fix: Windows stale-import guard still generates an invalid PowerShell regex, so the intended... | clawsweeper-commit-openclaw-openclaw-52bf20b07d6e | MERGEABLE | UNSTABLE | CANCELLED:3 SKIPPED:13 SUCCESS:65 FAILURE:2; blockers:2 | needs_merge_state:UNSTABLE, needs_checks:CI / checks-node-core-runtime-infra:FAILURE; CI / checks-node-core:FAILURE, needs_merge_preflight | repair failing checks or document unrelated main flake with touched-surface proof |
| [#75293](https://github.com/openclaw/openclaw/pull/75293) | fix: macOS-only Parallels smoke harness regression | clawsweeper-commit-openclaw-openclaw-af5a1fbddb14 | CONFLICTING | DIRTY | CANCELLED:3 SKIPPED:13 SUCCESS:67 | needs_rebase:CONFLICTING, needs_merge_state:DIRTY, needs_merge_preflight | resume branch, rebase onto current main, repair conflicts, run changed checks, rerun review |
