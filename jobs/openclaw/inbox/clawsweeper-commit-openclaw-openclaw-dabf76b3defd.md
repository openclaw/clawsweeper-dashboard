---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-dabf76b3defd
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-dabf76b3defd
source: clawsweeper_commit
commit_sha: dabf76b3defdc55248b4a02044a751e324416e39
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/dabf76b3defdc55248b4a02044a751e324416e39.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-dabf76b3defd`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/dabf76b3defdc55248b4a02044a751e324416e39
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/dabf76b3defdc55248b4a02044a751e324416e39.md
- Latest main at intake: eb7d89f4b9d5e7de330073ac835006a7b91148ee

## ClawSweeper Report

```md
---
sha: dabf76b3defdc55248b4a02044a751e324416e39
parent: c728d604b282aa1f3343219e6f03fe993d3a6203
repository: openclaw/openclaw
author: "Simone"
committer: "GitHub"
github_author: Lucenx9
github_committer: web-flow
co_authors: ["Lucenx9", "Peter Steinberger"]
commit_authored_at: "2026-04-29T20:47:35+02:00"
commit_committed_at: "2026-04-29T19:47:35+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T18:51:57Z
---

# Commit dabf76b

## Summary

Found one concrete regression in the remote URL path: malformed `gateway.remote.url` can now be treated as absent, allowing setup-code generation to fall back to a bind-derived URL and issue a bootstrap token.

## Findings

### Medium: Invalid remote setup URLs can fall back to local bind and still issue bootstrap tokens

- Kind: regression
- File: `src/pairing/setup-code.ts`
- Line: 287
- Evidence: `remoteUrlRaw` is normalized into `remoteUrl`, but a non-empty malformed remote URL that normalizes to `null` is not reported as invalid. The resolver then continues to Tailscale/bind fallback at `src/pairing/setup-code.ts:296` and `src/pairing/setup-code.ts:309`. Live check with `preferRemoteUrl: true`, `gateway.remote.url: "http://localhost:notaport"`, and `gateway.bind=custom/customBindHost=127.0.0.1` returned `ok: true`, `url: "ws://127.0.0.1:18789"`, and a new `bootstrapToken`. The same silent-ignore pattern exists in `extensions/device-pair/index.ts:333`.
- Impact: `openclaw qr --remote` can produce a setup code for the wrong local/private endpoint instead of failing on the configured remote URL. This breaks the “validate before issuing bootstrap tokens” contract and can hand out fresh pairing tokens for an unusable or unintended gateway URL.
- Suggested fix: make URL normalization preserve invalid-vs-absent state. If `gateway.remote.url` is non-empty and `normalizeUrl(...)` returns null, return a clear `Configured gateway.remote.url is invalid.` error instead of falling through. Apply the same behavior in `extensions/device-pair/index.ts`.
- Confidence: high

## Reviewed

- Diff: `c728d604b282aa1f3343219e6f03fe993d3a6203..dabf76b3defdc55248b4a02044a751e324416e39`
- Changed files: `CHANGELOG.md`, `extensions/device-pair/index.ts`, `extensions/device-pair/index.test.ts`, `src/pairing/setup-code.ts`, `src/pairing/setup-code.test.ts`, `src/cli/qr-cli.test.ts`
- Code read: touched files, `src/cli/qr-cli.ts`, `src/shared/gateway-bind-url.ts`, relevant pairing/QR docs
- PR context: inspected PR #74538 metadata and check-run summary with `gh`

## Tests / Live Checks

- `pnpm test extensions/device-pair/index.test.ts src/pairing/setup-code.test.ts src/cli/qr-cli.test.ts` passed after `pnpm install`
- `pnpm exec oxfmt --check --threads=1 ...` passed
- `git diff --check c728d604b282aa1f3343219e6f03fe993d3a6203..dabf76b3defdc55248b4a02044a751e324416e39` passed
- First test attempt failed because `node_modules` was missing; installed deps once and retried successfully

## Dependency / Web Checks

- No dependency files changed.
- No general web lookup needed.
- GitHub check-runs for the exact SHA had many successes, but several broad CI jobs were still queued at the time checked.

## Limitations

- Did not run full `pnpm check`; focused tests covered the changed setup-code, CLI QR, and device-pair paths.
```
