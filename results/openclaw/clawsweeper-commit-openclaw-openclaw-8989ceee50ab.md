---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-8989ceee50ab"
mode: "autonomous"
run_id: "25937732512"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25937732512"
head_sha: "dc54e41d5b23a3fbbf781b551151d91922f0e6eb"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-15T23:16:52.438Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25937732512](https://github.com/openclaw/clawsweeper/actions/runs/25937732512)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

The ClawSweeper commit finding is still valid on current main ea16a5e9e10c5b2be28ed46ea77ba5a7aa787d8c. The doctor warning path still returns no warning when the source-reply runtime can grant the message tool, while group/channel reply delivery still defaults to message_tool_only, so a narrow fix PR is warranted. Local execution proof was blocked because pnpm is unavailable and corepack cannot write its cache in this read-only worker, but source inspection confirms the regression path.

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
| cluster:clawsweeper-commit-openclaw-openclaw-8989ceee50ab | fix_needed | planned |  | No viable canonical PR is hydrated for this commit-finding lane, and the current-main source still matches the reported regression. |
| cluster:clawsweeper-commit-openclaw-openclaw-8989ceee50ab | build_fix_artifact | planned |  | allow_fix_pr is true, allow_merge and close actions are blocked, and the finding can be fixed in the doctor warning surface without broad product changes. |

## Needs Human

- none
