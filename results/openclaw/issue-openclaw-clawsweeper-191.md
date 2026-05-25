---
repo: "openclaw/clawsweeper"
cluster_id: "issue-openclaw-clawsweeper-191"
mode: "autonomous"
run_id: "26380890266"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26380890266"
head_sha: "9b0b0b39173365a6d82cb4dbc59b21de3fd54270"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-25T03:05:31.441Z"
canonical: "https://github.com/openclaw/clawsweeper/issues/191"
canonical_issue: "https://github.com/openclaw/clawsweeper/issues/191"
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-clawsweeper-191

Repo: openclaw/clawsweeper

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26380890266](https://github.com/openclaw/clawsweeper/actions/runs/26380890266)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/clawsweeper/issues/191

## Summary

Issue #191 is an open, non-security, bounded ClawSweeper feature request. Current main lacks the requested generic reviewMetrics decision field, schema support, prompt guidance, report persistence/rendering, and tests, so the canonical path is a new narrow fix PR from clawsweeper/issue-openclaw-clawsweeper-191.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| execute_fix | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 |
| issue_implementation_status_comment | updated | #191 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #191 | fix_needed | planned | canonical | The request is still valid on latest main and is narrow enough for one implementation PR. |
| cluster:issue-openclaw-clawsweeper-191 | build_fix_artifact | planned |  | Build a new-fix-PR artifact for the executor; no existing canonical PR is hydrated or viable. |
| cluster:issue-openclaw-clawsweeper-191 | open_fix_pr | planned |  | The executor should open or update the single implementation PR after applying and validating the narrow fix artifact. |

## Needs Human

- none
