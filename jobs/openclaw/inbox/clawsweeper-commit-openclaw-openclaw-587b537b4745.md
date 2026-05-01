---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-587b537b4745
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-587b537b4745
source: clawsweeper_commit
commit_sha: 587b537b474515d773af8f621087c8fa1c743b12
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/587b537b474515d773af8f621087c8fa1c743b12.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-587b537b4745`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/587b537b474515d773af8f621087c8fa1c743b12
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/587b537b474515d773af8f621087c8fa1c743b12.md
- Latest main at intake: 204ef7f1c45b5377fe272b068fdec15e32789247

## ClawSweeper Report

```md
---
sha: 587b537b474515d773af8f621087c8fa1c743b12
parent: 542821cd1e60e34caec7df84f8583007b5b98f63
repository: openclaw/openclaw
author: "steipete"
committer: "steipete"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-29T15:37:04+01:00"
commit_committed_at: "2026-04-29T15:37:09+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T14:41:58+00:00
---

# Commit 587b537

## Summary

Found one compatibility regression in the published Discord plugin API barrel.

## Findings

### Medium: Discord public API barrel drops existing exports

- Kind: compatibility
- File: `extensions/discord/api.ts`
- Line: 1
- Evidence: The parent `extensions/discord/api.ts` exported many consumer-visible helpers, including `handleDiscordMessageAction`, `parseDiscordComponentCustomIdForCarbon`, `buildDiscordInteractiveComponents`, exec-approval helpers, probe helpers, target parsers, and timeout constants. The new file only exports a small subset. Repo docs describe plugin `api.ts` as “Public exports for external consumers” (`docs/plugins/sdk-overview.md:333`, `docs/plugins/sdk-channel-plugins.md:658`), and `extensions/discord/package.json:2` publishes this package as `@openclaw/discord` with no `exports` map restricting `api.js`. A live module check at this commit confirmed `handleDiscordMessageAction`, `parseDiscordComponentCustomIdForCarbon`, and `DISCORD_ATTACHMENT_IDLE_TIMEOUT_MS` are no longer exported while `buildDiscordComponentMessage` remains exported.
- Impact: Existing consumers importing these names from `@openclaw/discord/api.js` or the bundled public facade will fail at TypeScript compile time or ESM link time on upgrade. The removed Carbon parser aliases were explicitly covered by the deleted public API compatibility test in `extensions/discord/src/client.test.ts`.
- Suggested fix: Restore the removed exports from `api.ts` as deprecated compatibility re-exports, or make this an explicit versioned breaking change with migration docs and a package export/contract update. At minimum, keep the legacy Carbon aliases and other previously public helpers until a declared removal window.
- Confidence: high

## Reviewed

- Diff: `542821cd1e60e34caec7df84f8583007b5b98f63..587b537b474515d773af8f621087c8fa1c743b12`
- Changed files: all 11 files in the prompt
- Code read: Discord component handlers/modal/policy/wildcard controls, gateway plugin, public API barrel, component custom-id exports, package metadata, plugin SDK Discord facade, internal component registry/dispatch, relevant docs
- GitHub: checked associated PRs for the commit; none returned

## Tests / Live Checks

- `pnpm docs:list` passed
- `git diff --check 542821cd1e60e34caec7df84f8583007b5b98f63..587b537b474515d773af8f621087c8fa1c743b12` passed
- Initial focused `pnpm test ...` failed because `node_modules` was missing; ran `pnpm install` once, then retried
- `pnpm test extensions/discord/src/monitor/agent-components.wildcard.test.ts extensions/discord/src/monitor/gateway-plugin.test.ts extensions/discord/src/client.test.ts src/plugin-sdk/discord.test.ts` passed
- `pnpm test extensions/discord/src/monitor/monitor.test.ts extensions/discord/src/monitor/agent-components.wildcard.test.ts extensions/discord/src/shared-interactive.test.ts extensions/discord/src/actions/handle-action.test.ts extensions/discord/src/channel-actions.test.ts extensions/discord/src/exec-approvals.test.ts` passed
- Live import check confirmed removed API exports are absent

## Dependency / Web Checks

- No dependency files changed; no external web lookup needed.

## Limitations

- Did not run the full changed gate or live Discord gateway. The finding is based on source, docs, package metadata, and a direct module export check.
```
