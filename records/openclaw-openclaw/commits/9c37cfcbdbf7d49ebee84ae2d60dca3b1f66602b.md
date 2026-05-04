---
sha: 9c37cfcbdbf7d49ebee84ae2d60dca3b1f66602b
parent: 9799e412f863b0eca3df6a33ea2d6b0b61552b4f
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-04T01:27:52+01:00"
commit_committed_at: "2026-05-04T01:28:17+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-04T00:35:35Z
---

# Commit 9c37cfc

## Summary

Found one concrete reliability bug in the stale gateway PID recovery fix. The new Unix argv verifier does not recognize the actual `ps`/`/proc` command shape produced by OpenClaw’s gateway process title, so the macOS `cnode` listener case from #70664 can still be missed.

## Findings

### Medium: Stale PID verifier rejects real `openclaw-gateway` process-title output

- Kind: reliability
- File: `src/infra/restart-stale-pids.ts`
- Line: 234
- Evidence: The commit adds `verifyGatewayPidByArgvSync`, which calls `isGatewayArgv(args, { allowGatewayBinary: true })`. `isGatewayArgv` first requires an exact `"gateway"` argv token before considering the allowed `openclaw-gateway` executable case (`src/infra/gateway-process-argv.ts:40`). A local smoke with `process.title = "openclaw-gateway"` showed both `ps -ww -p <pid> -o command=` and `/proc/<pid>/cmdline` report only `openclaw-gateway`, matching the issue’s reported macOS `ps` output. That parses to `["openclaw-gateway"]`, which fails the exact `"gateway"` token check.
- Impact: When `lsof -Fpc` reports a Node gateway listener as `cnode`, the new fallback still drops real gateway PIDs if argv has been rewritten to `openclaw-gateway`. `cleanStaleGatewayProcessesSync` can keep returning `[]`, leaving the launchd EADDRINUSE respawn/log-growth loop unresolved.
- Suggested fix: When `allowGatewayBinary` is true, accept `openclaw-gateway` as argv[0] even without a separate `"gateway"` token, or add that explicit check in `verifyGatewayPidByArgvSync`. Add a regression test where `lsof` returns `cnode` and `ps` returns exactly `openclaw-gateway`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Mock `lsof` output as `p<PID>\ncnode\n` and mock `ps -ww -p <PID> -o command=` as `openclaw-gateway\n`; current code parses that as a single arg and rejects it before returning stale PIDs.
- Is this the best way to solve the issue? yes. The intended fix is argv verification, but the verifier must match the gateway’s process-title form, not only pre-title Node entrypoint argv.

## Reviewed

- Diff: `9799e412f863b0eca3df6a33ea2d6b0b61552b4f..9c37cfcbdbf7d49ebee84ae2d60dca3b1f66602b`
- Changed files: `CHANGELOG.md`, channel list, daemon install helpers, provider usage loader, stale PID cleanup, logger, and related tests.
- Code read: full touched runtime files plus `src/infra/gateway-process-argv.ts`, launchd/systemd env handling, provider usage auth/format helpers, logger path handling, and referenced issue context.
- Dependencies/web: GitHub issues #75374, #70664, #73587, #67595 via `gh`; no general web lookup needed.
- Commands: `pnpm docs:list`; `git show`; `git diff`; focused `gh issue view`; local Node `process.title`/`ps` smoke; `pnpm install`; `pnpm test src/infra/restart-stale-pids.test.ts src/infra/gateway-process-argv.test.ts src/commands/daemon-install-helpers.test.ts src/commands/channels.list.auth-profiles.test.ts src/infra/provider-usage.load.test.ts src/logging/logger-redaction-behavior.test.ts` passed.

## Tests / Live Checks

- Focused changed tests passed after installing missing dependencies: 4 Vitest shards, 107 tests.
- Local process-title smoke confirmed `ps` reports `openclaw-gateway` as a single command string after `process.title` is set.

## Limitations

- I did not run a real macOS launchd gateway smoke in this Linux workspace.
