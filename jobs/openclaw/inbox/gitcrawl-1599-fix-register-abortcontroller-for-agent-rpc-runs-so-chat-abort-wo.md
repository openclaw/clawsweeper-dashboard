---
repo: openclaw/openclaw
cluster_id: gitcrawl-1599-fix-register-abortcontroller-for-agent-rpc-runs-so-chat-abort-wo
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
  - "#67586"
candidates:
  - "#42213"
  - "#65696"
  - "#67586"
cluster_refs:
  - "#42011"
  - "#42172"
  - "#42213"
  - "#49853"
  - "#51775"
  - "#65696"
  - "#67586"
  - "#68190"
  - "#71128"
  - "#71214"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #67586 is open; worker must verify it is still the best live canonical."
notes: "Generated from gitcrawl run cluster 1599 on 2026-06-05."
---

# Gitcrawl Cluster 1599

Generated from local gitcrawl run cluster 1599 for `openclaw/openclaw`.

Display title:

> fix: register AbortController for agent RPC runs so chat.abort works

Cluster shape from gitcrawl:

- total members: 10
- issues: 6
- pull requests: 4
- open candidates in local store: 3
- representative: #67586, currently open in local store
- latest member update: 2026-05-24T13:13:33.183198738Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #42011 [Bug]: Control UI chat can stay stuck on "Stop" after embedded run timeout on Windows
- #42172 agent RPC runs cannot be aborted via chat.abort
- #49853 [Bug]: [Control UI] Stop button disappears during active chat/run (2026.3.13)"
- #51775 fix: chat.abort RPC now stops embedded Pi agent, sub-agents, and session queues
- #68190 [Bug]: Chat messages sent during active tool execution are silently dropped — no interrupt mechanism
- #71128 [Bug]: chat.abort cannot stop active agent runs; only works for chat.send runs
- #71214 fix(gateway): allow chat.abort to stop agent RPC runs

Open candidates:

- #42213 [Bug]: Control UI chat can stay stuck busy and stop flushing queued messages after a long run
- #65696 fix(gateway): wire AbortController into agent handler to enable chat.abort cascading
- #67586 fix: register AbortController for agent RPC runs so chat.abort works
