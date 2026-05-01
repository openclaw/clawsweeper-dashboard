---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-1738ebb3855a
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-1738ebb3855a
source: clawsweeper_commit
commit_sha: 1738ebb3855a4da4034030879a02e7d3a84f251d
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/1738ebb3855a4da4034030879a02e7d3a84f251d.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-1738ebb3855a`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/1738ebb3855a4da4034030879a02e7d3a84f251d
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/1738ebb3855a4da4034030879a02e7d3a84f251d.md
- Latest main at intake: f1ec163f77b924a9ea3281e88174d18f7f575edb

## ClawSweeper Report

```md
---
sha: 1738ebb3855a4da4034030879a02e7d3a84f251d
parent: c16a4dfce6f7c26a4056beb8a4c34cc86fea9d8a
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-29T21:12:43+01:00"
commit_committed_at: "2026-04-29T21:15:03+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-29T20:19:12Z
---

# Commit 1738ebb

## Summary

Found one concrete regression: the new `zod` runtime dependency appears correct for the MCP SDK package graph, but the commit does not update the repo’s existing runtime-dependency contract, so the focused contract test is red.

## Findings

### Low: Browser plugin now fails the unused runtime dependency contract

- Kind: regression
- File: `extensions/browser/package.json`
- Line: 14
- Evidence: The commit adds `"zod": "^4.3.6"` to `extensions/browser/package.json:14`, but `extensions/browser` runtime source does not import `zod` directly. The existing contract at `src/plugins/contracts/extension-runtime-dependencies.contract.test.ts:228` checks direct dependencies against runtime source text unless they are listed as indirect runtime dependencies. Running `pnpm test src/plugins/contracts/extension-runtime-dependencies.contract.test.ts` fails with `expected [ 'zod' ] to deeply equal []` for `extensions/browser does not keep unused direct runtime dependencies`.
- Impact: The targeted contracts-plugin lane is failing on this commit, so changed-gate/CI can reject the package metadata fix even though `zod` is needed through the MCP SDK dependency graph.
- Suggested fix: Add `zod` to the `INDIRECT_RUNTIME_DEPENDENCIES` allowlist for `extensions/browser`, or adjust the contract to recognize dependency-owned peer/runtime requirements from direct dependencies. Then rerun the same targeted contract test.
- Confidence: high

## Reviewed

- Diff: `c16a4dfce6f7c26a4056beb8a4c34cc86fea9d8a..1738ebb3855a4da4034030879a02e7d3a84f251d`
- Changed files: `extensions/browser/package.json`, `pnpm-lock.yaml`
- Code read: `extensions/AGENTS.md`, `extensions/browser/package.json`, `extensions/browser/src/browser/chrome-mcp.ts`, `src/plugins/contracts/extension-runtime-dependencies.contract.test.ts`, bundled runtime dependency staging paths
- Dependency/web: `npm view @modelcontextprotocol/sdk@1.29.0`, `npm view zod@4.3.6`, npm package pages for package-health context

## Tests / Live Checks

- `pnpm install --frozen-lockfile --lockfile-only --ignore-scripts`: passed
- `pnpm install`: passed after initial test attempt showed missing `node_modules`
- `pnpm test src/plugins/contracts/extension-runtime-dependencies.contract.test.ts`: failed as described above
- `pnpm audit --prod`: passed, no known vulnerabilities found
- `git diff --check c16a4dfce6f7c26a4056beb8a4c34cc86fea9d8a 1738ebb3855a4da4034030879a02e7d3a84f251d`: passed

## Limitations

- No full suite run; the focused contract test already produced a concrete failure on the touched surface.
```
