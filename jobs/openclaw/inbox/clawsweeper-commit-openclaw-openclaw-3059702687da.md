---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-3059702687da
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-3059702687da
source: clawsweeper_commit
commit_sha: 3059702687dab9d9446d51b0eca0c15b82fd9151
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/3059702687dab9d9446d51b0eca0c15b82fd9151.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-3059702687da`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/3059702687dab9d9446d51b0eca0c15b82fd9151
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/3059702687dab9d9446d51b0eca0c15b82fd9151.md
- Latest main at intake: 6e940d3cc87f4fad237f982dd2eecdc34903f7eb

## ClawSweeper Report

```md
---
sha: 3059702687dab9d9446d51b0eca0c15b82fd9151
parent: ccb8472daf1674e6bba4e7be2e0ba2e6bf120ca2
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-29T20:17:27+01:00"
commit_committed_at: "2026-04-29T20:17:37+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T19:23:11Z
---

# Commit 3059702

## Summary

Found two actionable issues in the new memory-wiki people-routing surface. The main regression is that `route-question` mode is documented for natural-language questions but the search scorer still requires the entire question, or every token in it, to match before route-specific scoring can run.

## Findings

### Medium: `route-question` search drops natural-language routing queries before applying route metadata

- Kind: bug
- File: `extensions/memory-wiki/src/query.ts`
- Line: 780
- Evidence: Docs advertise natural queries such as `openclaw wiki search "who should I ask about Teams?" --mode route-question` and `openclaw wiki search "who knows Teams rollout?" --mode route-question` in `docs/cli/wiki.md:41` and `docs/cli/wiki.md:157`. But `scorePage` first requires either the exact full query or every query token to appear in the page/search text, then returns `0` before mode-specific scoring runs (`extensions/memory-wiki/src/query.ts:772`-`extensions/memory-wiki/src/query.ts:781`). The `route-question` boost that actually checks `personCard.lane`, `askFor`, `bestUsedFor`, and relationship notes only runs later (`extensions/memory-wiki/src/query.ts:517`-`extensions/memory-wiki/src/query.ts:542`, called at `extensions/memory-wiki/src/query.ts:798`). A normal person card containing “Teams and Azure rollout questions” will not match tokens like `who`, `should`, `knows`, or `about`, so the documented routing query returns no result.
- Impact: The new agent-facing people routing mode works for keyword queries like `Teams Azure`, but fails for the natural question form the CLI docs and agent workflow now recommend.
- Suggested fix: Make `route-question` candidate eligibility mode-aware before the early return. For example, remove interrogative stop words from route queries and/or allow a mode-specific field match on `lane`, `askFor`, `bestUsedFor`, and relationships to satisfy the initial gate. Add a regression test using the exact documented natural query.
- Confidence: high

### Low: `wiki_apply` cannot provide the new evidence metadata fields

- Kind: bug
- File: `extensions/memory-wiki/src/tool.ts`
- Line: 41
- Evidence: The parser and new reporting/search paths now recognize evidence `kind`, `confidence`, and `privacyTier` (`extensions/memory-wiki/src/markdown.ts:21`-`extensions/memory-wiki/src/markdown.ts:31`), and docs list those as supported evidence fields (`docs/plugins/memory-wiki.md:151`-`docs/plugins/memory-wiki.md:160`). However the agent tool schema for `wiki_apply` only allows `sourceId`, `path`, `lines`, `weight`, `note`, and `updatedAt`, with `additionalProperties: false` (`extensions/memory-wiki/src/tool.ts:41`-`extensions/memory-wiki/src/tool.ts:50`). Tool definitions pass this schema through to model/tool providers (`src/agents/pi-tool-definition-adapter.ts:227`).
- Impact: Agents using the intended narrow mutation tool cannot create the evidence classes and privacy tiers that the new provenance coverage and `source-evidence` drilldown depend on. Manual markdown edits and gateway calls can still carry the data, so this is scoped to agent tool use.
- Suggested fix: Add `kind`, `confidence`, and `privacyTier` to `WikiClaimEvidenceSchema`, matching `WikiClaimEvidence` normalization and docs.
- Confidence: high

## Reviewed

- Diff: `ccb8472daf1674e6bba4e7be2e0ba2e6bf120ca2..3059702687dab9d9446d51b0eca0c15b82fd9151`
- Changed files read: all 14 changed files, including source, tests, docs, changelog, and root guidance.
- Adjacent code read: `extensions/memory-wiki/src/apply.ts`, `config.ts`, `vault.ts`, `corpus-supplement.ts`, `prompt-section.ts`, `extensions/memory-wiki/index.ts`, and tool schema adapter paths.
- Parent behavior compared for `query.ts`, `compile.ts`, and `vault.ts`.
- Dependencies/web: no dependency files changed; no web lookup needed.

## Tests / Live Checks

- `pnpm docs:list`: passed.
- `pnpm test extensions/memory-wiki/src/compile.test.ts extensions/memory-wiki/src/markdown.test.ts extensions/memory-wiki/src/query.test.ts extensions/memory-wiki/src/gateway.test.ts`: initially blocked by missing `node_modules`.
- `pnpm install`: completed, lockfile unchanged.
- Re-run targeted tests: 4 files, 40 tests passed.
- `pnpm tsgo:extensions`: passed.
- `git diff --check ccb8472daf1674e6bba4e7be2e0ba2e6bf120ca2..3059702687dab9d9446d51b0eca0c15b82fd9151`: passed.

## Limitations

- Did not run broad `pnpm check:changed` or full-suite gates; review used targeted extension tests and extension typecheck.
```
