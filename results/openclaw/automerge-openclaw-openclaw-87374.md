---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87374"
mode: "autonomous"
run_id: "26567841424"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26567841424"
head_sha: "ca8a8d4f30a243609adf112ca2b34ee63bceb83b"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-28T10:34:49.469Z"
canonical: "https://github.com/openclaw/openclaw/pull/87550"
canonical_issue: "https://github.com/openclaw/openclaw/issues/87310"
canonical_pr: "https://github.com/openclaw/openclaw/pull/87550"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87374

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26567841424](https://github.com/openclaw/clawsweeper/actions/runs/26567841424)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87550

## Summary

Hydrated state shows source PR #87374 is already closed and was replaced by writable same-repo PR #87550. #87550 is the active canonical repair path for issue #87310, but merge is disabled and the current head still has an unstable merge state plus a failed `Scan changed paths (precise)` check, so the next deterministic step is a branch repair/fix pass, not merge or close.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/87550 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87550 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87310 | keep_related | planned | fixed_by_candidate | Keep the issue open as covered by the active repair PR; no closure is allowed in this job. |
| #87374 | keep_closed | skipped | superseded | Closed source PR is historical evidence and credit source only; active repair continues in #87550. |
| #87550 | fix_needed | planned | canonical | Repair the active writable PR branch, address the failed changed-path/check feedback and any exact-head review findings, then rerun validation. |
| cluster:automerge-openclaw-openclaw-87374 | build_fix_artifact | planned |  | Executor needs a deterministic repair plan for #87550. |

## Needs Human

- none
