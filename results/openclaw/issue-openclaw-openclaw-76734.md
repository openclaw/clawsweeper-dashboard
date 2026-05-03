---
repo: "openclaw/openclaw"
cluster_id: "issue-openclaw-openclaw-76734"
mode: "autonomous"
run_id: "25282591596"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25282591596"
head_sha: "0dc8a96fbdae80643e13ebf534f5b568add2ec32"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T15:12:39.830Z"
canonical: "https://github.com/openclaw/openclaw/issues/76734"
canonical_issue: "https://github.com/openclaw/openclaw/issues/76734"
canonical_pr: null
actions_total: 4
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25282591596](https://github.com/openclaw/clawsweeper/actions/runs/25282591596)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/76734

## Summary

Issue #76734 is a narrow docs-only spelling fix. Current main 11e05e86a2333cfdc1472fb5502ac3dff6a78255 still contains `persistent behaviour` in `docs/tools/acp-agents.md`, and root guidance requires American spelling. Plan one new ClawSweeper fix PR on `clawsweeper/issue-openclaw-openclaw-76734`; no close or merge actions are allowed by this job.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76744 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76734 | keep_canonical | planned | canonical | #76734 is the sole hydrated canonical issue for this cluster and remains reproducible on current main. |
| cluster:issue-openclaw-openclaw-76734 | fix_needed | planned |  | A new docs-only fix PR is appropriate and allowed by `allow_fix_pr: true` / `raise_pr`. |
| cluster:issue-openclaw-openclaw-76734 | build_fix_artifact | planned |  | Provide an executable artifact for the deterministic fixer to create or update the single ClawSweeper implementation PR. |
| cluster:issue-openclaw-openclaw-76734 | open_fix_pr | planned |  | The applicator can open or update the target-branch PR after applying the narrow docs fix and validation. |

## Needs Human

- none
