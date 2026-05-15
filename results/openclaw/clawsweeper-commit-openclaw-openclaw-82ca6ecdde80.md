---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-82ca6ecdde80"
mode: "autonomous"
run_id: "25937740852"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25937740852"
head_sha: "dc54e41d5b23a3fbbf781b551151d91922f0e6eb"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-15T23:07:29.865Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-82ca6ecdde80

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25937740852](https://github.com/openclaw/clawsweeper/actions/runs/25937740852)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Verified the ClawSweeper commit finding against current main ea16a5e9e10c5b2be28ed46ea77ba5a7aa787d8c. The pre-resolved requested-mode path and group-policy path are already fixed on main, but the dispatch-time message-tool availability check still omits sandbox and sender tool-policy inputs that the real tool construction pipeline applies, so a narrow non-security fix PR is still warranted.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | fix_needed | planned |  | The original finding is partially fixed on current main, but one narrow residual mismatch remains between source-reply fallback policy and actual tool construction policy. |
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | build_fix_artifact | planned |  | A small fix artifact is enough; no issue/PR refs need closure or merge actions in this job. |

## Needs Human

- none
