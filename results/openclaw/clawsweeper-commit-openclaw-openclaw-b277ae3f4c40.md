---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-b277ae3f4c40"
mode: "autonomous"
run_id: "25198053576"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25198053576"
head_sha: "99759ba2ce029ba942e3c6c26b236ba46be0cf97"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T01:40:59.027Z"
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

# clawsweeper-commit-openclaw-openclaw-b277ae3f4c40

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25198053576](https://github.com/openclaw/clawsweeper/actions/runs/25198053576)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one regression where commitment safety handling can disable tools for unrelated due heartbeat tasks in the same heartbeat turn.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75344 | clawsweeper/clawsweeper-commit-openclaw-openclaw-b277ae3f4c40 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75344 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-b277ae3f4c40 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
