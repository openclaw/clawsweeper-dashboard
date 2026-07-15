---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-107691"
mode: "autonomous"
run_id: "29418979663"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29418979663"
head_sha: "4eff9b51167884a5966aab0fc09a9620b0fbc62d"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-15T13:29:39.378Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29418979663](https://github.com/openclaw/clawsweeper/actions/runs/29418979663)

Workflow conclusion: success

Worker result: planned

Canonical: #107691

## Summary

Keep #107691 as the credited canonical repair path, but repair it before exact-head re-review. Current main still handles only ENOENT in managed npm project-root enumeration, while the writable contributor PR is behind main and its current head has failing check-lint, check-test-types, and aggregate ci-gate checks. Rebase the contributor branch, retain the narrow shared path-error guard change, replace the oversized failing test shape with concise real-filesystem ENOTDIR coverage, and rerun the focused and changed-surface gates. No merge or close action is permitted by this job.

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
| #6792 | keep_independent | planned | independent | Related only by the broad plugin-install area; it has a different root cause, behavior, and required product decision. |
| #107467 | keep_canonical | planned | canonical | Keep the bug report open as the canonical issue until the repaired candidate passes exact-head review and validation. |
| #107691 | fix_needed | planned | canonical | Repair the writable contributor branch by rebasing and correcting the failing test/lint surface; do not replace, close, or merge it. |

## Needs Human

- none
