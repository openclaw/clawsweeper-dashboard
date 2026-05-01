---
sha: c894dbf0ae4ea429d6a45af78eca58702aebabcf
parent: 395ad91323c2aabfbbb32b6a524dbde773fe80a2
repository: openclaw/openclaw
author: "jeffrey701"
committer: "Peter Steinberger"
github_author: jeffrey701
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-29T16:20:19-04:00"
commit_committed_at: "2026-04-30T05:17:27+01:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-04-30T04:37:40+00:00
---

# Commit c894dbf

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.

## Reviewed

- Diff: `395ad91323c2aabfbbb32b6a524dbde773fe80a2..c894dbf0ae4ea429d6a45af78eca58702aebabcf`
- Changed files: `extensions/active-memory/index.ts`, `extensions/active-memory/index.test.ts`
- Code read: full touched files; traced `hasDeprecatedModelFallbackPolicy`, `normalizePluginConfig`, `getModelRef`, `runRecallSubagent`, `maybeResolveActiveRecall`, register-time/live-config warning path, and adjacent model fallback tests.
- Dependencies/web: no dependency changes; inspected GitHub issue `https://github.com/openclaw/openclaw/issues/74587`.
- Commands: `pnpm docs:list`, `git show`, `git diff`, `gh issue view 74587`, `pnpm install` after missing `node_modules`, `pnpm test extensions/active-memory/index.test.ts`, `pnpm exec oxfmt --check --threads=1 extensions/active-memory/index.ts extensions/active-memory/index.test.ts`, `git diff --check`.

## Tests / Live Checks

- `pnpm test extensions/active-memory/index.test.ts`: passed, 94 tests.
- `pnpm exec oxfmt --check --threads=1 extensions/active-memory/index.ts extensions/active-memory/index.test.ts`: passed.
- `git diff --check`: passed.

## Limitations

- No full-suite or live provider run; this is a warning-copy/test-only change, and the focused active-memory shard covers the touched behavior.
