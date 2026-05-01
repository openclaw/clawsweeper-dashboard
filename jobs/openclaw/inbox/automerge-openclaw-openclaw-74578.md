---
repo: openclaw/openclaw
cluster_id: automerge-openclaw-openclaw-74578
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
canonical:
  - #74578
candidates:
  - #74578
cluster_refs:
  - #74578
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: true
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/automerge-openclaw-openclaw-74578
source: pr_automerge
---

# ClawSweeper adopted PR repair candidate

Maintainer opted #74578 into ClawSweeper autofix.

Source PR: https://github.com/openclaw/openclaw/pull/74578
Title: fix(pi-embedded): strip [tool calls omitted] from user-facing text

ClawSweeper should use this job only for the bounded ClawSweeper review/fix loop:

- If ClawSweeper emits an explicit repair marker, requests changes, or finds failing checks/rebase work, and the PR branch is safe to update, emit a fix artifact with `repair_strategy: "repair_contributor_branch"` and `source_prs: ["https://github.com/openclaw/openclaw/pull/74578"]`.
- If the PR branch cannot be safely updated, emit a narrow credited replacement only when the artifact can preserve the original contributor credit; otherwise return `needs_human`.
- Final merge is disabled for autofix. Keep the PR open after a passing ClawSweeper verdict unless a maintainer explicitly changes mode.
- Keep repair scope limited to actionable ClawSweeper findings, failing relevant checks, and required review feedback on this PR.
