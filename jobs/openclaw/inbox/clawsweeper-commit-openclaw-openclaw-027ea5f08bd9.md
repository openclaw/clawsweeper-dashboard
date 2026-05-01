---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-027ea5f08bd9
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-027ea5f08bd9
source: clawsweeper_commit
commit_sha: 027ea5f08bd9c93b91e4ddc25edc842bab61bbd0
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/027ea5f08bd9c93b91e4ddc25edc842bab61bbd0.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-027ea5f08bd9`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/027ea5f08bd9c93b91e4ddc25edc842bab61bbd0
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/027ea5f08bd9c93b91e4ddc25edc842bab61bbd0.md
- Latest main at intake: bb3a0c954505145e1e0d00dc60f9eb222059dbb7

## ClawSweeper Report

```md
---
sha: 027ea5f08bd9c93b91e4ddc25edc842bab61bbd0
parent: 7d77680d9f4d1c947a1e83f356a28aab2cd50278
repository: openclaw/openclaw
author: "pashpashpash"
committer: "web-flow"
github_author: pashpashpash
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-30T12:49:02-07:00"
commit_committed_at: "2026-05-01T04:49:02+09:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T20:11:41Z
---

# Commit 027ea5f

## Summary

Found one medium-confidence regression in the native `/codex` conversation-control path: the commit isolates Codex app-server `HOME`/`CODEX_HOME` per agent, but `/codex bind` and `/codex resume` still start the app-server without forwarding the configured default OpenAI Codex auth profile.

## Findings

### Medium: `/codex bind` can start a fresh isolated Codex app-server without default auth

- Kind: regression
- File: `extensions/codex/src/conversation-binding.ts`
- Line: 204
- Evidence: `bridgeCodexAppServerStartOptions` now forces stdio app-server state into per-agent `CODEX_HOME` and `HOME` at `extensions/codex/src/app-server/auth-bridge.ts:39` and `extensions/codex/src/app-server/auth-bridge.ts:65`. The auth bridge only logs in from an OpenClaw profile when `authProfileId` is supplied at `extensions/codex/src/app-server/auth-bridge.ts:105`; otherwise it falls back to inherited API-key env. Meanwhile, `/codex bind` calls `startCodexConversationThread` without any auth profile at `extensions/codex/src/command-handlers.ts:338`, and `createThread`/`attachExistingThread` call `getSharedCodexAppServerClient` without `authProfileId` at `extensions/codex/src/conversation-binding.ts:166` and `extensions/codex/src/conversation-binding.ts:204`. The written binding also has no `authProfileId`, so later bound turns cannot recover it.
- Impact: A user with the normal `openai-codex:default` subscription profile but no inherited `CODEX_API_KEY`/`OPENAI_API_KEY` can lose the previously implicit personal Codex CLI login for fresh `/codex bind` or `/codex resume` flows. Before this change, the local app-server could see the operator’s personal `~/.codex` account; after isolation, the fresh per-agent home is empty unless another path has already seeded it.
- Suggested fix: Resolve and forward the selected/default `openai-codex` auth profile through the conversation binding/control paths, then persist it in the binding, or make `applyCodexAppServerAuthProfile` apply `openai-codex:default` when no explicit `authProfileId` is passed for local stdio app-server startup.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Unclear without a live Codex subscription account in this review environment. The static path is concrete: configure only `openai-codex:default`, use a fresh isolated agent Codex home, avoid API-key env fallback, then run `/codex bind`; the app-server is started without `authProfileId`.
- Is this the best way to solve the issue? Yes for the fix direction. The safest repair is to use the same default-profile selection already added for embedded Codex harness runs and carry that profile into bind/resume/session-binding state.

## Reviewed

- Diff: `7d77680d9f4d1c947a1e83f356a28aab2cd50278..027ea5f08bd9c93b91e4ddc25edc842bab61bbd0`
- Changed files: 35 files across Codex app-server auth, Codex migration, migrate selection, doctor warnings, docs, and related tests.
- Code read: Codex app-server auth/client/request/config paths, conversation binding/control handlers, embedded runner auth forwarding, migration provider/apply/selection, doctor native asset warning, and changed Slack/Signal tests plus adjacent runtime.
- Dependencies/web: inspected installed `@openai/codex` package metadata locally; no web lookup was needed for the code-level finding.
- Commands: `pnpm docs:list`; `git show`; `git diff`; `gh pr view 74556`; `pnpm install`; targeted `pnpm test ...`; `git diff --check`.

## Tests / Live Checks

- Targeted tests passed: `pnpm test extensions/codex/src/app-server/auth-bridge.test.ts extensions/codex/src/migration/provider.test.ts src/commands/migrate.test.ts src/commands/migrate/selection.test.ts src/commands/doctor/shared/codex-native-assets.test.ts src/agents/command/attempt-execution.cli.test.ts src/agents/pi-embedded-runner/run.overflow-compaction.test.ts extensions/slack/src/monitor/message-handler/prepare.test.ts extensions/signal/src/monitor.tool-result.sends-tool-summaries-responseprefix.test.ts`
- `git diff --check` passed.
- PR status metadata showed broad CI/security checks green for the reviewed PR.

## Limitations

- I did not run a live Codex app-server auth reproduction because this environment does not provide a live Codex subscription account suitable for the bind/resume workflow.
- The installed `@openai/codex` npm package exposes a native wrapper/binary, not app-server source, so external app-server auth behavior was inferred from OpenClaw’s request flow.

https://github.com/openclaw/openclaw/pull/74556
```
