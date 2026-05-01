---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-b85147ff7615
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-b85147ff7615
source: clawsweeper_commit
commit_sha: b85147ff76158c62ad746afd6bb296c94c145653
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/b85147ff76158c62ad746afd6bb296c94c145653.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-b85147ff7615`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/b85147ff76158c62ad746afd6bb296c94c145653
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/b85147ff76158c62ad746afd6bb296c94c145653.md
- Latest main at intake: 46888f5afbe9132608d990a2ef18e2014a9edff8

## ClawSweeper Report

```md
---
sha: b85147ff76158c62ad746afd6bb296c94c145653
parent: b743506549d62f42dfa627c5d39b0386a807f31f
repository: openclaw/openclaw
author: "marchpure"
committer: "web-flow"
github_author: marchpure
github_committer: web-flow
co_authors: ["haoxingjun"]
commit_authored_at: "2026-04-30T23:05:31+08:00"
commit_committed_at: "2026-04-30T23:05:31+08:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T15:25:42+00:00
---

# Commit b85147ff76

## Summary

Found one mid-turn retry regression in the new opt-in compaction precheck path.

## Findings

### Medium: Mid-turn recovery retries by submitting the original user prompt again

- Kind: regression
- File: `src/agents/pi-embedded-runner/run/attempt.ts`
- Line: 2392
- Evidence: mid-turn `truncate_tool_results_only` marks `preflightRecovery.handled: true`, and compact routes set `promptErrorSource: "precheck"`. The outer runner treats these like turn-start preflight recovery and `continue`s to retry the same prompt. In the dependency source, Pi emits and persists the user message before the first model call, and by the mid-turn signal the assistant tool call and tool result have also already been appended. Retrying with `activeSession.prompt(promptSubmission.prompt)` therefore adds the same user request again after the tool result instead of continuing from the existing tool-result context.
- Impact: with `agents.defaults.compaction.midTurnPrecheck.enabled: true`, a tool-heavy turn that trips this guard can resume with a duplicated user prompt. That can confuse the model, cause repeated tool work, or change task semantics after recovery.
- Suggested fix: distinguish mid-turn precheck recovery from turn-start preflight recovery. After truncation or compaction, retry via a continuation path from the current transcript/tool result, or suppress/rewrite the original prompt on the retry so it is not appended a second time.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes. Enable `agents.defaults.compaction.midTurnPrecheck.enabled`, trigger a tool result that routes to mid-turn truncation or compaction, then inspect the retried transcript: the original user prompt is already present before the tool result, and the retry path submits it again.
- Is this the best way to solve the issue? Unclear. The safe direction is to add explicit mid-turn retry semantics, but the exact API should match Pi’s session continuation support and OpenClaw’s existing compaction retry loop.

## Reviewed

- Diff: `b743506549d62f42dfa627c5d39b0386a807f31f..b85147ff76158c62ad746afd6bb296c94c145653`
- Changed files: docs, compaction config schema/help, Pi attempt runner, mid-turn precheck helper, tool-result context guard, and related tests.
- Code read: changed runner/guard/config files, retry caller in `src/agents/pi-embedded-runner/run.ts`, relevant Pi dependency source for `transformContext`, prompt events, and session persistence.
- Dependencies/web: inspected installed `@mariozechner/pi-agent-core` and `@mariozechner/pi-coding-agent` 0.70.6 local source; no external web facts needed.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `node scripts/test-projects.mjs src/agents/pi-embedded-runner/tool-result-context-guard.test.ts src/agents/pi-embedded-runner/run/attempt.spawn-workspace.context-engine.test.ts src/config/config.compaction-settings.test.ts src/config/zod-schema.agent-defaults.test.ts src/config/schema.help.quality.test.ts` passed.
- `git diff --check b743506549d62f42dfa627c5d39b0386a807f31f..b85147ff76158c62ad746afd6bb296c94c145653` passed.

## Limitations

- I did not run a live model/tool-loop reproduction; the finding is based on the local runner control flow plus dependency event/persistence behavior.

https://github.com/openclaw/openclaw/pull/73499
```
