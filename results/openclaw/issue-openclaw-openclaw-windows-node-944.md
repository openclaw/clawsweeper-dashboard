---
repo: "openclaw/openclaw-windows-node"
cluster_id: "issue-openclaw-openclaw-windows-node-944"
mode: "autonomous"
run_id: "28949284612"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28949284612"
head_sha: "9b7281103ab54ecb97d8d66e5ddf4165ea8469fc"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-07-08T14:17:15.470Z"
canonical: "https://github.com/openclaw/openclaw-windows-node/issues/944"
canonical_issue: "https://github.com/openclaw/openclaw-windows-node/issues/944"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-windows-node-944

Repo: openclaw/openclaw-windows-node

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28949284612](https://github.com/openclaw/clawsweeper/actions/runs/28949284612)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw-windows-node/issues/944

## Summary

Issue #944 is a viable narrow native-chat state bug on current main. No active implementation PR exists; #897 is an already-merged unrelated UI test fix. Build a new fix PR that restores the last user-selected native chat session across ChatPage/ChatWindow remounts through existing chat provider/host state, with fallback to the gateway main/default when the saved session no longer exists.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

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
| #944 | keep_canonical | planned | canonical | Canonical source issue for the fix path. |
| #897 | keep_closed | skipped | independent | Closed historical context only; no mutation allowed or needed. |
| cluster:issue-openclaw-openclaw-windows-node-944 | fix_needed | planned |  | A new narrow fix PR is needed. |
| cluster:issue-openclaw-openclaw-windows-node-944 | build_fix_artifact | planned |  | Prepare a new credited fix PR for #944. |

## Needs Human

- none
