---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76393"
mode: "autonomous"
run_id: "25272497031"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25272497031"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T07:17:11.363Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25272497031](https://github.com/openclaw/clawsweeper/actions/runs/25272497031)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76393

## Summary

#76393 is the canonical repair path for #76367, but it is not merge-ready because exact-head CI has failing relevant checks. The branch is writable, the diff is small, security is cleared by the hydrated artifact, and ClawSweeper review passed, so the deterministic next step is to repair the contributor branch rather than replace it or ask for human judgment.

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
| #76393 | fix_needed | planned | canonical | Repair #76393 in place before merge because relevant CI failures block automerge and the contributor branch is safely writable. |
| #76367 | keep_related | planned | fixed_by_candidate | Keep the issue open until #76393 is repaired and merged; no close action is allowed in this run. |
| cluster:automerge-openclaw-openclaw-76393 | build_fix_artifact | planned |  | Create an executable in-place repair artifact for the contributor branch; do not merge or close from this worker. |

## Needs Human

- none
