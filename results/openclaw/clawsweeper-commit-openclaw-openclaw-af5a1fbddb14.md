---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-af5a1fbddb14"
mode: "autonomous"
run_id: "25839749993"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25839749993"
head_sha: "1558af39eeca02b91e57ae98a885c7871229a8e8"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-14T03:26:31.394Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25839749993](https://github.com/openclaw/clawsweeper/actions/runs/25839749993)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/tree/main

## Summary

No implementation PR is needed. The reported macOS Parallels npm-update permission regression is already fixed on current main at 7c5222a195e2e2d1ecda60df398671e889fff6e7: the shared guest script writer now chmods temp scripts to 755, and the macOS sudo fallback chowns the script to the resolved desktop user before executing it. That removes the root-owned 700 script executed by a different macOS user, which was the source finding. No GitHub mutation, close, merge, branch push, fix artifact, or fix PR is planned.

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
| cluster:clawsweeper-commit-openclaw-openclaw-af5a1fbddb14 | keep_related | skipped | fixed_by_candidate | Current main already fixed the reported permission mismatch; a new narrow non-security repair PR does not make sense for this cluster. |

## Needs Human

- none
