---
sha: 09cffbdfbf6efeb19e66fbc66e0f92b34e67b71c
parent: 036eb75a308f2aafe000c58230b531d29f538cec
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: ["kagura-agent"]
commit_authored_at: "2026-05-10T07:59:20+01:00"
commit_committed_at: "2026-05-10T03:21:11-04:00"
result: findings
confidence: high
highest_severity: high
check_conclusion: failure
reviewed_at: 2026-05-10T20:24:38Z
---

# Commit 09cffbdf

## Summary

Found one high-confidence regression: the diagnostic lookup now clears `plugins.allow` and can execute CLI metadata from plugins that the allowlist intentionally excludes, even for arbitrary unknown commands.

## Findings

### High: Unknown-command diagnostics can execute allowlist-excluded plugin code

- Kind: security
- File: `src/cli/run-main.ts`
- Line: 322
- Evidence: `resolveCliCommandSurfaceOwner()` falls back to `resolvePluginCliRootOwnerIds()` with `createAllowlistAgnosticCliLookupConfig()`, which rewrites a non-empty `plugins.allow` to `[]` before lookup. That fallback is reached from `resolveUnownedCliPrimaryMessage()` after `resolveUnownedCliPrimary()` has already determined the command is not owned under the real config. The CLI metadata loader skips disabled plugins only through the effective enable state; once `allow` is cleared, an excluded plugin can become enabled and its `cli-metadata` module is loaded at `src/plugins/loader.ts:2706`, then its `register()` runs at `src/plugins/loader.ts:2801`.
- Impact: `plugins.allow` is a security-relevant trust boundary. With a restrictive allowlist and an excluded plugin present in `plugins.load.paths` or installed discovery, running a completely unrelated unknown command such as `openclaw totally-unknown` can execute that excluded plugin’s top-level `cli-metadata` code. I proved the lower-level path with a temp plugin whose `cli-metadata.js` writes a marker: normal `resolvePluginCliRootOwnerIds({ allow: ["browser"] })` returned `[]` and did not write the marker; the same lookup with `allow: []`, matching the new diagnostic fallback, returned `[]` but wrote the marker.
- Suggested fix: do not clear `plugins.allow` for a loader path that can execute plugin code. Keep the allowlist-agnostic diagnostic limited to manifest-only metadata, or add a non-executing CLI metadata index/manifest field for CLI root ownership. If runtime CLI metadata must be consulted, scope it to a known plugin id already proven by manifest metadata, not all discoverable plugins for arbitrary unknown tokens.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Create an external plugin with `openclaw.plugin.json` plus `cli-metadata.js` that writes a marker, configure `plugins.allow: ["browser"]` and `plugins.load.paths` to that plugin, then compare `resolvePluginCliRootOwnerIds` under the real config versus the commit’s allowlist-cleared diagnostic config. The real config does not load the marker; the allowlist-cleared path does.
- Is this the best way to solve the issue? yes. The fix should preserve the original goal by classifying real plugin command roots without executing code from plugins that the active trust policy excludes.

## Reviewed

- Diff: `036eb75a308f2aafe000c58230b531d29f538cec..09cffbdfbf6efeb19e66fbc66e0f92b34e67b71c`
- Changed files: `CHANGELOG.md`, `src/cli/run-main-policy.ts`, `src/cli/run-main.exit.test.ts`, `src/cli/run-main.test.ts`, `src/cli/run-main.ts`, `src/plugins/manifest-command-aliases.runtime.ts`
- Code read: `src/cli/run-main.ts`, `src/cli/run-main-policy.ts`, `src/plugins/cli-registry-loader.ts`, `src/plugins/loader.ts`, `src/plugins/activation-planner.ts`, `src/plugins/manifest-command-aliases.runtime.ts`
- GitHub context: issue #80109 and PR #80123 via `gh`

## Tests / Live Checks

- `pnpm test src/cli/run-main.test.ts src/cli/run-main.exit.test.ts` passed after `pnpm install`.
- `git diff --check 036eb75a308f2aafe000c58230b531d29f538cec..09cffbdfbf6efeb19e66fbc66e0f92b34e67b71c` passed.
- Focused temp-plugin probe confirmed allowlist-cleared CLI ownership lookup executes excluded `cli-metadata.js`.

## Dependency / Web Checks

- No dependency files changed.
- No general web lookup was needed; GitHub issue/PR context was inspected with `gh`.

## Limitations

- I did not run the full gate; the finding is from source tracing plus a focused live reproduction of the unsafe loader path.
