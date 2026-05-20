---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-84254"
mode: "autonomous"
run_id: "26135540897"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26135540897"
head_sha: "84b6807f06253530164956d420d89332f58cb257"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-20T01:53:18.569Z"
canonical: "https://github.com/openclaw/openclaw/pull/84369"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/84369"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-84254

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26135540897](https://github.com/openclaw/clawsweeper/actions/runs/26135540897)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84369

## Summary

#84254 is already closed as the superseded fork PR. The live canonical path is the writable same-repo replacement PR #84369, but it is not merge-ready because the hydrated preflight shows mergeable_state=dirty and build-artifacts failing at head 75cdb0359825868b1767aee80e55adbab97866d3. Plan a bounded repair of #84369 only; no close or merge actions are permitted by this job.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/84369 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84369 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84254 | keep_closed | skipped | superseded | Historical source PR only; already closed after credited replacement was opened. |
| #84369 | fix_needed | planned | canonical | Repair the writable replacement PR branch by rebasing/resolving conflicts against current main and fixing the build-artifacts failure before any merge-capable router can proceed. |
| cluster:automerge-openclaw-openclaw-84254 | build_fix_artifact | planned |  | Create an executable repair artifact for the deterministic edit pass. |

## Needs Human

- none
