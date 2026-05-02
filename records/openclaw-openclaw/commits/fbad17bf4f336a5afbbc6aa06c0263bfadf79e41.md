---
sha: fbad17bf4f336a5afbbc6aa06c0263bfadf79e41
parent: 8996161e992a87a1f01e69070a048a12feec1493
repository: openclaw/openclaw
author: "Simon"
committer: "Ayaan Zaidi"
github_author: simonusa
github_committer: obviyus
co_authors: ["Claude Opus 4.7 (1M context)"]
commit_authored_at: "2026-05-02T19:20:11+05:30"
commit_committed_at: "2026-05-02T19:23:17+05:30"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-02T14:13:08Z
---

# Commit fbad17b

## Summary

Found one actionable regression: the commit intentionally changes the public plugin SDK harness result type but does not update the generated SDK API baseline hash, leaving `pnpm plugin-sdk:api:check` failing on current `main`.

## Findings

### Medium: Plugin SDK API baseline was not updated for the public harness type change

- Kind: regression
- File: `src/agents/pi-embedded-runner/run/types.ts`
- Line: 62
- Evidence: `timedOutDuringToolExecution` is now optional on `EmbeddedRunAttemptResult`, which is re-exported as `AgentHarnessAttemptResult` through the harness/plugin SDK surface. The reviewed diff only changes `src/agents/pi-embedded-runner/run.ts` and `src/agents/pi-embedded-runner/run/types.ts`; it does not update `docs/.generated/plugin-sdk-api-baseline.sha256`. Running `pnpm plugin-sdk:api:check` fails with: `Plugin SDK API baseline drift detected. Hash mismatch: docs/.generated/plugin-sdk-api-baseline.sha256`.
- Impact: The repo’s plugin SDK API drift gate is red on current `main`, so `pnpm check`/release validation can fail even though the runtime compatibility change itself is correct.
- Suggested fix: Run `pnpm plugin-sdk:api:gen` for this intentional SDK surface change and commit the updated generated hash file. If the SDK surface was not intended to change, keep `AgentHarnessAttemptResult` stable via a separate public type.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: run `pnpm plugin-sdk:api:check` on current `main`; it fails with the baseline hash mismatch above.
- Is this the best way to solve the issue? yes: the type change is intentional for third-party harness compatibility, so updating the generated SDK baseline is the narrow fix.

## Reviewed

- Diff: `8996161e992a87a1f01e69070a048a12feec1493..fbad17bf4f336a5afbbc6aa06c0263bfadf79e41`
- Changed files: `src/agents/pi-embedded-runner/run.ts`, `src/agents/pi-embedded-runner/run/types.ts`
- Code read: touched files in full/relevant sections, `src/agents/harness/types.ts`, `src/plugin-sdk/agent-harness-runtime.ts`, `src/agents/harness/v2.ts`, `src/agents/harness/selection.ts`, `src/agents/pi-embedded-runner/run/failover-policy.ts`, `src/agents/pi-embedded-runner/run/assistant-failover.ts`, `src/agents/pi-embedded-runner/run/attempt.ts`, Codex harness result projection.
- Docs/issues: `pnpm docs:list`, `docs/concepts/agent-runtimes.md`, GitHub issue `#52147`, PR `#75873`.
- Commands: `pnpm install`; `pnpm test src/agents/harness/v2.test.ts src/agents/harness/selection.test.ts src/agents/pi-embedded-runner/run/failover-policy.test.ts src/agents/pi-embedded-runner/run/assistant-failover.test.ts` passed; `pnpm build:plugin-sdk:dts` passed; `git diff --check ...` passed; `pnpm plugin-sdk:api:check` failed as described.

## Limitations

- No full `pnpm check` was run; the targeted SDK API check is the failing gate relevant to the finding.

https://github.com/openclaw/openclaw/pull/75873
