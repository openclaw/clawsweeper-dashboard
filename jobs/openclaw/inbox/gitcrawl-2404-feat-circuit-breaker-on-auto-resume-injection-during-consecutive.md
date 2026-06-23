---
repo: openclaw/openclaw
cluster_id: gitcrawl-2404-feat-circuit-breaker-on-auto-resume-injection-during-consecutive
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
  - "#52384"
candidates:
  - "#42933"
  - "#62615"
cluster_refs:
  - "#42864"
  - "#42933"
  - "#52384"
  - "#59161"
  - "#62615"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #52384 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 2404 on 2026-06-23."
---

# Gitcrawl Cluster 2404

Generated from local gitcrawl run cluster 2404 for `openclaw/openclaw`.

Display title:

> feat: circuit breaker on auto-resume injection during consecutive model errors

Cluster shape from gitcrawl:

- total members: 5
- issues: 4
- pull requests: 1
- open candidates in local store: 2
- representative: #52384, currently closed in local store
- latest member update: 2026-06-16T23:06:11.165433258Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #42864 Feature: Session-level circuit breaker (pause after N consecutive model errors)
- #52384 feat: circuit breaker on auto-resume injection during consecutive model errors
- #59161 Circuit breaker: auto-reset sessions after N consecutive aborts

Open candidates:

- #42933 feat: session-level circuit breaker (pause after N consecutive model errors)
- #62615 [Feature]: Add gateway-side circuit breaker for unhealthy sessions after consecutive failures
