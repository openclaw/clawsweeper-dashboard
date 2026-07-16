---
repo: openclaw/openclaw
cluster_id: gitcrawl-55-subagent-announce-fall-back-to-best-effort-delivery
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
  - "#70585"
candidates:
  - "#61620"
cluster_refs:
  - "#61620"
  - "#70585"
  - "#70888"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #70585 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 55 on 2026-07-16."
---

# Gitcrawl Cluster 55

Generated from local gitcrawl run cluster 55 for `openclaw/openclaw`.

Display title:

> Subagent announce: fall back to best-effort delivery

Cluster shape from gitcrawl:

- total members: 3
- issues: 0
- pull requests: 3
- open candidates in local store: 1
- representative: #70585, currently closed in local store
- latest member update: 2026-05-15T07:43:12.597127597Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #70585 Subagent announce: fall back to best-effort delivery
- #70888 fix: restore explicit requester depth lookup without cfg

Open candidates:

- #61620 fix(subagents): centralize announce target resolution for parent, fallback, and cron routing
