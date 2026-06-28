---
repo: openclaw/openclaw
cluster_id: gitcrawl-221-linux-windows-clawdbot-apps
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
  - "#75"
candidates:
  - "#75"
  - "#44013"
  - "#59859"
  - "#61576"
cluster_refs:
  - "#75"
  - "#44013"
  - "#59859"
  - "#61576"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #75 is open; worker must verify it is still the best live canonical."
notes: "Generated from gitcrawl run cluster 221 on 2026-06-28."
---

# Gitcrawl Cluster 221

Generated from local gitcrawl run cluster 221 for `openclaw/openclaw`.

Display title:

> Linux/Windows Clawdbot Apps

Cluster shape from gitcrawl:

- total members: 4
- issues: 1
- pull requests: 3
- open candidates in local store: 4
- representative: #75, currently open in local store
- latest member update: 2026-06-28T02:04:08.319326145Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- none

Open candidates:

- #75 Linux/Windows Clawdbot Apps
- #44013 feat: add Linux and Windows desktop apps using Tauri
- #59859 feat: cute GTK-native Linux App (#75)
- #61576 feat: Rust/GTK4 Linux companion app (#75, alternative track)
