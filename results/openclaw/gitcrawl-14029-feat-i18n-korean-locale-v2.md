---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-14029-feat-i18n-korean-locale-v2"
mode: "autonomous"
run_id: "26708652058"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26708652058"
head_sha: "efbf47f1aaf7a5af4322aa1d13e43306af3817d3"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-31T09:22:57.484Z"
canonical: "https://github.com/openclaw/openclaw/issues/53345"
canonical_issue: "https://github.com/openclaw/openclaw/issues/53345"
canonical_pr: null
actions_total: 7
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 1
---

# gitcrawl-14029-feat-i18n-korean-locale-v2

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26708652058](https://github.com/openclaw/clawsweeper/actions/runs/26708652058)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/53345

## Summary

Closed representative #40817 is obsolete: current main already contains Korean Control UI localization through the generated locale pipeline. The only surviving Korean-language item is #53345, but its remaining scope mixes already-implemented UI localization with AI-agent language policy and carries no-new-fix-pr/product-decision labels, so it needs maintainer judgment rather than an autonomous fix PR. Open #62063 is a separate Swedish locale PR and should stay open as related independent localization work.

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
| #40817 | keep_closed | skipped | fixed_by_candidate | Closed historical Korean PR; current main already covers the UI locale portion. |
| #43911 | keep_closed | skipped | related | Closed separate-language localization PR; historical evidence only. |
| #45309 | keep_closed | skipped | independent | Closed Catalan PR is independent of the Korean cluster. |
| #53345 | needs_human | planned | needs_human | Keep #53345 for maintainer decision on the non-UI agent-language behavior; do not open an autonomous fix PR while the issue is explicitly marked no-new-fix-pr/product-decision. |
| #57531 | keep_closed | skipped | fixed_by_candidate | Closed Korean UI locale PR is covered by current main. |
| #57644 | keep_closed | skipped | fixed_by_candidate | Closed Korean UI locale PR is covered by current main. |
| #62063 | keep_related | planned | related | Keep open as related independent localization work; no close, merge, or replacement fix is appropriate in this Korean cluster. |

## Needs Human

- #53345: maintainer/product decision needed on whether Korean AI-agent response consistency should remain tracked, be split, or be closed; Korean Control UI localization is already implemented on current main and the issue is labeled no-new-fix-pr/needs-product-decision.
