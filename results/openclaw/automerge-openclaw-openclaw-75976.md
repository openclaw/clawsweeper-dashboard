---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75976"
mode: "autonomous"
run_id: "25247774149"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25247774149"
head_sha: "26f2c55b6de0f674ad103ffa68e2456d40dc81b0"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T08:27:20.720Z"
canonical: "https://github.com/openclaw/openclaw/pull/75976"
canonical_issue: "https://github.com/openclaw/openclaw/issues/72097"
canonical_pr: "https://github.com/openclaw/openclaw/pull/75976"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75976

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25247774149](https://github.com/openclaw/clawsweeper/actions/runs/25247774149)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75976

## Summary

PR #75976 is the canonical repair path for linked issue #72097, but it is not merge-ready. The branch is same-repo writable, so ClawSweeper should repair the existing contributor branch, address the exact-head CI/test failure called out by the ClawSweeper review, rerun review and changed-gate validation, and leave merge/closure to the guarded router.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75976 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75976 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75976 | fix_needed | planned | canonical | Automerge is blocked by exact-head CI/test failure; branch is safe for repair_contributor_branch. |
| #72097 | keep_related | planned | related | Keep the issue open and related to the canonical PR until #75976 is repaired and landed by the guarded automerge path. |
| cluster:automerge-openclaw-openclaw-75976 | build_fix_artifact | planned |  | Emit an executable repair artifact for the opted-in automerge PR; no merge or close mutation is allowed in this worker. |

## Needs Human

- none
