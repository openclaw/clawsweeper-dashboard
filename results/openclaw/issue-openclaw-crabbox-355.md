---
repo: "openclaw/crabbox"
cluster_id: "issue-openclaw-crabbox-355"
mode: "autonomous"
run_id: "27513023494"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27513023494"
head_sha: "a9b17a1e94ca0bc66ea53b6f6ba0e94f260c5d63"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-14T22:06:53.716Z"
canonical: "https://github.com/openclaw/crabbox/issues/355"
canonical_issue: "https://github.com/openclaw/crabbox/issues/355"
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-crabbox-355

Repo: openclaw/crabbox

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27513023494](https://github.com/openclaw/clawsweeper/actions/runs/27513023494)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/crabbox/issues/355

## Summary

Issue #355 is still valid on main d3d1891aafa7213e7b76380465a75da8d20fb64d. The narrow fix is to align apple-container's provider-local empty-image fallback with the portable OS-derived AppleContainer default, update the focused provider test, and clarify docs around the Debian/Ubuntu-compatible bootstrap requirement. Local mutation and validation could not be performed because this worker filesystem is read-only, so the result is a planned fix artifact for the executor.

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
| open_fix_pr | opened | https://github.com/openclaw/crabbox/pull/357 | clawsweeper/issue-openclaw-crabbox-355 |  |
| issue_implementation_status_comment | updated | #355 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #357 | merge_canonical | blocked | fix_pr | checks are not clean: Go: IN_PROGRESS, Release Check: IN_PROGRESS |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #355 | keep_canonical | planned | canonical |  |
| cluster:issue-openclaw-crabbox-355 | fix_needed | planned |  |  |
| cluster:issue-openclaw-crabbox-355 | build_fix_artifact | planned |  |  |

## Needs Human

- none
