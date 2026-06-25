---
repo: openclaw/openclaw
cluster_id: gitcrawl-6257-fix-use-ssrf-guarded-fetch-for-tts-provider-requests
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
  - "#46333"
candidates:
  - "#61517"
  - "#67484"
cluster_refs:
  - "#43273"
  - "#46333"
  - "#47232"
  - "#61517"
  - "#67484"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #46333 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 6257 on 2026-06-25."
---

# Gitcrawl Cluster 6257

Generated from local gitcrawl run cluster 6257 for `openclaw/openclaw`.

Display title:

> fix: use SSRF-guarded fetch for TTS provider requests

Cluster shape from gitcrawl:

- total members: 5
- issues: 0
- pull requests: 5
- open candidates in local store: 2
- representative: #46333, currently closed in local store
- latest member update: 2026-04-27T22:51:39.179963047Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #43273 fix: validate Edge TTS output file is non-empty before reporting success
- #46333 fix: use SSRF-guarded fetch for TTS provider requests
- #47232 improve: add empty-text guard and retry for Edge TTS

Open candidates:

- #61517 fix(ollama): use SSRF-guarded fetch in streaming path
- #67484 extensions(ollama): strip ollama/ prefix from model ID before API call
