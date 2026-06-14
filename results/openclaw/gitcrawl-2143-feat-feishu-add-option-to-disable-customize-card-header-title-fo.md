---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-2143-feat-feishu-add-option-to-disable-customize-card-header-title-fo"
mode: "autonomous"
run_id: "27494406293"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27494406293"
head_sha: "a9b17a1e94ca0bc66ea53b6f6ba0e94f260c5d63"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-14T09:23:47.275Z"
canonical: "https://github.com/openclaw/openclaw/pull/54979"
canonical_issue: "https://github.com/openclaw/openclaw/issues/60748"
canonical_pr: "https://github.com/openclaw/openclaw/pull/54979"
actions_total: 10
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# gitcrawl-2143-feat-feishu-add-option-to-disable-customize-card-header-title-fo

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27494406293](https://github.com/openclaw/clawsweeper/actions/runs/27494406293)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/54979

## Summary

Canonical path is the existing repairable contributor PR #54979 for the narrow Feishu card-header disable toggle. Issue #60748 remains the broader header/footer product tracker and should stay open. No close or merge actions are planned because instant close is disabled, the fix has not landed, merge is blocked by job policy, and #54979 still needs branch repair plus proof.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 10 |
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

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #29938 | keep_closed | skipped | related | Already merged and closed; historical context for why the Feishu card header UX reports exist. |
| #54237 | keep_closed | skipped | superseded | Closed context only; do not re-close. The repair path is #54979. |
| #54340 | keep_closed | skipped | fixed_by_candidate | Already closed as implemented on main; no mutation needed. |
| #54979 | fix_needed | planned | canonical | Repair the contributor branch rather than closing or replacing it. |
| #56882 | keep_closed | skipped | independent | Closed historical linked context; no action for this cluster. |
| #60748 | keep_related | planned | related | Keep open as the broader product/API tracker; do not close as duplicate of the header-only PR. |
| #66759 | keep_closed | skipped | duplicate | Already closed; broader footer work remains tracked by #60748. |
| #71079 | keep_closed | skipped | duplicate | Already closed; no close action allowed or needed. |
| #71485 | keep_closed | skipped | fixed_by_candidate | Already closed as implemented; broader explicit header-disable config remains #54979/#60748 context. |
| cluster:gitcrawl-2143-feat-feishu-add-option-to-disable-customize-card-header-title-fo | build_fix_artifact | planned |  | A narrow repair artifact is needed before any closeout or merge-ready recommendation. |

## Needs Human

- none
