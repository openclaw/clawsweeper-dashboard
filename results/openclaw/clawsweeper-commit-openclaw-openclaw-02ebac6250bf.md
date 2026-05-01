---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-02ebac6250bf"
mode: "autonomous"
run_id: "25143676983"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25143676983"
head_sha: "1ac867edac549cef6d7732ddbb553f70f49b023a"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T02:12:52.854Z"
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

# clawsweeper-commit-openclaw-openclaw-02ebac6250bf

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25143676983](https://github.com/openclaw/clawsweeper/actions/runs/25143676983)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one actionable regression: the committed Plugin SDK API baseline hash does not match the public SDK surface generated from this commit, so the SDK API check fails.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74746 | clawsweeper/clawsweeper-commit-openclaw-openclaw-02ebac6250bf |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74746 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-02ebac6250bf | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
