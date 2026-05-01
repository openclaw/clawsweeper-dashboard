---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75209"
mode: "autonomous"
run_id: "25186718052"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25186718052"
head_sha: "297d6c23096706b3adb6b4aad8398449279e7a8f"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T20:17:47.084Z"
canonical: "https://github.com/openclaw/openclaw/pull/75209"
canonical_issue: "https://github.com/openclaw/openclaw/issues/70055"
canonical_pr: "https://github.com/openclaw/openclaw/pull/75209"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75209

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25186718052](https://github.com/openclaw/clawsweeper/actions/runs/25186718052)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75209

## Summary

PR #75209 is the calibrated canonical automerge candidate, but it is not merge-ready in this worker pass because the hydrated checks include one failing parity gate. The branch is same-repo and writable, so the executable path is to repair the contributor branch, preserve steipete's credit, rerun focused validation, and then let the comment router request a fresh ClawSweeper verdict. Linked issue #70055 remains a related open follow-up for the separate user-facing config/env opt-out.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75209 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75209 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75209 | fix_needed | planned | canonical | Automerge cannot proceed while a current check is failing, and merge is blocked by job policy. Because the branch is writable, ClawSweeper should repair the existing contributor branch rather than open a replacement. |
| cluster:automerge-openclaw-openclaw-75209 | build_fix_artifact | planned |  | The deterministic executor needs an auditable repair plan for the writable contributor branch before a fresh ClawSweeper verdict can unblock automerge. |
| #70055 | keep_related | planned | related | #70055 is related follow-up scope, not a duplicate of the PR repair target. |

## Needs Human

- none
