---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-6877360218c9
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-6877360218c9
source: clawsweeper_commit
commit_sha: 6877360218c9765678cdadb8f256421b4c926382
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/6877360218c9765678cdadb8f256421b4c926382.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-6877360218c9`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/6877360218c9765678cdadb8f256421b4c926382
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/6877360218c9765678cdadb8f256421b4c926382.md
- Latest main at intake: bbf932fd7d69c32f800779d98312fbdcc3901c1b

## ClawSweeper Report

```md
---
sha: 6877360218c9765678cdadb8f256421b4c926382
parent: 5138d3f8b6ba9a1c786c64e4c0dfafca13771cc4
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T04:13:22+01:00"
commit_committed_at: "2026-04-30T04:13:39+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T03:18:38Z
---

# Commit 6877360

## Summary

Found one concrete runtime alias regression risk: the new fixed condition order prefers a top-level `require` export before a `node` condition, which can route bundled plugin runtime deps away from their Node implementation.

## Findings

### Medium: Runtime alias resolution bypasses Node-specific package exports

- Kind: regression
- File: `src/plugins/bundled-runtime-deps-jiti-aliases.ts`
- Line: 55
- Evidence: `resolveRuntimePackageImportTarget` now checks `["require", "node", "default", "import"]`. For `@google/genai@1.50.1`, `node_modules/@google/genai/package.json:10` puts the `node` condition before top-level `require`; Node `require.resolve("@google/genai")` resolves to `dist/node/index.cjs`, but this alias helper resolves the bare package to `dist/index.cjs`. A local repro with `registerBundledRuntimeDependencyJitiAliases` produced `"@google/genai": ".../dist/index.cjs"` while `require.resolve("@google/genai")` returned `node_modules/@google/genai/dist/node/index.cjs`.
- Impact: The Google plugin imports the bare package in `extensions/google/google-genai-runtime.ts:1`. The cross entry selected by the alias uses `CrossWebSocketFactory`, which throws `This feature requires the web or Node specific @google/genai implementation`; the Node entry uses `NodeWebSocketFactory` and `ws`. This can break packaged/staged Google realtime voice/live paths that call `ai.live.connect` from `extensions/google/realtime-voice-provider.ts:419`.
- Suggested fix: Resolve conditional exports like Node/Jiti for the sync loader: walk export-object keys in package order with active conditions such as `node`, `require`, and `default`, recursing into the first matching condition. That keeps `ws` on `require` but lets packages like `@google/genai` choose nested `node.require`.
- Confidence: high

## Reviewed

- Diff: `5138d3f8b6ba9a1c786c64e4c0dfafca13771cc4..6877360218c9765678cdadb8f256421b4c926382`
- Changed files: `src/plugins/bundled-runtime-deps-jiti-aliases.ts`, `src/plugins/bundled-runtime-deps-jiti-aliases.test.ts`
- Code read: plugin loader alias registration path in `src/plugins/loader.ts`, jiti loader/cache setup, relevant Google plugin imports/call sites, plugin docs and scoped plugin instructions
- Dependencies/web: read local `jiti@2.6.1` resolver source and local package metadata/source for shipped runtime deps including `@google/genai`, `ws`, and `@modelcontextprotocol/sdk`; no web lookup needed

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm test src/plugins/bundled-runtime-deps-jiti-aliases.test.ts` passed
- Local repro scripts confirmed alias output for real `@google/genai` and immediate `live.connect` failure from the cross entry

## Limitations

- No external Google API call was made; the failure mode is local constructor/export behavior before a useful network request.

https://github.com/openclaw/openclaw/commit/6877360218c9765678cdadb8f256421b4c926382
```
