---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76288"
mode: "autonomous"
run_id: "25264608298"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25264608298"
head_sha: "08cd9dbda14b57deec64cf4cefce1b0844246d4e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T00:16:47.678Z"
canonical: "https://github.com/openclaw/openclaw/pull/76288"
canonical_issue: "https://github.com/openclaw/openclaw/issues/76276"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76288"
actions_total: 4
fix_executed: 0
fix_failed: 1
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76288

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25264608298](https://github.com/openclaw/clawsweeper/actions/runs/25264608298)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76288

## Summary

PR #76288 is the canonical repair path for issue #76276, but it is not merge-ready because the hydrated ClawSweeper review has an actionable P2 blocker. The branch is writable, fix PR work is allowed, and merge/close actions are blocked by job policy, so the safe plan is to repair the contributor branch and preserve credit.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| repair_contributor_branch | failed |  |  | To https://github.com/pfrederiksen/openclaw.git
 ! [remote rejected]       HEAD -> fix/cron-manual-runid-history (refusing to allow a GitHub App to create or update workflow `.github/workflows/openclaw-live-and-e2e-checks-reusable.yml` without `workflows` permission)
error: failed to push some refs to 'https://github.com/pfrederiksen/openclaw.git' |
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/76328 | clawsweeper/automerge-openclaw-openclaw-76288 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76328 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #40204 | keep_closed | skipped | related | Already-closed linked context ref; no mutation planned. |
| #76276 | keep_canonical | planned | canonical | Canonical user report remains open while the repair PR is amended. |
| #76288 | fix_needed | planned | canonical | Repair the writable contributor branch by separating the public manual acknowledgement ID from the recoverable task ledger ID before any merge consideration. |
| cluster:automerge-openclaw-openclaw-76288 | build_fix_artifact | planned |  | Executable repair artifact for the ClawSweeper applicator. |

## Needs Human

- none
