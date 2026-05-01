---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-70ddeef0e8cd"
mode: "autonomous"
run_id: "25140829821"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25140829821"
head_sha: "185915fbbe55221cf5482625c6c350a6e9635aed"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T00:27:35.013Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-70ddeef0e8cd

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25140829821](https://github.com/openclaw/clawsweeper/actions/runs/25140829821)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

The commit updates test expectations, but the checked-out code still returns `available: false` for the affected unauthenticated model-list rows. The focused test file now fails on `main`.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74695 | clawsweeper/clawsweeper-commit-openclaw-openclaw-70ddeef0e8cd |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74695 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-70ddeef0e8cd | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
