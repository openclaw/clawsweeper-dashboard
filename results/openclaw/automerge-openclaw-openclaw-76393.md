---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76393"
mode: "autonomous"
run_id: "25271077602"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25271077602"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T05:59:45.911Z"
canonical: "https://github.com/openclaw/openclaw/pull/76393"
canonical_issue: "https://github.com/openclaw/openclaw/issues/76367"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76393"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76393

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25271077602](https://github.com/openclaw/clawsweeper/actions/runs/25271077602)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76393

## Summary

#76393 is the canonical repair path for the #76367 doctor/status cold memory-runtime bug. It is useful, small, credited, and branch-writable, but preflight reports it dirty/unmergeable against main, so the deterministic executor should repair the contributor branch and rerun review/checks before any merge-capable router acts.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76393 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76393 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76393 | fix_needed | planned | canonical | Repair the existing contributor branch because it is useful, narrow, credited, and writable, but currently dirty/unmergeable against main. |
| #76367 | keep_related | planned | fixed_by_candidate | Keep the issue open while #76393 is repaired and validated; do not close or post-merge-close in this job. |
| cluster:automerge-openclaw-openclaw-76393 | build_fix_artifact | planned | canonical | Build an executable artifact for the deterministic repair executor. |

## Needs Human

- none
