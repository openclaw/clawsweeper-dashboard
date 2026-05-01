---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-ef799fd57a77
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-ef799fd57a77
source: clawsweeper_commit
commit_sha: ef799fd57a77ff34eba85cae283267fb98543ad4
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/ef799fd57a77ff34eba85cae283267fb98543ad4.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-ef799fd57a77`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/ef799fd57a77ff34eba85cae283267fb98543ad4
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/ef799fd57a77ff34eba85cae283267fb98543ad4.md
- Latest main at intake: 52bf20b07d6e08b92f670c23ab55637fcb3f1035

## ClawSweeper Report

```md
---
sha: ef799fd57a77ff34eba85cae283267fb98543ad4
parent: 5a3b75de33dda11de7931686264ecf86df93de2d
repository: openclaw/openclaw
author: "Shadow"
committer: "Shadow"
github_author: thewilloftheshadow
github_committer: thewilloftheshadow
co_authors: []
commit_authored_at: "2026-04-30T18:32:23-05:00"
commit_committed_at: "2026-04-30T18:34:41-05:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T23:54:46+00:00
---

# Commit ef799fd

## Summary

Found one regression in the new GitHub App active-PR-limit exemption. A concurrent successful removal by the Labeler workflow can make Barnacle receive a 404, keep the stale in-memory `r: too-many-prs` label, and then close the App-authored PR for the exact limit this commit meant to skip.

## Findings

### Medium: Barnacle can still close App-authored PRs when stale limit-label removal races

- Kind: regression
- File: `scripts/github/barnacle-auto-response.mjs`
- Line: 986
- Evidence: The new App-author path calls `removeLabels(...)` at `scripts/github/barnacle-auto-response.mjs:986`, but `removeLabels` only deletes from `labelSet` after a successful API removal and ignores 404s without clearing the local set at `scripts/github/barnacle-auto-response.mjs:799`. The Labeler workflow now also removes the same stale label for bot/App authors at `.github/workflows/labeler.yml:299`, so both workflows can race on the same `pull_request_target` event. I reproduced this with a focused harness where `removeLabel` throws 404 for a `renovate[bot]` PR whose event payload includes `r: too-many-prs`; Barnacle attempted removal twice, then created the “more than 10 active PRs” close comment and closed the PR.
- Impact: GitHub App-authored PRs can still be auto-closed by Barnacle if Labeler removes the stale limit label first. This undermines the commit’s intended exemption and can disrupt bot/App PR queues on synchronize, edited, or reopened events with a stale label in the webhook payload.
- Suggested fix: When the code has decided a label should be treated as absent, delete it from `labelSet` even if GitHub returns 404. A small targeted test should simulate `removeLabel` returning 404 for an App-authored PR with `r: too-many-prs` and assert no comment/update happens.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A local harness importing `runBarnacleAutoResponse` with `pull_request.user = { login: "renovate[bot]", type: "Bot" }`, labels containing `r: too-many-prs`, and `github.rest.issues.removeLabel` throwing `{ status: 404 }` produced the close comment and `state: "closed"`.
- Is this the best way to solve the issue? yes. The failure is caused by local state not matching the intended post-removal state; clearing `labelSet` on 404 for these deliberate removals is narrower than adding more early returns and also protects existing automation-prefix removal paths.

## Reviewed

- Diff: `5a3b75de33dda11de7931686264ecf86df93de2d..ef799fd57a77ff34eba85cae283267fb98543ad4`
- Changed files: `.github/workflows/labeler.yml`, `scripts/github/barnacle-auto-response.mjs`, `test/scripts/barnacle-auto-response.test.ts`
- Code read: changed files, Auto response workflow entry point, active-label callers, Barnacle label/action flow, CI workflow docs, scoped script instructions
- Dependencies/web: no dependency manifests changed; no web checks needed

## Tests / Live Checks

- `pnpm docs:list`
- `git diff --check 5a3b75de33dda11de7931686264ecf86df93de2d..ef799fd57a77ff34eba85cae283267fb98543ad4`
- `pnpm install`
- `pnpm test test/scripts/barnacle-auto-response.test.ts` passed: 19 tests
- `pnpm exec oxfmt --check --threads=1 scripts/github/barnacle-auto-response.mjs test/scripts/barnacle-auto-response.test.ts` passed
- `pnpm check:workflows` passed
- Focused 404-race harness reproduced the bug

## Limitations

- No full CI/Testbox run; this was a focused commit review.
- `pnpm exec actionlint .github/workflows/labeler.yml` was unavailable directly, so I used the repo wrapper `pnpm check:workflows`, which installs/runs the pinned actionlint path.

https://github.com/openclaw/openclaw/commit/ef799fd57a77ff34eba85cae283267fb98543ad4
```
