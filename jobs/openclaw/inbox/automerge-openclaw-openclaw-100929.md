---
repo: openclaw/openclaw
cluster_id: automerge-openclaw-openclaw-100929
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
  - #100929
candidates:
  - #100929
cluster_refs:
  - #100929
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: true
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/automerge-openclaw-openclaw-100929
source: pr_automerge
requested_by: "vyctorbrzezowski"
requested_by_id: "51521767"
request_comment_url: "https://github.com/openclaw/openclaw/pull/100929#issuecomment-4948107427"
---

# ClawSweeper adopted PR repair candidate

Maintainer opted #100929 into ClawSweeper autofix.

Requested by: vyctorbrzezowski
Request comment: https://github.com/openclaw/openclaw/pull/100929#issuecomment-4948107427


Source PR: https://github.com/openclaw/openclaw/pull/100929
Title: fix(ui): turn large pasted text into compact composer attachments

ClawSweeper should use this job only for the bounded ClawSweeper review/fix loop:

- Emit a fix artifact with `repair_strategy: "repair_contributor_branch"` and `source_prs: ["https://github.com/openclaw/openclaw/pull/100929"]` so the Codex edit pass can make this PR merge-ready.
- The edit pass should rebase onto latest main, address PR comments and review findings, fix CI/check failures, preserve release-note context when required, run the relevant validation, and keep iterating until the branch is ready or an external blocker is proven.
- If the PR branch cannot be safely updated, emit a narrow credited replacement only when the artifact can preserve the original contributor credit; otherwise return `needs_human`.
- Never add forbidden changelog credit lines for `@codex`, `@openclaw`, or `@steipete`; preserve contributor credit through source links, PR body, and commit/PR history.
- Final merge is disabled for autofix. Keep the PR open after a passing ClawSweeper verdict unless a maintainer explicitly changes mode.
- Keep repair scope limited to actionable ClawSweeper findings, failing relevant checks, and required review feedback on this PR.

