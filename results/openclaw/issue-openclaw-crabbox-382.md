---
repo: "openclaw/crabbox"
cluster_id: "issue-openclaw-crabbox-382"
mode: "autonomous"
run_id: "27530176173"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27530176173"
head_sha: "b0b0117d6d311e6d4c99ce6cf3df8453f2794ec7"
workflow_conclusion: "success"
result_status: "needs_human"
published_at: "2026-06-15T07:17:45.185Z"
canonical: "https://github.com/openclaw/crabbox/issues/382"
canonical_issue: "https://github.com/openclaw/crabbox/issues/382"
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 1
---

# issue-openclaw-crabbox-382

Repo: openclaw/crabbox

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27530176173](https://github.com/openclaw/clawsweeper/actions/runs/27530176173)

Workflow conclusion: success

Worker result: needs_human

Canonical: https://github.com/openclaw/crabbox/issues/382

## Summary

Stopped without a fix PR. The hydrated source issue is open and describes a new first-class Flue delegated-run provider, but the live labels explicitly include `clawsweeper:no-new-fix-pr`, `clawsweeper:needs-product-decision`, and `clawsweeper:needs-maintainer-review`; the prior ClawSweeper review also says the v1 Flue workflow/protocol contract needs maintainer product judgment before implementation.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
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
| issue_implementation_status_comment | updated | #382 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #382 | needs_human | blocked | needs_human | Autonomous implementation is blocked by the live no-new-fix-pr and needs-product-decision labels plus unresolved product/API contract decisions for a new auth/provider surface. |

## Needs Human

- Maintainer decision needed: whether to override `clawsweeper:no-new-fix-pr` and accept a first-class built-in `flue` delegated-run provider, including the v1 JSON workflow contract, auth/config surface, and supported Flue sandbox capabilities for Crabbox.
