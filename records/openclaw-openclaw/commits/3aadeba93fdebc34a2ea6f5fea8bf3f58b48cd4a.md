---
sha: 3aadeba93fdebc34a2ea6f5fea8bf3f58b48cd4a
parent: b85edb3f0cf6c2a8bec06537af9211a044266a6c
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-29T05:36:51+01:00"
commit_committed_at: "2026-04-29T05:37:29+01:00"
result: findings
confidence: high
highest_severity: high
check_conclusion: failure
reviewed_at: 2026-04-29T04:40:32Z
---

# Commit 3aadeba93f

## Summary

Found one regression: the changed doctor config-write path fails core typecheck, and the same call can dereference an undefined env object at runtime when doctor needs to write config.

## Findings

### High: Doctor config write passes optional env to required update guard

- Kind: regression
- File: `src/flows/doctor-health-contributions.ts`
- Line: 522
- Evidence: `DoctorHealthFlowContext.env` is optional, and `doctorCommand` builds the production context in `src/flows/doctor-health.ts` without `env`. This commit changed the call from `env: ctx.env ?? process.env` to `env: ctx.env`, while `shouldSkipLegacyUpdateDoctorConfigWrite` immediately reads `params.env.OPENCLAW_UPDATE_IN_PROGRESS`.
- Impact: `pnpm tsgo:core` fails on this commit with `TS2322: Type 'ProcessEnv | undefined' is not assignable to type 'ProcessEnv'`. If typechecking is bypassed, doctor can also throw when `shouldWriteConfig` is true and no test-supplied `ctx.env` exists.
- Suggested fix: restore the fallback at the call site (`env: ctx.env ?? process.env`) or make/populate `ctx.env` required in the production doctor context.
- Confidence: high

## Reviewed

- Diff: `b85edb3f0cf6c2a8bec06537af9211a044266a6c..3aadeba93fdebc34a2ea6f5fea8bf3f58b48cd4a`
- Changed files: `src/flows/doctor-health-contributions.ts`, `src/flows/doctor-health-contributions.test.ts`
- Code read: changed files, `src/flows/doctor-health.ts`, `src/commands/doctor-config-flow.ts`, update runner/env call sites, installer update path, doctor docs
- Dependencies/web: no dependency files changed; no web lookup needed

## Tests / Live Checks

- `pnpm docs:list`: passed
- `pnpm test src/flows/doctor-health-contributions.test.ts`: passed after installing missing deps
- `pnpm tsgo:core`: failed with the type error above

## Limitations

- Full suite not run because the focused core typecheck already fails on the reviewed commit.
