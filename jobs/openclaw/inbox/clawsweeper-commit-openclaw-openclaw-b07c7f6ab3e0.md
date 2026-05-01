---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-b07c7f6ab3e0
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-b07c7f6ab3e0
source: clawsweeper_commit
commit_sha: b07c7f6ab3e0b09e09f1152ba7ece715c094da8c
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/b07c7f6ab3e0b09e09f1152ba7ece715c094da8c.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-b07c7f6ab3e0`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/b07c7f6ab3e0b09e09f1152ba7ece715c094da8c
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/b07c7f6ab3e0b09e09f1152ba7ece715c094da8c.md
- Latest main at intake: a6390efeba3ce19869c0d2d2eb53be2aa3092ae3

## ClawSweeper Report

```md
---
sha: b07c7f6ab3e0b09e09f1152ba7ece715c094da8c
parent: b7dd9125415d7a581a314525b21ce0c6001b159c
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T03:36:38+01:00"
commit_committed_at: "2026-04-30T03:36:58+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T02:41:38Z
---

# Commit b07c7f6

## Summary

Found one low-severity behavior bug: the commit exposes `max` in the Bedrock Opus 4.7 thinking profile, but the current runtime path downgrades `max` to `xhigh` before the Bedrock payload is built.

## Findings

### Low: Bedrock `/think max` is advertised but sent as `xhigh`

- Kind: bug
- File: `extensions/amazon-bedrock/register.sync.runtime.ts`
- Line: 317
- Evidence: The new Opus 4.7 Bedrock profile includes `{ id: "max" }`. The active Pi runner maps OpenClaw `max` to Pi `xhigh` in `src/agents/pi-embedded-runner/utils.ts:9`, and the locked `@mariozechner/pi-ai@0.70.6` Bedrock provider maps `xhigh` on Opus 4.7 to `output_config.effort: "xhigh"`, not `max`. Anthropic’s docs distinguish `max` and `xhigh`, with `max` available on Opus 4.7 and `xhigh` available on Opus 4.7 as a separate effort level.
- Impact: Users selecting the newly exposed Bedrock `/think max` option for Claude Opus 4.7 do not actually get max effort; they silently get xhigh effort. This makes the new menu/validation surface overstate what the Bedrock runtime will execute.
- Suggested fix: Either do not advertise `max` for Bedrock until the runtime can preserve it, or extend the OpenClaw/Pi Bedrock wrapper path so `max` survives and patches the Bedrock payload to `additionalModelRequestFields.output_config.effort = "max"` for Opus 4.7.
- Confidence: high

## Reviewed

- Diff: `b7dd9125415d7a581a314525b21ce0c6001b159c..b07c7f6ab3e0b09e09f1152ba7ece715c094da8c`
- Changed files: `CHANGELOG.md`, `extensions/amazon-bedrock/index.test.ts`, `extensions/amazon-bedrock/register.sync.runtime.ts`
- Code read: full changed Bedrock registration/test files; Bedrock discovery/docs context; provider thinking contracts; OpenClaw thinking normalization/default/support paths; Pi embedded runner thinking mapping; Anthropic provider profile; locked `@mariozechner/pi-ai@0.70.6` Bedrock/Anthropic package source from npm tarball
- Issue context: `gh issue view 74701`
- Dependencies/web: AWS Bedrock Opus 4.7 model IDs and availability checked against AWS docs; Anthropic Opus 4.7/adaptive thinking/effort behavior checked against Anthropic docs. AWS documents Bedrock model IDs including `anthropic.claude-opus-4-7`, `us.anthropic.claude-opus-4-7`, `eu.anthropic.claude-opus-4-7`, `jp.anthropic.claude-opus-4-7`, `au.anthropic.claude-opus-4-7`, and `global.anthropic.claude-opus-4-7`.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm test extensions/amazon-bedrock/index.test.ts` initially failed because `node_modules` was missing.
- `pnpm install`
- `pnpm test extensions/amazon-bedrock/index.test.ts` passed: 30 tests.
- `git diff --check b7dd9125415d7a581a314525b21ce0c6001b159c..b07c7f6ab3e0b09e09f1152ba7ece715c094da8c` passed.

## Limitations

- No live Bedrock request was run; the finding is based on source-level tracing through OpenClaw and the exact locked pi-ai package.

https://github.com/openclaw/openclaw/issues/74701
```
