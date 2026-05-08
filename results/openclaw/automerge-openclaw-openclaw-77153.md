---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-77153"
mode: "autonomous"
run_id: "25538801787"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25538801787"
head_sha: "b9a420e71bdc72e6fecafac1a6480448219d40cc"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-08T06:05:06.804Z"
canonical: "https://github.com/openclaw/openclaw/pull/77153"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/77153"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-77153

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25538801787](https://github.com/openclaw/clawsweeper/actions/runs/25538801787)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/77153

## Summary

#77153 is the canonical adopted PR, but it is not merge-ready: the same-repo branch is writable, the PR is dirty against main, relevant checks include failures, and four actionable Copilot review comments remain around command span validation. Plan a bounded repair on the contributor branch; do not merge or close in this worker.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/77153 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #77153 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #77153 | fix_needed | planned | canonical | Repair the existing writable contributor branch before any automerge decision. |
| cluster:automerge-openclaw-openclaw-77153 | build_fix_artifact | planned |  | A bounded fix artifact is required for the ClawSweeper executor to repair the adopted PR branch. |

## Needs Human

- none
