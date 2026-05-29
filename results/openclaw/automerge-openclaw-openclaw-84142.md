---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-84142"
mode: "autonomous"
run_id: "26626789582"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26626789582"
head_sha: "beb50640445a7699b711ffaf8b27ca39a82c5b3c"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-29T09:14:48.359Z"
canonical: "https://github.com/openclaw/openclaw/pull/84362"
canonical_issue: "https://github.com/openclaw/openclaw/issues/84038"
canonical_pr: "https://github.com/openclaw/openclaw/pull/84362"
actions_total: 5
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-84142

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26626789582](https://github.com/openclaw/clawsweeper/actions/runs/26626789582)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84362

## Summary

No GitHub mutation is planned from this worker. The hydrated artifact shows #84362 is the live, writable replacement PR for the closed source PR #84142, but it is still dirty and blocked by an actionable ClawSweeper review finding, so the correct next step is a focused repair artifact for #84362. #84038 remains the canonical issue until the repair PR lands; #84142 and #83315 are already closed context.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
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
| #84038 | keep_canonical | planned | canonical | Keep the issue open as the canonical bug report while the repairable PR #84362 is made merge-ready. |
| #84142 | keep_closed | skipped | superseded | Already-closed source PR; do not emit a close action. |
| #84362 | fix_needed | planned | canonical | Repair the existing writable replacement PR branch; do not merge because merge is blocked by job policy and missing merge preflight. |
| #83315 | keep_closed | skipped | independent | Closed historical context only; no action needed. |
| cluster:automerge-openclaw-openclaw-84142 | build_fix_artifact | planned |  | Executable repair planning is allowed; close and merge are blocked by job frontmatter. |

## Needs Human

- none
