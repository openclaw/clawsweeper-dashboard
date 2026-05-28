---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87501"
mode: "autonomous"
run_id: "26555638852"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26555638852"
head_sha: "666e707a828896056556870083d5c23184a474f8"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-28T05:47:24.234Z"
canonical: "https://github.com/openclaw/openclaw/pull/87523"
canonical_issue: "https://github.com/openclaw/openclaw/issues/86687"
canonical_pr: "https://github.com/openclaw/openclaw/pull/87523"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87501

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26555638852](https://github.com/openclaw/clawsweeper/actions/runs/26555638852)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87523

## Summary

#87501 is already closed and superseded by the writable replacement PR #87523. #87523 is the current canonical repair path, but it is not merge-ready because the hydrated artifact shows check-test-types failing, multiple checks still pending, mergeable_state=unstable, and no completed fresh ClawSweeper/Codex review for the replacement head. Emit a repair artifact for the writable same-repo replacement branch; keep #86687 open as related because the PR only covers the sticky image cache-ref half of that issue.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #86687 | keep_related | planned | related | Related parent issue with remaining non-PR scope; no close action is allowed or appropriate. |
| #87501 | keep_closed | skipped | superseded | Historical source PR; replacement is already open and credited, so no mutation is planned for the closed PR. |
| #87523 | fix_needed | planned | canonical | Canonical replacement PR is useful and writable, but failing/pending checks and missing completed exact-head review make it repair-only. |
| cluster:automerge-openclaw-openclaw-87501 | build_fix_artifact | planned |  | A cluster-scoped fix artifact is required so the edit pass can repair/review the canonical replacement PR without mutating GitHub from this worker. |

## Needs Human

- none
