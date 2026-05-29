---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-83042"
mode: "autonomous"
run_id: "26666442148"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26666442148"
head_sha: "f37d8cdc6cf01836271e25a53fe8ee158a098b8b"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-29T23:40:36.792Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26666442148](https://github.com/openclaw/clawsweeper/actions/runs/26666442148)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84814

## Summary

Canonical fix path is the open same-repo ClawSweeper replacement PR #84814 for issue #48680, carrying forward source PR #83042 credit. #84814 is writable but not merge-ready: the preflight shows mergeable_state=dirty and failing checks-node-agentic-agents plus checks-node-auto-reply-reply-agent-runner on head 6df3681247011ad8989bfdf8f7f0011858b030ff, so this run should emit a repair artifact only. No close or merge actions are allowed by the job.

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
| #48680 | keep_canonical | planned | canonical | #48680 is the surviving canonical issue; keep it open while #84814 is repaired and validated. |
| #83042 | keep_closed | skipped | superseded | Historical source PR only; it is already closed and superseded by the hydrated replacement PR #84814. |
| #84814 | fix_needed | planned | canonical | #84814 is the canonical repair PR, but it needs branch repair/rebase and CI investigation before any merge-capable applicator can proceed. |
| cluster:automerge-openclaw-openclaw-83042 | build_fix_artifact | planned |  | The next deterministic step is a bounded repair of #84814, not closure or merge. |

## Needs Human

- none
