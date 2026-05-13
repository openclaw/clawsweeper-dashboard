---
sha: cb93c0f8f59d1fd77a2aa2eeb25e1df3bc0e56bb
parent: 290d3879eb83272906e55aa9c70bca5d8f727e5f
repository: openclaw/openclaw
author: "sxxtony"
committer: "Ayaan Zaidi"
github_author: sxxtony
github_committer: obviyus
co_authors: []
commit_authored_at: "2026-05-11T14:19:31Z"
commit_committed_at: "2026-05-13T10:12:31+05:30"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-13T04:48:16Z
---

# Commit cb93c0f8f5

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.
- Note: current `main` includes follow-up `306b51011f`, which removes the temporary typed offset-rotation helper surface and tightens legacy v2 offset rotation handling. No current actionable regression remains in the touched path.

## Reviewed

- Diff: `290d3879eb83272906e55aa9c70bca5d8f727e5f..cb93c0f8f59d1fd77a2aa2eeb25e1df3bc0e56bb`
- Changed files: `extensions/telegram/src/monitor-polling.runtime.ts`, `extensions/telegram/src/monitor.ts`, `extensions/telegram/src/offset-rotation-handler.test.ts`, `extensions/telegram/src/offset-rotation-handler.ts`, `extensions/telegram/src/update-offset-store.ts`
- Code read: changed files at the reviewed commit, current `main` versions of the touched Telegram offset/monitor paths, follow-up diff `cb93c0f8f5..HEAD`, adjacent `update-offset-store.test.ts`, `monitor.test.ts`, `channel.ts` lifecycle reset path, and Telegram offset runtime API exports.
- Dependencies/web: no dependency files changed; no web lookup needed.
- Commands: `git show`, `git diff`, `git log`, `rg`, `sed`, `pnpm test extensions/telegram/src/update-offset-store.test.ts extensions/telegram/src/monitor.test.ts`

## Tests / Live Checks

- `pnpm test extensions/telegram/src/update-offset-store.test.ts extensions/telegram/src/monitor.test.ts` passed: 2 files, 44 tests.

## Limitations

- none
