---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-e6abd9e3d8c4
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-e6abd9e3d8c4
source: clawsweeper_commit
commit_sha: e6abd9e3d8c451477f1c93c091a205d30aed4d92
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/e6abd9e3d8c451477f1c93c091a205d30aed4d92.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-e6abd9e3d8c4`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/e6abd9e3d8c451477f1c93c091a205d30aed4d92
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/e6abd9e3d8c451477f1c93c091a205d30aed4d92.md
- Latest main at intake: d80a8eb3adb6b26fb345fdc7b658dbd39f085e35

## ClawSweeper Report

```md
---
sha: e6abd9e3d8c451477f1c93c091a205d30aed4d92
parent: 5f13af6b68603c49367e1540212779d1dcafafb2
repository: openclaw/openclaw
author: "bitloi"
committer: "GitHub"
github_author: bitloi
github_committer: web-flow
co_authors: ["bitloi"]
commit_authored_at: "2026-04-30T00:54:52-03:00"
commit_committed_at: "2026-04-29T22:54:52-05:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T03:58:54Z
---

# Commit e6abd9e3

## Summary

Found one SDK event-contract bug in the new chat-only projection fallback.

## Findings

### Medium: Chat-only projection deltas expose full snapshots as appendable deltas

- Kind: bug
- File: `packages/sdk/src/client.ts`
- Line: 230
- Evidence: `normalizeChatProjectionEvent()` maps the full projected chat text to `data.delta` for `assistant.delta` events at `packages/sdk/src/client.ts:223`. Real chat projection `delta` payloads carry the full buffered text, not an incremental chunk: Gateway builds `message.content[0].text` from `mergedText` at `src/gateway/server-chat.ts:410` and `src/gateway/server-chat.ts:433`, and flushes the full buffered `text` at `src/gateway/server-chat.ts:489`. Canonical assistant events keep both full `text` and incremental `delta` via `buildAssistantStreamData()` at `src/agents/pi-embedded-subscribe.handlers.messages.ts:356` and `src/agents/pi-embedded-subscribe.handlers.messages.ts:606`. The SDK docs show consumers appending `data.delta` directly at `docs/concepts/openclaw-sdk.md:103`, and the SDK live e2e does the same at `packages/sdk/src/index.e2e.test.ts:586`. The new test itself normalizes chat-only projections `"hello"` then `"hello again"` as two `assistant.delta` events at `packages/sdk/src/index.test.ts:542`; an app following the documented append pattern renders `hellohello again`.
- Impact: SDK clients using `Run.events()` for chat-only streams can duplicate streamed assistant text in UI/output buffers.
- Suggested fix: track the previous chat projection text per run stream and emit canonical assistant-shaped data, for example `{ text, delta: text.slice(previous.length) }` when the new text extends the previous text, and `{ text, delta: text, replace: true }` or an equivalent replacement signal when it does not.
- Confidence: high

## Reviewed

- Diff: `5f13af6b68603c49367e1540212779d1dcafafb2..e6abd9e3d8c451477f1c93c091a205d30aed4d92`
- Changed files: `CHANGELOG.md`, `packages/sdk/src/client.ts`, `packages/sdk/src/index.test.ts`
- Code read: changed SDK client/test files, SDK normalizer/types/event hub, App SDK docs, agent stream event construction, Gateway/TUI chat projection emitters, chat abort/error paths, SDK e2e event consumers
- PR/issue context: inspected PR #74750 and issue #74704 with `gh`
- Dependencies/web: no dependency file changes; no general web lookup needed

## Tests / Live Checks

- `pnpm install` because dev dependencies were missing
- `pnpm test packages/sdk/src/index.test.ts` passed: 14 tests
- `pnpm exec oxfmt --check --threads=1 packages/sdk/src/client.ts packages/sdk/src/index.test.ts CHANGELOG.md` passed
- `pnpm --filter @openclaw/sdk build` passed
- `git diff --check 5f13af6b68603c49367e1540212779d1dcafafb2..e6abd9e3d8c451477f1c93c091a205d30aed4d92` passed

## Limitations

- Did not run the full repository gate; focused SDK tests/build and PR CI status were enough for this review.
- No live Gateway run was performed.

https://github.com/openclaw/openclaw/pull/74750
```
