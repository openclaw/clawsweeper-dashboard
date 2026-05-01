---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-94cb213544bd"
mode: "autonomous"
run_id: "25146660954"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25146660954"
head_sha: "32af81257867742fb8b16a04539620b50c789170"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T04:13:51.946Z"
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

# clawsweeper-commit-openclaw-openclaw-94cb213544bd

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25146660954](https://github.com/openclaw/clawsweeper/actions/runs/25146660954)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one likely packaged-install regression in the new unconditional runtime-deps install opt-out for capability-provider fallback loads.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74826 | clawsweeper/clawsweeper-commit-openclaw-openclaw-94cb213544bd |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74826 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-94cb213544bd | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
