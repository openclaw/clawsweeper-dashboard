---
repo: "openclaw/openclaw"
cluster_id: "issue-openclaw-openclaw-76734"
mode: "autonomous"
run_id: "25284167270"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25284167270"
head_sha: "05074fca93f2ec583749f27ac60ed48310e86c68"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T16:18:49.996Z"
canonical: "https://github.com/openclaw/openclaw/issues/76734"
canonical_issue: "https://github.com/openclaw/openclaw/issues/76734"
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-76734

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25284167270](https://github.com/openclaw/clawsweeper/actions/runs/25284167270)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/76734

## Summary

Issue #76734 is open, non-security-sensitive, and reproducible on current main. A narrow docs-only fix should replace `persistent behaviour` with `persistent behavior` in `docs/tools/acp-agents.md`, using a new ClawSweeper fix PR on `clawsweeper/issue-openclaw-openclaw-76734`. No close or merge actions are allowed by this job.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/76744 | clawsweeper/issue-openclaw-openclaw-76734 |  |
| issue_implementation_status_comment | updated | #76734 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76744 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76734 | keep_canonical | planned | canonical | #76734 is the canonical source issue for this single-item docs wording cluster. |
| cluster:issue-openclaw-openclaw-76734 | fix_needed | planned |  | The issue is valid on current main and has no existing hydrated fix PR, so ClawSweeper should create or update one narrow implementation PR. |
| cluster:issue-openclaw-openclaw-76734 | build_fix_artifact | planned |  | A deterministic executor can apply the one-line docs change and open the requested PR. |

## Needs Human

- none
