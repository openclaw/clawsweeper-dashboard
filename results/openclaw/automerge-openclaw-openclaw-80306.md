---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-80306"
mode: "autonomous"
run_id: "25631997437"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25631997437"
head_sha: "be33667638c8a7b275a39d1f1b7c6c50f49762c9"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-10T15:31:42.864Z"
canonical: "https://github.com/openclaw/openclaw/pull/80306"
canonical_issue: "https://github.com/openclaw/openclaw/issues/79349"
canonical_pr: "https://github.com/openclaw/openclaw/pull/80306"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-80306

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25631997437](https://github.com/openclaw/clawsweeper/actions/runs/25631997437)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/80306

## Summary

PR #80306 is the canonical repair path for Feishu thread reply fallback issue #79349, but it is not merge-ready because the hydrated preflight shows relevant failing checks and no clean Codex /review merge preflight. Plan a bounded repair of the same writable contributor branch; do not close or merge under this job.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/80306 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #80306 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #79349 | keep_related | planned | fixed_by_candidate | Keep the issue open until the canonical PR branch is repaired, re-reviewed, validated, and later landed by the deterministic merge path. |
| #80306 | fix_needed | planned | canonical | Repair the writable contributor branch rather than replace it; merge is blocked by job policy and by missing clean review/check proof. |
| cluster:automerge-openclaw-openclaw-80306 | build_fix_artifact | planned |  | A narrow repair artifact is needed for the executor to update the existing PR branch and rerun validation/review. |

## Needs Human

- none
