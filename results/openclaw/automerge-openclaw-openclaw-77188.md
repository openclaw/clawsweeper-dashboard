---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-77188"
mode: "autonomous"
run_id: "25359852638"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25359852638"
head_sha: "2a2546b71ffd1528ca578e6d0f8c4c533272b5b4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-05T06:07:24.239Z"
canonical: "https://github.com/openclaw/openclaw/pull/77602"
canonical_issue: "https://github.com/openclaw/openclaw/issues/77118"
canonical_pr: "https://github.com/openclaw/openclaw/pull/77602"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-77188

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25359852638](https://github.com/openclaw/clawsweeper/actions/runs/25359852638)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/77602

## Summary

Open replacement PR #77602 is the current canonical fix path. It is same-repo and branch-writable, but not merge-ready because the hydrated ClawSweeper review on head 068caa773c85b97858d290512bcb959b88f93d57 requires regenerating the Codex prompt snapshot fixtures and relevant checks are still failing. Plan a narrow repair on the existing PR branch; no close or merge action is emitted.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/77602 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #77602 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #77118 | keep_related | planned | fixed_by_candidate | Leave the issue open until the canonical repair PR is clean and merged. |
| #77188 | keep_closed | skipped | superseded | Historical source PR only; do not mutate. |
| #77602 | fix_needed | planned | canonical | Repair the existing writable ClawSweeper branch rather than replacing it. |
| cluster:automerge-openclaw-openclaw-77188 | build_fix_artifact | planned |  | Produce an executable repair plan for the deterministic ClawSweeper executor. |

## Needs Human

- none
