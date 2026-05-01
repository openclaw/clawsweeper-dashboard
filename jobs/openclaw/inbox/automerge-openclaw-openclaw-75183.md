---
repo: openclaw/openclaw
cluster_id: automerge-openclaw-openclaw-75183
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
  - #75183
candidates:
  - #75183
cluster_refs:
  - #75183
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: true
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/automerge-openclaw-openclaw-75183
source: pr_automerge
---

# ClawSweeper adopted PR repair candidate

Maintainer opted #75183 into ClawSweeper autofix.

Source PR: https://github.com/openclaw/openclaw/pull/75183
Title: fix: simplify bundled runtime dependency repair

ClawSweeper should use this job only for the bounded ClawSweeper review/fix loop:

- If ClawSweeper emits an explicit repair marker, requests changes, or finds failing checks/rebase work, and the PR branch is safe to update, emit a fix artifact with `repair_strategy: "repair_contributor_branch"` and `source_prs: ["https://github.com/openclaw/openclaw/pull/75183"]`.
- If the PR branch cannot be safely updated, emit a narrow credited replacement only when the artifact can preserve the original contributor credit; otherwise return `needs_human`.
- For user-facing OpenClaw `fix`, `feat`, or `perf` changes, inspect the changelog policy. If a changelog is required, emit `changelog_required: true`, include `CHANGELOG.md` in `likely_files`, and tell the Codex edit pass to add or repair the `CHANGELOG.md` entry with allowed contributor attribution before declaring the branch merge-ready. Never add forbidden `Thanks @codex`, `Thanks @openclaw`, or `Thanks @steipete`; if only those authors are known, keep the required changelog entry without a `Thanks @...` line and preserve credit in PR history/source links.
- Final merge is disabled for autofix. Keep the PR open after a passing ClawSweeper verdict unless a maintainer explicitly changes mode.
- Keep repair scope limited to actionable ClawSweeper findings, failing relevant checks, and required review feedback on this PR.
