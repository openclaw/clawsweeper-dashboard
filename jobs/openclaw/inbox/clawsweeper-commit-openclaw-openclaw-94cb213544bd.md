---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-94cb213544bd
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-94cb213544bd
source: clawsweeper_commit
commit_sha: 94cb213544bd5bb4766ed2de2ff26ff2311d09f1
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/94cb213544bd5bb4766ed2de2ff26ff2311d09f1.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-94cb213544bd`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/94cb213544bd5bb4766ed2de2ff26ff2311d09f1
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/94cb213544bd5bb4766ed2de2ff26ff2311d09f1.md
- Latest main at intake: d80a8eb3adb6b26fb345fdc7b658dbd39f085e35

## ClawSweeper Report

```md
---
sha: 94cb213544bd5bb4766ed2de2ff26ff2311d09f1
parent: 1f1f70a23f86a6c40290005030f83eeda571c88d
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T04:55:17+01:00"
commit_committed_at: "2026-04-30T04:55:23+01:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T04:00:16Z
---

# Commit 94cb213

## Summary

Found one likely packaged-install regression in the new unconditional runtime-deps install opt-out for capability-provider fallback loads.

## Findings

### Medium: Local capability provider discovery can skip required bundled runtime deps

- Kind: regression
- File: `src/plugins/capability-provider-runtime.ts`
- Line: 229
- Evidence: Both fallback paths now call `resolveRuntimePluginRegistry(...)` with `installBundledRuntimeDeps: false` (`src/plugins/capability-provider-runtime.ts:229`, `src/plugins/capability-provider-runtime.ts:277`). These helpers are used by local capability surfaces such as `infer tts providers`, which default to local execution and call `listSpeechProviders(cfg)` without first preloading plugins (`src/cli/capability-cli.ts:1284`, `src/cli/capability-cli.ts:1933`). For bundled providers with package-local dependencies, the loader only stages those dependencies when `shouldInstallBundledRuntimeDeps` is true (`src/plugins/loader.ts:1461`). A concrete affected bundled provider is Microsoft speech: its plugin declares `node-edge-tts` as a package-local dependency (`extensions/microsoft/package.json:7`) and statically imports it at module load (`extensions/microsoft/speech-provider.ts:7`).
- Impact: In packaged installs where extension dependencies are not already present in root `node_modules`, local capability discovery can fail to load providers that previously auto-staged their runtime deps, so commands like local TTS provider listing/selection may silently omit Microsoft or other bundled capability providers with staged deps. Dev checkout tests can miss this because root `node_modules` contains workspace dependencies after `pnpm install`.
- Suggested fix: Keep `installBundledRuntimeDeps: false` only for the release-validation/snapshot path that needs to avoid installs, or add an explicit caller option and leave runtime/user-facing capability discovery on the default install path. Alternatively preload the plugin registry for local capability CLI commands before provider discovery.
- Confidence: medium

## Reviewed

- Diff: `1f1f70a23f86a6c40290005030f83eeda571c88d..94cb213544bd5bb4766ed2de2ff26ff2311d09f1`
- Changed files: `extensions/mattermost/src/mattermost/monitor.inbound-system-event.test.ts`, `src/plugins/bundled-runtime-deps-materialization.ts`, `src/plugins/bundled-runtime-deps.test.ts`, `src/plugins/capability-provider-runtime.test.ts`, `src/plugins/capability-provider-runtime.ts`
- Code read: touched files in full, plugin loader runtime-deps path, capability CLI provider paths, bundled provider package manifests, Microsoft/Google provider imports, plugin scoped AGENTS, relevant plugin docs.
- Dependencies/web: inspected local manifests only; no dependency versions changed, so no external web lookup was needed.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm test src/plugins/capability-provider-runtime.test.ts src/plugins/bundled-runtime-deps.test.ts extensions/mattermost/src/mattermost/monitor.inbound-system-event.test.ts`
- `pnpm test src/cli/capability-cli.test.ts src/plugins/loader.runtime-registry.test.ts`
- `git diff --check 1f1f70a23f86a6c40290005030f83eeda571c88d..94cb213544bd5bb4766ed2de2ff26ff2311d09f1`

## Limitations

- I did not run a packaged-install smoke with root dependencies absent; the finding is based on code-path evidence and local package manifests.
```
