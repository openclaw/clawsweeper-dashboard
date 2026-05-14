---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-8989ceee50ab"
mode: "autonomous"
run_id: "25839744627"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25839744627"
head_sha: "1558af39eeca02b91e57ae98a885c7871229a8e8"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-14T03:35:08.384Z"
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

# clawsweeper-commit-openclaw-openclaw-8989ceee50ab

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25839744627](https://github.com/openclaw/clawsweeper/actions/runs/25839744627)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Verified the ClawSweeper commit finding against current main 7c5222a195e2e2d1ecda60df398671e889fff6e7 by source inspection. The regression is still present: group/channel replies still default to message-tool-only delivery, while doctor preview warnings return early when the message tool is available. A narrow non-security fix PR is appropriate.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75388 | clawsweeper/clawsweeper-commit-openclaw-openclaw-8989ceee50ab |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75388 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-8989ceee50ab | fix_needed | planned |  | No viable hydrated canonical PR exists for this source=clawsweeper_commit job, the non-security bug is still present on main, and allow_fix_pr is true. |
| cluster:clawsweeper-commit-openclaw-openclaw-8989ceee50ab | build_fix_artifact | planned |  | A cluster-scoped implementation PR is needed from the configured target branch clawsweeper/clawsweeper-commit-openclaw-openclaw-8989ceee50ab. |

## Needs Human

- none
