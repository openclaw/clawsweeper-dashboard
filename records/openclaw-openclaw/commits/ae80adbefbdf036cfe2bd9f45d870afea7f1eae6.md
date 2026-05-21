---
sha: ae80adbefbdf036cfe2bd9f45d870afea7f1eae6
parent: c9b6a8b408a73ccbee9227ba1094f3b335e24132
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "web-flow"
github_author: clawsweeper[bot]
github_committer: web-flow
co_authors: ["yelog", "clawsweeper", "clawsweeper[bot]", "takhoffman"]
commit_authored_at: "2026-05-21T05:56:41Z"
commit_committed_at: "2026-05-21T05:56:41Z"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-21T06:03:27Z
---

# Commit ae80adbefbdf

## Summary

The retry fix disables Pi SDK auto-retry, but the new setter call also resets previously applied runtime-only compaction overrides. That can make prepared embedded Pi settings fall back to the lower dependency default reserve token budget for callers that use the prepared manager directly.

## Findings

### Medium: Disabling retry drops prepared compaction overrides

- Kind: regression
- File: `src/agents/pi-project-settings.ts`
- Line: 68
- Evidence: `createPreparedEmbeddedPiSettingsManager()` first calls `applyPiCompactionSettingsFromConfig()`, which applies runtime-only compaction overrides with `settingsManager.applyOverrides()` (`src/agents/pi-settings.ts:115`). The new `settingsManager.setRetryEnabled(false)` call then invokes the dependency’s `save()`, and `@earendil-works/pi-coding-agent@0.75.3` recomputes `settings` from global/project settings inside `save()`, discarding any prior `applyOverrides()` values. An isolated dependency check confirmed the behavior: after `applyOverrides({ compaction: { reserveTokens: 20000 } })`, `getCompactionReserveTokens()` returned `20000`; immediately after `setRetryEnabled(false)`, it returned `1000` again while retry became false.
- Impact: OpenClaw’s prepared settings are supposed to enforce the configured/default compaction reserve floor before runtime use. The CLI compaction lifecycle gets this manager and then passes `settingsManager.getCompactionReserveTokens()` into preemptive compaction (`src/agents/command/cli-compaction.ts:227`, `src/agents/command/cli-compaction.ts:243`) without reapplying compaction settings, so this commit can make CLI-turn compaction decisions use stale/lower reserve limits. That can delay or skip compaction and reintroduce context-pressure behavior the reserve floor was meant to avoid.
- Suggested fix: Move `settingsManager.setRetryEnabled(false)` before `applyPiCompactionSettingsFromConfig()`, or reapply compaction settings after the retry setter. Add a focused regression test that `createPreparedEmbeddedPiSettingsManager()` preserves the reserve-token floor after disabling retry.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. The isolated package check against `@earendil-works/pi-coding-agent@0.75.3` reproduced the exact setter/override interaction, and the affected OpenClaw call path reads the prepared manager’s reserve tokens directly.
- Is this the best way to solve the issue? yes. Reordering keeps the intended persistent in-memory retry setting while preserving OpenClaw’s later runtime-only compaction override.

## Reviewed

- Diff: `c9b6a8b408a73ccbee9227ba1094f3b335e24132..ae80adbefbdf036cfe2bd9f45d870afea7f1eae6`
- Changed files: `CHANGELOG.md`, `src/agents/pi-project-settings.ts`, `src/agents/pi-project-settings.test.ts`
- Code read: `src/agents/pi-project-settings.ts`, `src/agents/pi-project-settings.test.ts`, `src/agents/pi-settings.ts`, `src/agents/command/cli-compaction.ts`, `src/agents/pi-embedded-runner/run/attempt.ts`, `src/agents/pi-embedded-runner/compact.ts`, `src/agents/pi-embedded-runner/resource-loader.ts`
- Dependencies/web: inspected npm metadata and packed source for `@earendil-works/pi-coding-agent@0.75.3`; inspected live GitHub issue #73781 and PRs #74434/#84798 with `gh`.

## Tests / Live Checks

- `git diff --check c9b6a8b408a73ccbee9227ba1094f3b335e24132..ae80adbefbdf036cfe2bd9f45d870afea7f1eae6` passed.
- Isolated dependency check: `applyOverrides()` reserve token override was reset by `setRetryEnabled(false)`.
- Repo tests were not run because the checkout does not have repo dependencies installed; the focused issue was proven with dependency source and an isolated install.

## Limitations

- No live Feishu/Qwen replay-loop scenario was run.
- I did not run the full project test suite.
