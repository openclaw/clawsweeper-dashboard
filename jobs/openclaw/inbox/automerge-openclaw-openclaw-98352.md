---
repo: openclaw/openclaw
cluster_id: automerge-openclaw-openclaw-98352
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
  - #98352
candidates:
  - #98352
cluster_refs:
  - #98352
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: true
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/automerge-openclaw-openclaw-98352
source: pr_automerge
requested_by: "momothemage"
requested_by_id: "35096042"
request_comment_url: "https://github.com/openclaw/openclaw/pull/98352#issuecomment-4849907432"
---

# ClawSweeper adopted PR repair candidate

Maintainer opted #98352 into ClawSweeper automerge.

Requested by: momothemage
Request comment: https://github.com/openclaw/openclaw/pull/98352#issuecomment-4849907432


Source PR: https://github.com/openclaw/openclaw/pull/98352
Title: fix(security): warn on agent skill MCP boundary drift

ClawSweeper should use this job only for the bounded ClawSweeper review/fix loop:

- Emit a fix artifact with `repair_strategy: "repair_contributor_branch"` and `source_prs: ["https://github.com/openclaw/openclaw/pull/98352"]` so the Codex edit pass can make this PR merge-ready.
- The edit pass should rebase onto latest main, address PR comments and review findings, fix CI/check failures, preserve release-note context when required, run the relevant validation, and keep iterating until the branch is ready or an external blocker is proven.
- If the PR branch cannot be safely updated, emit a narrow credited replacement only when the artifact can preserve the original contributor credit; otherwise return `needs_human`.
- Never add forbidden changelog credit lines for `@codex`, `@openclaw`, or `@steipete`; preserve contributor credit through source links, PR body, and commit/PR history.
- Do not merge, close, or bypass review gates from the worker. The comment router owns final merge only after a passing ClawSweeper verdict for the exact current head.
- Keep repair scope limited to actionable ClawSweeper findings, failing relevant checks, and required review feedback on this PR.

