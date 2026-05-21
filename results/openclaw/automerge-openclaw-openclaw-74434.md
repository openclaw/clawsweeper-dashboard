---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74434"
mode: "autonomous"
run_id: "26207036643"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26207036643"
head_sha: "3477775b50d9fb1d14c3fc2453e6d865507eb961"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-21T05:58:17.651Z"
canonical: "https://github.com/openclaw/openclaw/pull/84798"
canonical_issue: "https://github.com/openclaw/openclaw/issues/73781"
canonical_pr: "https://github.com/openclaw/openclaw/pull/84798"
actions_total: 5
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-74434

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26207036643](https://github.com/openclaw/clawsweeper/actions/runs/26207036643)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84798

## Summary

Canonical fix path is the writable replacement PR #84798. The source PR #74434 is already closed and credited; #73781 remains the canonical bug issue until the fix lands; #78865 is related product-policy work, not a duplicate. #84798 needs branch repair because GitHub reports it dirty against main, so this result emits a repair artifact and no merge or close actions.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/84798 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84798 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #73781 | keep_canonical | planned | canonical | Keep the canonical bug issue open until the replacement PR lands and post-merge closeout is permitted. |
| #74434 | keep_closed | skipped | superseded | Closed source PR is historical evidence and credit source only; active review continues in #84798. |
| #78865 | keep_related | planned | related | Related retry-loop family, but not covered by the narrow Pi SDK auto-retry fix. |
| #84798 | fix_needed | planned | canonical | Repair the writable replacement PR branch by rebasing/resolving conflicts against current main, preserving source credit, and rerunning validation. |
| cluster:automerge-openclaw-openclaw-74434 | build_fix_artifact | planned |  | A narrow repair artifact is needed for the executor to make #84798 merge-ready. |

## Needs Human

- none
