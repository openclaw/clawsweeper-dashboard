---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-faad655c2101
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-faad655c2101
source: clawsweeper_commit
commit_sha: faad655c21011af7c8da09918279d553ec6ef4a2
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/faad655c21011af7c8da09918279d553ec6ef4a2.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-faad655c2101`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/faad655c21011af7c8da09918279d553ec6ef4a2
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/faad655c21011af7c8da09918279d553ec6ef4a2.md
- Latest main at intake: ffe67e9cdc9e986c0d879bca8a80445877b2bad7

## ClawSweeper Report

```md
---
sha: faad655c21011af7c8da09918279d553ec6ef4a2
parent: 873df7613274915f7b24047e267ee33378224a6a
repository: openclaw/openclaw
author: "amittell"
committer: "Peter Steinberger"
github_author: amittell
github_committer: steipete
co_authors: []
commit_authored_at: "2026-03-15T18:13:21-04:00"
commit_committed_at: "2026-04-30T04:03:41+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T03:07:07Z
---

# Commit faad655c21

## Summary

Found one concrete regression in the added test. The production change in `memory_forget` is directionally correct: `db.delete()` requires the full UUID, and the candidate list now displays it. The new regression test, however, mocks the wrong OpenAI SDK method and fails before it can assert the new behavior.

## Findings

### Medium: Added `memory_forget` test fails before reaching its assertion

- Kind: regression
- File: `extensions/memory-lancedb/index.test.ts`
- Line: 2198
- Evidence: The new test mock defines only `embeddings.create`, but production embedding code calls `this.client.post("/embeddings", ...)` from `OpenAiCompatibleEmbeddings.embed` at `extensions/memory-lancedb/index.ts:299`. Running `pnpm test extensions/memory-lancedb/index.test.ts -- -t "memory_forget candidate list shows full UUIDs, not truncated IDs"` fails with `TypeError: this.client.post is not a function` at `extensions/memory-lancedb/index.ts:299`, called by `memory_forget` at `extensions/memory-lancedb/index.ts:737`.
- Impact: The `extension-memory` Vitest lane is now red when this test runs, blocking changed-gate/CI validation for the memory plugin and preventing the regression test from actually proving the full-ID behavior.
- Suggested fix: Update this mock to match the existing OpenAI mocks in the same file, using a `post = vi.fn((_path, opts) => invokeEmbeddingCreate(..., opts.body))` implementation, then rerun the focused test.
- Confidence: high

## Reviewed

- Diff: `873df7613274915f7b24047e267ee33378224a6a..faad655c21011af7c8da09918279d553ec6ef4a2`
- Changed files: `extensions/memory-lancedb/index.ts`, `extensions/memory-lancedb/index.test.ts`
- Code read: full changed files, `extensions/memory-lancedb/lancedb-runtime.ts`, `extensions/memory-lancedb/config.ts`, `extensions/memory-lancedb/api.ts`, `extensions/memory-lancedb/package.json`, and relevant memory docs.
- Dependency/web: no dependency files changed; no external web facts needed.

## Tests / Live Checks

- `pnpm docs:list`: passed.
- `git diff --check 873df7613274915f7b24047e267ee33378224a6a..faad655c21011af7c8da09918279d553ec6ef4a2`: passed.
- Initial focused test could not start because `node_modules` was missing; ran `pnpm install`, then retried once.
- `pnpm test extensions/memory-lancedb/index.test.ts -- -t "memory_forget candidate list shows full UUIDs, not truncated IDs"`: failed with the mock/API mismatch above.

## Limitations

- Full suite not run because the focused newly added test already fails.
```
