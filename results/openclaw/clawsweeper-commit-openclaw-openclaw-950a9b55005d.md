---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-950a9b55005d"
mode: "autonomous"
run_id: "25141706209"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25141706209"
head_sha: "44437738f76d59e9be2f061dea771afc1502b432"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T00:59:58.913Z"
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

# clawsweeper-commit-openclaw-openclaw-950a9b55005d

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25141706209](https://github.com/openclaw/clawsweeper/actions/runs/25141706209)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one regression in the Discord startup/status probe path. The core 429 cooldown behavior is covered by focused tests, but the noncritical application-summary probe now inherits the new 60s fallback retry delay and can block startup/status far beyond its caller-provided timeout.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74710 | clawsweeper/clawsweeper-commit-openclaw-openclaw-950a9b55005d |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74710 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-950a9b55005d | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
