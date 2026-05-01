---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-581fbea1d653
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-581fbea1d653
source: clawsweeper_commit
commit_sha: 581fbea1d65355917886babffe4161f8b3178a12
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/581fbea1d65355917886babffe4161f8b3178a12.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-581fbea1d653`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/581fbea1d65355917886babffe4161f8b3178a12
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/581fbea1d65355917886babffe4161f8b3178a12.md
- Latest main at intake: 581fbea1d65355917886babffe4161f8b3178a12

## ClawSweeper Report

```md
---
sha: 581fbea1d65355917886babffe4161f8b3178a12
parent: 54e6e3d7daf5d0d857edf756b35628a29d11c7f5
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T19:38:18+01:00"
commit_committed_at: "2026-04-30T19:38:18+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T18:58:16Z
---

# Commit 581fbea

## Summary

Found one regression in the CLI auth status/probe path. The commit intentionally makes unscoped external CLI discovery skip missing runtime-only profiles, but `models status` and `models status --probe` still load the auth store without passing the providers they are about to report or probe.

## Findings

### Medium: `models status --probe` misses CLI-only credentials after scoped discovery

- Kind: regression
- File: `src/commands/models/list.probe.ts`
- Line: 259
- Evidence: `src/agents/auth-profiles/external-cli-sync.ts:210` now returns false for unscoped missing external CLI profiles unless a matching stored OAuth profile already exists. `buildProbeTargets` still calls `ensureAuthProfileStore(agentDir)` without `allowKeychainPrompt: false`, `externalCliProviderIds`, or `externalCliProfileIds`, even though the function receives the exact `providers` and probe profile filters at `src/commands/models/list.probe.ts:254-256`. A focused smoke with a temporary Codex CLI auth file confirmed `resolveExternalCliAuthProfiles(emptyStore)` returns `[]`, while `resolveExternalCliAuthProfiles(emptyStore, { providerIds: ["openai-codex"] })` returns `["openai-codex:default"]`.
- Impact: A user who only has file-backed Codex/Claude/Minimax CLI credentials and no persisted OpenClaw auth profile can resolve runtime auth through the newly scoped model-auth path, but `openclaw models status --probe` will build no profile target for that same credential. This produces false “nothing to probe” or missing-auth diagnostics for the provider most likely being checked.
- Suggested fix: In `buildProbeTargets`, load the store with a scope derived from the requested probe surface, for example `ensureAuthProfileStore(agentDir, { allowKeychainPrompt: false, config: cfg, externalCliProviderIds: providers, externalCliProfileIds: options.profileIds })`. The plain status path at `src/commands/models/list.status-command.ts:223` should likewise pass the config-derived external CLI scope, matching `src/gateway/server-methods/models-auth-status.ts:296-301`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. With a temporary Codex CLI `auth.json`, the scoped external CLI resolver returns `openai-codex:default`, while the unscoped resolver returns no profile. `buildProbeTargets` currently uses the unscoped store despite receiving `providers`.
- Is this the best way to solve the issue? yes. The commit’s intended safety boundary is provider/profile scoping, so the status/probe callers should pass the already-known provider/profile scope instead of restoring broad scanning.

## Reviewed

- Diff: `54e6e3d7daf5d0d857edf756b35628a29d11c7f5..581fbea1d65355917886babffe4161f8b3178a12`
- Changed files: `src/agents/auth-profiles.external-cli-scope.test.ts`, `src/agents/auth-profiles.external-cli-sync.test.ts`, `src/agents/auth-profiles/external-cli-scope.ts`, `src/agents/auth-profiles/external-cli-sync.ts`, `src/agents/model-auth.profiles.test.ts`, `src/agents/model-auth.ts`
- Code read: changed files, auth store overlay path, external auth overlay, auth profile order, CLI model status/probe callers, gateway auth-status caller
- Dependencies/web: no dependency changes; no web lookup needed

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install --frozen-lockfile`
- Focused external CLI resolver smoke with temporary Codex CLI auth file
- `pnpm test src/agents/auth-profiles.external-cli-sync.test.ts src/agents/auth-profiles.external-cli-scope.test.ts src/agents/model-auth.profiles.test.ts src/commands/models/list.probe.targets.test.ts`
- `git diff --check 54e6e3d7daf5d0d857edf756b35628a29d11c7f5..581fbea1d65355917886babffe4161f8b3178a12`

## Limitations

- I did not run a full `models status --probe` live provider call, because the actionable regression is in target construction before network probing.
```
