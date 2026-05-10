---
sha: eacdfbc84b6dfe1c342a2846cfe9777fe55ea5d5
parent: 5b16c478289def65c1a48d9dfd8fca12d6fb1148
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-10T01:21:55+01:00"
commit_committed_at: "2026-05-09T21:47:14-04:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-10T01:53:56+00:00
---

# Commit eacdfbc

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.
- Current `main` includes follow-up fixes for the two risky edges I checked: guarded `sessions_yield` guidance and preserved exact-label target precedence.

## Reviewed

- Diff: `5b16c478289def65c1a48d9dfd8fca12d6fb1148..eacdfbc84b6dfe1c342a2846cfe9777fe55ea5d5`
- Changed files: `CHANGELOG.md`, `docs/tools/subagents.md`, `src/agents/**` subagent prompt/spawn/list/control files, `src/agents/tools/*subagents*`, and `src/auto-reply/reply/*subagents*`
- Code read: spawn validation, registry persistence, active subagent prompt injection, target resolution, slash/tool command resolution, current-main follow-up diffs
- Dependencies/web: no dependency or lockfile changes; no web lookup needed

## Commands

- `pnpm docs:list`
- `git diff --check 5b16c478289def65c1a48d9dfd8fca12d6fb1148..eacdfbc84b6dfe1c342a2846cfe9777fe55ea5d5`
- `pnpm install`
- `pnpm test src/agents/subagent-active-context.test.ts src/agents/subagent-list.test.ts src/agents/tools/sessions-spawn-tool.test.ts src/auto-reply/reply/subagents-utils.test.ts src/agents/system-prompt.test.ts`
- `pnpm test src/agents/tools/subagents-tool.test.ts src/agents/system-prompt.test.ts src/auto-reply/reply/subagents-utils.test.ts`
- `pnpm tsgo:core`

## Limitations

- none
