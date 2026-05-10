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
reviewed_at: 2026-05-10T07:30:16+00:00
---

# Commit 09cffbdf

## Summary

Found one allowlist bypass regression. The commit avoids misleading `plugins.allow` hints, but the fallback used for metadata-only CLI roots clears `plugins.allow` and calls the executable CLI metadata loader. That can load and run code from a plugin that the operator explicitly excluded from `plugins.allow`.

## Findings

### High: allowlist-agnostic CLI lookup can execute unallowed plugin code

- Kind: security
- File: `src/cli/run-main.ts`
- Line: 322
- Evidence: `createAllowlistAgnosticCliLookupConfig()` replaces a non-empty `plugins.allow` with `[]`, then `resolveCliCommandSurfaceOwner()` passes that config to `resolvePluginCliRootOwnerIds()` at `src/cli/run-main.ts:352`. That resolver eventually uses `loadOpenClawPluginCliRegistry()`, which checks `enableState.enabled` before loading, but with the allowlist cleared the plugin is enabled; it then loads the plugin module at `src/plugins/loader.ts:2706` and runs its `register()` in `cli-metadata` mode at `src/plugins/loader.ts:2801`.
- Impact: `plugins.allow` is documented as “only listed plugins are eligible to load” in `src/config/schema.help.ts:1251`. With this commit, an installed/discoverable plugin that is not in `plugins.allow` can still execute top-level module code and synchronous CLI registration code when a user runs its CLI root or when the diagnostic path tries to classify it. This weakens the plugin inventory/security boundary and can execute unapproved plugin code in the CLI process.
- Suggested fix: do not clear `plugins.allow` for a lookup path that can execute plugin modules. Use manifest/persisted non-executable metadata only, add manifest `commandAliases`/`activation.onCommands` for bundled metadata-only roots such as `qa`, or allow the generic unknown-command diagnostic for CLI roots that cannot be classified without loading unallowed plugin code.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. I created a temp external plugin with `plugins.allow: ["browser"]`; `resolvePluginCliRootOwnerIds()` with the restricted config returned `[]` and did not write its marker. Re-running the same lookup with only `allow: []`, matching this commit’s fallback, returned `["blocked-cli"]` and wrote `loaded\nregistered\n`, proving unallowlisted plugin module load and register execution.
- Is this the best way to solve the issue? no. The diagnostic goal is valid, but the classification step must not execute code from plugins excluded by the operator’s allowlist.

## Reviewed

- Diff: `036eb75a308f2aafe000c58230b531d29f538cec..09cffbdfbf6efeb19e66fbc66e0f92b34e67b71c`
- Changed files: `CHANGELOG.md`, `src/cli/run-main-policy.ts`, `src/cli/run-main.exit.test.ts`, `src/cli/run-main.test.ts`, `src/cli/run-main.ts`, `src/plugins/manifest-command-aliases.runtime.ts`
- Code read: changed files in full; `src/plugins/cli-registry-loader.ts`; `src/plugins/loader.ts`; `src/plugins/activation-planner.ts`; `src/plugins/manifest-command-aliases.ts`; `src/plugins/manifest-contract-eligibility.ts`; `src/config/schema.help.ts`
- GitHub context: issue `#80109`, PR `#80123`
- Dependencies/web: no external dependency or web lookup needed

## Tests / Live Checks

- `pnpm test src/cli/run-main.test.ts src/cli/run-main.exit.test.ts` passed after `pnpm install`
- `pnpm exec oxfmt --check --threads=1 ...` passed
- Temp-plugin smoke check confirmed the allowlist-cleared lookup executes unallowlisted plugin CLI metadata code

## Limitations

- I did not run the full changed gate; the focused tests passed, and the finding is source-backed plus reproduced with a targeted temp-plugin check.

https://github.com/openclaw/openclaw/pull/80123
