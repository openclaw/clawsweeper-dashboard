---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76764"
mode: "autonomous"
run_id: "25282990414"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25282990414"
head_sha: "3dc3e028a7976f7318b64bfef917c19a51c34b6a"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-03T15:29:16.213Z"
canonical: "https://github.com/openclaw/openclaw/pull/76764"
canonical_issue: "https://github.com/openclaw/openclaw/issues/76554"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76764"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76764

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25282990414](https://github.com/openclaw/clawsweeper/actions/runs/25282990414)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76764

## Summary

Canonical path is PR #76764, but it is not merge-ready: the hydrated preflight reports mergeable=false/dirty against main 081f873162c2db1ed2c6c0585f1cb86db0fa80f1. The same-repo head branch is writable, so the correct next step is a narrow repair of the contributor branch, preserving @obviyus credit and keeping issue #76554 tied to that PR. No close or merge action is emitted because the job blocks close/merge and requires human handling for both.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| #76764 | fix_needed | planned | canonical | Repair the writable contributor branch for dirty merge state, then rerun exact-head review and validation before any separate merge-capable applicator acts. |
| #76554 | keep_related | planned | fixed_by_candidate | Covered by candidate PR #76764, but no closeout is allowed before the canonical fix lands. |
| #76272 | keep_closed | skipped | related | Already closed; no mutation is valid. |
| cluster:automerge-openclaw-openclaw-76764 | build_fix_artifact | planned |  | Create an executable repair plan for the existing contributor PR branch. |

## Needs Human

- none
