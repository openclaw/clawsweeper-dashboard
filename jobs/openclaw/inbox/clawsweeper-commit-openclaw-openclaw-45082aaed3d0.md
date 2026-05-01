---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-45082aaed3d0
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-45082aaed3d0
source: clawsweeper_commit
commit_sha: 45082aaed3d007a5289175404f33d7224425fb0a
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/45082aaed3d007a5289175404f33d7224425fb0a.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-45082aaed3d0`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/45082aaed3d007a5289175404f33d7224425fb0a
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/45082aaed3d007a5289175404f33d7224425fb0a.md
- Latest main at intake: c4f9cf1a27f18d9fb2a46f95c904dd6a305cc524

## ClawSweeper Report

```md
---
sha: 45082aaed3d007a5289175404f33d7224425fb0a
parent: d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591
repository: openclaw/openclaw
author: "HCL"
committer: "Peter Steinberger"
github_author: hclsys
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T06:52:08+08:00"
commit_committed_at: "2026-04-30T05:10:32+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T04:14:06Z
---

# Commit 45082aa

## Summary

Found one actionable issue: the new guard is tested against a direct mock shape, but the real `openclaw doctor` call path drops the gateway payload’s `embedding.checked: false`, so the false-positive warning from issue #74608 still fires.

## Findings

### Low: Skipped embedding probes are still reported as not ready in real doctor flow

- Kind: bug
- File: `src/commands/doctor-memory-search.ts`
- Line: 416
- Evidence: The new suppression only returns when `opts.gatewayMemoryProbe.checked` is false. In the real doctor path, `runGatewayHealthChecks` passes the result of `probeGatewayMemoryStatus` into `noteMemorySearchHealth`. That wrapper calls `doctor.memory.status` with `{ probe: false }`, but then hardcodes `checked: true` for any successful gateway response and only copies `payload.embedding.ok` and `payload.embedding.error` (`src/commands/doctor-gateway-health.ts:83-93`). The gateway handler returns the skipped-probe sentinel as `{ ok: false, checked: false, error: "memory embedding readiness not checked..." }` when it does not live-probe (`src/gateway/server-methods/doctor.ts:873-876`, `src/gateway/server-methods/doctor.ts:903-905`). Because `embedding.checked` is discarded, `noteMemorySearchHealth` still sees `{ checked: true, ready: false, error: "memory embedding readiness not checked..." }` and takes the warning branch at `src/commands/doctor-memory-search.ts:419-426`.
- Impact: Running plain `openclaw doctor` with key-optional memory providers such as `ollama` or `lmstudio` can continue to show the same misleading “gateway reports embeddings are not ready” warning even though the readiness probe was merely skipped. This is the user-facing false positive the commit is intended to suppress.
- Suggested fix: Preserve the gateway payload’s checked state in `probeGatewayMemoryStatus`, for example `checked: payload.embedding.checked !== false`, with a focused test where `callGateway` returns `embedding: { ok: false, checked: false, error: ... }` and the resulting doctor memory-search check emits no warning.
- Confidence: high

## Reviewed

- Diff: `d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591..45082aaed3d007a5289175404f33d7224425fb0a`
- Changed files: `src/commands/doctor-memory-search.ts`, `src/commands/doctor-memory-search.test.ts`
- Code read: full changed helper/test file, `src/commands/doctor-gateway-health.ts`, `src/flows/doctor-health-contributions.ts`, `src/gateway/server-methods/doctor.ts`, adjacent gateway-health/server-method tests
- Docs/issues: `docs/cli/doctor.md`, `docs/cli/memory.md`, GitHub issue `openclaw/openclaw#74608`
- Dependencies/web: no dependency or general web checks needed

## Tests / Live Checks

- `pnpm docs:list`
- `gh issue view 74608 --repo openclaw/openclaw ...`
- `pnpm install` because `node_modules` was missing
- `pnpm test src/commands/doctor-memory-search.test.ts` passed: 33 tests
- `pnpm test src/commands/doctor-gateway-health.test.ts` passed: 6 tests
- `git diff --check d7396d4ffa2f4b6673460121c8c6d3e9b7ad0591..45082aaed3d007a5289175404f33d7224425fb0a` passed

## Limitations

- I did not run a live `openclaw doctor` against a configured Ollama/LM Studio gateway; the finding is from the direct source call path and existing gateway sentinel behavior.
```
