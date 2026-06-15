---
repo: "openclaw/crabbox"
cluster_id: "issue-openclaw-crabbox-380"
mode: "autonomous"
run_id: "27528740523"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27528740523"
head_sha: "b0b0117d6d311e6d4c99ce6cf3df8453f2794ec7"
workflow_conclusion: "success"
result_status: "needs_human"
published_at: "2026-06-15T06:43:57.584Z"
canonical: "https://github.com/openclaw/crabbox/issues/380"
canonical_issue: "https://github.com/openclaw/crabbox/issues/380"
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

# issue-openclaw-crabbox-380

Repo: openclaw/crabbox

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27528740523](https://github.com/openclaw/clawsweeper/actions/runs/27528740523)

Workflow conclusion: success

Worker result: needs_human

Canonical: https://github.com/openclaw/crabbox/issues/380

## Summary

Issue #380 is a valid open provider request, but it is not safe to turn into an automated narrow fix PR. The live issue carries `clawsweeper:no-new-fix-pr`, `clawsweeper:needs-product-decision`, `clawsweeper:needs-maintainer-review`, and `impact:auth-provider`; the hydrated review also says maintainers should first decide whether to accept a built-in Nomad provider, the official Nomad Go API dependency, and the initial jobspec/ACL contract. Current main has no Nomad provider or HashiCorp dependency, and adding one would require a full delegated-run adapter, config/auth contract, job/allocation exec and logs/filesystem integration, local claim mapping, docs, registration, and tests. That is broader than a focused autonomous repair artifact.

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
| issue_implementation_status_comment | updated | #380 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #380 | needs_human | blocked | needs_human | Blocked on maintainer product/dependency/API contract decision; automation should not create a partial Nomad provider or choose the jobspec and ACL contract on its own. |

## Needs Human

- Maintainers need to decide whether Crabbox should accept a first-class built-in Nomad delegated-run provider, which Nomad Go API dependency/auth model is acceptable, and what initial jobspec, ACL, allocation selection, artifact/log, and lifecycle contract should be supported.
