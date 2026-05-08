---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-78780"
mode: "autonomous"
run_id: "25538583172"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25538583172"
head_sha: "b9a420e71bdc72e6fecafac1a6480448219d40cc"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-08T05:56:18.300Z"
canonical: "https://github.com/openclaw/openclaw/pull/78780"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/78780"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-78780

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25538583172](https://github.com/openclaw/clawsweeper/actions/runs/25538583172)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/78780

## Summary

PR #78780 is the canonical repair target, but it is not merge-ready: the hydrated state shows a dirty mergeability state, failing relevant checks, and an actionable Copilot review comment on the browser Chrome internal test timing. Because the same-repo head branch is writable, the executor should repair the contributor branch rather than replace it.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/78780 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #78780 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #78780 | fix_needed | planned | canonical | Canonical PR is useful and writable but needs branch repair for merge conflict/check failure and the actionable bot review finding. |
| cluster:automerge-openclaw-openclaw-78780 | build_fix_artifact | planned |  | A narrow executable branch repair is available and preferred over replacement. |

## Needs Human

- none
