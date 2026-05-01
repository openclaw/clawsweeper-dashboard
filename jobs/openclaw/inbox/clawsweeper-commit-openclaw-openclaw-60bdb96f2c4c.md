---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-60bdb96f2c4c
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-60bdb96f2c4c
source: clawsweeper_commit
commit_sha: 60bdb96f2c4c8e4ab218687af48ffa6f9d9a9332
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/60bdb96f2c4c8e4ab218687af48ffa6f9d9a9332.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-60bdb96f2c4c`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/60bdb96f2c4c8e4ab218687af48ffa6f9d9a9332
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/60bdb96f2c4c8e4ab218687af48ffa6f9d9a9332.md
- Latest main at intake: 8093ae60292f4d9009b3d48f234b39b5cbc538e5

## ClawSweeper Report

```md
---
sha: 60bdb96f2c4c8e4ab218687af48ffa6f9d9a9332
parent: e0fe02fb0970bcffe8b89454f4c79d2a015bcc2b
repository: openclaw/openclaw
author: "Ayaan Zaidi"
committer: "Ayaan Zaidi"
github_author: obviyus
github_committer: obviyus
co_authors: []
commit_authored_at: "2026-05-01T08:23:33+05:30"
commit_committed_at: "2026-05-01T08:33:02+05:30"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T03:23:42+00:00
---

# Commit 60bdb96

## Summary

Found one regression in the new media-generation tool availability gate.

## Findings

### Medium: Configured local/non-auth media providers no longer expose generation tools

- Kind: regression
- File: `src/agents/tools/media-tool-shared.ts`
- Line: 289
- Evidence: `hasGenerationToolAvailability` now returns true only for explicit model config or bundled manifest provider ids with `hasAuthForProvider(...)`. The previous create path used `resolveCapabilityModelConfigForTool`, which evaluates each provider’s `isConfigured` callback. That matters for bundled Comfy: `extensions/comfy/workflow-runtime.ts:590` returns configured for local workflows when `workflow`/`workflowPath` and `promptNodeId` are set, with no API key required. Comfy declares image/music/video generation contracts in `extensions/comfy/openclaw.plugin.json:28`, but without `COMFY_API_KEY` the new gate returns false, so `createImageGenerateTool`, `createMusicGenerateTool`, and `createVideoGenerateTool` return `null` before the real provider readiness check can run.
- Impact: Users with a valid local Comfy workflow config lose `image_generate`, `music_generate`, and `video_generate` unless they also add an unrelated API key or explicit `agents.defaults.*GenerationModel`. The same pattern can hide active third-party generation providers that rely on provider `isConfigured` rather than core env/auth profiles.
- Suggested fix: Make the cheap availability gate no stricter than model resolution. At minimum, include active runtime providers and evaluate their `isConfigured` callbacks. For bundled providers that can be configured without API-key auth, add a lightweight manifest/config readiness path or fall back to the existing resolver when relevant provider config is present.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Configure `plugins.entries.comfy.config` with local `workflow` or `workflowPath` plus `promptNodeId`, leave `COMFY_API_KEY`/`COMFY_CLOUD_API_KEY` unset, and call a media generation tool factory. Current code returns `null` at `hasGenerationToolAvailability`; the full resolver would consider Comfy configured through `isComfyCapabilityConfigured`.
- Is this the best way to solve the issue? unclear. The fix should preserve deferred provider discovery, but the availability predicate needs a generic way to honor provider-owned readiness without reducing the contract to env/auth presence.

## Reviewed

- Diff: `e0fe02fb0970bcffe8b89454f4c79d2a015bcc2b..60bdb96f2c4c8e4ab218687af48ffa6f9d9a9332`
- Changed files: `src/agents/tools/image-generate-tool.ts`, `src/agents/tools/music-generate-tool.ts`, `src/agents/tools/video-generate-tool.ts`, `src/agents/tools/media-tool-shared.ts`, `src/plugins/capability-provider-runtime.ts`, related tests.
- Code read: touched files, provider registry/runtime paths, Comfy provider readiness, plugin capability resolution.
- Dependencies/web: none; no dependency changes or external facts needed.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because `node_modules` was missing.
- `pnpm test src/agents/tools/image-generate-tool.test.ts src/agents/tools/video-generate-tool.test.ts src/agents/tools/music-generate-tool.test.ts src/plugins/capability-provider-runtime.test.ts` passed.
- Attempted inline `tsx` smoke; blocked by `@mariozechner/pi-ai` package subpath export resolution under the ad hoc runner, so it was not used as proof.

## Limitations

- Did not run full `pnpm check:changed`; the focused tests passed, and the finding is based on direct code-path evidence.
```
