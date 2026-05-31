---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-88072"
mode: "autonomous"
run_id: "26710562264"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26710562264"
head_sha: "c91028476c0687cdc8b9a524142452969e511800"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-31T11:19:02.554Z"
canonical: "https://github.com/openclaw/openclaw/pull/88340"
canonical_issue: "https://github.com/openclaw/openclaw/issues/88020"
canonical_pr: "https://github.com/openclaw/openclaw/pull/88340"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-88072

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26710562264](https://github.com/openclaw/clawsweeper/actions/runs/26710562264)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/88340

## Summary

Canonical path is the open same-repo replacement PR #88340. Original PR #88072 is already closed and superseded. Issue #88020 remains open and should stay tied to #88340 until the repair branch is rebased, failing checks are fixed, and validation is green. No close or merge action is emitted because both are blocked by job policy and #88340 is not merge-ready.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/88340 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #88340 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #88020 | keep_related | planned | fixed_by_candidate | Keep the bug report open as covered by the canonical repair PR until #88340 lands or a post-merge closeout run is allowed. |
| #88072 | keep_closed | skipped | superseded | Historical source PR only; it remains the credited source for the writable replacement path. |
| #88340 | fix_needed | planned | canonical | Repair the existing writable canonical PR branch; do not merge because merge is blocked by job policy and current PR state. |
| cluster:automerge-openclaw-openclaw-88072 | build_fix_artifact | planned | canonical | Executable repair handoff for the applicator/editor pass. |

## Needs Human

- none
