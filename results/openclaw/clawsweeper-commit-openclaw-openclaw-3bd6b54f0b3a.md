---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-3bd6b54f0b3a"
mode: "autonomous"
run_id: "25141795545"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25141795545"
head_sha: "c6e3fb9622e59e2e5b81dd1e8294249d7e685eb1"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T01:02:55.636Z"
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

# clawsweeper-commit-openclaw-openclaw-3bd6b54f0b3a

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25141795545](https://github.com/openclaw/clawsweeper/actions/runs/25141795545)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one regression: the new Google Vertex manifest evidence accepts the Windows `%APPDATA%` ADC path, but the Google Vertex runtime ADC loader still does not read that path.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74714 | clawsweeper/clawsweeper-commit-openclaw-openclaw-3bd6b54f0b3a |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74714 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-3bd6b54f0b3a | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
