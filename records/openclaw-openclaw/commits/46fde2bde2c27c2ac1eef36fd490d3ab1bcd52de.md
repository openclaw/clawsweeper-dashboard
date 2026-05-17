---
sha: 46fde2bde2c27c2ac1eef36fd490d3ab1bcd52de
parent: 549a0ea313104d213bbe90e924acd6027bbd84c7
repository: openclaw/openclaw
author: "Alex Knight"
committer: "GitHub"
github_author: amknight
github_committer: web-flow
co_authors: ["Alex Knight"]
commit_authored_at: "2026-05-17T13:37:31+10:00"
commit_committed_at: "2026-05-17T03:37:31Z"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-17T03:45:05Z
---

# Commit 46fde2bde2c2

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Yes. The commit narrowly gates descendant waiting and active-descendant suppression on `!deliveryBestEffort`, while preserving stale interim suppression and required-delivery behavior.

## Reviewed

- Diff: `549a0ea313104d213bbe90e924acd6027bbd84c7..46fde2bde2c27c2ac1eef36fd490d3ab1bcd52de`
- Changed files: `CHANGELOG.md`, `src/cron/isolated-agent/delivery-dispatch.ts`, `src/cron/isolated-agent/delivery-dispatch.double-announce.test.ts`
- Code read: changed files, `src/cron/isolated-agent/run.ts`, `src/cron/isolated-agent/subagent-followup.ts`, `src/cron/service/timer.ts`, `src/cron/service/ops.ts`, `src/cron/heartbeat-policy.ts`
- PR/issue context: `gh pr view 82843`, `gh issue view 44428`; `gitcrawl` unavailable in this checkout
- Dependencies/web: no dependency files changed; no external web lookup needed
- Current main check: cron source files touched by the commit are unchanged on current `main`; only `CHANGELOG.md` has later unrelated churn

## Tests / Live Checks

- `git diff --check 549a0ea313104d213bbe90e924acd6027bbd84c7..46fde2bde2c27c2ac1eef36fd490d3ab1bcd52de` passed.
- Initial focused Vitest run failed because dependencies were missing: `Cannot find module 'vitest/package.json'`.
- Ran `pnpm install`; lockfile was already up to date.
- Retried: `env OPENCLAW_TEST_FAST=1 OPENCLAW_VITEST_MAX_WORKERS=1 OPENCLAW_VITEST_NO_OUTPUT_TIMEOUT_MS=900000 node scripts/run-vitest.mjs src/cron/isolated-agent/delivery-dispatch.double-announce.test.ts` passed: 65 tests.

## Limitations

- Did not rerun broad CI or live E2E locally; the touched behavior is covered by the focused regression file, and the PR body records prior Blacksmith/Testbox E2E proof for the real cron path.
