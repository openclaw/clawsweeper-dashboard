---
sha: 4b6cb9e9bc6f8ae0beba407faef2fb78328356dd
parent: aafadd45a532475c9dc4cbe65705196b93491bd4
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-10T04:03:36+01:00"
commit_committed_at: "2026-05-10T04:03:45+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-10T03:12:14Z
---

# Commit 4b6cb9e9bc

## Summary

The commit makes `openclaw help <plugin-command>` reach the plugin-registration block, but the actual registration still receives `primary: "help"`. The plugin loader then optimizes for a plugin command named `help`, finds no owner, and does not register the requested plugin command.

## Findings

### Low: `openclaw help <plugin-command>` still cannot load the plugin command help

- Kind: bug
- File: `src/cli/command-registration-policy.ts`
- Line: 21
- Evidence: The new `primary === "help"` exception lets `openclaw help voicecall` continue to plugin registration, but `src/cli/run-main.ts:682` still passes `primary` unchanged as `"help"`. `src/plugins/cli-registry-loader.ts:119` then resolves plugin owners for command `"help"` and returns an empty registry instead of loading the plugin that owns `voicecall`. A focused loader check showed `primaryCommand: "help"` returns no `voice-call` entry, while `primaryCommand: "voicecall"` does. A live smoke with `plugins.entries.voice-call.enabled=true` returned exit `1` and root help for `pnpm -s openclaw help voicecall`, rather than the `voicecall` command help.
- Impact: The behavior this fix is trying to restore remains broken for plugin CLI commands. Users cannot discover help for enabled plugin commands through Commander’s documented `help <command>` path.
- Suggested fix: When `primary === "help"` and `invocation.commandPath[1]` exists, register plugin CLI commands using that second path segment as the plugin primary, or bypass the primary-command optimization for this help form. Add an integration-style test that exercises `openclaw help voicecall` with `voice-call` enabled.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. With a temp config containing `{"plugins":{"entries":{"voice-call":{"enabled":true}}}}`, run `OPENCLAW_STATE_DIR=<tmp> OPENCLAW_CONFIG_PATH=<tmp>/openclaw.json OPENCLAW_SUPPRESS_HELP_BANNER=1 NO_COLOR=1 pnpm -s openclaw help voicecall`; it exits `1` and prints root help.
- Is this the best way to solve the issue? unclear. The narrowest fix is to pass the requested command after `help` into plugin registration; loading all plugin CLI registrations for `help <command>` is safer behaviorally but less aligned with the current startup optimization.

## Reviewed

- Diff: `aafadd45a532475c9dc4cbe65705196b93491bd4..4b6cb9e9bc6f8ae0beba407faef2fb78328356dd`
- Changed files: `src/cli/channel-auth.test.ts`, `src/cli/command-registration-policy.ts`, `src/cli/plugins-cli.policy.test.ts`
- Code read: `src/cli/run-main.ts`, `src/cli/argv.ts`, `src/cli/argv-invocation.ts`, `src/plugins/cli.ts`, `src/plugins/cli-registry-loader.ts`, `src/plugins/register-plugin-cli-command-groups.ts`, CLI help/program registration code, and relevant tests.
- Docs read: `docs/cli/index.md`, `docs/cli/plugins.md`
- Dependencies/web: no dependency files changed; no web lookup needed.

## Tests / Live Checks

- `OPENCLAW_VITEST_MAX_WORKERS=1 pnpm test src/cli/command-registration-policy.test.ts src/cli/run-main.test.ts` passed.
- `OPENCLAW_VITEST_MAX_WORKERS=1 pnpm test src/cli/channel-auth.test.ts src/cli/plugins-cli.policy.test.ts` passed.
- Focused CLI smoke for `openclaw help voicecall` failed as described.
- Initial test attempts with `--runInBand` failed because Vitest rejects that Jest flag; they were superseded by the supported sequential runs above.

## Limitations

- Full suite not run; review used focused tests and CLI smoke because the commit only touches CLI registration policy and assertions.
