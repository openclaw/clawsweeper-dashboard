---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75363"
mode: "autonomous"
run_id: "25250474836"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25250474836"
head_sha: "2658bb652973dd1016dd9046ae9537c076b55f1e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T11:32:44.350Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25250474836](https://github.com/openclaw/clawsweeper/actions/runs/25250474836)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75363

## Summary

PR #75363 is the canonical adopted automerge candidate. It is open, non-security, and same-repo branch writable, but it is not merge-ready because the hydrated ClawSweeper review still has an actionable Discord REST stale-dropping blocker. Merge and close are blocked by job frontmatter, so the safe path is a bounded repair on the contributor branch.

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
| #75363 | fix_needed | planned | canonical | Adopted automerge PR needs a narrow repair before re-review; merge and close are not permitted in this job. |
| cluster:automerge-openclaw-openclaw-75363 | build_fix_artifact | planned |  | A cluster-scoped fix artifact is needed so the executor can repair the existing writable PR branch and request a fresh ClawSweeper review. |

## Needs Human

- none
