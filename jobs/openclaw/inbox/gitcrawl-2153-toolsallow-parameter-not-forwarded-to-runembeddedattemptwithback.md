---
repo: openclaw/openclaw
cluster_id: gitcrawl-2153-toolsallow-parameter-not-forwarded-to-runembeddedattemptwithback
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
  - "#66581"
candidates:
  - "#60842"
  - "#66710"
cluster_refs:
  - "#60842"
  - "#65998"
  - "#66581"
  - "#66710"
  - "#69892"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #66581 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 2153 on 2026-06-20."
---

# Gitcrawl Cluster 2153

Generated from local gitcrawl run cluster 2153 for `openclaw/openclaw`.

Display title:

> toolsAllow parameter not forwarded to runEmbeddedAttemptWithBackend

Cluster shape from gitcrawl:

- total members: 5
- issues: 3
- pull requests: 2
- open candidates in local store: 2
- representative: #66581, currently closed in local store
- latest member update: 2026-06-16T21:34:31.373401249Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #65998 active-memory: toolsAllow filter does not exclude MCP tool schemas from sub-agent API call, causing 400 errors on large MCP deployments
- #66581 toolsAllow parameter not forwarded to runEmbeddedAttemptWithBackend
- #69892 Active Memory sub-agent receives all tools instead of toolsAllow filter (toolsAllow not forwarded in runEmbeddedPiAgent)

Open candidates:

- #60842 fix(agents): re-expose toolsAllow core tools in embedded runs
- #66710 fix: forward toolsAllow through embedded runner call chain
