---
repo: "steipete/oracle"
cluster_id: "issue-steipete-oracle-241"
mode: "autonomous"
run_id: "27327353996"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27327353996"
head_sha: "7d62fff82fb140502414977eda36ab960df00754"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-11T06:19:31.778Z"
canonical: "https://github.com/steipete/oracle/issues/241"
canonical_issue: "https://github.com/steipete/oracle/issues/241"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-steipete-oracle-241

Repo: steipete/oracle

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27327353996](https://github.com/openclaw/clawsweeper/actions/runs/27327353996)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/steipete/oracle/issues/241

## Summary

Issue #241 remains valid on main at 1c4d26cc31818dc568c09abacf39e7a3f052e3a2. The login probe retries plain 401/403 responses but ultimately rejects them even when the existing strong authenticated-DOM gate detects a visible composer plus profile or history signal. A narrow new fix PR should extend that gated fallback to plain 401/403, retain all logged-out safeguards, add focused regressions, and update browser-mode documentation and release notes. The checkout is read-only in this worker, so implementation and validation are planned for the executor.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| execute_fix | blocked |  |  | validation_script_missing: required pnpm test:serial is unavailable in target checkout |
| issue_implementation_status_comment | skipped | #241 |  | no existing ClawSweeper issue implementation status comment |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #182 | keep_closed | skipped | independent | Closed historical issue with a different root cause. |
| #216 | keep_closed | skipped | related | Merged related foundation that does not cover the remaining plain 401/403 false-negative. |
| #241 | fix_needed | planned | canonical | No viable open canonical PR exists, and current main retains the source-reproducible false-negative. A live browser contract for `/api/auth/session` was not available in this worker, so the safe issue-approved path is to extend the existing strong DOM fallback rather than introduce an unverified primary endpoint. |
| cluster:issue-steipete-oracle-241 | build_fix_artifact | planned |  | Executor-ready narrow implementation plan for the canonical issue. |

## Needs Human

- none
