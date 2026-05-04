---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76822"
mode: "autonomous"
run_id: "25295289132"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25295289132"
head_sha: "682658e7d8b3cbfa3018d391edcdf6838e80d311"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-04T00:53:41.525Z"
canonical: "https://github.com/openclaw/openclaw/pull/76822"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/76822"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76822

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25295289132](https://github.com/openclaw/clawsweeper/actions/runs/25295289132)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76822

## Summary

PR #76822 is the canonical adopted PR, but it is not merge-ready: the hydrated preflight reports mergeable=false with mergeable_state=dirty. The branch is a same-repo writable branch, so the safe path is to repair the contributor branch narrowly, preserve @jesse-merhi credit, re-run review and changed checks, and leave merge/close to the guarded applicator because both are blocked by job policy.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76822 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76822 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76822 | fix_needed | planned | canonical | Canonical PR is useful, narrow, and writable, but dirty against current main SHA 57b2d297613a29010b14eca8fefbeced00e5db86. |
| cluster:automerge-openclaw-openclaw-76822 | build_fix_artifact | planned |  | Automerge finalization needs an executable branch-repair artifact because #76822 is canonical but currently dirty. |

## Needs Human

- none
