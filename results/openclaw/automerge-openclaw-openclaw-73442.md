---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-73442"
mode: "autonomous"
run_id: "25356926626"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25356926626"
head_sha: "b033b7343591359fedef5f4b04f4d48baa25dda6"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-05T04:16:06.734Z"
canonical: "https://github.com/openclaw/openclaw/pull/73442"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/73442"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-73442

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25356926626](https://github.com/openclaw/clawsweeper/actions/runs/25356926626)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/73442

## Summary

PR #73442 is the canonical adopted automerge PR, but it is not merge-ready: the hydrated preflight reports dirty mergeability, missing exact-head validation, and a ClawSweeper review that explicitly requires conflict resolution plus rerun validation before merge. The same-repo head branch is writable, so the correct path is to repair the contributor branch rather than replace it.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/73442 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #73442 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #73442 | fix_needed | planned | canonical | Repair the writable contributor branch, resolve dirty mergeability, address any exact-head review findings, preserve credit, and rerun validation before any merge-capable router can proceed. |
| cluster:automerge-openclaw-openclaw-73442 | build_fix_artifact | planned |  | Create an executable branch-repair plan for the deterministic executor; no GitHub mutation is performed by this worker. |

## Needs Human

- none
