---
repo: openclaw/openclaw
cluster_id: gitcrawl-249-bug-control-ui-requires-device-identity-use-https-or-localhost-s
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
  - "#32473"
candidates:
  - "#56830"
  - "#71669"
cluster_refs:
  - "#32473"
  - "#56830"
  - "#71669"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #32473 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 249 on 2026-07-24."
---

# Gitcrawl Cluster 249

Generated from local gitcrawl run cluster 249 for `openclaw/openclaw`.

Display title:

> [Bug]: control ui requires device identity (use HTTPS or localhost secure context)

Cluster shape from gitcrawl:

- total members: 3
- issues: 2
- pull requests: 1
- open candidates in local store: 2
- representative: #32473, currently closed in local store
- latest member update: 2026-07-04T22:07:42.737863736Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #32473 [Bug]: control ui requires device identity (use HTTPS or localhost secure context)

Open candidates:

- #56830 Gateway/UI: clarify insecure-context device-auth errors
- #71669 [Feature]: Emit runtime warning when Control UI config will silently reject non-secure connections
