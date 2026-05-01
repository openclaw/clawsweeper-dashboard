---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-8c68e7535feb
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-8c68e7535feb
source: clawsweeper_commit
commit_sha: 8c68e7535feb3d1612f7c63bd073b3d59a157c73
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/8c68e7535feb3d1612f7c63bd073b3d59a157c73.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-8c68e7535feb`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/8c68e7535feb3d1612f7c63bd073b3d59a157c73
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/8c68e7535feb3d1612f7c63bd073b3d59a157c73.md
- Latest main at intake: e8b82d1cf92f5af8d3ba5d6add8412c75fb1b79c

## ClawSweeper Report

```md
---
sha: 8c68e7535feb3d1612f7c63bd073b3d59a157c73
parent: 606c881d276207334466f09ecbe2aa64c6a9c04a
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-29T15:05:15+01:00"
commit_committed_at: "2026-04-29T16:35:37+01:00"
result: findings
confidence: high
highest_severity: high
check_conclusion: failure
reviewed_at: 2026-04-29T15:39:00+00:00
---

# Commit 8c68e753

## Summary

The commit introduces imports from `src/channels/plugins/dm-access.js`, but the corresponding source module is not present in the commit. This breaks importing the SDK channel config helper entrypoint and blocks the new tests before they run.

## Findings

### High: Missing centralized DM access module breaks SDK imports

- Kind: reliability
- File: `src/plugin-sdk/channel-config-helpers.ts`
- Line: 21
- Evidence: `src/plugin-sdk/channel-config-helpers.ts:21` re-exports from `../channels/plugins/dm-access.js`. Additional changed files import the same missing module, including `src/config/channel-compat-normalization.ts:1`, `src/channels/plugins/setup-wizard-helpers.ts:9`, and `src/commands/doctor/shared/open-policy-allowfrom.ts:1`. The reviewed tree has no `src/channels/plugins/dm-access.ts`; `rg --files | rg 'dm-access'` only found `src/plugin-sdk/direct-dm-access.ts` and Telegram-local files. A focused test confirmed the runtime failure: `pnpm test src/plugin-sdk/channel-config-helpers.test.ts --run` fails with `Cannot find module '../channels/plugins/dm-access.js' imported from src/plugin-sdk/channel-config-helpers.ts`.
- Impact: Any consumer importing `openclaw/plugin-sdk/channel-config-helpers` now fails at module load, and doctor/setup/config normalization paths that import the same helper will also fail. This is a release-blocking regression for the touched SDK/channel surfaces.
- Suggested fix: Add the missing `src/channels/plugins/dm-access.ts` implementation with the exported symbols used here, or correct the imports to the actual module that contains these helpers. Then rerun the focused SDK/helper tests and the changed gate.
- Confidence: high

## Reviewed

- Diff: `606c881d276207334466f09ecbe2aa64c6a9c04a..8c68e7535feb3d1612f7c63bd073b3d59a157c73`
- Changed files: Slack/Discord account, monitor, security, setup, doctor, config normalization, SDK helper, allowlist editor, docs, and tests from the provided 46-file diff.
- Code read: scoped AGENTS guidance, `src/plugin-sdk/channel-config-helpers.ts`, `src/config/channel-compat-normalization.ts`, `src/channels/plugins/setup-wizard-helpers.ts`, doctor allowlist repair paths, Slack/Discord account/security/monitor call paths, and adjacent tests/docs.
- Dependencies/web: no external web lookup needed; issue is fully local.

## Tests / Live Checks

- `pnpm docs:list` succeeded.
- `pnpm install` succeeded after the initial test run reported missing `vitest`.
- `pnpm test src/plugin-sdk/channel-config-helpers.test.ts --run` failed with the missing `../channels/plugins/dm-access.js` module.
- `git diff --check 606c881d276207334466f09ecbe2aa64c6a9c04a..8c68e7535feb3d1612f7c63bd073b3d59a157c73` passed.
- `git status --short` was clean.

## Limitations

- I did not run broader gates because the focused SDK helper import failure is already deterministic and release-blocking.
```
