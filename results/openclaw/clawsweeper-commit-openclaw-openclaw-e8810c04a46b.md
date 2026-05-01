---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-e8810c04a46b"
mode: "autonomous"
run_id: "25204649791"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25204649791"
head_sha: "ddc22205b73b8716515e188976b9f1eaa2c7e684"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T06:15:08.751Z"
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

# clawsweeper-commit-openclaw-openclaw-e8810c04a46b

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25204649791](https://github.com/openclaw/clawsweeper/actions/runs/25204649791)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found two actionable issues in the new RTT wrapper. Both are preflight failures before Docker starts, so they block intended maintainer use without touching the actual Telegram harness.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75464 | clawsweeper/clawsweeper-commit-openclaw-openclaw-e8810c04a46b |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75464 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-e8810c04a46b | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
