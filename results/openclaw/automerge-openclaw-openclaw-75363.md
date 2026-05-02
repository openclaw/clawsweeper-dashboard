---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75363"
mode: "autonomous"
run_id: "25250964839"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25250964839"
head_sha: "2658bb652973dd1016dd9046ae9537c076b55f1e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T11:57:49.594Z"
canonical: "https://github.com/openclaw/openclaw/pull/75363"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75363"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75363

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25250964839](https://github.com/openclaw/clawsweeper/actions/runs/25250964839)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75363

## Summary

PR #75363 remains the canonical adopted automerge candidate. Merge is blocked by job frontmatter and the latest ClawSweeper review requested one narrow scheduler repair: remove fixed 5 ms active-bucket polling and add focused regression coverage. The branch is same-repo writable, so the correct path is to repair the contributor branch and preserve source credit.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75363 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75363 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75363 | fix_needed | planned | canonical | Adopted automerge PR is useful and writable, but not merge-ready until the ClawSweeper scheduler review finding is repaired and re-reviewed. |
| cluster:automerge-openclaw-openclaw-75363 | build_fix_artifact | planned |  | Executor needs an explicit branch-repair artifact for the canonical PR. |

## Needs Human

- none
