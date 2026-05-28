---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-83042"
mode: "autonomous"
run_id: "26591916145"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26591916145"
head_sha: "8db024ba0503b6c8368d0b699367e0f321d740b1"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-28T18:24:10.027Z"
canonical: "https://github.com/openclaw/openclaw/pull/84814"
canonical_issue: "https://github.com/openclaw/openclaw/issues/48680"
canonical_pr: "https://github.com/openclaw/openclaw/pull/84814"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-83042

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26591916145](https://github.com/openclaw/clawsweeper/actions/runs/26591916145)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84814

## Summary

Hydrated state shows the original contributor PR #83042 is already closed after ClawSweeper opened credited replacement PR #84814. The replacement PR is the canonical repair path for open issue #48680, but it is not merge-ready because the artifact reports mergeable_state=unstable and a failing relevant check, so this result emits a non-mutating repair artifact for the writable same-repo PR branch.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/84814 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84814 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #48680 | keep_canonical | planned | canonical | Keep the canonical issue open until the replacement PR lands and post-merge closeout is permitted. |
| #83042 | keep_closed | skipped | superseded | Historical source PR only; replacement #84814 carries the credited fix path. |
| #84814 | fix_needed | planned | canonical | Repair the existing writable replacement PR branch, rerun exact-head validation, and re-review before any future merge decision. |
| cluster:automerge-openclaw-openclaw-83042 | build_fix_artifact | planned |  | The canonical PR is useful but not merge-ready, so an executable repair artifact is required. |

## Needs Human

- none
