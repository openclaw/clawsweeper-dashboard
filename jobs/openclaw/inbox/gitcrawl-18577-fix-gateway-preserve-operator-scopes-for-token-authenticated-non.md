---
repo: openclaw/openclaw
cluster_id: gitcrawl-18577-fix-gateway-preserve-operator-scopes-for-token-authenticated-non
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
  - "#57889"
candidates:
  - "#51396"
  - "#51413"
cluster_refs:
  - "#48229"
  - "#51396"
  - "#51413"
  - "#57889"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #57889 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 18577 on 2026-07-13."
---

# Gitcrawl Cluster 18577

Generated from local gitcrawl run cluster 18577 for `openclaw/openclaw`.

Display title:

> fix(gateway): preserve operator scopes for token-authenticated non-local clients

Cluster shape from gitcrawl:

- total members: 4
- issues: 2
- pull requests: 2
- open candidates in local store: 2
- representative: #57889, currently closed in local store
- latest member update: 2026-07-09T08:47:23.642682323Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #48229 operator.write scope not granted for WebSocket connections when gateway.bind is 'lan' with token auth
- #57889 fix(gateway): preserve operator scopes for token-authenticated non-local clients

Open candidates:

- #51396 [Bug]: clearUnboundScopes strips operator scopes unconditionally for non-local token-auth clients
- #51413 fix(gateway): retain operator scopes for non-local token-auth clients
