---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-db6951088a19
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-db6951088a19
source: clawsweeper_commit
commit_sha: db6951088a196405992a759db91b1da68c5fbb56
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/db6951088a196405992a759db91b1da68c5fbb56.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-db6951088a19`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/db6951088a196405992a759db91b1da68c5fbb56
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/db6951088a196405992a759db91b1da68c5fbb56.md
- Latest main at intake: eb7d89f4b9d5e7de330073ac835006a7b91148ee

## ClawSweeper Report

```md
---
sha: db6951088a196405992a759db91b1da68c5fbb56
parent: dabf76b3defdc55248b4a02044a751e324416e39
repository: openclaw/openclaw
author: "Hemant Sudarshan"
committer: "GitHub"
github_author: HemantSudarshan
github_committer: web-flow
co_authors: ["Peter Steinberger"]
commit_authored_at: "2026-04-30T00:23:43+05:30"
commit_committed_at: "2026-04-29T19:53:43+01:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T18:58:00Z
---

# Commit db69510

## Summary

Found two medium reliability risks in the new uncaught-exception handling. The focused tests added by the commit pass, but the new recovery path is broader than the Telegram failure it is meant to address and is not scoped to the affected Telegram account.

## Findings

### Medium: Process-wide uncaught network suppression can hide non-Telegram failures

- Kind: reliability
- File: `src/infra/unhandled-rejections.ts`
- Line: 357
- Evidence: `isBenignUncaughtExceptionError()` now returns true for any nested uncaught exception whose code/message contains `ECONNREFUSED`, `EHOSTUNREACH`, `ENETUNREACH`, `EAI_AGAIN`, `ENOTFOUND`, `ETIMEDOUT`, or undici connect codes. The CLI/gateway uncaught-exception path then warns and continues.
- Impact: a raw uncaught network exception from any subsystem, plugin, or command is now treated as safe to ignore even when no Telegram handler claims it. That can leave a failed startup/background operation in a broken state while the process keeps running and may exit successfully.
- Suggested fix: keep the process-wide benign set limited to broken output/terminal errors, and route Telegram reachability failures through a scoped registered handler that verifies Telegram polling origin.
- Confidence: medium

### Medium: New Telegram uncaught handler can restart the wrong account

- Kind: reliability
- File: `extensions/telegram/src/monitor.ts`
- Line: 100
- Evidence: each `monitorTelegramProvider()` registers a global uncaught-exception handler, but `handlePollingNetworkFailure()` only checks that the error is a recoverable `getUpdates` polling error and that this monitor has any running `activeRunner`. It does not compare the tagged origin URL/token/account to the current monitor. `isUncaughtExceptionHandled()` stops at the first handler returning true, and Telegram supports concurrent monitors for different bot tokens.
- Impact: with multiple Telegram accounts, a transient uncaught `getUpdates` socket exception for account B can be claimed by account A’s handler first, stopping/restarting account A and suppressing the exception before account B sees it. The affected poller can remain stuck.
- Suggested fix: include account/token scoping in the handler before stopping a runner, for example by comparing the tagged Telegram origin URL against the current bot token or by tagging errors with an account/session id.
- Confidence: medium

## Reviewed

- Diff: `dabf76b3defdc55248b4a02044a751e324416e39..db6951088a196405992a759db91b1da68c5fbb56`
- Changed files: `CHANGELOG.md`, `extensions/telegram/src/monitor.ts`, `extensions/telegram/src/monitor.test.ts`, `src/infra/unhandled-rejections.ts`, `src/infra/unhandled-rejections.test.ts`, `src/cli/run-main.exit.test.ts`
- Code read: Telegram monitor, polling session, network-error tagging/classification, global uncaught/unhandled rejection handlers, CLI/global entry handlers, relevant tests
- GitHub context: issues `#60515`, `#74540`, PR `#74549`
- Docs: `pnpm docs:list`, `docs/channels/telegram.md`, `extensions/AGENTS.md`

## Tests / Live Checks

- `pnpm install` because dependencies were missing
- `pnpm test src/infra/unhandled-rejections.test.ts src/cli/run-main.exit.test.ts extensions/telegram/src/monitor.test.ts -- --reporter=verbose` passed: 3 Vitest shards, 133 tests

## Dependency / Web Checks

- No dependency changes.
- No general web lookup needed; GitHub issue/PR context was inspected with `gh`.

## Limitations

- Did not reproduce a live Telegram outage or multi-account runtime incident; findings are based on code-path analysis and targeted tests.
```
