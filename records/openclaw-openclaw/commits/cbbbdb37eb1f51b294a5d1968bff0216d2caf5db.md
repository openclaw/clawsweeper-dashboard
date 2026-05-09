---
sha: cbbbdb37eb1f51b294a5d1968bff0216d2caf5db
parent: e9373925bb2beb92b62b7203c0c8894175f9bdbb
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-10T00:36:18+01:00"
commit_committed_at: "2026-05-10T00:36:18+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-09T23:42:28+00:00
---

# Commit cbbbdb3

## Summary

Found one low-severity test regression: one revised assertion can pass when the API Base URL prompt is missing entirely.

## Findings

### Low: API Base URL assertion no longer proves the prompt exists

- Kind: test_gap
- File: `src/commands/onboard-custom.test.ts`
- Line: 151
- Evidence: The test now does `const apiBaseUrlCall = prompter.text.mock.calls.find(...)` and then `expect(apiBaseUrlCall?.[0].initialValue).toBeUndefined()`. If no `"API Base URL"` prompt is made, `apiBaseUrlCall` is `undefined`, optional chaining returns `undefined`, and the assertion still passes. The production prompt is currently at `src/commands/onboard-custom.ts:137`.
- Impact: A future regression that skips or renames the custom API base URL prompt could pass this test, leaving custom endpoint setup unguarded.
- Suggested fix: Assert the call exists before checking `initialValue`, for example `expect(apiBaseUrlCall).toBeDefined()` followed by the existing property assertion.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes; the optional-chain assertion is enough to show that a missing call evaluates to `undefined` and passes `toBeUndefined()`.
- Is this the best way to solve the issue? yes; requiring the matching prompt call preserves the intended assertion while keeping the new call-specific lookup.

## Reviewed

- Diff: `e9373925bb2beb92b62b7203c0c8894175f9bdbb..cbbbdb37eb1f51b294a5d1968bff0216d2caf5db`
- Changed files: `src/commands/doctor-config-preflight.test.ts`, `src/commands/doctor-device-pairing.test.ts`, `src/commands/onboard-custom.test.ts`, `src/commands/onboard-helpers.test.ts`, `src/commands/onboard-skills.test.ts`
- Code read: changed tests in full; related command code for custom onboarding, doctor config preflight, device pairing health, onboarding helpers, and skills setup.
- Dependencies/web: no dependency files changed; no web lookup needed.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because `node_modules` was missing
- `pnpm test src/commands/doctor-config-preflight.test.ts src/commands/doctor-device-pairing.test.ts src/commands/onboard-custom.test.ts src/commands/onboard-helpers.test.ts src/commands/onboard-skills.test.ts` passed: 5 files, 40 tests
- `pnpm exec oxfmt --check --threads=1 <changed files>` passed

## Limitations

- Full suite not run; this is a test-only commit and focused command tests passed.
