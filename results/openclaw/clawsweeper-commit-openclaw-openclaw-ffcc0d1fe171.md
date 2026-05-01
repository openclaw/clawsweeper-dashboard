---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-ffcc0d1fe171"
mode: "autonomous"
run_id: "25204789716"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25204789716"
head_sha: "324d141731d199e76ec63d27627b3a27f4723723"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T06:24:11.698Z"
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

# clawsweeper-commit-openclaw-openclaw-ffcc0d1fe171

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25204789716](https://github.com/openclaw/clawsweeper/actions/runs/25204789716)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one regression that remains in current `main`: the realtime Voice Call greeting suppression was applied globally, so inbound realtime calls without an explicit initial message no longer get the automatic opening greeting they had before this commit.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75471 | clawsweeper/clawsweeper-commit-openclaw-openclaw-ffcc0d1fe171 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75471 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-ffcc0d1fe171 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
