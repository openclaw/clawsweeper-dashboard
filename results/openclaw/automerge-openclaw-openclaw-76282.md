---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76282"
mode: "autonomous"
run_id: "25263117004"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25263117004"
head_sha: "08cd9dbda14b57deec64cf4cefce1b0844246d4e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T22:30:48.300Z"
canonical: "https://github.com/openclaw/openclaw/pull/76282"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/76282"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76282

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25263117004](https://github.com/openclaw/clawsweeper/actions/runs/25263117004)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76282

## Summary

#76282 is the canonical adopted PR, but it is not merge-ready: ClawSweeper review has only started, several relevant checks are failing or pending, and merge is blocked by job policy. The branch is same-repo and writable, so the correct next action is a bounded repair of the contributor branch.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76282 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76282 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76282 | fix_needed | planned | canonical | Repair the writable adopted PR branch before any re-review or merge decision. |
| cluster:automerge-openclaw-openclaw-76282 | build_fix_artifact | planned |  | Create an executable repair plan for the existing adopted PR branch. |

## Needs Human

- none
