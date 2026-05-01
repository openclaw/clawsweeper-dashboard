---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-1ff1fbe6824b"
mode: "autonomous"
run_id: "25149655987"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25149655987"
head_sha: "9005eb84b9b5d489fda7edd2458fa7a6b309b450"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T05:59:10.736Z"
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

# clawsweeper-commit-openclaw-openclaw-1ff1fbe6824b

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25149655987](https://github.com/openclaw/clawsweeper/actions/runs/25149655987)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one actionable regression. The commit lets capability fallback snapshots install bundled runtime dependencies by default, but that path can first convert `plugins.enabled: false` into `plugins.enabled: true`, bypassing the documented global plugin-disable contract.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74888 | clawsweeper/clawsweeper-commit-openclaw-openclaw-1ff1fbe6824b |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74888 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-1ff1fbe6824b | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
