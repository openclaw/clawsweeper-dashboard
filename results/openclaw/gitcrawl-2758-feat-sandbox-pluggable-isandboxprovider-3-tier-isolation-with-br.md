---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-2758-feat-sandbox-pluggable-isandboxprovider-3-tier-isolation-with-br"
mode: "autonomous"
run_id: "28088501523"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28088501523"
head_sha: "f92fbfebbe8f1dc477d2bb0724313860601c580c"
workflow_conclusion: "success"
result_status: "needs_human"
published_at: "2026-06-24T09:27:48.534Z"
canonical: "https://github.com/openclaw/openclaw/issues/52662"
canonical_issue: "https://github.com/openclaw/openclaw/issues/52662"
canonical_pr: null
actions_total: 8
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 2
---

# gitcrawl-2758-feat-sandbox-pluggable-isandboxprovider-3-tier-isolation-with-br

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28088501523](https://github.com/openclaw/clawsweeper/actions/runs/28088501523)

Workflow conclusion: success

Worker result: needs_human

Canonical: https://github.com/openclaw/openclaw/issues/52662

## Summary

Classified the obsolete closed representative #41437 as historical context. The live canonical path is open issue #52662; #64383 is related but not a duplicate. No close, merge, or executable fix PR is recommended because the remaining work is a product/security-sensitive browser-backend contract decision, not a narrow repair.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 8 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 2 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #52662 | keep_canonical | planned | canonical | This is the best open canonical because it captures the unresolved non-Docker sandbox-browser backend gap after the broad closed PRs were superseded. |
| #64383 | keep_related | planned | related | Related browser-sandbox CDP work, but not a duplicate of non-Docker external backend support. |
| #41437 | keep_closed | skipped | superseded | Already closed; no closure action is valid. |
| #43317 | keep_closed | skipped | superseded | Already closed historical evidence. |
| #43863 | route_security | planned | security_sensitive | Quarantine this exact security-sensitive ref to central OpenClaw security handling; do not use ClawSweeper Repair for it. |
| #41320 | route_security | planned | security_sensitive | Quarantine this exact security-sensitive linked ref to central OpenClaw security handling. |
| cluster:gitcrawl-2758-feat-sandbox-pluggable-isandboxprovider-3-tier-isolation-with-br | fix_needed | blocked | needs_human | Blocked on maintainer product/security decision rather than implementation mechanics. |
| cluster:gitcrawl-2758-feat-sandbox-pluggable-isandboxprovider-3-tier-isolation-with-br | build_fix_artifact | blocked | needs_human | The artifact is a handoff for a future maintainer-approved split, not an instruction to open a repair PR now. |

## Needs Human

- Decide the product/security direction for #52662: whether external CDP/noVNC support belongs in core sandbox backend APIs, plugin SDK backends, or should remain out of scope.
- Decide the narrower #64383 direction: whether to keep the authenticated relay/port-offset design after socat removal or approve a separate simplification follow-up.
