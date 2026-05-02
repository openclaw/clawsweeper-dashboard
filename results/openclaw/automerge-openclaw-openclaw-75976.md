---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75976"
mode: "autonomous"
run_id: "25251175013"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25251175013"
head_sha: "e017437eb1eede959449587f673a14912f7d55c2"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T12:19:29.293Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25251175013](https://github.com/openclaw/clawsweeper/actions/runs/25251175013)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75976

## Summary

PR #75976 is the canonical repair path for the linked plugin hot-reload issue, but it is not merge-ready. The branch is a writable same-repo head, so ClawSweeper should repair the contributor branch, address failing exact-head checks, rerun review, and validate before any merge or closeout. No GitHub mutations are planned here.

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
| #75976 | fix_needed | planned | canonical | Canonical PR #75976 is useful and branch-writable, but failed relevant checks and lacks a clean final ClawSweeper review for the current head. Repair the existing contributor branch rather than replacing it. |
| #72097 | keep_related | planned | related | The issue is the source problem for the canonical PR, not cleanup work for this run. It should stay open while the repair branch is made merge-ready. |
| cluster:automerge-openclaw-openclaw-75976 | build_fix_artifact | planned |  | Automerge is opted in, merge is disabled for this worker, and the canonical PR needs a bounded repair artifact for the executor. |

## Needs Human

- none
