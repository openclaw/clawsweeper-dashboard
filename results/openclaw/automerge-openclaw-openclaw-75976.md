---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75976"
mode: "autonomous"
run_id: "25246783047"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25246783047"
head_sha: "4a59e45a3f5062dff132a873414f9d449001dbe1"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T07:30:26.750Z"
canonical: "https://github.com/openclaw/openclaw/pull/75976"
canonical_issue: "https://github.com/openclaw/openclaw/issues/72097"
canonical_pr: "https://github.com/openclaw/openclaw/pull/75976"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75976

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25246783047](https://github.com/openclaw/clawsweeper/actions/runs/25246783047)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75976

## Summary

PR #75976 is the canonical automerge repair target. It is open, same-repo, branch-writable, and mergeable, but not merge-ready because ClawSweeper requested a focused repair for the full-workspace plugin loader cache and relevant CI is failing or pending. Plan: repair the contributor branch, preserve credit on #75976, re-run review and changed-surface validation, and keep linked issue #72097 open until the repaired PR lands.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75976 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75976 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75976 | fix_needed | planned | canonical | Canonical PR is useful and branch-writable, but it needs focused repair before review/validation can pass. |
| #72097 | keep_related | planned | related | Keep the issue open as related context while #75976 is repaired and validated. |
| cluster:automerge-openclaw-openclaw-75976 | build_fix_artifact | planned |  | Automerge is opted in, fix PRs are allowed, merge is blocked, and a focused branch repair is executable. |

## Needs Human

- none
