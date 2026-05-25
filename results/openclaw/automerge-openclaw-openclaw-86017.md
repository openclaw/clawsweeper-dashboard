---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-86017"
mode: "autonomous"
run_id: "26414006151"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26414006151"
head_sha: "f2ec021eb55c7c3305b174f7ebe5f5af89f9dac9"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-25T18:48:32.305Z"
canonical: "https://github.com/openclaw/openclaw/pull/86588"
canonical_issue: "https://github.com/openclaw/openclaw/issues/85959"
canonical_pr: "https://github.com/openclaw/openclaw/pull/86588"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-86017

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26414006151](https://github.com/openclaw/clawsweeper/actions/runs/26414006151)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/86588

## Summary

Canonical repair path is the open same-repo replacement PR #86588. Original contributor PR #86017 is already closed unmerged because the fork branch was not writable; the Feishu bug report #85959 remains open and is covered by the repair candidate once #86588 is made merge-ready.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/86588 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #86588 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #85959 | keep_related | planned | fixed_by_candidate | Keep the issue open until the canonical repair PR lands; it is covered by #86588 but not fixed on main yet. |
| #86017 | keep_closed | skipped | superseded | Already closed source PR; do not emit closure actions for closed refs. |
| #86588 | fix_needed | planned | canonical | Repair the writable replacement PR branch before any merge decision; merge is blocked by policy and missing clean exact-head review proof. |
| cluster:automerge-openclaw-openclaw-86017 | build_fix_artifact | planned |  | A narrow, credited repair artifact is needed to make #86588 merge-ready without mutating GitHub from this worker. |

## Needs Human

- none
