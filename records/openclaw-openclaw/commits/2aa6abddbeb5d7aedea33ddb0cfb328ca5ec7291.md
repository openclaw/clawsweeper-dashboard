---
sha: 2aa6abddbeb5d7aedea33ddb0cfb328ca5ec7291
parent: ef7c528c8ae3a33347eb2e0cb11cf18ca08872ef
repository: openclaw/openclaw
author: "Logan Ye"
committer: "GitHub"
github_author: yelog
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-29T19:16:32+08:00"
commit_committed_at: "2026-04-29T07:16:32-04:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-04-29T11:20:49+00:00
---

# Commit 2aa6abddbe

Nothing found.

## Reviewed

- Diff: `ef7c528c8ae3a33347eb2e0cb11cf18ca08872ef..2aa6abddbeb5d7aedea33ddb0cfb328ca5ec7291`
- Changed files: `extensions/memory-core/src/memory/manager-search.ts`, `extensions/memory-core/src/memory/manager.ts`, `extensions/memory-core/src/memory/manager-search.test.ts`
- Code read: changed files, memory search call sites, FTS schema/indexing helpers, hybrid query builder/scoring, source-filter construction, `memory_search` corpus routing, memory CLI docs
- Dependencies/web: no dependency changes; inspected PR `#74175` and linked issue `#74036` via `gh`
- Commands: `pnpm docs:list`; `pnpm install` after missing `node_modules`; `pnpm test extensions/memory-core/src/memory/manager-search.test.ts` passed, 12 tests; `git diff --check ...` passed; focused `node:sqlite` FTS smoke; `git status --short` clean

## Limitations

- none
