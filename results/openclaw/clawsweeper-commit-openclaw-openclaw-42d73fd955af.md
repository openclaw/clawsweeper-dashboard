---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-42d73fd955af"
mode: "autonomous"
run_id: "25204861595"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25204861595"
head_sha: "4f1eba5220ad4cf5fd3656d48dbed9fc5d7a4938"
workflow_conclusion: "skipped"
result_status: "planned"
published_at: "2026-05-01T06:32:15.783Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-42d73fd955af

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25204861595](https://github.com/openclaw/clawsweeper/actions/runs/25204861595)

Workflow conclusion: skipped

Worker result: planned

Canonical: unknown

## Summary

Found two actionable regressions: one changed test assertion now fails under the existing supervised gateway lock-retry behavior, and one Plugin SDK subpath removed a previously exported type without a compatibility alias.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-42d73fd955af | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
