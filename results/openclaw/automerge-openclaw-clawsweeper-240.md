---
repo: "openclaw/clawsweeper"
cluster_id: "automerge-openclaw-clawsweeper-240"
mode: "autonomous"
run_id: "26804353130"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26804353130"
head_sha: "a07fc1f94275f7223bffc35b6ed82c5b1b92b0c2"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-02T07:46:38.788Z"
canonical: "https://github.com/openclaw/clawsweeper/pull/241"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/clawsweeper/pull/241"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-clawsweeper-240

Repo: openclaw/clawsweeper

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26804353130](https://github.com/openclaw/clawsweeper/actions/runs/26804353130)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/clawsweeper/pull/241

## Summary

Hydrated state shows source PR #240 is already closed after a credited replacement was opened, and replacement PR #241 is the active writable canonical path. No close or merge action is permitted by this job. Plan repair/verification on #241 only, with exact-head validation and review gates before any later merge router action.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/clawsweeper/pull/241 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #241 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #240 | keep_closed | skipped | superseded | Already closed and superseded by hydrated replacement PR #241; no mutation is valid for this target. |
| #241 | fix_needed | planned | canonical | The canonical replacement PR is useful and writable but not merge-ready in this worker result because the exact-head gate is not fully green and merge is blocked by job frontmatter. Executor should repair or refresh #241, rerun review and validation, and return a later verdict. |
| cluster:automerge-openclaw-clawsweeper-240 | build_fix_artifact | planned |  | A calibrated canonical PR exists but still needs exact-head repair/verification gates, so emit an executable repair_contributor_branch artifact. |

## Needs Human

- none
