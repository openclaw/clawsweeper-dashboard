---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-e0fe02fb0970"
mode: "autonomous"
run_id: "25200786950"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25200786950"
head_sha: "32acaf47f27fd897d90b6186a2ca6365d99a9689"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T03:30:36.069Z"
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

# clawsweeper-commit-openclaw-openclaw-e0fe02fb0970

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25200786950](https://github.com/openclaw/clawsweeper/actions/runs/25200786950)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

One low-severity contract mismatch remains on current `main`: the shared `web_search` tool schema now advertises `count` up to 20, while the documented and common runtime limit is 10. The media-generation registration regression introduced by this commit appears fixed on current `main` by `60bdb96f2c`.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75396 | clawsweeper/clawsweeper-commit-openclaw-openclaw-e0fe02fb0970 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75396 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-e0fe02fb0970 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
