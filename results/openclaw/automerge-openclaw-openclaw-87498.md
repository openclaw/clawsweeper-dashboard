---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87498"
mode: "autonomous"
run_id: "26566650998"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26566650998"
head_sha: "ca8a8d4f30a243609adf112ca2b34ee63bceb83b"
workflow_conclusion: "success"
result_status: "blocked"
published_at: "2026-05-28T09:38:02.081Z"
canonical: "https://github.com/openclaw/openclaw/pull/87576"
canonical_issue: "https://github.com/openclaw/openclaw/issues/87497"
canonical_pr: "https://github.com/openclaw/openclaw/pull/87576"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 1
---

# automerge-openclaw-openclaw-87498

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26566650998](https://github.com/openclaw/clawsweeper/actions/runs/26566650998)

Workflow conclusion: success

Worker result: blocked

Canonical: https://github.com/openclaw/openclaw/pull/87576

## Summary

Security-sensitive linked issue #87497 and the active replacement PR #87576 involve a claimed webhook/auth replay boundary bypass. Under central_security_only, this worker should not repair, merge, close, or open another fix PR for that security-boundary path. #87498 is already closed and only remains historical source-credit evidence.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 1 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| automerge_repair_outcome_comment | updated | #87576 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87497 | route_security | planned | security_sensitive | The issue is a security-sensitive boundary-bypass report and must be quarantined to central OpenClaw security triage. |
| #87498 | keep_closed | skipped | superseded | Already closed and superseded by the hydrated replacement PR #87576. |
| #87576 | route_security | planned | security_sensitive | The active replacement PR changes the security-sensitive webhook replay boundary tied to #87497; route it to central security handling instead of continuing normal automerge repair. |

## Needs Human

- Central OpenClaw security triage must decide whether #87576 is cleared to continue through the normal ClawSweeper automerge repair lane or should be handled entirely through the security workflow.
