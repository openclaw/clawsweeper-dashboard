---
repo: openclaw/clawsweeper
cluster_id: automerge-openclaw-clawsweeper-19
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
  - #19
candidates:
  - #19
cluster_refs:
  - #19
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: true
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/automerge-openclaw-clawsweeper-19
source: pr_automerge
---

# ClawSweeper automerge repair candidate

Maintainer opted #19 into ClawSweeper automerge.

Source PR: https://github.com/openclaw/clawsweeper/pull/19
Title: test: exercise automerge repair smoke

ClawSweeper should use this job only for the bounded ClawSweeper review/fix loop:

- If ClawSweeper emits an explicit repair marker, requests changes, or finds failing checks/rebase work, and the PR branch is safe to update, emit a fix artifact with `repair_strategy: "repair_contributor_branch"` and `source_prs: ["https://github.com/openclaw/clawsweeper/pull/19"]`.
- If the PR branch cannot be safely updated, emit a narrow credited replacement only when the artifact can preserve the original contributor credit; otherwise return `needs_human`.
- Do not merge, close, or bypass review gates from the worker. The comment router owns final merge only after a passing ClawSweeper verdict for the exact current head.
- Keep repair scope limited to actionable ClawSweeper findings, failing relevant checks, and required review feedback on this PR.
