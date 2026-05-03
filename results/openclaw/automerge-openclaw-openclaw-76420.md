---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76420"
mode: "autonomous"
run_id: "25269174793"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25269174793"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T04:04:55.737Z"
canonical: "https://github.com/openclaw/openclaw/pull/76420"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/76420"
actions_total: 5
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 2
needs_human_count: 0
---

# automerge-openclaw-openclaw-76420

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25269174793](https://github.com/openclaw/clawsweeper/actions/runs/25269174793)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76420

## Summary

Canonical path is the adopted, writable contributor PR #76420. Current main still trims normal trailing assistant replies from durable session files, while #76420 is open but dirty/unmergeable against main and needs a repair/rebase pass before the comment router can re-review the exact head. No GitHub mutations, closes, merges, labels, pushes, or PR creation are recommended by this worker.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 2 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76420 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76329 | close_fixed_by_candidate | skipped | fixed_by_candidate | The issue is covered by the canonical PR path, but closeout must wait for the repaired PR to land and for a human/merge-capable router path to handle closure. |
| #76280 | close_superseded | skipped | superseded | #76280 is a useful overlapping contributor PR, but this worker cannot close it. Keep its credit and defer any superseded closeout until the canonical fix is repaired and landed. |
| #76420 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76420 | fix_needed | planned | canonical | Repair the existing writable contributor branch instead of replacing it: resolve dirty merge state/rebase, keep the narrow session repair fix, preserve docs/changelog updates, and re-run ClawSweeper review plus changed-gate validation before any merge-capable router action. |
| cluster:automerge-openclaw-openclaw-76420 | build_fix_artifact | planned |  | Build a repair plan for the existing canonical PR branch so the executor can rebase/resolve conflicts, validate, and ask for a fresh exact-head ClawSweeper review. |
| #76329 | close_fixed_by_candidate | blocked | fixed_by_candidate | The issue is covered by the canonical PR path, but closeout must wait for the repaired PR to land and for a human/merge-capable router path to handle closure. |
| #76280 | close_superseded | blocked | superseded | #76280 is a useful overlapping contributor PR, but this worker cannot close it. Keep its credit and defer any superseded closeout until the canonical fix is repaired and landed. |
| #75606 | keep_closed | skipped | related | Historical context only; no mutation is allowed or needed for this closed PR. |

## Needs Human

- none
