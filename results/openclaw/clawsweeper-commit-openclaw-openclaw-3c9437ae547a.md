---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-3c9437ae547a"
mode: "autonomous"
run_id: "25149929229"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25149929229"
head_sha: "9bf70923610d4ce1cdccde05b6fd0b3060ec105b"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T05:58:45.677Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-3c9437ae547a

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25149929229](https://github.com/openclaw/clawsweeper/actions/runs/25149929229)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one compatibility regression: the runtime fix works, but wrapping the exported WhatsApp schemas in `z.preprocess` changes the public Plugin SDK API surface and leaves the API baseline gate failing.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
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
| cluster:clawsweeper-commit-openclaw-openclaw-3c9437ae547a | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
