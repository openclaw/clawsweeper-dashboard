---
repo: openclaw/clickclack
cluster_id: automerge-openclaw-clickclack-21
mode: autonomous
job_intent: automerge_pr
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
canonical:
  - #21
candidates:
  - #21
cluster_refs:
  - #21
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: true
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/automerge-openclaw-clickclack-21
source: pr_automerge
requested_by: "clawsweeper[bot]"
requested_by_id: "274271284"
request_comment_url: "https://github.com/openclaw/clickclack/pull/21#issuecomment-4689139437"
---

# ClawSweeper adopted PR repair candidate

Maintainer opted #21 into ClawSweeper autofix.

Requested by: clawsweeper[bot]
Request comment: https://github.com/openclaw/clickclack/pull/21#issuecomment-4689139437


Source PR: https://github.com/openclaw/clickclack/pull/21
Title: Fix mobile drawer collapse state on iOS Safari

ClawSweeper should use this job only for the bounded ClawSweeper review/fix loop:

- Emit a fix artifact with `repair_strategy: "repair_contributor_branch"` and `source_prs: ["https://github.com/openclaw/clickclack/pull/21"]` so the Codex edit pass can make this PR merge-ready.
- The edit pass should rebase onto latest main, address PR comments and review findings, fix CI/check failures, preserve release-note context when required, run the relevant validation, and keep iterating until the branch is ready or an external blocker is proven.
- If the PR branch cannot be safely updated, emit a narrow credited replacement only when the artifact can preserve the original contributor credit; otherwise return `needs_human`.
- Never add forbidden changelog credit lines for `@codex`, `@openclaw`, or `@steipete`; preserve contributor credit through source links, PR body, and commit/PR history.
- Final merge is disabled for autofix. Keep the PR open after a passing ClawSweeper verdict unless a maintainer explicitly changes mode.
- Keep repair scope limited to actionable ClawSweeper findings, failing relevant checks, and required review feedback on this PR.

