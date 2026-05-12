---
sha: da6f32bedfb05e5d3d15ca12f31f5f9a4cdfe763
parent: d164f8cc74115ae610fce096175f86ad7c777787
repository: openclaw/openclaw
author: "Pavan Kumar Gondhi"
committer: "GitHub"
github_author: pgondhi987
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-05-12T16:03:50+05:30"
commit_committed_at: "2026-05-12T16:03:50+05:30"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-12T10:38:55Z
---

# Commit da6f32b

## Summary

The runtime fix is narrow and the focused gateway discovery regression test passes. I found one remaining user-visible docs regression: the main discovery design page still documents the pre-fix wide-area `cliPath` behavior.

## Findings

### Low: Discovery docs still say wide-area DNS-SD always writes `cliPath`

- Kind: regression
- File: `docs/gateway/discovery.md`
- Line: 77
- Evidence: Current runtime now derives `cliPath` from `mdnsMode !== "full"` and passes that filtered value into `writeWideAreaGatewayZone` at `src/gateway/server-discovery-runtime.ts:56` and `src/gateway/server-discovery-runtime.ts:172`. The new regression test asserts minimal-mode wide-area zone params omit `cliPath` at `src/gateway/server-discovery-runtime.test.ts:236`. But `docs/gateway/discovery.md:77` still says wide-area DNS-SD “still writes it as a remote-install hint.”
- Impact: Operators reading the Discovery and transports page can expect default/minimal wide-area beacons to include a remote-install `cliPath`, while the merged code now omits it unless `discovery.mdns.mode` is `full`. That can lead to wrong setup/debugging guidance for remote clients that rely on that hint.
- Suggested fix: Update `docs/gateway/discovery.md` to match the new contract: `cliPath` and `sshPort` are full-discovery-mode-only for both local mDNS and wide-area DNS-SD, with a note to set `discovery.mdns.mode: "full"` when those hints are required.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Read `docs/gateway/discovery.md:77` and compare it to the current filtered runtime path plus the passing regression test.
- Is this the best way to solve the issue? yes. The code change is consistent with the configuration contract; the remaining problem is stale public documentation, not a runtime rollback.

## Reviewed

- Diff: `d164f8cc74115ae610fce096175f86ad7c777787..da6f32bedfb05e5d3d15ca12f31f5f9a4cdfe763`
- Changed files: `CHANGELOG.md`, `docs/cli/gateway.md`, `docs/gateway/bonjour.md`, `src/gateway/server-discovery-runtime.test.ts`, `src/gateway/server-discovery-runtime.ts`
- Code read: `src/gateway/server-discovery-runtime.ts`, `src/gateway/server-discovery-runtime.test.ts`, `src/gateway/server-discovery.ts`, `src/gateway/server-startup-early.ts`, `src/infra/widearea-dns.ts`, `extensions/bonjour/index.ts`, `extensions/bonjour/src/advertiser.ts`
- Docs read: `docs/cli/gateway.md`, `docs/gateway/bonjour.md`, `docs/gateway/discovery.md`, `docs/gateway/configuration-reference.md`, relevant gateway security docs
- GitHub: inspected PR #80903 metadata and comments with `gh pr view`

## Tests / Live Checks

- `pnpm docs:list` completed.
- `pnpm test src/gateway/server-discovery-runtime.test.ts -- --reporter=verbose` passed: 1 file, 6 tests.
- `git diff --check d164f8cc74115ae610fce096175f86ad7c777787..da6f32bedfb05e5d3d15ca12f31f5f9a4cdfe763` passed.

## Dependency / Web Checks

- No dependency, lockfile, CI action, install script, or package metadata changed.
- No external web lookup was needed; behavior was established from current source, docs, tests, and PR metadata.

## Limitations

- I did not run a live gateway/CoreDNS wide-area DNS-SD environment because the concrete issue is a docs/runtime contract mismatch and the focused unit proof covers the changed runtime branch.

https://github.com/openclaw/openclaw/pull/80903
