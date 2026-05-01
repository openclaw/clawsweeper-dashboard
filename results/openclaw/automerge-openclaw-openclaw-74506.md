---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74506"
mode: "autonomous"
run_id: "25218749482"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25218749482"
head_sha: "f1bb916a329faa6fdadc8549b12d2dd5453c7f91"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T15:02:46.724Z"
canonical: "https://github.com/openclaw/openclaw/pull/75173"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75173"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-74506

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25218749482](https://github.com/openclaw/clawsweeper/actions/runs/25218749482)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75173

## Summary

Closed source PR #74506 is historical context only. Open replacement PR #75173 is the canonical repair path, but it is dirty/behind current main and needs a same-branch rebase/repair before the comment router can re-review and automerge it.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75173 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75173 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74506 | keep_closed | skipped | superseded | Already closed source PR; keep as superseded context and preserve credit through #75173. |
| #75173 | fix_needed | planned | canonical | Repair the writable canonical PR branch by rebasing/resolving conflicts against current main, then rerun focused validation and ClawSweeper review. |
| cluster:automerge-openclaw-openclaw-74506 | build_fix_artifact | planned |  | Provide an executable repair artifact for the deterministic executor. |

## Needs Human

- none
