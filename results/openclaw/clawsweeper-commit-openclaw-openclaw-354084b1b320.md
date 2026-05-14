---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-354084b1b320"
mode: "autonomous"
run_id: "25842221356"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25842221356"
head_sha: "1558af39eeca02b91e57ae98a885c7871229a8e8"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-14T05:02:07.437Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-354084b1b320

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25842221356](https://github.com/openclaw/clawsweeper/actions/runs/25842221356)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

The commit finding still appears valid on current main 6db2ee6583d968586ffba6dbf995f2e31402c2a1. No hydrated issue/PR refs exist, no security signal was present, and the canonical path is a narrow new fix PR for provider runtime hook resolution/cache behavior.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75397 | clawsweeper/clawsweeper-commit-openclaw-openclaw-354084b1b320 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75397 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-354084b1b320 | fix_needed | planned |  | No viable canonical PR exists in the hydrated cluster; the reported runtime regressions remain visible in source on current main and are narrow enough for a fix PR. |
| cluster:clawsweeper-commit-openclaw-openclaw-354084b1b320 | build_fix_artifact | planned |  | The worker environment cannot edit files, but the repository state supports an executable narrow fix artifact. |

## Needs Human

- none
