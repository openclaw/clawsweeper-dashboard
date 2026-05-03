---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76393"
mode: "autonomous"
run_id: "25272895937"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25272895937"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T07:39:44.770Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25272895937](https://github.com/openclaw/clawsweeper/actions/runs/25272895937)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76393

## Summary

#76393 remains the canonical repair path for #76367, but it is not merge-ready in this worker result because the hydrated preflight shows failing CI checks, one pending check, unstable merge state, and merge is blocked by job policy. The branch is writable, the diff is small, the prior ClawSweeper review is clean, and the right next action is a bounded repair of the contributor branch followed by exact-head review and changed-surface validation.

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
| #76393 | fix_needed | planned | canonical | Repair the contributor branch before any merge routing: fetch logs for the failing exact-head checks, rebase if stale, address any PR-caused failures narrowly, rerun ClawSweeper review, and validate with pnpm check:changed. |
| #76367 | keep_related | planned | related | Keep the issue open while #76393 is repaired; do not close or mark fixed until a canonical fix lands and the later related active-memory comment is either covered or split. |
| cluster:automerge-openclaw-openclaw-76393 | build_fix_artifact | planned |  | Create an executor-facing repair plan for the existing contributor branch; do not open a replacement PR unless branch update fails during execution. |

## Needs Human

- none
