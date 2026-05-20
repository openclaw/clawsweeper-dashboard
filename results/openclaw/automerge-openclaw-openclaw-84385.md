---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-84385"
mode: "autonomous"
run_id: "26180475642"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26180475642"
head_sha: "db7899626f85b45c424094d9499fcee4990db174"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-20T19:54:34.019Z"
canonical: "#84385"
canonical_issue: null
canonical_pr: "#84385"
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-84385

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26180475642](https://github.com/openclaw/clawsweeper/actions/runs/26180475642)

Workflow conclusion: success

Worker result: planned

Canonical: #84385

## Summary

Make PR #84385 merge-ready for ClawSweeper automerge. Rebase onto latest main, address PR comments and review findings, fix CI/check failures, add required changelog if needed, and validate before returning.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/84385 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84385 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84385 | build_fix_artifact | planned | canonical | Maintainer opted this PR into ClawSweeper automerge/autofix repair; run the direct Codex edit loop after live hydration instead of a separate read-only planning pass. |

## Needs Human

- none
