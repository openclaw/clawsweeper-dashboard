---
repo: openclaw/openclaw
cluster_id: gitcrawl-1439-bug-cron-isolated-agentturn-already-running-survives-restart-run
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
  - "#68157"
candidates:
  - "#60551"
  - "#66063"
  - "#69943"
  - "#69961"
  - "#70347"
cluster_refs:
  - "#60551"
  - "#65979"
  - "#66054"
  - "#66063"
  - "#66755"
  - "#68157"
  - "#69394"
  - "#69834"
  - "#69920"
  - "#69943"
  - "#69961"
  - "#70104"
  - "#70347"
  - "#70360"
  - "#70367"
  - "#70534"
  - "#70619"
  - "#70734"
  - "#70975"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #68157 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 1439 on 2026-05-27."
---

# Gitcrawl Cluster 1439

Generated from local gitcrawl run cluster 1439 for `openclaw/openclaw`.

Display title:

> [Bug] Cron isolated agentTurn: "already-running" survives restart, run history always empty

Cluster shape from gitcrawl:

- total members: 19
- issues: 10
- pull requests: 9
- open candidates in local store: 5
- representative: #68157, currently closed in local store
- latest member update: 2026-05-24T19:45:40.764211541Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #65979 fix(cron): normalize missing persisted job state
- #66054 fix(cron): guard against missing job.state in start() (#66016)
- #66755 fix(auto-reply): detect silent NO_REPLY wrapped in model reasoning
- #68157 [Bug] Cron isolated agentTurn: "already-running" survives restart, run history always empty
- #69394 fix(auto-reply): suppress entire payload when trailing NO_REPLY token present
- #69834 fix(cron): validate delivery.channel ambiguity at add/edit time
- #69920 Unhandled promise rejection: Agent listener invoked outside active run
- #70104 [Bug]: Dreaming REM phase re-pins to stale corpus after state reset; signal pipeline never accumulates hits (0 promoted every night)
- #70360 Cron: jobs without sessionTarget crash with TypeError in assertSupportedJobSpec (load path bypasses normalize defaulter)
- #70367 fix(cron): default missing sessionTarget on load and guard assertSupportedJobSpec
- #70534 [Bug]: Dreaming fallback triggers constantly when using named agent   (agents/<name>/sessions/ path not recognized)
- #70619 [Bug]: isolated cron run session rows can inherit stale lifecycle fields (status/startedAt/endedAt) from prior runs
- #70734 [Bug]: Fresh-session `[object Object]` hallucination persists after session/database wipe on fix branch for #69079
- #70975 Beta blocker: ollama - qwen3.5:9b produces garbage output under full agent system prompt

Open candidates:

- #60551 Strip leaked reasoning preambles before outbound send
- #66063 fix(cron): guard legacy jobs without state on startup
- #69943 [Bug]: session-memory hook persists raw chat-template tokens and unparsed tool calls — re-injected context creates self-reinforcing poisoning loop, agents emit role tokens / NO_REPLY across all subsequent /new sessions
- #69961 fix(hooks/session-memory): sanitize chat-template tokens + tool_call XML before persisting (closes #69943)
- #70347 Cron outer timeout should emit lifecycle.error so sessions.json finalizes immediately
