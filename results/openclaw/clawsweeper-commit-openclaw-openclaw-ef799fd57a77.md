---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-ef799fd57a77"
mode: "autonomous"
run_id: "25195271001"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25195271001"
head_sha: "4802a109a396d16705690dea56aa6353e40ce79c"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T23:59:28.898Z"
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

# clawsweeper-commit-openclaw-openclaw-ef799fd57a77

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25195271001](https://github.com/openclaw/clawsweeper/actions/runs/25195271001)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one regression in the new GitHub App active-PR-limit exemption. A concurrent successful removal by the Labeler workflow can make Barnacle receive a 404, keep the stale in-memory `r: too-many-prs` label, and then close the App-authored PR for the exact limit this commit meant to skip.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75311 | clawsweeper/clawsweeper-commit-openclaw-openclaw-ef799fd57a77 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75311 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-ef799fd57a77 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
