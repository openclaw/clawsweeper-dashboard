---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74528"
mode: "autonomous"
run_id: "25219812593"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25219812593"
head_sha: "f1bb916a329faa6fdadc8549b12d2dd5453c7f91"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T15:30:24.212Z"
canonical: "https://github.com/openclaw/openclaw/pull/74528"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/74528"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-74528

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25219812593](https://github.com/openclaw/clawsweeper/actions/runs/25219812593)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/74528

## Summary

PR #74528 is the open canonical repair candidate. It is not merge-ready because the hydrated ClawSweeper review requires a docs/changelog repair, the PR is merge-dirty, and several relevant checks are failing. The same-repo head branch is writable, so the next deterministic step is to repair the existing PR branch rather than replace it.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/74528 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74528 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74528 | fix_needed | planned | canonical | Canonical PR needs repair before any merge-capable ClawSweeper verdict; merge and close are blocked by job frontmatter. |
| cluster:automerge-openclaw-openclaw-74528 | build_fix_artifact | planned |  | Build an executable in-place repair plan for the canonical PR branch. |

## Needs Human

- none
