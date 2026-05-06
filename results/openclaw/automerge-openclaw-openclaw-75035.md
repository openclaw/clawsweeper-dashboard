---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75035"
mode: "autonomous"
run_id: "25419355382"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25419355382"
head_sha: "12314945e8c7f8f0bddd7a263336ad939154fe24"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-06T06:32:40.472Z"
canonical: "https://github.com/openclaw/openclaw/pull/75035"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75035"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75035

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25419355382](https://github.com/openclaw/clawsweeper/actions/runs/25419355382)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75035

## Summary

#75035 is the canonical adopted automerge PR. It is open and branch-writable, but not merge-ready: the preflight artifact reports mergeable=false, mergeable_state=dirty, and the durable ClawSweeper review still has actionable findings before merge. Because close and merge are blocked by job policy, the safe next step is an in-place repair artifact for the existing same-repo PR branch.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| repair_contributor_branch | blocked |  |  | source PR branch changed while the repair worker was preparing its push; requeue against the latest head |
| automerge_repair_outcome_comment | updated | #75035 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75035 | fix_needed | planned | canonical | Canonical PR is useful and branch-writable, but current review and mergeability state require a bounded repair loop before any later exact-head automerge gate can decide. |
| cluster:automerge-openclaw-openclaw-75035 | build_fix_artifact | planned |  | Emit an executable in-place repair artifact for the canonical PR branch rather than replacing or closing it. |

## Needs Human

- none
