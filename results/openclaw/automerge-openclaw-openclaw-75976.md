---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75976"
mode: "autonomous"
run_id: "25250474838"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25250474838"
head_sha: "2658bb652973dd1016dd9046ae9537c076b55f1e"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-02T11:37:30.184Z"
canonical: "https://github.com/openclaw/openclaw/pull/75976"
canonical_issue: "https://github.com/openclaw/openclaw/issues/72097"
canonical_pr: "https://github.com/openclaw/openclaw/pull/75976"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75976

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25250474838](https://github.com/openclaw/clawsweeper/actions/runs/25250474838)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75976

## Summary

PR #75976 is the canonical adopted automerge repair path, but it is not merge-ready: the hydrated artifact shows unstable merge state and failing exact-head checks. The same-repo head branch is writable, so the safe deterministic action is to repair the contributor PR branch in place, rerun review/validation, and leave #72097 open until the canonical PR is fixed and merged.

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
| #75976 | fix_needed | planned | canonical | Repair the writable canonical PR branch, address the failing checks/review blocker, rerun /review and changed-surface validation, then let the applicator/router decide merge after a clean exact-head verdict. |
| #72097 | keep_related | planned | fixed_by_candidate | The issue is covered by the canonical PR path but must stay open until the fix lands. |
| cluster:automerge-openclaw-openclaw-75976 | build_fix_artifact | planned |  | A branch repair is required before ClawSweeper can re-review and the router can consider automerge. |

## Needs Human

- none
