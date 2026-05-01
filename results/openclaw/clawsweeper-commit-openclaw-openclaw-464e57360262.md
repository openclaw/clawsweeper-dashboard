---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-464e57360262"
mode: "autonomous"
run_id: "25204309027"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25204309027"
head_sha: "d68833f2769a03258950baa4c8c3b355a77e6ad7"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T06:03:42.479Z"
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

# clawsweeper-commit-openclaw-openclaw-464e57360262

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25204309027](https://github.com/openclaw/clawsweeper/actions/runs/25204309027)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found two actionable regressions in the new voice-call CLI gateway delegation path. The main issue is a fixed 5s gateway request timeout applied to operations that can legitimately wait much longer.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75459 | clawsweeper/clawsweeper-commit-openclaw-openclaw-464e57360262 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75459 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-464e57360262 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
