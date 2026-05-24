---
repo: "openclaw/clawsweeper"
cluster_id: "issue-openclaw-clawsweeper-185"
mode: "autonomous"
run_id: "26368492335"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26368492335"
head_sha: "4954daa585f1ed92cc8808d87b446f47df095a65"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-24T17:57:56.685Z"
canonical: "https://github.com/openclaw/clawsweeper/issues/185"
canonical_issue: "https://github.com/openclaw/clawsweeper/issues/185"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-clawsweeper-185

Repo: openclaw/clawsweeper

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26368492335](https://github.com/openclaw/clawsweeper/actions/runs/26368492335)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/clawsweeper/issues/185

## Summary

Issue #185 is a valid narrow implementation request. Current main tells review workers to read and follow AGENTS.md, but does not frame AGENTS.md as review policy/rubric or require concrete repository-policy conflicts to be surfaced in structured review output. A new fix PR should update the item and commit review prompts, the review decision schema text, focused prompt tests, and the changelog.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| execute_fix | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 |
| issue_implementation_status_comment | updated | #185 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #185 | keep_canonical | planned | canonical | This is the source issue and should remain open until a fix PR lands; closing and merging are blocked by job frontmatter. |
| cluster:issue-openclaw-clawsweeper-185 | fix_needed | planned |  | The requested behavior remains missing on current main and can be implemented as a narrow prompt/schema/test/changelog change. |
| cluster:issue-openclaw-clawsweeper-185 | build_fix_artifact | planned |  | Build a new-fix-PR artifact for the executor to apply on clawsweeper/issue-openclaw-clawsweeper-185. |
| cluster:issue-openclaw-clawsweeper-185 | open_fix_pr | planned |  | Open or update one implementation PR from clawsweeper/issue-openclaw-clawsweeper-185 after applying and validating the fix artifact. |

## Needs Human

- none
