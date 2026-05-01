---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-09310931cf94
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-09310931cf94
source: clawsweeper_commit
commit_sha: 09310931cf944d79bcd161c2a4f211b06cc7e0b0
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/09310931cf944d79bcd161c2a4f211b06cc7e0b0.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-09310931cf94`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/09310931cf944d79bcd161c2a4f211b06cc7e0b0
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/09310931cf944d79bcd161c2a4f211b06cc7e0b0.md
- Latest main at intake: bbf932fd7d69c32f800779d98312fbdcc3901c1b

## ClawSweeper Report

```md
---
sha: 09310931cf944d79bcd161c2a4f211b06cc7e0b0
parent: db18323551019c10ca7e940299d7218b57404d43
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T04:13:17+01:00"
commit_committed_at: "2026-04-30T04:13:39+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T03:19:17Z
---

# Commit 09310931

## Summary

Found one regression in the new provider-based bundled runtime dependency selection: valid bare model refs are not mapped through manifest model ownership, so doctor/plugins deps can miss the configured provider’s staged dependencies.

## Findings

### Medium: Bare configured model refs no longer select provider runtime deps

- Kind: regression
- File: `src/plugins/bundled-runtime-deps-selection.ts`
- Line: 225
- Evidence: `addConfiguredProviderFromModelRef` treats every model string as `value.split("/", 1)[0]`, so `agents.defaults.model: "gpt-5.5"` records provider id `gpt-5.5` instead of resolving the OpenAI owner. The existing provider owner path supports bare refs via manifest `modelSupport` prefixes in `src/plugins/providers.ts:533` and `src/plugins/providers.ts:544`; OpenAI declares `modelPrefixes: ["gpt-", "o1", "o3", "o4"]` and has staged runtime deps in `extensions/openai/openclaw.plugin.json:8` and `extensions/openai/package.json:7`.
- Impact: Packaged `openclaw doctor --fix` / `openclaw plugins deps --repair` can report no OpenAI/Anthropic provider deps for common valid configs like `agents.defaults.model: "gpt-5.5"` or `claude-sonnet-4-6`, while the qualified form `openai/gpt-5.5` works. That regresses the repair path this commit is adding for configured model providers.
- Suggested fix: Build provider/plugin selection from the same model-owner logic used by provider activation, e.g. `resolveOwningPluginIdsForModelRefs` or equivalent manifest `modelSupport` handling, instead of inferring only slash-prefixed provider ids. Also cover alias/bare model refs in tests.
- Confidence: high

## Reviewed

- Diff: `db18323551019c10ca7e940299d7218b57404d43..09310931cf944d79bcd161c2a4f211b06cc7e0b0`
- Changed files: docs updates, doctor bundled runtime deps, runtime deps selection, runtime mirror, tests/fixtures.
- Code read: changed files in full; provider activation/model owner code; runtime deps loader and gateway startup paths; OpenAI/Anthropic provider manifests and package deps.
- Dependencies/web: no dependency file changes; no web lookup needed.

## Tests / Live Checks

- `pnpm docs:list`
- `git diff --check db18323551019c10ca7e940299d7218b57404d43..09310931cf944d79bcd161c2a4f211b06cc7e0b0`
- Initial focused test run failed because `node_modules` was missing; ran `pnpm install`, then retried.
- `pnpm test src/plugins/bundled-runtime-deps.test.ts src/plugins/bundled-runtime-root.test.ts src/commands/doctor-bundled-plugin-runtime-deps.test.ts` passed.
- Focused repro showed `model: "gpt-5.5"` produced `bareDeps: []`, while `model: "openai/gpt-5.5"` produced `qualifiedDeps: ["ws@^8.20.0"]`.

## Limitations

- Did not run the full suite; focused tests and targeted runtime-deps reproduction only.

https://github.com/openclaw/openclaw/commit/09310931cf944d79bcd161c2a4f211b06cc7e0b0
```
