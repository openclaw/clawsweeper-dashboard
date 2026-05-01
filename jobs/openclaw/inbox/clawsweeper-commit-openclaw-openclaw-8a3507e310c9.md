---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-8a3507e310c9
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-8a3507e310c9
source: clawsweeper_commit
commit_sha: 8a3507e310c9bd1f1005c9df8b8f540ba7d8c819
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/8a3507e310c9bd1f1005c9df8b8f540ba7d8c819.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-8a3507e310c9`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/8a3507e310c9bd1f1005c9df8b8f540ba7d8c819
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/8a3507e310c9bd1f1005c9df8b8f540ba7d8c819.md
- Latest main at intake: dac72374944f35fb89e21dce0f3f2299f27d03c9

## ClawSweeper Report

```md
---
sha: 8a3507e310c9bd1f1005c9df8b8f540ba7d8c819
parent: 4808361fcaa3e5b969ffa4b5d8e8ffd0d5d5c582
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "GitHub"
github_author: clawsweeper[bot]
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-29T20:36:31+01:00"
commit_committed_at: "2026-04-29T20:36:31+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-29T19:39:59+00:00
---

# Commit 8a3507e

## Summary

Found one low-severity route-question recall regression in the compiled-digest fast path.

## Findings

### Low: Route-question digest prefilter can drop relationship-only routing matches

- Kind: bug
- File: `extensions/memory-wiki/src/query.ts`
- Line: 544
- Evidence: Full-page route-question scoring includes relationship `kind`, `targetTitle`, and `note` in `buildPageRouteQuestionFields` at `extensions/memory-wiki/src/query.ts:527`, but the new digest route matcher only checks lane, ask-for/avoid, and best/not-enough fields at `extensions/memory-wiki/src/query.ts:544`. The compiled digest actually writes `topRelationships` at `extensions/memory-wiki/src/compile.ts:1160`, but `QueryDigestPage` does not model or read it. Once the digest prefilter returns at least `maxResults` candidates, `searchWikiCorpus` returns without scanning remaining pages at `extensions/memory-wiki/src/query.ts:1128`.
- Impact: A compiled vault with many natural route-question candidates can omit a person page whose only relevant routing evidence is relationship context, even though the non-digest scorer would match and rank that page. This conflicts with the documented `route-question` behavior covering relationship context.
- Suggested fix: Include digest `topRelationships` in `QueryDigestPage` and `buildDigestRouteQuestionFields`, matching the full-page route-question fields. Consider a regression test with enough digest candidates to hit the `results.length >= maxResults` early return.
- Confidence: high

## Reviewed

- Diff: `4808361fcaa3e5b969ffa4b5d8e8ffd0d5d5c582..8a3507e310c9bd1f1005c9df8b8f540ba7d8c819`
- Changed files: `extensions/memory-wiki/src/query.ts`, `extensions/memory-wiki/src/tool.ts`, related tests.
- Code read: full changed files, memory-wiki docs, compile digest generation, markdown normalization, apply path, adjacent query/compile/gateway tests.
- Dependencies/web: no dependency changes; no web lookup needed.

## Tests / Live Checks

- `pnpm docs:list` passed.
- Initial targeted test failed because `node_modules` was missing.
- Ran `pnpm install`, then `pnpm test extensions/memory-wiki/src/query.test.ts extensions/memory-wiki/src/tool.test.ts extensions/memory-wiki/src/claim-health.test.ts`: 3 files / 21 tests passed.
- Ad-hoc direct `tsx --eval` smoke was blocked by an unrelated package export error while importing repo modules directly.

## Limitations

- Did not run the full changed gate; this was a focused report-only commit review.
```
