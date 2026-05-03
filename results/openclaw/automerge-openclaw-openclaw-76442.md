---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76442"
mode: "autonomous"
run_id: "25275091368"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25275091368"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T09:43:39.237Z"
canonical: "https://github.com/openclaw/openclaw/pull/76442"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/76442"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76442

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25275091368](https://github.com/openclaw/clawsweeper/actions/runs/25275091368)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76442

## Summary

PR #76442 remains the canonical path. No GitHub mutations are allowed from this worker; merge and close are blocked by job policy. The writable same-repo PR branch needs repair before automerge because Copilot left two actionable test-environment comments and exact-head checks include relevant failures/pending jobs.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76442 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76442 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76442 | fix_needed | planned | canonical | Canonical PR is useful and writable, but not merge-ready because actionable bot comments and relevant exact-head check failures remain. |
| cluster:automerge-openclaw-openclaw-76442 | build_fix_artifact | planned |  | Build an executable repair plan for the writable canonical contributor branch. |
| #70044 | keep_closed | skipped | related | Historical related PR only; already closed refs are evidence, not mutation targets. |
| #74809 | keep_closed | skipped | fixed_by_candidate | Already closed linked issue; keep as fixed-by-candidate evidence only. |

## Needs Human

- none
