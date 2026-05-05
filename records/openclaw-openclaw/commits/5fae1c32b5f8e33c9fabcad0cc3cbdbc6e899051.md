---
sha: 5fae1c32b5f8e33c9fabcad0cc3cbdbc6e899051
parent: 7188e4f4ad87a51a11d3dc3c7909fd79ea01d6e9
repository: openclaw/openclaw
author: "Pumpkin Xing"
committer: "GitHub"
github_author: pumpkinxing1
github_committer: web-flow
co_authors: ["pumpkinxing1", "odysseus0"]
commit_authored_at: "2026-05-06T01:47:01+08:00"
commit_committed_at: "2026-05-05T10:47:01-07:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-05T17:53:41Z
---

# Commit 5fae1c32

## Summary

Found one concrete regression: the commit changes a bundled plugin metadata test expectation to include `discord` in empty-config Gateway startup, but current metadata and runtime behavior still exclude it. The focused test suite now fails on current `main`.

## Findings

### Medium: Bundled plugin metadata test now expects Discord startup without matching metadata

- Kind: regression
- File: `src/plugins/bundled-plugin-metadata.test.ts`
- Line: 54
- Evidence: The commit adds `"discord"` to `EXPECTED_EMPTY_CONFIG_GATEWAY_STARTUP_PLUGIN_IDS`, but `extensions/discord/openclaw.plugin.json:3` still declares `"onStartup": false`. Running `pnpm test src/plugins/channel-catalog-registry.test.ts test/official-channel-catalog.test.ts src/commands/doctor/shared/stale-plugin-config.test.ts src/plugins/bundled-plugin-metadata.test.ts` fails at `src/plugins/bundled-plugin-metadata.test.ts:478`; the actual startup ids omit `discord`.
- Impact: The plugins test lane is red on current `main`. If the intended product behavior is to auto-start Discord for empty config, the behavior was not implemented. If not, the test expectation is stale and will block CI/developer validation.
- Suggested fix: Remove `discord` from `EXPECTED_EMPTY_CONFIG_GATEWAY_STARTUP_PLUGIN_IDS`, or make the intended startup behavior explicit in Discord metadata/planner code with matching product rationale.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: run the focused `pnpm test ... bundled-plugin-metadata.test.ts` command above on this commit.
- Is this the best way to solve the issue? unclear: removing the expectation is the smallest fix if no behavior change was intended; implementing Discord startup is only appropriate if maintainers want empty-config Gateway startup to load Discord.

## Reviewed

- Diff: `7188e4f4ad87a51a11d3dc3c7909fd79ea01d6e9..5fae1c32b5f8e33c9fabcad0cc3cbdbc6e899051`
- Changed files: `CHANGELOG.md`, `scripts/lib/official-external-channel-catalog.json`, `src/commands/doctor/shared/stale-plugin-config.test.ts`, `src/plugins/bundled-plugin-metadata.test.ts`, `src/plugins/channel-catalog-registry.test.ts`, `src/plugins/channel-catalog-registry.ts`
- Code read: channel catalog registry, discovery install-record handling, installed plugin index reader, channel catalog consumers, gateway startup plugin planner, Discord manifest metadata.
- Dependencies/web: checked npm metadata for `@tencent-weixin/openclaw-weixin@2.4.1`; integrity matches catalog and no install/postinstall scripts are declared.

## Tests / Live Checks

- `pnpm install`: success after missing `node_modules`.
- `pnpm test src/plugins/channel-catalog-registry.test.ts test/official-channel-catalog.test.ts src/commands/doctor/shared/stale-plugin-config.test.ts src/plugins/bundled-plugin-metadata.test.ts`: failed only on the Discord startup expectation.
- `pnpm check:import-cycles`: success, `0 runtime value cycle(s)`.
- `git diff --check 7188e4f4ad87a51a11d3dc3c7909fd79ea01d6e9..5fae1c32b5f8e33c9fabcad0cc3cbdbc6e899051`: success.

## Dependency / Web Checks

- `npm view @tencent-weixin/openclaw-weixin@2.4.1 ...`: confirmed `dist.integrity` equals the catalog entry and package scripts are limited to `test`, `typecheck`, `build`, and `prepublishOnly`.

## Limitations

- I did not run a full `pnpm check` or live Weixin install flow; focused registry/catalog tests and npm metadata checks were sufficient for the touched behavior.
- The failing test prevented a clean all-targeted-tests result.

https://github.com/openclaw/openclaw/pull/77269
