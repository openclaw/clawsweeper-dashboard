---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-84142"
mode: "autonomous"
run_id: "26135546223"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26135546223"
head_sha: "84b6807f06253530164956d420d89332f58cb257"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-20T01:41:47.966Z"
canonical: "https://github.com/openclaw/openclaw/pull/84362"
canonical_issue: "https://github.com/openclaw/openclaw/issues/84038"
canonical_pr: "https://github.com/openclaw/openclaw/pull/84362"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-84142

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26135546223](https://github.com/openclaw/clawsweeper/actions/runs/26135546223)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84362

## Summary

Canonical path is the open same-repo replacement PR #84362, which carries forward #84142 and fixes #84038 but is not merge-ready because preflight reports mergeable=false / mergeable_state=dirty against main 0e2a06ae10e66837c82fc04c8fafc6472fc854c3. Plan a branch repair/rebase on #84362, preserve @nxmxbbd credit from #84142, rerun review and changed checks, and leave closure/merge to later gated applicators.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/84362 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84362 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84362 | fix_needed | planned | canonical | Repair the writable replacement PR branch, then rerun review and validation. Merge is not allowed in this job. |
| #84038 | keep_related | planned | fixed_by_candidate | Keep the issue open until #84362 lands and post-merge closeout is explicitly allowed. |
| #84142 | keep_closed | skipped | superseded | Historical source PR only; keep closed and continue repair on #84362. |
| #83315 | keep_independent | planned | independent | Different doctor/config migration issue; leave it out of this automerge repair cluster. |

## Needs Human

- none
