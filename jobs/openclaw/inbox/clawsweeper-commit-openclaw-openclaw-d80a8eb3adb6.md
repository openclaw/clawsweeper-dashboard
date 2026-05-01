---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-d80a8eb3adb6
mode: autonomous
allowed_actions:
  - comment
  - label
  - fix
  - raise_pr
blocked_actions:
  - close
  - merge
require_human_for:
  - close
  - merge
canonical: []
candidates: []
cluster_refs: []
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: false
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-d80a8eb3adb6
source: clawsweeper_commit
commit_sha: d80a8eb3adb6b26fb345fdc7b658dbd39f085e35
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/d80a8eb3adb6b26fb345fdc7b658dbd39f085e35.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-d80a8eb3adb6`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/d80a8eb3adb6b26fb345fdc7b658dbd39f085e35
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/d80a8eb3adb6b26fb345fdc7b658dbd39f085e35.md
- Latest main at intake: 0603c2327d3e09540b4488596aa3062c6acfc550

## ClawSweeper Report

```md
---
sha: d80a8eb3adb6b26fb345fdc7b658dbd39f085e35
parent: bb449092626193dae04e91f9124caaf821caec1f
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T04:57:45+01:00"
commit_committed_at: "2026-04-30T04:58:05+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T04:02:53+00:00
---

# Commit d80a8eb3ad

## Summary

Found one regression/data-loss edge case in the new metadata-only assistant drop path.

## Findings

### Medium: Dropping metadata-only assistant turns can erase adjacent string user prompts during Anthropic replay validation

- Kind: regression
- File: `src/agents/pi-embedded-runner/replay-history.ts`
- Line: 321
- Evidence: The new path returns `null` when an assistant block array becomes empty after `stripInboundMetadata`, so a history like `user("First") -> assistant(metadata-only) -> user("Second")` becomes two adjacent user turns. The next runtime boundary calls `sanitizeSessionHistory` and then `validateReplayTurns` in `src/agents/pi-embedded-runner/run/attempt.ts:1918` and `src/agents/pi-embedded-runner/run/attempt.ts:1933`. For Anthropic replay, `mergeConsecutiveUserTurns` only preserves array content and drops string content via `Array.isArray(...) ? ... : []` in `src/agents/pi-embedded-helpers/turns.ts:352`. A focused probe reproduced this exact loss:
  `normalized [{"role":"user","content":"First","timestamp":1},{"role":"user","content":"Second","timestamp":3}]`
  `validated [{"role":"user","content":[],"timestamp":3}]`
- Impact: Common persisted user messages use string content. After this commit, a metadata-only assistant replay turn between two string user turns can make Anthropic-class replay send an empty user message instead of the actual prior/latest prompts, causing bad replies or provider rejection. The new regression test covers only array-shaped user content at `src/agents/pi-embedded-runner.sanitize-session-history.test.ts:1143`, so it misses this production-shaped case.
- Suggested fix: Preserve string user content when merging consecutive user turns, e.g. normalize strings into `{ type: "text", text }` blocks before concatenation, and add a regression test using string user messages around the dropped metadata-only assistant turn.
- Confidence: high

## Reviewed

- Diff: `bb449092626193dae04e91f9124caaf821caec1f..d80a8eb3adb6b26fb345fdc7b658dbd39f085e35`
- Changed files: `CHANGELOG.md`, `src/agents/pi-embedded-runner/replay-history.ts`, `src/agents/pi-embedded-runner/replay-history.test.ts`, `src/agents/pi-embedded-runner.sanitize-session-history.test.ts`
- Code read: changed files in full, `src/auto-reply/reply/strip-inbound-meta.ts`, `src/agents/pi-embedded-helpers/turns.ts`, `src/agents/pi-embedded-runner/run/attempt.ts`, relevant validator tests
- Issue context: `https://github.com/openclaw/openclaw/issues/74745`

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `OPENCLAW_VITEST_MAX_WORKERS=1 pnpm test src/agents/pi-embedded-runner/replay-history.test.ts src/agents/pi-embedded-runner.sanitize-session-history.test.ts` passed: 67 tests
- `node --import tsx -e ...normalizeAssistantReplayContent + validateAnthropicTurns...` reproduced the string-user content loss
- `git diff --check bb449092626193dae04e91f9124caaf821caec1f d80a8eb3adb6b26fb345fdc7b658dbd39f085e35` passed
- One earlier test attempt failed because I accidentally passed Jest’s `--runInBand`; it was rerun successfully with the repo’s Vitest-compatible worker setting.

## Dependency / Web Checks

- No dependency files changed.
- Used `gh issue view 74745` for the linked bug context; no external web lookup was needed.

## Limitations

- Did not run a live Telegram or Anthropic provider send; the finding is based on source trace plus a focused local replay-normalization probe.
```
