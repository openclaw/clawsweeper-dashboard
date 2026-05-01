---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-df4faac71fd9"
mode: "autonomous"
run_id: "25144826259"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25144826259"
head_sha: "ed50aca48b0ca5f265228926b1bdde71e87097f6"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T02:58:32.564Z"
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

# clawsweeper-commit-openclaw-openclaw-df4faac71fd9

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25144826259](https://github.com/openclaw/clawsweeper/actions/runs/25144826259)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one high-confidence regression in the new package entry-file validation. It rejects valid npm packages whose `main` relies on Node’s normal extension resolution, and `jszip` is already in OpenClaw’s mirrored runtime-deps plan.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74770 | clawsweeper/clawsweeper-commit-openclaw-openclaw-df4faac71fd9 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74770 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-df4faac71fd9 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
