---
repo: openclaw/openclaw
cluster_id: gitcrawl-90-bug-tui-ctrl-c-can-imply-cancellation-while-active-run-continues
mode: autonomous
job_intent: repair_cluster
allowed_actions:
  - comment
  - label
  - close
  - fix
  - raise_pr
blocked_actions:
  - force_push
  - bypass_checks
  - merge
require_human_for:
  - security_sensitive
  - failing_checks
  - conflicting_prs
  - unclear_canonical
  - broad_code_delta
canonical:
  - "#38501"
candidates:
  - "#38661"
cluster_refs:
  - "#38501"
  - "#38502"
  - "#38661"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #38501 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 90 on 2026-07-23."
---

# Gitcrawl Cluster 90

Generated from local gitcrawl run cluster 90 for `openclaw/openclaw`.

Display title:

> [Bug]: TUI Ctrl+C can imply cancellation while active run continues

Cluster shape from gitcrawl:

- total members: 3
- issues: 1
- pull requests: 2
- open candidates in local store: 1
- representative: #38501, currently closed in local store
- latest member update: 2026-05-04T14:55:59.368872068Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #38501 [Bug]: TUI Ctrl+C can imply cancellation while active run continues
- #38502 fix(tui): clarify Ctrl+C status when run is still active

Open candidates:

- #38661 fix: resolve multiple issues (#38517, #38501, #38554, #38494)
