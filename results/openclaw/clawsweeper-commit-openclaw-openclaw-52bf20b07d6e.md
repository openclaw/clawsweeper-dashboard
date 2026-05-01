---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-52bf20b07d6e"
mode: "autonomous"
run_id: "25195746048"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25195746048"
head_sha: "1a5b2864b6eeddcda0763ef9b6c87d29d2d7390b"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T00:16:06.715Z"
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

# clawsweeper-commit-openclaw-openclaw-52bf20b07d6e

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25195746048](https://github.com/openclaw/clawsweeper/actions/runs/25195746048)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one actionable issue: the Windows stale-import guard still generates an invalid PowerShell regex, so the intended tolerated update failure still fails the Parallels npm update smoke.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75315 | clawsweeper/clawsweeper-commit-openclaw-openclaw-52bf20b07d6e |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75315 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-52bf20b07d6e | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
