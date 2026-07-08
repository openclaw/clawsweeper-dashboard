---
repo: openclaw/openclaw
cluster_id: gitcrawl-2284-feat-google-add-google-vertex-ai-provider-with-adc-auth-and-glob
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
  - "#60860"
candidates:
  - "#58775"
  - "#60736"
  - "#60860"
  - "#62103"
cluster_refs:
  - "#58775"
  - "#60736"
  - "#60860"
  - "#62103"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #60860 is open; worker must verify it is still the best live canonical."
notes: "Generated from gitcrawl run cluster 2284 on 2026-07-08."
---

# Gitcrawl Cluster 2284

Generated from local gitcrawl run cluster 2284 for `openclaw/openclaw`.

Display title:

> feat(google): add Google Vertex AI provider with ADC auth and global endpoint routing

Cluster shape from gitcrawl:

- total members: 4
- issues: 2
- pull requests: 2
- open candidates in local store: 4
- representative: #60860, currently open in local store
- latest member update: 2026-07-05T17:39:58.87881406Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- none

Open candidates:

- #58775 Bug: google-vertex provider merged into google transport path in 2026.3.28 (regression)
- #60736 Google provider: implement proper Vertex AI OAuth and endpoint routing
- #60860 feat(google): add Google Vertex AI provider with ADC auth and global endpoint routing
- #62103 Google provider: implement proper Vertex AI endpoint routing
