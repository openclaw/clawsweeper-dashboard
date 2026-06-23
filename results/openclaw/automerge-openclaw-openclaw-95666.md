---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-95666"
mode: "autonomous"
run_id: "28009633334"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28009633334"
head_sha: "df861c9f65e8bd3da4c60a221eb462361cb0d1c7"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-23T07:30:42.861Z"
canonical: "https://github.com/openclaw/openclaw/pull/95666"
canonical_issue: "https://github.com/openclaw/openclaw/issues/95657"
canonical_pr: "https://github.com/openclaw/openclaw/pull/95666"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-95666

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28009633334](https://github.com/openclaw/clawsweeper/actions/runs/28009633334)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/95666

## Summary

#95666 was already merged and closed in the hydrated preflight state, with maintainer merge proof and passing post-repair checks. Current main at 603b250125d4cdfed6dd026d89bf740241f5a2d3 contains the bridge-side fix and regression test, so no repair PR or merge action is needed for this automerge job. The remaining open PRs are classified non-mutating because close and merge are blocked for this job.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| automerge_repair_outcome_comment | updated | #95666 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #95666 | keep_closed | skipped | canonical | The canonical PR is already merged and closed; no close or merge mutation is valid from this worker. |
| #95657 | keep_closed | skipped | fixed_by_candidate | Already closed; closed refs must not receive close actions. |
| #95663 | keep_related | planned | superseded | Same bridge-side fix family as the landed canonical PR, but close is blocked by job policy and must be handled separately if desired. |
| #95670 | keep_related | planned | related | Related follow-up scanner/indexer work remains separate from the #95666 automerge cluster and has an unresolved bot review blocker, so it should stay open for its own review path. |

## Needs Human

- none
