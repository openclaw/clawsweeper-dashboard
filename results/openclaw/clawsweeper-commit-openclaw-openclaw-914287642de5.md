---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-914287642de5"
mode: "autonomous"
run_id: "25155248256"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25155248256"
head_sha: "3f92dcf8783790d801c73feef531662a7d6d47bf"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T08:33:33.008Z"
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

# clawsweeper-commit-openclaw-openclaw-914287642de5

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25155248256](https://github.com/openclaw/clawsweeper/actions/runs/25155248256)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one actionable catalog regression: the new `yuanbao` alias resolves to a catalog id that does not match the pinned npm package’s actual runtime channel id, so setup can install the package and then fail to load/apply the channel.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74972 | clawsweeper/clawsweeper-commit-openclaw-openclaw-914287642de5 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74972 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-914287642de5 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
