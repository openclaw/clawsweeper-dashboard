---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-9307affe595f"
mode: "autonomous"
run_id: "25139000471"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25139000471"
head_sha: "17da7f4fec077ceeb3f01726b0b3fee863a48da7"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-29T23:35:34.192Z"
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

# clawsweeper-commit-openclaw-openclaw-9307affe595f

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25139000471](https://github.com/openclaw/clawsweeper/actions/runs/25139000471)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one concrete bug in the new config-aware auth evidence path: workspace plugin auth evidence can only resolve when `workspaceDir` is passed, but the runtime/model-auth callers added by this commit only pass `config`.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74677 | clawsweeper/clawsweeper-commit-openclaw-openclaw-9307affe595f |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74677 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-9307affe595f | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
