---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75976"
mode: "autonomous"
run_id: "25247354805"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25247354805"
head_sha: "126fd0a3fb73bccbd65bee7658010e771b3b3e10"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T08:01:04.236Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25247354805](https://github.com/openclaw/clawsweeper/actions/runs/25247354805)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75976

## Summary

#75976 is the canonical opted-in automerge PR for linked issue #72097, but it is not merge-ready because exact-head CI has relevant failures and pending checks. The branch is same-repo and writable, so the safe path is to repair the contributor PR branch, rerun ClawSweeper review and changed validation, then let the merge-capable router decide after a clean exact-head verdict. No close or merge actions are emitted because they are blocked by job policy.

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
| #75976 | fix_needed | planned | canonical | The canonical PR is useful and writable, but failing relevant CI blocks merge and fixed-by-candidate closeout. Emit a branch repair artifact instead of merge/close. |
| #72097 | keep_related | planned | fixed_by_candidate | The issue is covered by the canonical PR path but must stay open until the repaired PR is validated and later merge/close policy allows closeout. |
| cluster:automerge-openclaw-openclaw-75976 | build_fix_artifact | planned |  | Build an executable repair plan for the existing PR branch so the deterministic executor can fix CI and re-run review without opening a replacement. |

## Needs Human

- none
