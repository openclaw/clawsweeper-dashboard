---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-43b084e5fa2e
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-43b084e5fa2e
source: clawsweeper_commit
commit_sha: 43b084e5fa2ef0ddf973235a4e580232872fdcd8
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/43b084e5fa2ef0ddf973235a4e580232872fdcd8.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-43b084e5fa2e`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/43b084e5fa2ef0ddf973235a4e580232872fdcd8
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/43b084e5fa2ef0ddf973235a4e580232872fdcd8.md
- Latest main at intake: b54c642bd66ad0a80a2dec301e8994d493a52108

## ClawSweeper Report

```md
---
sha: 43b084e5fa2ef0ddf973235a4e580232872fdcd8
parent: efefba2db1a55397ceee619a9b1b8e45a159f0b8
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-29T19:00:39+01:00"
commit_committed_at: "2026-04-29T19:00:44+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T18:05:13Z
---

# Commit 43b084e

## Summary

Found one compatibility regression in the Discord public API barrel. The runtime refactor itself looks mechanically covered by focused tests.

## Findings

### Medium: Discord API barrel drops deprecated compatibility exports

- Kind: regression
- File: `extensions/discord/api.ts`
- Line: 42
- Evidence: The parent exported `handleDiscordMessageAction` with an explicit comment saying it was a “Deprecated compatibility surface for existing @openclaw/discord/api.js consumers”, and also exported `parseDiscordComponentCustomIdForCarbon` / `parseDiscordModalCustomIdForCarbon` aliases. This commit removes all three and replaces the old public compatibility test with `extensions/discord/src/api-barrel.test.ts`, which no longer asserts them. A focused source probe confirmed the old barrel contained all three names, while the current runtime import reports them all absent.
- Impact: Existing consumers importing these names from `@openclaw/discord/api.js` will fail at module import or named-export resolution after upgrading, despite this being a refactor commit with no versioned breaking-change handling.
- Suggested fix: Restore the lazy `handleDiscordMessageAction` export and the two Carbon parser aliases in `extensions/discord/api.ts`, and keep a compatibility assertion in the barrel test. If removal is intentional, it should be handled as an explicit breaking public API change with release/version/docs follow-through.
- Confidence: high

## Reviewed

- Diff: `efefba2db1a55397ceee619a9b1b8e45a159f0b8..43b084e5fa2ef0ddf973235a4e580232872fdcd8`
- Changed files: Discord API barrel, message helper split, model picker split, thread binding adapter split, related tests.
- Code read: `extensions/discord/api.ts`, all new split helper files, changed manager/model/message files, relevant tests, Discord docs, extension boundary guidance, bundled plugin public-surface build entry logic.
- Export checks: compared old/current exported names for `extensions/discord/api.ts`, `extensions/discord/src/monitor/message-utils.ts`, and `extensions/discord/src/monitor/model-picker.ts`.

## Tests / Live Checks

- `pnpm install`
- `pnpm test extensions/discord/src/api-barrel.test.ts extensions/discord/src/monitor/message-utils.test.ts extensions/discord/src/monitor/model-picker.test.ts extensions/discord/src/monitor/thread-bindings.lifecycle.test.ts --run` passed: 4 files, 103 tests.
- `pnpm exec oxfmt --check --threads=1 ...` passed for touched Discord files.
- Runtime barrel probe confirmed current `extensions/discord/api.ts` lacks the three removed compatibility exports.

## Dependency / Web Checks

- No dependency files changed.
- No web lookup needed; the finding is established from repository source, tests, package metadata, and runtime import behavior.

## Limitations

- Did not run the full changed gate; focused Discord tests were used for this report-only review.
```
