---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75035"
mode: "autonomous"
run_id: "25432112999"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25432112999"
head_sha: "1f9fcbc5089921a390e47d48f49e4f2a9b77e6d4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-06T11:42:06.172Z"
canonical: "https://github.com/openclaw/openclaw/pull/75035"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75035"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75035

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25432112999](https://github.com/openclaw/clawsweeper/actions/runs/25432112999)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75035

## Summary

#75035 is the canonical PR and remains open, non-draft, branch-writable, and opted into ClawSweeper automerge. The hydrated ClawSweeper review passed and CI is green, but GitHub reports mergeable_state dirty, so the next deterministic action is to repair/rebase the same contributor branch and rerun the exact-head review and changed gate. No close or merge action is allowed by this job.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75035 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75035 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75035 | keep_canonical | planned | canonical | Canonical PR is useful and branch-writable, but not merge-ready because GitHub reports mergeable_state dirty. |
| cluster:automerge-openclaw-openclaw-75035 | fix_needed | planned |  | Repair the existing #75035 branch by rebasing/resolving conflicts against current main fc1e2c505ad0ba173b80e0193064798856caf5f4, then rerun ClawSweeper review and pnpm check:changed before any merge-capable applicator proceeds. |
| cluster:automerge-openclaw-openclaw-75035 | build_fix_artifact | planned |  | Build an executable repair plan for the branch-writable canonical PR; do not open a replacement PR unless branch repair becomes unsafe. |

## Needs Human

- none
