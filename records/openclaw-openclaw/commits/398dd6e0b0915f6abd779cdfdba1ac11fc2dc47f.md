---
sha: 398dd6e0b0915f6abd779cdfdba1ac11fc2dc47f
parent: 01cf27bc2e8438c1f4b20afe597c9c98de49147a
repository: openclaw/openclaw
author: "hcl"
committer: "GitHub"
github_author: hclsys
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-05-09T18:48:29+08:00"
commit_committed_at: "2026-05-09T06:48:29-04:00"
result: findings
confidence: high
highest_severity: high
check_conclusion: failure
reviewed_at: 2026-05-09T10:55:50Z
---

# Commit 398dd6e0

## Summary

Found one regression: the new assistant-prefill format strings are also picked up by the broad Cloud Code Assist retry flag, so the exact error this commit is meant to make terminal still rotates profiles and can fall through to model fallback.

## Findings

### High: Assistant-prefill format errors still opt into retry

- Kind: reliability
- File: `src/agents/pi-embedded-runner/run.ts`
- Line: 2219
- Evidence: `allowFormatRetry` is set from `attempt.cloudCodeAssistFormatError`. That flag is computed with `isCloudCodeAssistFormatError`, which is just `matchesFormatErrorPattern`; this commit added `"does not support assistant message prefill"` and `"conversation must end with a user message"` to that same format pattern list. A direct probe on current `main` returned `{"reason":"format","allow":true,"decision":{"action":"rotate_profile","reason":"format"}}` for the linked provider error, and after profile rotation is exhausted the same parameters return `fallback_model`.
- Impact: The deterministic assistant-prefill rejection from #79688 is not terminal in the assistant path. Multi-profile setups retry the same invalid payload on another auth profile, and fallback-configured setups can continue into model fallback, preserving the token burn/lane churn this commit claims to stop.
- Suggested fix: Split the retry exception from the generic format classifier. Use a narrow Cloud Code Assist/tool-call-id predicate for `allowFormatRetry`, or explicitly exclude assistant-prefill phrases from `cloudCodeAssistFormatError`; add a test that the prefill message yields `allowFormatRetry: false` and `surface_error`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes. The source-level probe imports the production classifier and failover policy and shows the assistant-prefill message resolves to retry, not terminal surface.
- Is this the best way to solve the issue? No. The terminal format policy is correct, but the retry exception is wired to a classifier that this commit broadened. The safer fix is a separate retryable-format predicate.

## Reviewed

- Diff: `01cf27bc2e8438c1f4b20afe597c9c98de49147a..398dd6e0b0915f6abd779cdfdba1ac11fc2dc47f`
- Changed files: `CHANGELOG.md`, `apps/shared/OpenClawKit/Sources/OpenClawProtocol/GatewayModels.swift`, failover classifier/policy/runner files, and tests.
- Code read: failover classifier, assistant failover handler, embedded runner call path, auth-profile failure policy, replay-history prefill handling, protocol schema/server method docs.
- GitHub context: issue #79688 and PR #79728 via `gh`.

## Tests / Live Checks

- `pnpm install` after missing `vitest/package.json`
- `pnpm test src/agents/pi-embedded-runner/run/failover-policy.test.ts src/agents/pi-embedded-helpers.isbillingerrormessage.test.ts` passed: 2 files, 153 tests.
- `pnpm protocol:check` passed.
- Direct `pnpm exec tsx` probe confirmed the regression: prefill message classifies as `format`, `isCloudCodeAssistFormatError` returns `true`, and failover policy returns `rotate_profile`.

## Dependency / Web Checks

- No dependency files changed.
- No external web lookup was needed; GitHub issue/PR context was inspected with `gh`.

## Limitations

- I did not run a live Discord/provider scenario. The finding is based on the production classifier and failover decision path that controls whether the provider rejection is retried.

https://github.com/openclaw/openclaw/pull/79728
