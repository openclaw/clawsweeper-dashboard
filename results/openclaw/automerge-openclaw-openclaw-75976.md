---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75976"
mode: "autonomous"
run_id: "25250312339"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25250312339"
head_sha: "433ced66f38849e952913951358745a931603c98"
workflow_conclusion: "cancelled"
result_status: "planned"
published_at: "2026-05-02T11:04:11.517Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25250312339](https://github.com/openclaw/clawsweeper/actions/runs/25250312339)

Workflow conclusion: cancelled

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75976

## Summary

Canonical PR #75976 is a same-repo, writable ClawSweeper automerge candidate, but it is not merge-ready: exact-head checks include failing core/dependency/runtime-infra gates and the prior ClawSweeper review paused for repair or maintainer review. Emit a repair-contributor-branch fix artifact only; do not close or merge.

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
| #75976 | fix_needed | planned | canonical | Repair the existing writable contributor branch, then rerun ClawSweeper review and changed-surface validation before any merge-capable applicator acts. |
| #72097 | keep_related | planned | fixed_by_candidate | Keep the issue associated with the canonical PR, but do not close while the candidate remains unmerged and CI is failing. |
| cluster:automerge-openclaw-openclaw-75976 | build_fix_artifact | planned |  | Create an executable repair plan for the writable canonical PR branch. |

## Needs Human

- none
