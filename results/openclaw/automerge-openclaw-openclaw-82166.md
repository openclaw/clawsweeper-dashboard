---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-82166"
mode: "autonomous"
run_id: "26051112037"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26051112037"
head_sha: "58ac11959cadbccb61aad2455601c8c8788cde00"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-18T18:22:46.459Z"
canonical: "https://github.com/openclaw/openclaw/pull/83707"
canonical_issue: "https://github.com/openclaw/openclaw/issues/65204"
canonical_pr: "https://github.com/openclaw/openclaw/pull/83707"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-82166

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26051112037](https://github.com/openclaw/clawsweeper/actions/runs/26051112037)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/83707

## Summary

The original contributor PR #82166 is already closed as superseded by the writable replacement PR #83707. The replacement PR is the canonical repair path, but it is currently dirty/unmergeable against main, so the next deterministic step is to repair/rebase #83707, preserve @Marvae credit, rerun review and validation, and leave #65204 open until the fix lands.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/83707 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #83707 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #82166 | keep_closed | skipped | superseded | Already closed source PR superseded by hydrated replacement PR #83707. |
| #83707 | fix_needed | planned | canonical | Repair/rebase the canonical replacement PR before any future merge-capable applicator can consider it. |
| #65204 | keep_related | planned | fixed_by_candidate | Issue is covered by the open canonical candidate #83707 but should not be closed until the fix lands. |
| cluster:automerge-openclaw-openclaw-82166 | build_fix_artifact | planned | canonical | Canonical replacement PR is repairable but dirty/unmergeable. |

## Needs Human

- none
