---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-73500"
mode: "autonomous"
run_id: "25267048284"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25267048284"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T02:06:16.108Z"
canonical: "https://github.com/openclaw/openclaw/pull/76317"
canonical_issue: "https://github.com/openclaw/openclaw/issues/73381"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76317"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-73500

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25267048284](https://github.com/openclaw/clawsweeper/actions/runs/25267048284)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76317

## Summary

Open replacement PR #76317 is the canonical repair path for #73381, but exact-head CI is not clean, so the next deterministic action is to repair the writable same-repo branch and rerun review/checks. Source PR #73500 is already closed as superseded by #76317. No close or merge actions are emitted because this job blocks both.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76317 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76317 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #73381 | keep_related | planned | fixed_by_candidate | Keep the issue open as covered by candidate #76317 until the candidate branch is green and mergeable. |
| #73500 | keep_closed | skipped | superseded | Already closed as superseded by writable replacement PR #76317. |
| #76317 | fix_needed | planned | canonical | Repair the writable canonical replacement branch, rerun validation, then request a fresh exact-head ClawSweeper review before any merge router decision. |
| cluster:automerge-openclaw-openclaw-73500 | build_fix_artifact | planned |  | Create an executable repair artifact for the existing writable replacement PR. |

## Needs Human

- none
