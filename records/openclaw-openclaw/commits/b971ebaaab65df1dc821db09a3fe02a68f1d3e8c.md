---
sha: b971ebaaab65df1dc821db09a3fe02a68f1d3e8c
parent: f4a63940cc6d82bbe650f97a2b339b17eeae950e
repository: openclaw/openclaw
author: "Alex Alaniz"
committer: "GitHub"
github_author: Alex-Alaniz
github_committer: web-flow
co_authors: ["Brad Groux"]
commit_authored_at: "2026-05-05T23:39:41-04:00"
commit_committed_at: "2026-05-05T22:39:41-05:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-06T03:46:26Z
---

# Commit b971eba

## Summary

Found one concrete security-sensitive race introduced by the Windows copy fallback. The fallback can temporarily expose an empty or partial `exec-approvals.json`; current readers treat that as default `full` / `off`, so a concurrent host exec policy read can fail open while a tightened local approvals file is being copied.

## Findings

### Medium: Copy fallback can make concurrent approvals reads fail open

- Kind: security
- File: `src/infra/exec-approvals.ts`
- Line: 421
- Evidence: the fallback truncates the destination inode before writing replacement bytes. If another approvals read lands in that window, `loadExecApprovals()` catches the JSON/read failure and returns a normalized empty approvals file, and `resolveExecApprovalsFromFile()` then resolves defaults to `security: "full"`, `ask: "off"`, `askFallback: "full"`. A focused probe forced the new `EPERM` fallback path and called the approvals resolver immediately after `ftruncateSync(fd, 0)`; an existing file with `security: "deny", ask: "always"` resolved during the fallback as `security: "full", ask: "off"`.
- Impact: on the affected Windows path, a concurrent gateway/node/CLI exec policy evaluation can ignore a host-local deny or always-prompt approvals policy and permit a host command without the intended prompt. The window is small, but the fallback is explicitly for situations where another process/handle may be interacting with the same approvals file.
- Suggested fix: do not allow malformed existing approvals files to resolve to fail-open defaults during fallback-copy windows. Either coordinate all approvals readers/writers with an interprocess lock, or make existing-but-unparseable approvals files fail closed for policy resolution. Add a regression test that observes the file during fallback truncation and verifies it cannot resolve to `full/off`.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes for the code path: monkeypatch `renameSync` to throw `EPERM`, monkeypatch `ftruncateSync` to read policy immediately after truncation, then call `saveExecApprovals()` over a deny/always approvals file. I did not reproduce a native Windows locked-handle race.
- Is this the best way to solve the issue? No. The writer-local fallback is the right area, but the fix also needs to preserve the old atomic-read contract or make transient invalid reads fail closed.

## Reviewed

- Diff: `f4a63940cc6d82bbe650f97a2b339b17eeae950e..b971ebaaab65df1dc821db09a3fe02a68f1d3e8c`
- Changed files: `CHANGELOG.md`, `src/infra/exec-approvals-store.test.ts`, `src/infra/exec-approvals.ts`
- Code read: full changed files, exec host approval call sites, prior writer at the base commit, `src/infra/private-file-store.ts`, and upstream `@openclaw/fs-safe` writer sources
- GitHub: PR #77907 and issue #77785 via `gh`

## Tests / Live Checks

- `pnpm install` succeeded after the checkout had no `node_modules`.
- `pnpm test src/infra/exec-approvals-store.test.ts` passed: 24 tests.
- `pnpm test src/agents/bash-tools.exec-host-gateway.test.ts` passed: 7 tests.
- `pnpm exec oxfmt --check --threads=1 src/infra/exec-approvals.ts src/infra/exec-approvals-store.test.ts CHANGELOG.md` passed.
- `git diff --check f4a63940cc6d82bbe650f97a2b339b17eeae950e..b971ebaaab65df1dc821db09a3fe02a68f1d3e8c` passed.

## Dependency / Web Checks

- Read installed `@openclaw/fs-safe@0.1.1` source for the previous private file-store writer and atomic/copy-fallback behavior.
- No general web lookup was needed beyond GitHub issue/PR inspection.

## Limitations

- No native Windows locked-file repro was run.
- The proof uses a forced `EPERM` and an in-process hook to model a concurrent reader at the exact fallback truncation point.

https://github.com/openclaw/openclaw/pull/77907
