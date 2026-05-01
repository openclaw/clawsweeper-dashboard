---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-b277ae3f4c40
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-b277ae3f4c40
source: clawsweeper_commit
commit_sha: b277ae3f4c402596402cb8be5be4dca2106483f4
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/b277ae3f4c402596402cb8be5be4dca2106483f4.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-b277ae3f4c40`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/b277ae3f4c402596402cb8be5be4dca2106483f4
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/b277ae3f4c402596402cb8be5be4dca2106483f4.md
- Latest main at intake: 3c4851037b6cea1f28cd7192b16e190f79d157cc

## ClawSweeper Report

```md
---
sha: b277ae3f4c402596402cb8be5be4dca2106483f4
parent: a102f4dede6af52523473ac29575c7e442493d15
repository: openclaw/openclaw
author: "Vignesh"
committer: "GitHub"
github_author: vignesh07
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-30T18:14:07-07:00"
commit_committed_at: "2026-05-01T01:14:07Z"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T01:33:56Z
---

# Commit b277ae3

## Summary

Found one regression where commitment safety handling can disable tools for unrelated due heartbeat tasks in the same heartbeat turn.

## Findings

### Medium: Due commitments disable tools for due HEARTBEAT.md tasks

- Kind: regression
- File: `src/infra/heartbeat-runner.ts`
- Line: 1324
- Evidence: `resolveHeartbeatRunPrompt` appends the commitment prompt to a due periodic-task prompt when `preflight.tasks` has due tasks (`src/infra/heartbeat-runner.ts:856` and `src/infra/heartbeat-runner.ts:870`). Later, any prompt with due commitments sets `{ disableTools: true, skillFilter: [] }` for the whole run (`src/infra/heartbeat-runner.ts:1324`). That means the model receives “Run the following periodic tasks…” but the run is forced into no-tools mode.
- Impact: A user with opt-in commitments and normal heartbeat tasks can have scheduled heartbeat work silently degraded whenever a commitment is due in the same session. Tasks that need tools, MCP, skills, or CLI-backed execution will not be able to run even though they are unrelated to the untrusted commitment metadata.
- Suggested fix: Keep commitment turns no-tools, but do not merge them into the same prompt as due heartbeat tasks. Run due tasks first with their normal tool policy, then process commitments in a separate no-tools turn, or defer commitment delivery until no heartbeat tasks are due.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: enable commitments, configure heartbeat `target: "last"`, create a `HEARTBEAT.md` `tasks:` entry that is due, and seed a due commitment for the same agent/session. `getReplyFromConfig` will receive a prompt containing both the periodic task and commitment metadata, with `opts.disableTools === true`.
- Is this the best way to solve the issue? yes: separating the unsafe commitment context from task execution preserves the security fix while avoiding a behavior change for existing heartbeat tasks.

## Reviewed

- Diff: `a102f4dede6af52523473ac29575c7e442493d15..b277ae3f4c402596402cb8be5be4dca2106483f4`
- Changed files: all 32 files from the prompt.
- Code read: `src/commitments/store.ts`, `src/commitments/runtime.ts`, `src/commitments/extraction.ts`, `src/infra/heartbeat-runner.ts`, `src/infra/outbound/targets.ts`, `src/agents/cli-runner/prepare.ts`, `src/agents/cli-backends.ts`, plugin CLI backend definitions, relevant tests, docs, and Docker E2E harness.
- Dependencies/web: no external web lookup needed; no dependency version changes.
- PR metadata: `gh pr view 75302` showed the merge commit and green relevant checks.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm test src/infra/heartbeat-runner.commitments.test.ts src/commitments/store.test.ts src/commitments/commitments-full-chain.integration.test.ts src/agents/cli-runner/prepare.test.ts` passed.
- `git diff --check a102f4dede6af52523473ac29575c7e442493d15..b277ae3f4c402596402cb8be5be4dca2106483f4` passed.

## Limitations

- I did not run the new Docker E2E lane or full changed gate; the focused tests passed and CI for the PR was green.
```
