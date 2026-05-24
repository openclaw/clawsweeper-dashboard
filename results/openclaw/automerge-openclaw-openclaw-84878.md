---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-84878"
mode: "autonomous"
run_id: "26346423663"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26346423663"
head_sha: "8482e50718672cbdb77711ea41b08222ad41822d"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-24T00:03:01.581Z"
canonical: "https://github.com/openclaw/openclaw/pull/85862"
canonical_issue: "https://github.com/openclaw/openclaw/issues/84857"
canonical_pr: "https://github.com/openclaw/openclaw/pull/85862"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-84878

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26346423663](https://github.com/openclaw/clawsweeper/actions/runs/26346423663)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/85862

## Summary

Canonical repair path is the open writable replacement PR #85862. Source PR #84878 is already closed as superseded after ClawSweeper opened #85862, and issue #84857 should stay open until the replacement PR is repaired and landed. Merge and close are blocked by job policy; repair is still needed because #85862 has failing relevant CI checks and unknown mergeability.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/85862 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #85862 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84857 | keep_related | planned | fixed_by_candidate | Keep the issue open and route validation through #85862. |
| #84878 | keep_closed | skipped | superseded | Historical source PR is superseded by writable replacement #85862. |
| #85862 | fix_needed | planned | canonical | Repair #85862, rerun review and changed validation, then let the guarded automerge router decide merge after clean proof. |
| cluster:automerge-openclaw-openclaw-84878 | build_fix_artifact | planned | canonical | Emit an executable repair artifact for #85862. |

## Needs Human

- none
