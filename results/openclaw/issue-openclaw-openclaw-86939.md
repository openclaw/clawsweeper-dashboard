---
repo: "openclaw/openclaw"
cluster_id: "issue-openclaw-openclaw-86939"
mode: "autonomous"
run_id: "27258681206"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27258681206"
head_sha: "fc19c926f04cee78383e0bacb7a884725bdaabc5"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-06-10T07:00:47.589Z"
canonical: null
canonical_issue: "https://github.com/openclaw/openclaw/issues/86939"
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-86939

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27258681206](https://github.com/openclaw/clawsweeper/actions/runs/27258681206)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/86939

## Summary

Verified latest main at a3d5e5bc already contains the webchat stale-running fix and regression coverage. No new fix PR is appropriate. The open ClawSweeper PR #86954 is covered by current main, but this job blocks close actions, so it is kept as a non-mutating related item. Security-sensitive linked PR #87017 is quarantined with route_security only.

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
| #86939 | keep_closed | skipped | fixed_by_candidate | Already closed and fixed on current main; no close or implementation action is valid for this item. |
| #86954 | keep_related | planned | related | The PR is covered by current main, but this job's close restrictions make a close action unsafe. Keep it related without mutation. |
| #87017 | route_security | planned | security_sensitive | Security-sensitive hydrated item must be quarantined out of ClawSweeper Repair mutation paths. |

## Needs Human

- none
