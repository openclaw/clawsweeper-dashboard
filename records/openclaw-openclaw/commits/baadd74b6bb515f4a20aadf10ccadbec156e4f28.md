---
sha: baadd74b6bb515f4a20aadf10ccadbec156e4f28
parent: 07b52b4a016e409f4fd4ee65be43e87bec3325fc
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-04T00:40:53+01:00"
commit_committed_at: "2026-05-04T00:41:01+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-03T23:48:45Z
---

# Commit baadd74b

## Summary

Found one likely regression in the `diffs` plugin metadata/runtime contract. The commit marks `diffs` as manifest-optional, but the plugin still registers the tool as non-optional and its docs still show enable-only setup.

## Findings

### Medium: `diffs` is manifest-optional but runtime/docs still treat plugin enablement as enough

- Kind: regression
- File: `extensions/diffs/openclaw.plugin.json`
- Line: 11
- Evidence: The commit adds `toolMetadata.diffs.optional: true` at `extensions/diffs/openclaw.plugin.json:11`, and `src/plugins/tools.ts:328` now excludes manifest-optional tools from the default plugin-tool set unless the tool/plugin is explicitly allowlisted. But `extensions/diffs/src/plugin.ts:42` still calls `api.registerTool(..., { name: "diffs" })` without `{ optional: true }`; `src/plugins/registry.ts:504`/`src/plugins/registry.ts:536` derive runtime optionality only from `opts.optional === true`. The newly added plugin-author doc also says manifest `optional: true` is for tools registered with `api.registerTool(..., { optional: true })` at `docs/plugins/building-plugins.md:268`. The current `diffs` user docs still tell users to enable only `plugins.entries.diffs.enabled=true` at `docs/tools/diffs.md:34`.
- Impact: A user who follows the existing `diffs` docs, or who had an existing enabled `diffs` plugin config, can lose the `diffs` tool from effective/invoke/native agent tool surfaces unless they also add `tools.alsoAllow: ["diffs"]` or equivalent. This is especially easy to miss because the runtime registration still looks like a default non-optional plugin tool.
- Suggested fix: Pick one contract and make all surfaces match. If `diffs` should become opt-in at the tool-policy layer, register it with `{ name: "diffs", optional: true }` and update `docs/tools/diffs.md` / README quick starts to include `tools.alsoAllow: ["diffs"]`. If plugin enablement should continue to expose `diffs` by default, remove `toolMetadata.diffs.optional`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Source inspection plus focused runtime registration probes show the mismatch: `loadPluginManifest("extensions/diffs")` reports `{"diffs":{"optional":true}}`, while importing `registerDiffsPlugin` and capturing `registerTool` calls reports `opts: {"name":"diffs"}`. Equivalent probes for `llm-task` and `lobster` report `{"optional":true}`.
- Is this the best way to solve the issue? unclear. If the intended product change is to make `diffs` explicitly opt-in, the best fix is runtime optionality plus docs. If existing enable-only behavior is meant to remain compatible, the best fix is to drop the manifest optional flag for `diffs`.

## Reviewed

- Diff: `07b52b4a016e409f4fd4ee65be43e87bec3325fc..baadd74b6bb515f4a20aadf10ccadbec156e4f28`
- Changed files: `CHANGELOG.md`, `docs/plugins/building-plugins.md`, `extensions/diffs/openclaw.plugin.json`, `extensions/llm-task/openclaw.plugin.json`, `extensions/lobster/openclaw.plugin.json`, `src/plugins/manifest-registry.test.ts`, `src/plugins/manifest-tool-availability.ts`, `src/plugins/manifest.ts`, `src/plugins/tools.optional.test.ts`, `src/plugins/tools.ts`
- Code read: `src/plugins/tools.ts`, `src/plugins/manifest.ts`, `src/plugins/manifest-tool-availability.ts`, `src/plugins/registry.ts`, `extensions/diffs/src/plugin.ts`, `extensions/llm-task/index.ts`, `extensions/lobster/index.ts`, related plugin docs/tests
- Issue context: `gh issue view 76616 --repo openclaw/openclaw`

## Tests / Live Checks

- `pnpm install` completed because `node_modules` was missing.
- `pnpm test src/plugins/tools.optional.test.ts src/plugins/manifest-registry.test.ts` passed: 104 tests.
- `git diff --check 07b52b4a016e409f4fd4ee65be43e87bec3325fc..baadd74b6bb515f4a20aadf10ccadbec156e4f28` passed.
- Focused `node --import tsx` probes confirmed `diffs` manifest optionality and runtime registration options.

## Dependency / Web Checks

- No dependency files changed.
- No web lookup needed; GitHub issue context was inspected with `gh`.

## Limitations

- Full suite not run; this was a focused commit review.
- One attempted full `resolvePluginTools` ad hoc smoke did not produce output promptly and was killed; the narrower manifest/runtime registration probes replaced it.
