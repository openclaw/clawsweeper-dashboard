---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-13714-fix-count-discord-acp-block-deliveries-as-visible-text"
mode: "autonomous"
run_id: "29186574234"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29186574234"
head_sha: "6d204db3299114d14ce3341ccd06d86d12e2b495"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-12T08:58:20.686Z"
canonical: "https://github.com/openclaw/openclaw/tree/17a533ce268957780a3480c9f0691593efa94153"
canonical_issue: null
canonical_pr: null
actions_total: 7
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# gitcrawl-13714-fix-count-discord-acp-block-deliveries-as-visible-text

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29186574234](https://github.com/openclaw/clawsweeper/actions/runs/29186574234)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/tree/17a533ce268957780a3480c9f0691593efa94153

## Summary

All hydrated issues and pull requests are already closed. Current main at 17a533ce268957780a3480c9f0691593efa94153 contains the safer channel-owned ACP visibility fix and regression coverage, so no GitHub mutation or new fix PR is warranted.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 7 |
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
| #55568 | keep_closed | skipped | fixed_by_candidate | Already closed as implemented; current main retains the reported Discord ACP duplicate-delivery fix. |
| #55595 | keep_closed | skipped | related | Closed related channel report retained as historical evidence only. |
| #55819 | keep_closed | skipped | superseded | Superseded by the narrower channel-owned implementation already on current main. |
| #56789 | keep_closed | skipped | superseded | Superseded by the safer per-channel visibility contract on current main. |
| #58892 | keep_closed | skipped | fixed_by_candidate | Already closed as implemented; current main directly covers the reported duplicate-final-reply root cause. |
| #58902 | keep_closed | skipped | superseded | Superseded by tested channel-specific behavior on current main. |
| #60972 | keep_closed | skipped | superseded | Useful source work, but already superseded by the current main implementation and tests. |

## Needs Human

- none
