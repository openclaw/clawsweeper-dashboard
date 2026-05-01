---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-1ff1fbe6824b
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-1ff1fbe6824b
source: clawsweeper_commit
commit_sha: 1ff1fbe6824b41f331a87361263ef69fbfbf7c25
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/1ff1fbe6824b41f331a87361263ef69fbfbf7c25.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-1ff1fbe6824b`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/1ff1fbe6824b41f331a87361263ef69fbfbf7c25
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/1ff1fbe6824b41f331a87361263ef69fbfbf7c25.md
- Latest main at intake: c500b26bb6a3127a8feb63a19fd4a36475150771

## ClawSweeper Report

```md
---
sha: 1ff1fbe6824b41f331a87361263ef69fbfbf7c25
parent: 44296fcd2b28be97326b2abd31739b2caad418c3
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "GitHub"
github_author: clawsweeper[bot]
github_committer: web-flow
co_authors: ["openclaw-clawsweeper[bot]"]
commit_authored_at: "2026-04-29T22:28:15-07:00"
commit_committed_at: "2026-04-29T22:28:15-07:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T05:47:55Z
---

# Commit 1ff1fbe

## Summary

Found one actionable regression. The commit lets capability fallback snapshots install bundled runtime dependencies by default, but that path can first convert `plugins.enabled: false` into `plugins.enabled: true`, bypassing the documented global plugin-disable contract.

## Findings

### Medium: Capability fallback can repair and load bundled plugin deps despite `plugins.enabled: false`

- Kind: regression
- File: `src/plugins/capability-provider-runtime.ts`
- Line: 93
- Evidence: `createCapabilityProviderFallbackLoadOptions` now omits `installBundledRuntimeDeps` unless the caller passes `false` (`src/plugins/capability-provider-runtime.ts:93-100`). The fallback path builds a compat config before loading (`src/plugins/capability-provider-runtime.ts:239-249`, `src/plugins/capability-provider-runtime.ts:284-294`), and `withBundledPluginEnablementCompat` explicitly changes `plugins.enabled: false` to `plugins.enabled: true` for bundled compat loads (`src/plugins/bundled-compat.ts:41`, `src/plugins/bundled-compat.ts:63`). The loader defaults omitted `installBundledRuntimeDeps` to install (`src/plugins/loader.ts:794`) and stages deps for enabled bundled plugins (`src/plugins/loader.ts:1465-1493`). This conflicts with docs saying `plugins.enabled: false` disables all plugin discovery/load work and prevents automatic bundled runtime-dependency repair (`docs/tools/plugin.md:88-90`, `docs/tools/plugin.md:280`).
- Impact: Commands or runtime surfaces that list/resolve capability providers with a config where plugins are globally disabled can unexpectedly run bundled dependency repair and load provider plugin code. That is a side-effect regression and can trigger network/package-manager work in a configuration intended to keep plugins inert.
- Suggested fix: Keep the fallback default as `installBundledRuntimeDeps: false` when the original config has `plugins.enabled: false`, or make `withBundledPluginEnablementCompat` preserve an explicit global disable for dependency repair while still allowing any intended metadata-only compatibility behavior.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A focused `tsx` smoke using the same compat config/load path started from `{ plugins: { enabled: false } }`, observed compat changing it to `true`, and recorded a bundled runtime dependency installer call for `definitely-missing-openclaw-runtime-review@1.0.0`; the fixture plugin then loaded.
- Is this the best way to solve the issue? yes, directionally. The safer fix is to preserve the explicit opt-out for dependency installation on compat fallback paths where the original config globally disabled plugins.

## Reviewed

- Diff: `44296fcd2b28be97326b2abd31739b2caad418c3..1ff1fbe6824b41f331a87361263ef69fbfbf7c25`
- Changed files: `src/plugins/capability-provider-runtime.ts`, `src/plugins/capability-provider-runtime.test.ts`
- Code read: capability resolver, bundled compat helpers, plugin loader dependency-install gate, provider registry callers, plugin docs.
- Dependencies/web: no external dependency or advisory lookup needed; no dependency files changed.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` after the initial targeted test failed due missing `node_modules`
- `pnpm test src/plugins/capability-provider-runtime.test.ts` passed: 25 tests
- Focused `pnpm exec tsx` smoke reproduced the disabled-plugin dependency-install path

## Limitations

- No full changed gate was run; this was a focused report-only review.
```
