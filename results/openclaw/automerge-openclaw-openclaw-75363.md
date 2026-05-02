---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75363"
mode: "autonomous"
run_id: "25249285482"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25249285482"
head_sha: "8084053d98e0a3376da73f217de4db3752f0f3c5"
workflow_conclusion: "cancelled"
result_status: "planned"
published_at: "2026-05-02T10:01:39.421Z"
canonical: "https://github.com/openclaw/openclaw/pull/75363"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75363"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75363

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25249285482](https://github.com/openclaw/clawsweeper/actions/runs/25249285482)

Workflow conclusion: cancelled

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75363

## Summary

PR #75363 remains the canonical adopted automerge candidate. It is open, non-security, same-repo branch-writable, and has passing GitHub checks in the artifact, but it is not merge-ready because the hydrated ClawSweeper review still has an actionable Discord REST stale-drop finding. Plan an in-place repair on the contributor branch, preserve source PR credit, rerun review, and validate with the changed gate.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| #75363 | fix_needed | planned | canonical | Adopted automerge PR is canonical but needs bounded repair before any merge-capable applicator can proceed. |
| cluster:automerge-openclaw-openclaw-75363 | build_fix_artifact | planned |  | Emit a repair artifact for the deterministic executor to update the existing PR branch and rerun review/validation. |

## Needs Human

- none
