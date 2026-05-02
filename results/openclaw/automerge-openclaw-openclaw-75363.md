---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75363"
mode: "autonomous"
run_id: "25249139890"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25249139890"
head_sha: "bd56a863d0a7276d03db05b5e5718537a26b132c"
workflow_conclusion: "cancelled"
result_status: "planned"
published_at: "2026-05-02T09:52:45.124Z"
canonical: "https://github.com/openclaw/openclaw/pull/75363"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75363"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75363

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25249139890](https://github.com/openclaw/clawsweeper/actions/runs/25249139890)

Workflow conclusion: cancelled

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75363

## Summary

PR #75363 is the canonical adopted automerge candidate. It is open, non-security, same-repo branch writable, and has green hydrated CI, but it is not merge-ready because the hydrated ClawSweeper review still has an actionable Discord REST stale-drop finding and prior repair validation reported a `pnpm check:changed` failure. Job frontmatter blocks merge/close, so the next deterministic action is repair on the contributor branch and re-review.

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
| #75363 | fix_needed | planned | canonical | Canonical PR is useful and writable but not merge-ready; repair contributor branch, then rerun review and changed validation. |
| cluster:automerge-openclaw-openclaw-75363 | build_fix_artifact | planned |  | Executor needs a bounded branch repair artifact for #75363. |

## Needs Human

- none
