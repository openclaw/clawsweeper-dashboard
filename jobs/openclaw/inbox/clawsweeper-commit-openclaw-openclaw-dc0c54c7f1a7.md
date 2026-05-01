---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-dc0c54c7f1a7
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-dc0c54c7f1a7
source: clawsweeper_commit
commit_sha: dc0c54c7f1a7121ff23b6ccc0fac8530e6c1021d
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/dc0c54c7f1a7121ff23b6ccc0fac8530e6c1021d.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-dc0c54c7f1a7`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/dc0c54c7f1a7121ff23b6ccc0fac8530e6c1021d
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/dc0c54c7f1a7121ff23b6ccc0fac8530e6c1021d.md
- Latest main at intake: 914287642de51e700d157f9a4b592a7e6df36a9b

## ClawSweeper Report

```md
---
sha: dc0c54c7f1a7121ff23b6ccc0fac8530e6c1021d
parent: 83753535eba457171f9c31c0b271764c5d59eacc
repository: openclaw/openclaw
author: "ethanclaw"
committer: "GitHub"
github_author: ethanclaw
github_committer: web-flow
co_authors: ["openclaw-clownfish[bot]", "Vincent Koc"]
commit_authored_at: "2026-04-30T15:45:41+08:00"
commit_committed_at: "2026-04-30T00:45:41-07:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T08:05:00+00:00
---

# Commit dc0c54c

## Summary

Found one low-severity CLI correctness issue in the new warning text.

## Findings

### Low: Missing-agent warning can name the wrong default agent

- Kind: bug
- File: `src/cli/cron-cli/register.cron-add.ts`
- Line: 238
- Evidence: The new warning hardcodes `default agent (main)` when `payload.kind === "agentTurn"` and `agentId` is omitted. Runtime cron execution resolves omitted `job.agentId` through `resolveDefaultAgentId(effectiveConfig)` in `src/gateway/server-cron.ts:136`, and `resolveDefaultAgentId` can choose `agents.list[].default` or the first configured agent, not necessarily `main`, in `src/agents/agent-scope-config.ts:87`. Existing route coverage demonstrates a configured default agent `home` being selected in `src/routing/resolve-route.test.ts:620`.
- Impact: In multi-agent configs where the default agent is not `main`, `openclaw cron add --message ...` warns that the job will run as `main`, while the Gateway will actually run it as the configured default agent. This weakens the fix for #42196 because the warning can still mislead users about which agent will execute the scheduled task.
- Suggested fix: Avoid naming `main` in the client-only warning, e.g. say `the configured default agent`, or fetch/display the resolved default agent from Gateway/config before warning.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: configure `agents.list` with a non-main default such as `home`, run `openclaw cron add --message ...` without `--agent`, and observe the CLI warning says `main` while the Gateway path resolves the omitted agent through `resolveDefaultAgentId`.
- Is this the best way to solve the issue? no: warning is the right product direction, but the text should not hardcode `main` unless the CLI has proven that is the configured default.

## Reviewed

- Diff: `83753535eba457171f9c31c0b271764c5d59eacc..dc0c54c7f1a7121ff23b6ccc0fac8530e6c1021d`
- Changed files: `CHANGELOG.md`, `src/cli/cron-cli.test.ts`, `src/cli/cron-cli/register.cron-add.ts`
- Code read: full `src/cli/cron-cli/register.cron-add.ts`; relevant `src/cli/cron-cli.test.ts`; current cron runtime paths in `src/gateway/server-cron.ts`, `src/cron/isolated-agent/run.ts`, `src/cron/isolated-agent/session-key.ts`, `src/agents/agent-scope-config.ts`, and routing/default-agent tests.
- Dependencies/web: no dependency files changed; inspected PR #42245 and issue #42196 with `gh`.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because `node_modules` was missing
- `pnpm test src/cli/cron-cli.test.ts` passed: 64 tests
- `pnpm exec oxfmt --check --threads=1 src/cli/cron-cli.test.ts src/cli/cron-cli/register.cron-add.ts CHANGELOG.md` passed
- `git diff --check 83753535eba457171f9c31c0b271764c5d59eacc..dc0c54c7f1a7121ff23b6ccc0fac8530e6c1021d` passed

## Dependency / Web Checks

- No package or lockfile changes.
- No general web lookup needed.

## Limitations

- Did not run a live Gateway cron job; the issue is established from the CLI warning path and the current Gateway default-agent resolution path.

https://github.com/openclaw/openclaw/pull/42245
```
