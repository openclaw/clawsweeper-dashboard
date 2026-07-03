---
repo: "openclaw/clawsweeper"
cluster_id: "issue-openclaw-clawsweeper-394"
mode: "autonomous"
run_id: "28685299819"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28685299819"
head_sha: "1343d8ec0cef4a5088be01084937fe4396cf9571"
workflow_conclusion: "failure"
result_status: "needs_human"
published_at: "2026-07-03T22:50:05.200Z"
canonical: "https://github.com/openclaw/clawsweeper/issues/394"
canonical_issue: "https://github.com/openclaw/clawsweeper/issues/394"
canonical_pr: null
actions_total: 5
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 1
---

# issue-openclaw-clawsweeper-394

Repo: openclaw/clawsweeper

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28685299819](https://github.com/openclaw/clawsweeper/actions/runs/28685299819)

Workflow conclusion: failure

Worker result: needs_human

Canonical: https://github.com/openclaw/clawsweeper/issues/394

## Summary

Issue #394 is a valid non-security apply-path regression on current main. A narrow fix artifact is ready, but opening a PR should wait for maintainer direction because the source issue author explicitly asked ClawSweeper not to open a PR.

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
| Needs human | 1 |

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
| #388 | keep_closed | skipped | related | Closed linked PR is context only. |
| #394 | keep_canonical | planned | canonical | #394 is the canonical open bug report for this cluster. |
| cluster:issue-openclaw-clawsweeper-394 | fix_needed | planned |  | A narrow apply label-sync fix is still needed on current main. |
| cluster:issue-openclaw-clawsweeper-394 | build_fix_artifact | planned |  | Prepared a narrow new-fix-PR artifact for the executor. |
| cluster:issue-openclaw-clawsweeper-394 | open_fix_pr | blocked |  | Maintainer direction is needed before publishing a ClawSweeper PR over the source issue author's explicit request. |

## Needs Human

- Decide whether ClawSweeper should open the fix PR despite source issue author @yetval asking on 2026-07-03T22:04:40Z not to open one.
