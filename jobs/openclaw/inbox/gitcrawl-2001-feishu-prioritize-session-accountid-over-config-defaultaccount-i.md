---
repo: openclaw/openclaw
cluster_id: gitcrawl-2001-feishu-prioritize-session-accountid-over-config-defaultaccount-i
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
  - "#40701"
candidates:
  - "#45673"
  - "#59420"
  - "#68443"
cluster_refs:
  - "#40701"
  - "#41306"
  - "#45246"
  - "#45673"
  - "#47425"
  - "#48077"
  - "#52755"
  - "#59420"
  - "#68443"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #40701 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 2001 on 2026-06-07."
---

# Gitcrawl Cluster 2001

Generated from local gitcrawl run cluster 2001 for `openclaw/openclaw`.

Display title:

> feishu: prioritize session accountId over config defaultAccount in tools

Cluster shape from gitcrawl:

- total members: 9
- issues: 0
- pull requests: 9
- open candidates in local store: 3
- representative: #40701, currently closed in local store
- latest member update: 2026-05-23T13:12:28.837614883Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #40701 feishu: prioritize session accountId over config defaultAccount in tools
- #41306 feat(feishu): add list action and per-agent routing for feishu_chat
- #45246 fix(feishu): resolve tool account by session accountId before config defaultAccount
- #47425 Feishu: Enable agent binding for multi-account scenarios
- #48077 fix(feishu): use routed account context for multi-account tool execution
- #52755 Fix Feishu chat account routing

Open candidates:

- #45673 fix(feishu): prefer session account over defaultAccount for tools
- #59420 fix(feishu): prioritize message source account over defaultAccount
- #68443 feat(feishu): add list action to read chat history by container_id
