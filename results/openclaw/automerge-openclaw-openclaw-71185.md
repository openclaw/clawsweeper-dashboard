---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-71185"
mode: "autonomous"
run_id: "26207042767"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26207042767"
head_sha: "3477775b50d9fb1d14c3fc2453e6d865507eb961"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-21T05:40:26.071Z"
canonical: "https://github.com/openclaw/openclaw/pull/84797"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/84797"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-71185

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26207042767](https://github.com/openclaw/clawsweeper/actions/runs/26207042767)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84797

## Summary

Loaded the hydrated preflight artifact. #71185 is already closed, #77154 is historical closed context, and #84797 is the open same-repo replacement PR carrying the fix. #84797 is checked and reviewed, but currently dirty against main, so the next deterministic action is repairing that PR branch rather than merge or closure.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/84797 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84797 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #71185 | keep_closed | skipped | superseded | Closed source contributor PR was already superseded by replacement PR #84797 before this run. |
| #77154 | keep_closed | skipped | related | Historical related trajectory PR, not a live target for this automerge repair cluster. |
| #84797 | fix_needed | planned | canonical | Open canonical replacement PR is useful and checked, but dirty against main; repair the same PR branch before any merge decision. |
| cluster:automerge-openclaw-openclaw-71185 | build_fix_artifact | planned |  | Executor needs a cluster-scoped repair artifact so it can update #84797, rerun review/validation, and let the router decide final merge later. |

## Needs Human

- none
