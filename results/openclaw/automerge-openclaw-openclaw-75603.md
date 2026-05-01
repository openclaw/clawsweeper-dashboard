---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75603"
mode: "autonomous"
run_id: "25214499403"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25214499403"
head_sha: "df20b9a6303d40b1149054180a017e06e722c7f4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T12:45:53.817Z"
canonical: "https://github.com/openclaw/openclaw/pull/75603"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75603"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75603

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25214499403](https://github.com/openclaw/clawsweeper/actions/runs/25214499403)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75603

## Summary

PR #75603 is the canonical repair path, but it is not merge-ready: hydrated preflight shows current failing relevant checks while the same-repo branch is writable. No close or merge action is allowed for this job, so the safe result is to repair the contributor branch and rerun the exact changed-surface gate.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75603 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75603 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75603 | fix_needed | planned | canonical | Canonical PR needs a repair pass for failing relevant checks before any merge-capable router can consider it. |
| cluster:automerge-openclaw-openclaw-75603 | build_fix_artifact | planned |  | Create an executable repair artifact for the deterministic executor to fetch #75603, repair the contributor branch, and validate the changed surface. |

## Needs Human

- none
