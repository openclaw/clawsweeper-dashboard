---
repo: "openclaw/openclaw"
cluster_id: "issue-openclaw-openclaw-76734"
mode: "autonomous"
run_id: "25290320811"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25290320811"
head_sha: "c67b2d83cb9adde8e893536bd387639a1c09e0db"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T20:53:36.564Z"
canonical: "https://github.com/openclaw/openclaw/issues/76734"
canonical_issue: "https://github.com/openclaw/openclaw/issues/76734"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76744"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-76734

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25290320811](https://github.com/openclaw/clawsweeper/actions/runs/25290320811)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/76734

## Summary

Issue #76734 is still valid on current main e387764014d6d18f8c9fadaf4366fc509fb136c6: docs/tools/acp-agents.md still says `persistent behaviour`, while repo guidance requires American spelling. PR #76744 is the right existing implementation path, but it is dirty against current main and has a ClawSweeper review asking for a narrow branch refresh before merge. Plan repair of the same writable branch/PR; no close or merge action is emitted.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76744 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76744 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76734 | keep_canonical | planned | canonical |  |
| #76744 | fix_needed | planned | canonical | Repair the existing writable ClawSweeper PR branch by rebasing/recreating the narrow docs/changelog diff on current main before any future merge consideration. |
| cluster:issue-openclaw-openclaw-76734 | build_fix_artifact | planned |  |  |

## Needs Human

- none
