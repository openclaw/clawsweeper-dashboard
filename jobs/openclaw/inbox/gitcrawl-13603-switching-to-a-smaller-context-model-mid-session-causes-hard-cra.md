---
repo: openclaw/openclaw
cluster_id: gitcrawl-13603-switching-to-a-smaller-context-model-mid-session-causes-hard-cra
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
  - "#44303"
candidates:
  - "#9986"
  - "#39857"
  - "#58957"
cluster_refs:
  - "#9986"
  - "#39857"
  - "#44303"
  - "#46700"
  - "#47557"
  - "#50619"
  - "#51638"
  - "#58957"
  - "#60947"
  - "#66127"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #44303 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 13603 on 2026-06-06."
---

# Gitcrawl Cluster 13603

Generated from local gitcrawl run cluster 13603 for `openclaw/openclaw`.

Display title:

> Switching to a smaller-context model mid-session causes hard crash instead of graceful truncation

Cluster shape from gitcrawl:

- total members: 10
- issues: 10
- pull requests: 0
- open candidates in local store: 3
- representative: #44303, currently closed in local store
- latest member update: 2026-05-24T22:25:04.044172917Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #44303 Switching to a smaller-context model mid-session causes hard crash instead of graceful truncation
- #46700 [Bug]: Invalid model ID after switching model
- #47557 systemPromptReport not updated when model is switched, causing Unknown model error
- #50619 Feature: /model switch should check context size against target model limits
- #51638 Context window not enforced on model switch — oversized prompts sent to smaller models
- #60947 Feature: Degraded mode for model fallback — prevent death spiral when cloud model is throttled
- #66127 [Feature] Pre-fallback automatic context compaction for smaller context models

Open candidates:

- #9986 Feature: Trigger model fallback on context length exceeded
- #39857 Status/session context window can over-report the selected model's actual window
- #58957 Model switch can fail silently when carried-over session context is too large
