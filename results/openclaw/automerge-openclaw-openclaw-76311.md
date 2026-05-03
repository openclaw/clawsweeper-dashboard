---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76311"
mode: "autonomous"
run_id: "25268364786"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25268364786"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T03:21:54.108Z"
canonical: "https://github.com/openclaw/openclaw/pull/76311"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/76311"
actions_total: 5
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76311

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25268364786](https://github.com/openclaw/clawsweeper/actions/runs/25268364786)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76311

## Summary

PR #76311 is the canonical repair path, but it is not merge-ready in this worker result because merge is blocked by job policy and the hydrated check set contains relevant failures. The branch is writable, so the correct next step is a bounded repair of the contributor branch, preserving @buyitsydney credit, followed by re-review and `pnpm check:changed`.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76311 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76311 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76311 | fix_needed | planned | canonical | Repair the writable contributor branch and rerun exact-head validation before any future merge-capable applicator acts. |
| cluster:automerge-openclaw-openclaw-76311 | build_fix_artifact | planned |  | A concrete contributor-branch repair artifact is required because the canonical automerge PR is useful but not merge-ready. |
| #44166 | keep_related | planned | related | Keep open as related follow-up scope after the retry-only PR is repaired and reviewed. |
| #56815 | keep_related | planned | related | Keep open as related broader memory reindex resilience work. |
| #56131 | keep_independent | planned | independent | Do not route session archive recovery through this memory retry repair. |

## Needs Human

- none
