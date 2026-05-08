---
sha: 9da2f7cf812cf8ad232fbaedf2edd96994dfa953
parent: dce9261415f79e9e4bff2b3d83ee438d002ad5ad
repository: openclaw/openclaw
author: "Statxc"
committer: "GitHub"
github_author: statxc
github_committer: web-flow
co_authors: ["statxc", "velvet-shark"]
commit_authored_at: "2026-05-08T09:11:17-05:00"
commit_committed_at: "2026-05-08T16:11:17+02:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-08T14:19:41Z
---

# Commit 9da2f7cf81

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found. The linked PR includes live Gateway RPC proof for the parent-backed `sessions.create` path, and the focused regression test now covers the in-place reset branch.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.

## Reviewed

- Diff: `dce9261415f79e9e4bff2b3d83ee438d002ad5ad..9da2f7cf812cf8ad232fbaedf2edd96994dfa953`
- Changed files: `CHANGELOG.md`, `docs/tools/slash-commands.md`, `docs/web/control-ui.md`, `src/gateway/server-methods/sessions.ts`, `src/gateway/server.sessions.reset-hooks.test.ts`
- Code read: changed gateway handler, reset service, session-key/main-session helpers, Control UI `/new` caller, related create/reset tests, relevant docs.
- Dependencies/web: no dependency changes; inspected GitHub PR #71170 and issue #77434 with `gh`.
- Commands: `pnpm docs:list`; `git show`; `git diff`; `git diff --check`; `gh pr view 71170`; `gh issue view 77434`; `pnpm install` after missing `node_modules`; `pnpm test src/gateway/server.sessions.reset-hooks.test.ts`; `pnpm test src/gateway/server.sessions.create.test.ts`.

## Limitations

- None material. I did not run a fresh browser UI smoke because the changed behavior is in the Gateway `sessions.create` RPC path and was covered by focused tests plus the PR’s live Gateway RPC proof.

https://github.com/openclaw/openclaw/pull/71170
