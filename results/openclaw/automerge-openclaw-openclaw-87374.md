---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87374"
mode: "autonomous"
run_id: "26587759741"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26587759741"
head_sha: "c01469876a8575896e3d81bc94daafdfaea1efca"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-28T16:55:00.340Z"
canonical: "https://github.com/openclaw/openclaw/pull/87550"
canonical_issue: "https://github.com/openclaw/openclaw/issues/87310"
canonical_pr: "https://github.com/openclaw/openclaw/pull/87550"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87374

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26587759741](https://github.com/openclaw/clawsweeper/actions/runs/26587759741)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87550

## Summary

Hydrated state shows source PR #87374 is already closed and was replaced by writable same-repo PR #87550. #87550 is the canonical repair path but still needs changes because the latest ClawSweeper/Codex review blocks merge on gateway reset diagnostic cleanup ordering. No close or merge actions are emitted because the job blocks both.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/87550 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87550 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87310 | keep_related | planned | fixed_by_candidate | Leave the issue open while the canonical replacement PR is repaired and validated. |
| #87374 | keep_closed | skipped | superseded | Historical source PR only; the active repair path is #87550. |
| #87550 | fix_needed | planned | canonical | Repair the writable replacement PR branch; merge is blocked by job policy and by the unresolved review finding. |
| cluster:automerge-openclaw-openclaw-87374 | build_fix_artifact | planned |  | A narrow branch repair is required before the automerge loop can request another review. |

## Needs Human

- none
