---
sha: 7624b0d16dcbde01b5dace9d5ce49dfbbb377da6
parent: a6892a5af33867019886408740d097201528e455
repository: openclaw/openclaw
author: "Andy Ye"
committer: "GitHub"
github_author: TurboTheTurtle
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-05-11T21:41:08-07:00"
commit_committed_at: "2026-05-11T21:41:08-07:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-12T04:49:35Z
---

# Commit 7624b0d

## Summary

Found one remaining failure path in the iMessage RPC client: the new public Full Disk Access diagnostic is only used when the child `close` handler rejects pending requests. If an earlier stdin/write EPIPE path wins the race, health still receives a generic EPIPE and can omit the failed probe from non-sensitive status output.

## Findings

### Medium: EPIPE can still hide stored Full Disk Access diagnostics

- Kind: reliability
- File: `extensions/imessage/src/client.ts`
- Line: 199
- Evidence: the commit records a public diagnostic in `recordProcessDiagnostic` and uses it in `buildCloseError`, but the stdin `"error"` listener and `stdin.write` callback still reject pending requests with the raw stream error. A source-level check with a stored Full Disk Access banner followed by a write EPIPE returned `write EPIPE` instead of the public remediation message. `src/commands/health.ts:99` then drops non-sensitive probe errors that do not contain the redacted Full Disk Access shape, so the status formatter can fall back to configured/OK again.
- Impact: when `imsg rpc` prints the Full Disk Access banner and exits before, or while, the probe request writes to stdin, `openclaw status --deep` can still hide the actionable failure this commit is meant to surface.
- Suggested fix: route stdin `"error"` and write-callback failures through the stored public diagnostic when present, for example by using a shared helper that returns the public Full Disk Access error before falling back to the raw stream error.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? yes, at source level: set `publicProcessError` by feeding the client the Full Disk Access banner, fake a child stdin write callback with `Error("write EPIPE")`, then call `request`; the promise rejects with `write EPIPE`. I did not live-run this on macOS/iMessage.
- Is this the best way to solve the issue? yes; the narrow fix is to preserve the already-recorded public diagnostic across all pending-request rejection paths, not only child close.

## Reviewed

- Diff: `a6892a5af33867019886408740d097201528e455..7624b0d16dcbde01b5dace9d5ce49dfbbb377da6`
- Changed files: `CHANGELOG.md`, `extensions/imessage/src/client.ts`, `extensions/imessage/src/status.test.ts`, `scripts/pre-commit/pnpm-audit-prod.mjs`, `src/commands/health.snapshot.test.ts`, `src/commands/health.test.ts`, `src/commands/health.ts`, `test/scripts/pnpm-audit-prod.test.ts`
- Code read: iMessage probe/status/client paths, health snapshot and formatter paths, gateway health sensitivity handling, pnpm audit script and tests.
- Dependency/web: checked npm bulk advisory API and GitHub Advisory Database entry `GHSA-3q49-cfcf-g5fm`; current data still includes the overbroad range plus exact compromised Mistral versions, and the lock resolves `@mistralai/mistralai` to `2.2.1`.

## Tests / Live Checks

- `pnpm test extensions/imessage/src/status.test.ts src/commands/health.snapshot.test.ts src/commands/health.test.ts test/scripts/pnpm-audit-prod.test.ts` passed.
- `node scripts/pre-commit/pnpm-audit-prod.mjs --min-severity=high` passed.
- `git diff --check a6892a5af33867019886408740d097201528e455..7624b0d16dcbde01b5dace9d5ce49dfbbb377da6` passed.

## Limitations

- No live macOS/iMessage Full Disk Access repro was available.
- I did not run the full repository gate.
