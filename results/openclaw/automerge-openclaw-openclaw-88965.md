---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-88965"
mode: "autonomous"
run_id: "26803873175"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26803873175"
head_sha: "a07fc1f94275f7223bffc35b6ed82c5b1b92b0c2"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-02T07:26:34.349Z"
canonical: "https://github.com/openclaw/openclaw/pull/89075"
canonical_issue: "https://github.com/openclaw/openclaw/issues/75889"
canonical_pr: "https://github.com/openclaw/openclaw/pull/89075"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-88965

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26803873175](https://github.com/openclaw/clawsweeper/actions/runs/26803873175)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/89075

## Summary

#89075 is the current writable canonical repair PR for the #88965 automerge cluster. It should be repaired in place before any merge/close decision because the hydrated preflight shows mergeable_state=unstable and checks-node-core-runtime-infra-file-safety:FAILURE, while merge and close actions are blocked by this job.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/89075 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #89075 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75889 | keep_related | planned | fixed_by_candidate | Covered by the canonical repair PR but not closable in this job. |
| #88965 | keep_closed | skipped | superseded | Historical source PR already superseded by #89075. |
| #89075 | fix_needed | planned | canonical | Repair the writable canonical PR branch, address the failing file-safety check or prove it unrelated, rerun validation, then request a fresh exact-head ClawSweeper review. |
| cluster:automerge-openclaw-openclaw-88965 | build_fix_artifact | planned |  | Create an executable repair plan for the deterministic edit pass. |

## Needs Human

- none
