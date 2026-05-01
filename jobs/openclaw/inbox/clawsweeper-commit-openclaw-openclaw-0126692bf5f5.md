---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-0126692bf5f5
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-0126692bf5f5
source: clawsweeper_commit
commit_sha: 0126692bf5f5005af75d39e7ef0e1b410e3742a8
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/0126692bf5f5005af75d39e7ef0e1b410e3742a8.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-0126692bf5f5`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/0126692bf5f5005af75d39e7ef0e1b410e3742a8
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/0126692bf5f5005af75d39e7ef0e1b410e3742a8.md
- Latest main at intake: 2a7d83b6ad30fc2b4f310b8ccbe2f07e23dc1dca

## ClawSweeper Report

```md
---
sha: 0126692bf5f5005af75d39e7ef0e1b410e3742a8
parent: b0d649b4cbf9aa20b6de0d736f86e79c0853efb0
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-04-29T10:39:18-07:00"
commit_committed_at: "2026-04-29T10:39:43-07:00"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T17:43:21Z
---

# Commit 0126692

## Summary

Found one medium-confidence docs deployment compatibility risk: the checker now allows `th`, but current official Mintlify schema docs do not list `th` as a supported `navigation.languages[].language` code.

## Findings

### Medium: Thai navigation can pass local docs checks even though Mintlify does not document `th` as supported

- Kind: compatibility
- File: `scripts/check-docs-mdx.mjs`
- Line: 35
- Evidence: This commit adds `"th"` to `MINTLIFY_LANGUAGE_CODES`, and `checkDocsJson()` accepts any `navigation.language` present in that set. The publish sync path already emits a Thai navigation entry at `scripts/docs-sync-publish.mjs:148`, and a focused sync smoke produced generated languages including `th`; after this commit, `scripts/check-docs-mdx.mjs <generated-docs.json>` passed. Current Mintlify docs.json schema reference lists supported codes for `navigation.languages`, and `th` is absent from that list. ([mintlify.com](https://www.mintlify.com/docs/organize/settings-reference))
- Impact: If Mintlify production validation follows the documented schema, OpenClaw’s local/publish MDX check can now greenlight a generated docs config that Mintlify later rejects or renders without a working Thai language switcher.
- Suggested fix: Keep Thai translation generation but leave Thai navigation disabled until Mintlify support is confirmed in the deployed validator, or add a live/CLI validation proof and update this allowlist from that source of truth.
- Confidence: medium

## Reviewed

- Diff: `b0d649b4cbf9aa20b6de0d736f86e79c0853efb0..0126692bf5f5005af75d39e7ef0e1b410e3742a8`
- Changed files: `scripts/check-docs-mdx.mjs`
- Code read: full `scripts/check-docs-mdx.mjs`, `scripts/AGENTS.md`, `docs/AGENTS.md`, `scripts/docs-sync-publish.mjs` locale generation, preceding i18n commit context
- Dependencies/web: no Mintlify package/schema in repo dependencies; checked current Mintlify docs.json schema reference
- GitHub: commit-to-PR lookup returned no associated PR

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install`
- `pnpm docs:check-mdx` passed: 478 files
- Temporary publish-sync smoke generated `th` navigation and `scripts/check-docs-mdx.mjs <generated-docs.json>` passed
- `git diff --check b0d649b4cbf9aa20b6de0d736f86e79c0853efb0..0126692bf5f5005af75d39e7ef0e1b410e3742a8` passed

## Limitations

- I did not run an actual Mintlify deployment or hosted validator; the finding relies on current official Mintlify documentation, which could lag an unannounced service-side rollout.
```
