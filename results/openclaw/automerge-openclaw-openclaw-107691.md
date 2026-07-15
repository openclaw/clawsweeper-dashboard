---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-107691"
mode: "autonomous"
run_id: "29423499463"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29423499463"
head_sha: "f2184565c8dfa78069255639d5b03fdded97e150"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-15T14:31:26.492Z"
canonical: "#107691"
canonical_issue: "#107467"
canonical_pr: "#107691"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-107691

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29423499463](https://github.com/openclaw/clawsweeper/actions/runs/29423499463)

Workflow conclusion: success

Worker result: planned

Canonical: #107691

## Summary

Repair the writable contributor branch for #107691 before exact-head re-review. Latest main still handles only ENOENT in managed npm project-root enumeration, while the hydrated PR head has failing lint, test-type, and aggregate CI checks. Preserve @LeonidasLux's production fix, rebase onto main, replace the oversized failing test shape with concise real-filesystem ENOTDIR coverage, and do not merge or close from this worker.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #6792 | keep_independent | planned | independent | This is a separate plugin-install feature and product-decision cluster, not part of the bounded ENOTDIR repair. |
| #107467 | keep_canonical | planned | canonical | Keep the canonical bug open until the repaired PR passes validation and exact-head ClawSweeper review. |
| #107691 | fix_needed | planned | canonical | Rebase and repair the writable contributor branch, resolve its failing test/lint surface, validate, and request a fresh exact-head review. |

## Needs Human

- none
