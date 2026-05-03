---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-56544"
mode: "autonomous"
run_id: "25267317511"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25267317511"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T02:07:44.100Z"
canonical: "https://github.com/openclaw/openclaw/pull/76330"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/76330"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-56544

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25267317511](https://github.com/openclaw/clawsweeper/actions/runs/25267317511)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76330

## Summary

No mutating repair action remains. Source PR #56544 was already closed as superseded after ClawSweeper opened replacement PR #76330, and #76330 was already merged and closed with passing review/check evidence in the hydrated artifact. Linked issue #56480 is already closed.

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
| automerge_repair_outcome_comment | updated | #76330 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #56544 | keep_closed | skipped | superseded | Already superseded and closed after replacement PR #76330 was opened; no close, merge, or fix mutation is permitted or needed. |
| #76330 | keep_closed | skipped | canonical | Replacement PR already landed as the canonical fix; no merge action is allowed by this job and none is needed. |
| #56480 | keep_closed | skipped | fixed_by_candidate | Already closed linked issue; the merged replacement PR covers the same symptom, but no post-merge closeout is allowed or needed. |

## Needs Human

- none
