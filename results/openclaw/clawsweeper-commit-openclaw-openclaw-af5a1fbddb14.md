---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-af5a1fbddb14"
mode: "autonomous"
run_id: "25839978658"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25839978658"
head_sha: "1558af39eeca02b91e57ae98a885c7871229a8e8"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-14T03:34:06.616Z"
canonical: "https://github.com/openclaw/openclaw/tree/main"
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-af5a1fbddb14

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25839978658](https://github.com/openclaw/clawsweeper/actions/runs/25839978658)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/tree/main

## Summary

Verified the ClawSweeper commit finding against current main 256377c029f63cf9ecc2021be0a36393a290576a. The reported macOS Parallels update-script permission regression is no longer present: scripts/e2e/parallels/npm-update-smoke.ts now chmods guest scripts to 755 and chowns the macOS script to the resolved sudo fallback user before execution. No implementation PR is needed for this cluster.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-af5a1fbddb14 | build_fix_artifact | skipped |  | The reported root-owned 700 macOS script readability failure is already fixed on current main, so an implementation PR would not be narrow or necessary for this source finding. |

## Needs Human

- none
