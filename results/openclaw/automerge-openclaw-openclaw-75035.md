---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75035"
mode: "autonomous"
run_id: "25429946835"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25429946835"
head_sha: "1f9fcbc5089921a390e47d48f49e4f2a9b77e6d4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-06T10:52:53.297Z"
canonical: "https://github.com/openclaw/openclaw/pull/75035"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75035"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75035

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25429946835](https://github.com/openclaw/clawsweeper/actions/runs/25429946835)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75035

## Summary

#75035 is the canonical adopted PR. It is open and same-repo branch-writable, but the preflight reports mergeable=false and mergeable_state=dirty, so the correct automerge outcome is a same-branch repair/rebase artifact, not merge or closure.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75035 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75035 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75035 | fix_needed | planned | canonical | Maintainer-calibrated automerge PR is canonical but not merge-ready; repair the writable contributor branch instead of replacing or merging. |
| cluster:automerge-openclaw-openclaw-75035 | build_fix_artifact | planned |  | Build an executable repair artifact for the deterministic fixer to update #75035 without mutating GitHub from this worker. |

## Needs Human

- none
