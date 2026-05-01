---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-dabf76b3defd"
mode: "autonomous"
run_id: "25127795681"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25127795681"
head_sha: "e07037365f1c93df37840faa6204d0473effedcf"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-29T19:08:19.509Z"
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

# clawsweeper-commit-openclaw-openclaw-dabf76b3defd

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25127795681](https://github.com/openclaw/clawsweeper/actions/runs/25127795681)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one concrete regression in the remote URL path: malformed `gateway.remote.url` can now be treated as absent, allowing setup-code generation to fall back to a bind-derived URL and issue a bootstrap token.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74565 | clawsweeper/clawsweeper-commit-openclaw-openclaw-dabf76b3defd |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74565 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-dabf76b3defd | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
