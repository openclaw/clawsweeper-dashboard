---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-214b3d333676
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-214b3d333676
source: clawsweeper_commit
commit_sha: 214b3d333676fcd1c45efc7c69fbf253812bf133
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/214b3d333676fcd1c45efc7c69fbf253812bf133.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-214b3d333676`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/214b3d333676fcd1c45efc7c69fbf253812bf133
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/214b3d333676fcd1c45efc7c69fbf253812bf133.md
- Latest main at intake: 464e57360262b7e0f9a705431bedd402fe8c356b

## ClawSweeper Report

```md
---
sha: 214b3d333676fcd1c45efc7c69fbf253812bf133
parent: 1c300cec5d806dee570ec109190c9cf6cbc4d9f9
repository: openclaw/openclaw
author: "Francisco Maestre Torreblanca"
committer: "GitHub"
github_author: franciscomaestre
github_committer: web-flow
co_authors: ["Francisco Maestre Torreblanca", "sallyom"]
commit_authored_at: "2026-05-01T00:14:39-05:00"
commit_committed_at: "2026-05-01T01:14:39-04:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T05:33:37Z
---

# Commit 214b3d3

## Summary

The stat-error rethrow itself is correct, but the same allowlist readers still convert non-`ENOENT` read failures into a missing/empty allowlist after `stat` succeeds. That leaves current `main` with the same silent failure mode for unreadable pairing allowlist files.

## Findings

### Medium: unreadable allowlist files are still treated as missing after successful stat

- Kind: bug
- File: `src/pairing/allow-from-store-file.ts`
- Line: 246
- Evidence: `readAllowFromFileWithExists` now rethrows non-`ENOENT` `stat` errors, but then calls `readJsonFileWithFallback`; that helper still returns `{ value: fallback, exists: false }` for every non-`ENOENT` `readFile` error in `src/plugin-sdk/json-store.ts:24`. The sync path has the same behavior directly at `src/pairing/allow-from-store-file.ts:294`, returning `{ entries: [], exists: false }` for non-`ENOENT` `readFileSync` errors. A focused temp-file smoke check with `chmod 000` returned `{"entries":[],"exists":false}` for both async and sync readers instead of throwing.
- Impact: Pairing allowlist state gates approved DM senders and store-backed recipient selection. Current callers such as `readChannelAllowFromStore` / `readChannelAllowFromStoreSync` in `src/pairing/pairing-store.ts:383` and `src/pairing/pairing-store.ts:414` will operate as if the store does not exist when it is actually unreadable. One concrete downstream risk is WhatsApp heartbeat recipient selection: `extensions/whatsapp/src/heartbeat-recipients.ts:66` merges the sync store entries, and existing tests show an empty allowlist falls back to session recipients (`extensions/whatsapp/src/heartbeat-recipients.test.ts:115`).
- Suggested fix: For this pairing allowlist reader, preserve `ENOENT` as missing and preserve malformed JSON fallback if that is intentional, but rethrow non-`ENOENT` read errors after a successful stat. Do this for both async and sync paths, ideally with a strict read helper or option rather than changing the generic `readJsonFileWithFallback` contract globally.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Create a temp allowlist JSON file, `chmod 000` it, then call `readAllowFromFileWithExists` or `readAllowFromFileSyncWithExists`; current `main` returns `{"entries":[],"exists":false}` instead of surfacing `EACCES`.
- Is this the best way to solve the issue? yes. The narrow fix mirrors the commit’s stat-error behavior while keeping missing-file behavior backward-compatible.

## Reviewed

- Diff: `1c300cec5d806dee570ec109190c9cf6cbc4d9f9..214b3d333676fcd1c45efc7c69fbf253812bf133`
- Changed files: `CHANGELOG.md`, `src/pairing/allow-from-store-file.ts`, `src/pairing/pairing-store.ts`, `src/pairing/allow-from-store-file.test.ts`, `src/pairing/pairing-store.test.ts`
- Code read: touched files in full, `src/pairing/allow-from-store-read.ts`, `src/plugin-sdk/json-store.ts`, `src/plugins/runtime/runtime-channel.ts`, `src/plugin-sdk/channel-pairing.ts`, `extensions/whatsapp/src/heartbeat-recipients.ts`, pairing docs.
- PR inspected: `#63324` with `gh pr view`.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` after missing `node_modules` blocked the first test attempt.
- `pnpm test src/pairing/pairing-store.test.ts src/pairing/allow-from-store-file.test.ts src/pairing/allow-from-store-read.test.ts` passed.
- `pnpm test extensions/whatsapp/src/heartbeat-recipients.test.ts` passed.
- `git diff --check 1c300cec5d806dee570ec109190c9cf6cbc4d9f9..214b3d333676fcd1c45efc7c69fbf253812bf133` passed.
- Temp-file smoke checks reproduced the remaining async and sync read-error fallback.

## Dependency / Web Checks

- No dependency or lockfile changes.
- No external web lookup needed; current facts came from repository source and GitHub PR metadata via `gh`.

## Limitations

- Full `pnpm check:changed` / full suite not run; focused tests covered the touched pairing files and the concrete downstream WhatsApp recipient path.

https://github.com/openclaw/openclaw/pull/63324
```
