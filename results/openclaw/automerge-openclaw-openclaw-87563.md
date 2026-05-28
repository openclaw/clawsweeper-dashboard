---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87563"
mode: "autonomous"
run_id: "26587810859"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26587810859"
head_sha: "8db024ba0503b6c8368d0b699367e0f321d740b1"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-28T17:14:51.113Z"
canonical: "https://github.com/openclaw/openclaw/pull/87706"
canonical_issue: "https://github.com/openclaw/openclaw/issues/87536"
canonical_pr: "https://github.com/openclaw/openclaw/pull/87706"
actions_total: 5
fix_executed: 0
fix_failed: 1
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87563

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26587810859](https://github.com/openclaw/clawsweeper/actions/runs/26587810859)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87706

## Summary

Classified the automerge repair cluster from the hydrated artifact. The original contributor PR #87563 is already closed as superseded, and the surviving canonical path is the writable replacement PR #87706. It is not merge-ready in this worker result because merge is disallowed, mergeability is still unknown in the artifact, Security High (network-ssrf-boundary) is still in progress, and the fresh ClawSweeper/Codex review for #87706 has not completed. Emit a repair artifact for the existing same-repo replacement branch, preserving #87563 contributor credit.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
| Fix executed | 0 |
| Fix failed | 1 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | failed |  |  | source PR #87563 is closed |
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/87706 | clawsweeper/automerge-openclaw-openclaw-87563 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87706 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #73723 | keep_closed | skipped | related | Already closed; no closure or mutation is valid for this target. |
| #87536 | keep_related | planned | related | Related to the canonical repair PR but not safe to close or mark fixed before #87706 lands. |
| #87563 | keep_closed | skipped | superseded | Original source PR is already closed as superseded by the credited replacement; no close action is valid. |
| #87706 | fix_needed | planned | canonical | Repair/review the writable replacement branch, then rerun exact-head review and validation before any later merge-capable applicator considers it. |
| cluster:automerge-openclaw-openclaw-87563 | build_fix_artifact | planned |  | A narrow fix path exists and should continue on the writable replacement PR branch. |

## Needs Human

- none
