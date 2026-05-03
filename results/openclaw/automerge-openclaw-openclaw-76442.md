---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76442"
mode: "autonomous"
run_id: "25274564956"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25274564956"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T09:09:05.203Z"
canonical: "https://github.com/openclaw/openclaw/pull/76442"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/76442"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76442

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25274564956](https://github.com/openclaw/clawsweeper/actions/runs/25274564956)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76442

## Summary

PR #76442 is the canonical repair path for the managed proxy TLS hostname bug, but it is not merge-ready: the hydrated state is open, branch-writable, dirty/unmergeable, and has failing/pending exact-head checks. Plan the same-repo contributor branch repair and re-review; do not close or merge in this worker.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76442 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76442 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76442 | fix_needed | planned | canonical | Automerge is opted in, but blocked by dirty merge state and failing/pending exact-head checks. Because the head branch is same-repo writable, repair #76442 in place instead of replacing it. |
| #74809 | keep_closed | skipped | fixed_by_candidate | Closed linked issue is evidence only; no mutation is planned. |
| cluster:automerge-openclaw-openclaw-76442 | build_fix_artifact | planned | canonical | A fix artifact is needed so the executor can update the existing contributor branch, preserve credit, and revalidate the exact head. |

## Needs Human

- none
