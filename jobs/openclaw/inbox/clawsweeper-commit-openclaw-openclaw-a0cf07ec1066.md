---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-a0cf07ec1066
mode: autonomous
allowed_actions:
  - comment
  - label
  - fix
  - raise_pr
blocked_actions:
  - close
  - merge
require_human_for:
  - close
  - merge
canonical: []
candidates: []
cluster_refs: []
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: false
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-a0cf07ec1066
source: clawsweeper_commit
commit_sha: a0cf07ec106617b0d811a384df9da2895b2ce522
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/a0cf07ec106617b0d811a384df9da2895b2ce522.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-a0cf07ec1066`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/a0cf07ec106617b0d811a384df9da2895b2ce522
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/a0cf07ec106617b0d811a384df9da2895b2ce522.md
- Latest main at intake: d30b8dccfda391cd5b6eb9d2484676d4d07c1dae

## ClawSweeper Report

```md
---
sha: a0cf07ec106617b0d811a384df9da2895b2ce522
parent: 4109446c2f5445517e4b1b34381b3d4b1eeba5ec
repository: openclaw/openclaw
author: "Shakker"
committer: "Shakker"
github_author: shakkernerd
github_committer: shakkernerd
co_authors: []
commit_authored_at: "2026-04-29T21:52:00+01:00"
commit_committed_at: "2026-04-30T00:13:13+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-29T23:18:51+00:00
---

# Commit a0cf07e

## Summary

Found one low-severity test-suite regression: the production change appears intentional, but an existing focused test file still asserts the old registry-loader option shape and now fails.

## Findings

### Low: Forward-compat tests still expect registry loading without `workspaceDir`

- Kind: reliability
- File: `src/commands/models/list.list-command.forward-compat.test.ts`
- Line: 639
- Evidence: This commit now passes `workspaceDir` into `loadListModelRegistry` at `src/commands/models/list.list-command.ts:110`. Running `OPENCLAW_VITEST_MAX_WORKERS=1 pnpm test src/commands/models/list.list-command.forward-compat.test.ts` fails three assertions at lines 639, 710, and 810 because the received options include `workspaceDir` and, on two paths, `loadAvailability: undefined`.
- Impact: The commands Vitest shard can fail on this commit even though the runtime behavior is likely correct, blocking changed-gate/CI.
- Suggested fix: Update those exact-call assertions to include `workspaceDir: expect.any(String)` and `loadAvailability: undefined` where applicable, or use `expect.objectContaining` for the fields the tests actually care about.
- Confidence: high

## Reviewed

- Diff: `4109446c2f5445517e4b1b34381b3d4b1eeba5ec..a0cf07ec106617b0d811a384df9da2895b2ce522`
- Changed files: `CHANGELOG.md`, `src/commands/models/list.list-command.ts`, `src/commands/models/list.registry-load.ts`, `src/commands/models/list.registry.ts`
- Code read: changed files in full; `src/agents/pi-auth-discovery.ts`; `src/agents/pi-auth-discovery-core.ts`; `src/agents/pi-model-discovery.ts`; model-list row/source-plan/catalog paths; adjacent auth/list tests.
- Docs read: `docs/cli/models.md`, `docs/auth-credential-semantics.md`
- Dependency source: inspected installed `@mariozechner/pi-coding-agent` `AuthStorage` and `ModelRegistry` source for `getAvailable()` / `hasConfiguredAuth()` behavior.

## Tests / Live Checks

- `git diff --check 4109446c2f5445517e4b1b34381b3d4b1eeba5ec..a0cf07ec106617b0d811a384df9da2895b2ce522`: passed.
- `pnpm exec oxfmt --check --threads=1 src/commands/models/list.list-command.ts src/commands/models/list.registry-load.ts src/commands/models/list.registry.ts`: passed.
- `OPENCLAW_VITEST_MAX_WORKERS=1 pnpm test src/commands/models.list.e2e.test.ts src/agents/pi-model-discovery.auth.test.ts`: passed.
- `OPENCLAW_VITEST_MAX_WORKERS=1 pnpm test src/commands/models/list.list-command.forward-compat.test.ts`: failed as described above.
- A grouped run including `src/commands/models/list.auth-index.test.ts` also exposed an unrelated failure at `src/commands/models/list.auth-index.test.ts:146`; I did not classify it because this commit does not touch that path.

## Dependency / Web Checks

- No web lookup was needed; no dependency manifest changed.
- Installed dependencies once with `pnpm install` after the first test attempt found missing `node_modules`.

## Limitations

- Full changed-gate was not run; review used focused source tracing and targeted tests.

https://github.com/openclaw/openclaw/commit/a0cf07ec106617b0d811a384df9da2895b2ce522
```
