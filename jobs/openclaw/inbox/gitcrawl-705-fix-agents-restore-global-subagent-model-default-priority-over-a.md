---
repo: openclaw/openclaw
cluster_id: gitcrawl-705-fix-agents-restore-global-subagent-model-default-priority-over-a
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
  - "#58823"
candidates:
  - "#58822"
  - "#58823"
cluster_refs:
  - "#49119"
  - "#58822"
  - "#58823"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #58823 is open; worker must verify it is still the best live canonical."
notes: "Generated from gitcrawl run cluster 705 on 2026-07-26."
---

# Gitcrawl Cluster 705

Generated from local gitcrawl run cluster 705 for `openclaw/openclaw`.

Display title:

> fix(agents): restore global subagent model default priority over agent own model

Cluster shape from gitcrawl:

- total members: 3
- issues: 1
- pull requests: 2
- open candidates in local store: 2
- representative: #58823, currently open in local store
- latest member update: 2026-07-12T17:09:30.532806977Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #49119 fix(agents): prefer agent model for subagent spawns

Open candidates:

- #58822 fix(agents): subagent model precedence — global default shadowed by parent agent's own model
- #58823 fix(agents): restore global subagent model default priority over agent own model
