---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-83042"
mode: "autonomous"
run_id: "26668604313"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26668604313"
head_sha: "485f71abc664da503090d6de9975c8f912e4f285"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-30T00:37:54.563Z"
canonical: "https://github.com/openclaw/openclaw/pull/84814"
canonical_issue: "https://github.com/openclaw/openclaw/issues/48680"
canonical_pr: "https://github.com/openclaw/openclaw/pull/84814"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-83042

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26668604313](https://github.com/openclaw/clawsweeper/actions/runs/26668604313)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84814

## Summary

Canonical path is the open same-repo replacement PR #84814, carrying credit from closed source PR #83042 and fixing open issue #48680. #84814 is repairable but not merge-ready because a relevant core-fast check failed; emit a fix artifact for the executor to repair the writable PR branch and rerun validation.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/84814 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84814 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #48680 | keep_canonical | planned | canonical | Keep the root issue open until the canonical repair PR lands and post-merge closeout is allowed. |
| #83042 | keep_closed | skipped | superseded | Historical source PR only; do not mutate already-closed refs. |
| #84814 | fix_needed | planned | canonical | Repair the writable canonical PR branch, address the failing relevant check, rerun validation, then let the deterministic automerge router re-review the exact repaired head. |
| cluster:automerge-openclaw-openclaw-83042 | build_fix_artifact | planned |  | Produce an executable repair artifact for the existing canonical PR instead of replacing it again. |

## Needs Human

- none
