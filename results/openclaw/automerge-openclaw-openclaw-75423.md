---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75423"
mode: "autonomous"
run_id: "25206189521"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25206189521"
head_sha: "6bce49c0e878fc1910c8b78a67bc5fc5abbf4acc"
workflow_conclusion: "cancelled"
result_status: "planned"
published_at: "2026-05-01T07:31:59.262Z"
canonical: "https://github.com/openclaw/openclaw/pull/75423"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75423"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75423

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25206189521](https://github.com/openclaw/clawsweeper/actions/runs/25206189521)

Workflow conclusion: cancelled

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75423

## Summary

Canonical PR #75423 is open, non-security-sensitive, same-repo branch-writable, and still the repair path. Merge and close are blocked by job policy. The hydrated ClawSweeper comments show a required changelog repair and a later failed repair attempt blocked by a changed-surface fast-mode regression, so this run should repair the contributor branch rather than replace it.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| #75423 | fix_needed | planned | canonical | Canonical PR is useful and branch-writable but not merge-ready because ClawSweeper review feedback remains unresolved. |
| cluster:automerge-openclaw-openclaw-75423 | build_fix_artifact | planned |  | A narrow branch repair artifact is the executable outcome allowed by this automerge job. |

## Needs Human

- none
