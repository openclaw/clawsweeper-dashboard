---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76021"
mode: "autonomous"
run_id: "25261475944"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25261475944"
head_sha: "08cd9dbda14b57deec64cf4cefce1b0844246d4e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T21:13:29.475Z"
canonical: "https://github.com/openclaw/openclaw/pull/76021"
canonical_issue: "https://github.com/openclaw/openclaw/issues/47311"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76021"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76021

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25261475944](https://github.com/openclaw/clawsweeper/actions/runs/25261475944)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76021

## Summary

Canonical path is open PR #76021. It is a same-repo writable automerge PR, but it is not merge-ready because hydrated review state includes actionable ClawSweeper/Codex findings and relevant CI failures. Plan a bounded repair of the contributor branch; keep linked issue #47311 open until the PR lands.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76021 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76021 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76021 | fix_needed | planned | canonical | Repair the writable PR branch before any re-review or merge decision. |
| #47311 | keep_related | planned | fixed_by_candidate | Keep the linked feature request open until the canonical PR is repaired and merged. |
| cluster:automerge-openclaw-openclaw-76021 | build_fix_artifact | planned |  | A fix artifact is needed for a writable canonical PR that is useful but not merge-ready. |

## Needs Human

- none
