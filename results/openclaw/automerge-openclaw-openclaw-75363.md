---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75363"
mode: "autonomous"
run_id: "25249778848"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25249778848"
head_sha: "604d981cbdafb6fcc774d4e06cf4f649926bf12b"
workflow_conclusion: "cancelled"
result_status: "planned"
published_at: "2026-05-02T10:32:41.474Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25249778848](https://github.com/openclaw/clawsweeper/actions/runs/25249778848)

Workflow conclusion: cancelled

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75363

## Summary

PR #75363 remains the canonical adopted automerge candidate. It is open, non-security, same-repo branch writable, and has passing hydrated CI, but it still needs a bounded repair/re-review loop before any merge decision because ClawSweeper reported an actionable Discord REST stale-dropping blocker and a prior `pnpm check:changed` repair validation failure. Merge and close actions are blocked by job frontmatter.

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
| #75363 | fix_needed | planned | canonical | Adopted automerge PR is the canonical path, but it is not merge-ready until the REST stale-dropping blocker and prior changed-gate failure are repaired on the writable contributor branch. |
| cluster:automerge-openclaw-openclaw-75363 | build_fix_artifact | planned |  | Emit an executable repair artifact for the deterministic executor to update PR #75363, run validation, request a fresh review, and leave final merge to the comment router gates. |

## Needs Human

- none
