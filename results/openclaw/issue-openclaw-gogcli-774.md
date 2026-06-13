---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-774"
mode: "autonomous"
run_id: "27458169202"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27458169202"
head_sha: "214bb5474d07fd3aa9d84d813a26dba448f305d9"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-06-13T05:47:59.633Z"
canonical: "https://github.com/openclaw/gogcli/issues/774"
canonical_issue: "https://github.com/openclaw/gogcli/issues/774"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-gogcli-774

Repo: openclaw/gogcli

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27458169202](https://github.com/openclaw/clawsweeper/actions/runs/27458169202)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/gogcli/issues/774

## Summary

Issue #774 is a valid, non-security, canonical implementation request. Current main has --body-html-file for gmail send only; draft create/update still accept only inline --body-html. Built a narrow fix artifact; local branch edits/validation were not performed because this worker checkout is read-only.

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
| #575 | keep_closed | skipped | related | Already closed context ref; no closure or comment action is valid. |
| #774 | fix_needed | planned | canonical | The requested parity feature is still absent on current main and is narrow enough for an implementation PR. |
| cluster:issue-openclaw-gogcli-774 | build_fix_artifact | planned |  | No existing viable PR is present; a new narrow fix PR is appropriate. |
| cluster:issue-openclaw-gogcli-774 | open_fix_pr | blocked |  | Local implementation is blocked by read-only checkout, but the fix path is concrete and narrow. |

## Needs Human

- none
