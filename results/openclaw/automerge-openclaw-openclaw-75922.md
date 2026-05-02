---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75922"
mode: "autonomous"
run_id: "25243579489"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25243579489"
head_sha: "76792b6a1a1859bc5c3b97d18e4950ad8142eed9"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T04:24:08.418Z"
canonical: "https://github.com/openclaw/openclaw/pull/75922"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75922"
actions_total: 7
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75922

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25243579489](https://github.com/openclaw/clawsweeper/actions/runs/25243579489)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75922

## Summary

Canonical path is to repair the same-repo writable contributor PR #75922 in place. Merge and close are blocked by job policy; the next deterministic action is a bounded branch repair for the ClawSweeper review blockers, then exact-head re-review and normal gates.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 7 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75922 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75922 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75922 | fix_needed | planned | canonical | Repair the contributor branch in place; do not merge from this worker. |
| cluster:automerge-openclaw-openclaw-75922 | build_fix_artifact | planned | canonical | Create an executable repair artifact for #75922. |
| #75851 | keep_related | planned | fixed_by_candidate | Covered by the candidate fix path, but no close action is allowed or safe yet. |
| #75907 | keep_related | planned | fixed_by_candidate | Covered by the candidate fix path, but no close action is allowed or safe yet. |
| #75882 | keep_related | planned | related | Related latency family, not a true duplicate or fully covered closeout target. |
| #75887 | keep_related | planned | related | Related latency family with a meaningfully different root cause. |
| #75906 | keep_related | planned | related | Related latency family, but not proven fixed by #75922. |

## Needs Human

- none
