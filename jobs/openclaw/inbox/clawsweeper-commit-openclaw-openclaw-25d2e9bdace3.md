---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-25d2e9bdace3
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-25d2e9bdace3
source: clawsweeper_commit
commit_sha: 25d2e9bdace380bfd892a1d2914575495b5e59d9
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/25d2e9bdace380bfd892a1d2914575495b5e59d9.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-25d2e9bdace3`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/25d2e9bdace380bfd892a1d2914575495b5e59d9
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/25d2e9bdace380bfd892a1d2914575495b5e59d9.md
- Latest main at intake: a89fe0f5a0ce8b48e3c388aef01da71eafbeca34

## ClawSweeper Report

```md
---
sha: 25d2e9bdace380bfd892a1d2914575495b5e59d9
parent: ffe67e9cdc9e986c0d879bca8a80445877b2bad7
repository: openclaw/openclaw
author: "Luka Dolenc"
committer: "Peter Steinberger"
github_author: DolencLuka
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-26T14:54:40+02:00"
commit_committed_at: "2026-04-30T04:10:54+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T03:15:09Z
---

# Commit 25d2e9bdac

## Summary

Found one attach-only regression: the commit stops the immediate `uninstall` call, but other normal app paths still uninstall launchd while attach-only is enabled.

## Findings

### Medium: attach-only still uninstalls launchd through stop paths

- Kind: regression
- File: `apps/macos/Sources/OpenClaw/GatewayProcessManager.swift`
- Line: 127
- Evidence: `--attach-only` now only writes the disable marker through `GatewayLaunchAgentManager.applyAttachOnlyRuntimeOverride()` (`apps/macos/Sources/OpenClaw/MenuBar.swift:98`, `apps/macos/Sources/OpenClaw/GatewayLaunchAgentManager.swift:27`). However `GatewayProcessManager.stop()` does not check that marker and still calls `GatewayLaunchAgentManager.set(enabled: false, ...)` (`apps/macos/Sources/OpenClaw/GatewayProcessManager.swift:127`). `set(enabled:)` only skips writes for `enabled == true`; the `enabled == false` path always runs `openclaw gateway uninstall` (`apps/macos/Sources/OpenClaw/GatewayLaunchAgentManager.swift:68`, `apps/macos/Sources/OpenClaw/GatewayLaunchAgentManager.swift:85`). Normal app startup calls `ConnectionModeCoordinator.apply(...)` (`apps/macos/Sources/OpenClaw/MenuBar.swift:260`), and that calls `stop()` for unconfigured mode or local mode when paused (`apps/macos/Sources/OpenClaw/ConnectionModeCoordinator.swift:20`, `apps/macos/Sources/OpenClaw/ConnectionModeCoordinator.swift:45`). The menu pause toggle also calls `stop()` outside active local mode (`apps/macos/Sources/OpenClaw/MenuBar.swift:62`).
- Impact: Launching with `--attach-only` while OpenClaw is paused/unconfigured, or toggling OpenClaw inactive after using attach-only, can still remove the existing LaunchAgent. That contradicts the documented/visible attach-only contract: “never install or manage launchd” / “only attach to an already running Gateway.”
- Suggested fix: Make launchd disable/uninstall paths respect `isLaunchAgentWriteDisabled()` too, or add an explicit “force uninstall” path for user-requested launchd removal. Add coverage for `GatewayProcessManager.stop()` and coordinator paused/unconfigured paths with the disable marker set, not only `applyAttachOnlyRuntimeOverride()`.
- Confidence: high

## Reviewed

- Diff: `ffe67e9cdc9e986c0d879bca8a80445877b2bad7..25d2e9bdace380bfd892a1d2914575495b5e59d9`
- Changed files: `apps/macos/Sources/OpenClaw/DebugSettings.swift`, `apps/macos/Sources/OpenClaw/GatewayLaunchAgentManager.swift`, `apps/macos/Sources/OpenClaw/MenuBar.swift`, `apps/macos/Tests/OpenClawIPCTests/GatewayLaunchAgentManagerTests.swift`
- Code read: full changed files; `GatewayProcessManager`, `ConnectionModeCoordinator`, `GatewayAutostartPolicy`, relevant `AppState` and menu startup/pause paths
- Docs read: `docs/platforms/mac/child-process.md`, `docs/platforms/mac/bundled-gateway.md`, `docs/cli/gateway.md`
- Commands: `pnpm docs:list`, `git diff --check`, `rg` call-path searches, `swift test --filter GatewayLaunchAgentManagerTests`

## Tests / Live Checks

- `git diff --check ffe67e9c..25d2e9bd`: passed.
- `swift test --filter GatewayLaunchAgentManagerTests` from `apps/macos`: failed before tests because this Linux container cannot build macOS-only dependencies (`CoreGraphics` unavailable).

## Dependency / Web Checks

- No dependency files changed. No web checks were needed.

## Limitations

- Could not execute the macOS Swift tests in this Linux review environment; finding is based on static call-path evidence.

https://github.com/openclaw/openclaw/commit/25d2e9bdace380bfd892a1d2914575495b5e59d9
```
