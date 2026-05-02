---
sha: 3e02bc2f28cf52f3ccdbbbdc5c378fea655f6d93
parent: e92774cb125f167097cb5a74ef2c736c61328c8c
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-02T05:39:09+01:00"
commit_committed_at: "2026-05-02T05:39:21+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-02T04:58:17Z
---

# Commit 3e02bc2

## Summary

Found two wrapper regressions against the previous shell `exec` behavior. The main issue is process lifecycle: cancelling the Node wrapper directly does not terminate the spawned `crabbox` process.

## Findings

### Medium: Wrapper termination can leave the Crabbox child running

- Kind: reliability
- File: `scripts/crabbox-wrapper.mjs`
- Line: 55
- Evidence: The new wrapper uses `spawn(binary, args, ...)` but has no `SIGTERM`/`SIGINT`/`SIGHUP` forwarding from the wrapper process to the child. The old package scripts ended with `exec "$bin" ...`, so the script PID became the Crabbox process. A focused fake-binary check showed `kill -TERM <wrapper-pid>` exits the wrapper with 143 while the child process remains alive; the equivalent old `sh -c ... exec "$bin"` path used the same PID for script and child, and the child did not survive.
- Impact: Process-directed cancellation from a supervisor, pnpm wrapper, CI cleanup, or another automation layer can leave a long-running `crabbox run`/`warmup` child alive after the OpenClaw script has exited. That can keep remote execution or leases running unexpectedly and make cleanup less reliable.
- Suggested fix: Track the child and forward termination signals to it, then mirror the final child status. Alternatively, use a wrapper approach that replaces the process after sanity checks.
- Confidence: high

### Low: Non-executable sibling Crabbox file now blocks PATH fallback

- Kind: regression
- File: `scripts/crabbox-wrapper.mjs`
- Line: 9
- Evidence: The previous scripts selected `../crabbox/bin/crabbox` only when `[ -x ../crabbox/bin/crabbox ]` succeeded. The new wrapper uses `existsSync(repoLocal)`, so any present but non-executable file at that path is selected and fails sanity checks instead of falling back to a working `crabbox` on `PATH`. A temp-layout check with a non-executable sibling file and an executable fake `PATH` crabbox reproduced exit 2 from the new wrapper; the old shell logic fell back to `PATH` and ran successfully.
- Impact: A partially checked-out, chmod-broken, or otherwise non-executable sibling Crabbox tree can break all `pnpm crabbox:*` commands even when the user has a valid global Crabbox install.
- Suggested fix: Match the old contract by checking execute permission, for example `accessSync(repoLocal, constants.X_OK)`, before preferring the sibling binary.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Both issues were reproduced with temporary fake `crabbox` binaries outside the repo: one signal-lifecycle check and one non-executable sibling fallback check.
- Is this the best way to solve the issue? yes for the fix direction. Signal forwarding preserves the new sanity checks without regressing cancellation semantics; executable-permission probing restores the previous fallback behavior.

## Reviewed

- Diff: `e92774cb125f167097cb5a74ef2c736c61328c8c..3e02bc2f28cf52f3ccdbbbdc5c378fea655f6d93`
- Changed files: `CHANGELOG.md`, `package.json`, `scripts/crabbox-wrapper.mjs`
- Code read: full new wrapper, changed `package.json` script/file entries, changelog entry, `docs/ci.md` Crabbox section, `.crabbox.yaml`, `.github/workflows/crabbox-hydrate.yml`, `scripts/AGENTS.md`, Crabbox skill guidance
- Dependencies/web: no dependency files changed; no external web lookup needed
- Commands: `pnpm docs:list`, `git show`, `git diff`, `git diff --check`, `node --check scripts/crabbox-wrapper.mjs`, `package.json` parse check, fake-binary forwarding/stale-provider/signal/fallback checks, bounded `gh` commit PR/status queries

## Tests / Live Checks

- Argument forwarding passed for documented forms such as `pnpm crabbox:run -- --id ... --shell -- "..."`.
- Stale-provider rejection passed when fake `run --help` omitted `blacksmith-testbox`.
- Signal and non-executable fallback checks exposed the findings above.

## Limitations

- No real Crabbox binary was installed in this checkout, so remote lease behavior was not exercised end to end.
