---
sha: fc065b2693bfaeff795a88d080ff5cf30fe8addf
parent: eabae023ebb237c8e4f062f6d437a3801b517506
repository: openclaw/openclaw
author: "Pavan Kumar Gondhi"
committer: "GitHub"
github_author: pgondhi987
github_committer: web-flow
co_authors: ["Ishaan"]
commit_authored_at: "2026-05-08T10:18:41+05:30"
commit_committed_at: "2026-05-08T10:18:41+05:30"
result: findings
confidence: high
highest_severity: high
check_conclusion: failure
reviewed_at: 2026-05-08T04:56:02Z
---

# Commit fc065b2

## Summary

Found one security regression in the TypeScript node-host `system.run` allowlist path. The commit adds blocked-shell-wrapper detection for unbindable login/startup wrappers, but that blocked state is not honored when the request falls back to argv allowlist evaluation.

## Findings

### High: Blocked login shell wrappers can still run through a shell executable allowlist entry

- Kind: security
- File: `src/node-host/invoke-system-run-allowlist.ts`
- Line: 61
- Evidence: `resolveSystemRunCommandRequest(["bash", "-lc", payload], raw canonical)` now returns `shellPayload: null`, because `bash -lc` is treated as an unbindable startup/login shell wrapper. But when `shellCommand` is null, `evaluateSystemRunAllowlist` sends the original argv into `evaluateExecAllowlist` (`src/node-host/invoke-system-run-allowlist.ts:61`). That path only rejects `segment.resolution?.policyBlocked` (`src/infra/exec-approvals-allowlist.ts:598`), while `isBlockedShellWrapperCommand(["bash","-lc",...])` is not reflected as `policyBlocked`. The segment then reaches executable matching and can satisfy allowlist mode with `{ pattern: "/usr/bin/bash" }` (`src/infra/exec-approvals-allowlist.ts:429` and `src/infra/exec-approvals-allowlist.ts:432`).
- Impact: In node-host allowlist mode, an operator who has allowlisted `bash` can still run arbitrary `bash -lc "<payload>"` without an approval prompt, even though this commit explicitly tries to fail closed for login/startup wrappers whose payload cannot be safely bound. This keeps the same class of shell-wrapper bypass open for the TypeScript execution path.
- Suggested fix: Propagate blocked shell-wrapper state into `resolveExecWrapperTrustPlan`/`CommandResolution.policyBlocked`, or explicitly reject `isBlockedShellWrapperCommand(parsed.argv, parsed.commandText)` before argv allowlist evaluation in the node-host policy phase. Add a regression test where `bash -lc "/usr/bin/touch ..."` with allowlist `{ pattern: "/usr/bin/bash" }` is denied or approval-gated.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A focused `pnpm exec tsx -e` probe showed `resolveSystemRunCommandRequest` returns `shellPayload: null` for `bash -lc`, while `evaluateSystemRunAllowlist` with `argv: ["bash","-lc","/usr/bin/touch ..."]` and allowlist `{ pattern: "/usr/bin/bash" }` returns `allowlistSatisfied: true`.
- Is this the best way to solve the issue? yes, the safest direction is to make blocked shell-wrapper classification a policy-blocking fact before allowlist matching, so shell executable entries cannot silently override the fail-closed decision.

## Reviewed

- Diff: `eabae023ebb237c8e4f062f6d437a3801b517506..fc065b2693bfaeff795a88d080ff5cf30fe8addf`
- Changed files: Swift macOS exec parser/validator files, TypeScript shell wrapper and allowlist files, node-host system-run files, tests, fixture, changelog.
- Code read: `apps/macos/Sources/OpenClaw/ExecInlineCommandParser.swift`, `apps/macos/Sources/OpenClaw/ExecShellWrapperParser.swift`, `apps/macos/Sources/OpenClaw/ExecCommandResolution.swift`, `apps/macos/Sources/OpenClaw/ExecSystemRunCommandValidator.swift`, `src/infra/shell-inline-command.ts`, `src/infra/shell-wrapper-resolution.ts`, `src/infra/exec-approvals-allowlist.ts`, `src/node-host/invoke-system-run-allowlist.ts`, `src/node-host/invoke-system-run.ts`, related tests.
- Dependencies/web: `gh pr view 78518`; no external web dependency was needed.
- Commands: `pnpm docs:list`, `git show`, `git diff`, `pnpm install`, focused `pnpm exec tsx -e` probes, and `pnpm test src/infra/system-run-command.test.ts src/infra/exec-approvals-allow-always.test.ts src/infra/shell-inline-command.test.ts src/infra/exec-wrapper-trust-plan.test.ts src/node-host/invoke-system-run.test.ts`.

## Tests / Live Checks

- Focused Vitest command passed: 5 files across 2 shards, 130 tests.
- Focused repro probe failed the intended security property: blocked `bash -lc` argv was still allowlist-satisfied by `/usr/bin/bash`.

## Limitations

- macOS Swift tests were read but not run locally on this Linux host.
- I did not run a full `pnpm check` or full `pnpm test`; the focused checks were enough to confirm the finding.
