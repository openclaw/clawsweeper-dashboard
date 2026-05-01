---
repo: openclaw/openclaw
cluster_id: automerge-openclaw-openclaw-74641
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
  - #74641
candidates:
  - #74641
cluster_refs:
  - #74641
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: true
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/automerge-openclaw-openclaw-74641
source: pr_automerge
---

# ClawSweeper adopted PR repair candidate

Maintainer opted #74641 into ClawSweeper automerge.

Source PR: https://github.com/openclaw/openclaw/pull/74641
Title: fix(acp): fall through to thread-bound resolution when token is unresolvable (#66299)

ClawSweeper should use this job only for the bounded ClawSweeper review/fix loop:

- If ClawSweeper emits an explicit repair marker, requests changes, or finds failing checks/rebase work, and the PR branch is safe to update, emit a fix artifact with `repair_strategy: "repair_contributor_branch"` and `source_prs: ["https://github.com/openclaw/openclaw/pull/74641"]`.
- If the PR branch cannot be safely updated, emit a narrow credited replacement only when the artifact can preserve the original contributor credit; otherwise return `needs_human`.
- For user-facing OpenClaw `fix`, `feat`, or `perf` changes, inspect the changelog policy and add or repair a `CHANGELOG.md` entry with contributor attribution before declaring the branch merge-ready.
- Do not merge, close, or bypass review gates from the worker. The comment router owns final merge only after a passing ClawSweeper verdict for the exact current head.
- Keep repair scope limited to actionable ClawSweeper findings, failing relevant checks, and required review feedback on this PR.
