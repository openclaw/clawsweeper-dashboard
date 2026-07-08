---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-2284-feat-google-add-google-vertex-ai-provider-with-adc-auth-and-glob"
mode: "autonomous"
run_id: "28930788648"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28930788648"
head_sha: "9b7281103ab54ecb97d8d66e5ddf4165ea8469fc"
workflow_conclusion: "success"
result_status: "needs_human"
published_at: "2026-07-08T09:09:52.484Z"
canonical: "https://github.com/openclaw/openclaw/pull/87800"
canonical_issue: "https://github.com/openclaw/openclaw/issues/60736"
canonical_pr: "https://github.com/openclaw/openclaw/pull/87800"
actions_total: 9
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 1
needs_human_count: 1
---

# gitcrawl-2284-feat-google-add-google-vertex-ai-provider-with-adc-auth-and-glob

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28930788648](https://github.com/openclaw/clawsweeper/actions/runs/28930788648)

Workflow conclusion: success

Worker result: needs_human

Canonical: https://github.com/openclaw/openclaw/pull/87800

## Summary

#60860 is no longer the best live canonical path: it is dirty, failing checks, broad, and has unresolved bot findings. #87800 is the best current canonical PR for the remaining Google Vertex ADC/onboarding/docs gap, while #60736 remains the canonical issue. Merge/closeout needs maintainer review because #87800 changes auth/setup/docs surfaces and merge is blocked for this job.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 9 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 1 |
| Needs human | 1 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #60860 | close_superseded | skipped | superseded | Superseded closeout is clear, but the job requires fix-first closeout and #87800 has not landed. |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #58775 | keep_related | planned | related | The original regression appears resolved on main, but the issue is still related to the open Vertex setup/auth family and should not be closed before the canonical fix path lands. |
| #60736 | keep_canonical | planned | canonical | #60736 is the clearest open issue for the remaining product/setup gap covered by #87800. |
| #60860 | close_superseded | blocked | superseded | Superseded closeout is clear, but the job requires fix-first closeout and #87800 has not landed. |
| #62103 | keep_closed | skipped | superseded | Historical evidence only; no mutation needed. |
| #87800 | needs_human | blocked | canonical | Best live canonical PR, but maintainer product/merge review is required before landing because it changes auth setup, provider config/discovery, docs, and onboarding behavior. |
| #49039 | keep_closed | skipped | fixed_by_candidate | Historical closed ADC sentinel context only. |
| #56253 | keep_closed | skipped | fixed_by_candidate | Historical closed ADC auth context only. |
| #83971 | keep_closed | skipped | fixed_by_candidate | Merged historical fix for production ADC modes; no action needed. |
| #90609 | keep_closed | skipped | fixed_by_candidate | Merged historical fix for Vertex ADC catalog auth; no action needed. |

## Needs Human

- Maintainer review is required for #87800 before merge or closeout: it is the best live canonical PR, but it changes Google Vertex auth setup, provider/config discovery, docs, and onboarding behavior, and this job explicitly blocks merge.
