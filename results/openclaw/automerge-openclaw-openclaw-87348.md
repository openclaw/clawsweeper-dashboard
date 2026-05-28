---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87348"
mode: "autonomous"
run_id: "26591896559"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26591896559"
head_sha: "8db024ba0503b6c8368d0b699367e0f321d740b1"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-28T18:30:15.875Z"
canonical: "https://github.com/openclaw/openclaw/pull/87423"
canonical_issue: "https://github.com/openclaw/openclaw/issues/86871"
canonical_pr: "https://github.com/openclaw/openclaw/pull/87423"
actions_total: 4
fix_executed: 0
fix_failed: 1
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87348

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26591896559](https://github.com/openclaw/clawsweeper/actions/runs/26591896559)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87423

## Summary

Canonical repair path is the open same-repo replacement PR #87423. It preserves source PR #87348 credit, covers issue #86871, has no security-sensitive signal, and needs a repair pass because current checks include checks-fast-bundled-protocol:FAILURE and checks-node-agentic-agents:FAILURE. No merge or close action is allowed by this job.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
| Fix executed | 0 |
| Fix failed | 1 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | failed |  |  | Codex review-fix worker timed out after 97142ms |
| execute_fix | blocked |  |  | Codex review-fix worker timed out after 97142ms |
| automerge_repair_outcome_comment | updated | #87423 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #86871 | fix_needed | planned | fixed_by_candidate | Keep the issue open until the canonical repair PR is green and merged; emit repair work rather than closeout. |
| #87348 | keep_closed | skipped | superseded | Historical source PR only; replacement PR #87423 is the live canonical path. |
| #87423 | fix_needed | planned | canonical | Open canonical PR is useful but not merge-ready because relevant checks are failing or stale. |
| cluster:automerge-openclaw-openclaw-87348 | build_fix_artifact | planned |  | Produce a bounded repair artifact for the writable canonical PR branch instead of merge/close mutation. |

## Needs Human

- none
