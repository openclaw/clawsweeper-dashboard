---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75302"
mode: "autonomous"
run_id: "25196881228"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25196881228"
head_sha: "88417c393b78f2952a0301b8f33a60057cd5fc9c"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T01:00:42.257Z"
canonical: "https://github.com/openclaw/openclaw/pull/75302"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75302"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75302

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25196881228](https://github.com/openclaw/clawsweeper/actions/runs/25196881228)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75302

## Summary

PR #75302 is the canonical automerge candidate, but it is not merge-ready. The hydrated ClawSweeper review has one actionable blocker: mark or reword the legacy commitment source text fields in src/commitments/types.ts so the deprecated surface is explicit and the architecture/check lanes can pass. The PR uses a same-repo writable branch, so the correct path is to repair the contributor branch in place and preserve attribution there. No close or merge actions are allowed by this job.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75302 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75302 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75302 | fix_needed | planned | canonical | Repair the writable contributor branch in place before any re-review/automerge path. |
| cluster:automerge-openclaw-openclaw-75302 | build_fix_artifact | planned |  | Create a branch-repair task for PR #75302 rather than replacement or human escalation. |

## Needs Human

- none
