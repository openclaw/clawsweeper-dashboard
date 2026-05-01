---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-e0fe02fb0970
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-e0fe02fb0970
source: clawsweeper_commit
commit_sha: e0fe02fb0970bcffe8b89454f4c79d2a015bcc2b
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/e0fe02fb0970bcffe8b89454f4c79d2a015bcc2b.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-e0fe02fb0970`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/e0fe02fb0970bcffe8b89454f4c79d2a015bcc2b
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/e0fe02fb0970bcffe8b89454f4c79d2a015bcc2b.md
- Latest main at intake: 8093ae60292f4d9009b3d48f234b39b5cbc538e5

## ClawSweeper Report

```md
---
sha: e0fe02fb0970bcffe8b89454f4c79d2a015bcc2b
parent: 22d6e9564af94abd2cf83b82c2ec06712d6308d4
repository: openclaw/openclaw
author: "Ayaan Zaidi"
committer: "Ayaan Zaidi"
github_author: obviyus
github_committer: obviyus
co_authors: []
commit_authored_at: "2026-05-01T07:56:36+05:30"
commit_committed_at: "2026-05-01T08:33:02+05:30"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-01T03:21:53Z
---

# Commit e0fe02f

## Summary

One low-severity contract mismatch remains on current `main`: the shared `web_search` tool schema now advertises `count` up to 20, while the documented and common runtime limit is 10.

The media-generation registration regression introduced by this commit appears fixed on current `main` by `60bdb96f2c`.

## Findings

### Low: `web_search` schema advertises a result count the shared runtime does not honor

- Kind: bug
- File: `src/agents/tools/web-search.ts`
- Line: 17
- Evidence: The shared tool schema declares `count.maximum: 20` in `src/agents/tools/web-search.ts:13-18`, but shared web search count normalization clamps through `MAX_SEARCH_COUNT = 10` in `src/agents/tools/web-search-provider-common.ts:45-60`. The public docs also state `count` is `1-10` in `docs/tools/web.md:280-283`, and provider schemas for Brave, Gemini, MiniMax, and Perplexity use `maximum: 10`.
- Impact: Agents can be told by the tool schema that `count: 20` is valid, but common providers silently return at most 10 results. That makes tool-call planning and result expectations inconsistent.
- Suggested fix: Change the generic `web_search` schema maximum to `10`, or make `createWebSearchTool` expose the selected provider’s schema if provider-specific limits are intended.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes; `count: 20` is schema-valid in the shared tool declaration, while `resolveSearchCount(20, 5)` clamps to `10`.
- Is this the best way to solve the issue? yes; the safest narrow fix is aligning the shared schema with the shared runtime and docs. A broader provider-specific schema path is reasonable but larger.

## Reviewed

- Diff: `22d6e9564af94abd2cf83b82c2ec06712d6308d4..e0fe02fb0970bcffe8b89454f4c79d2a015bcc2b`
- Changed files: `src/agents/tools/image-generate-tool.ts`, `src/agents/tools/image-tool.ts`, `src/agents/tools/music-generate-tool.ts`, `src/agents/tools/pdf-tool.ts`, `src/agents/tools/video-generate-tool.ts`, `src/agents/tools/web-search.ts`, and related tests.
- Code read: current `main` registration/execution paths, media tool shared helpers, web search runtime/common helpers, provider schemas for Brave/Gemini/MiniMax/Perplexity/Exa.
- Dependencies/web: no dependency files changed; no web lookup needed.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm test src/agents/tools/image-generate-tool.test.ts src/agents/tools/music-generate-tool.test.ts src/agents/tools/video-generate-tool.test.ts src/agents/tools/image-tool.test.ts src/agents/tools/pdf-tool.test.ts src/agents/tools/web-search.test.ts` passed: 146 tests.
- `git diff --check 22d6e9564af94abd2cf83b82c2ec06712d6308d4..e0fe02fb0970bcffe8b89454f4c79d2a015bcc2b` passed.

## Dependency / Web Checks

- Not applicable; no dependency or external API package changed.

## Limitations

- No live provider search calls were run; the finding is based on local schema/runtime contract evidence.
```
