---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-13603-switching-to-a-smaller-context-model-mid-session-causes-hard-cra"
mode: "autonomous"
run_id: "27058193668"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27058193668"
head_sha: "413ef258a1ef328ab7fd1cdab266124a0b0ebd17"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-06T09:25:57.309Z"
canonical: "https://github.com/openclaw/openclaw/issues/58957"
canonical_issue: "https://github.com/openclaw/openclaw/issues/58957"
canonical_pr: "https://github.com/openclaw/openclaw/pull/39859"
actions_total: 12
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 1
---

# gitcrawl-13603-switching-to-a-smaller-context-model-mid-session-causes-hard-cra

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27058193668](https://github.com/openclaw/clawsweeper/actions/runs/27058193668)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/58957

## Summary

Classified the surviving open work without GitHub mutation. #58957 is the current broad canonical issue for model-switch/fallback context overflow UX; #39859 is a useful writable contributor PR for the narrower #39857 shared context-window accounting bug but needs repair/proof before it can be a candidate fix. No close actions are planned because instant close is disabled and require_fix_before_close is true.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 12 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 1 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | blocked | https://github.com/openclaw/openclaw/pull/39859 |  | GitHub rejected the repair branch push because it updates workflow files and the ClawSweeper app token does not have workflows permission |
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/90889 | clawsweeper/gitcrawl-13603-switching-to-a-smaller-context-model-mid-session-causes-hard-cra |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #90889 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #58957 | keep_canonical | planned | canonical | Keep open as the current broad canonical issue; product-decision labels and remaining behavior mean it should not be closed as fixed. |
| #9986 | keep_related | planned | related | Keep open and related; fallback-on-overflow needs product direction and should not be closed under this fix-first cluster. |
| #39857 | fix_needed | planned | fixed_by_candidate | Repair #39859 rather than close #39857; the candidate branch needs proof and cleanup first. |
| #39859 | fix_needed | planned | canonical | Repair the contributor branch: narrow the diff, preserve @xdanger credit, rerun focused proof, then run the changed gate. |
| cluster:gitcrawl-13603-switching-to-a-smaller-context-model-mid-session-causes-hard-cra | build_fix_artifact | planned |  | A narrow repair artifact is needed for the writable contributor PR before any closeout or merge-classification can be considered. |
| #9409 | keep_related | planned | related | Related diagnostics work, not a duplicate closeout target for this cluster. |
| #66830 | keep_independent | planned | independent | Keep as independent compaction-threshold work. |
| #74010 | keep_independent | planned | independent | Independent failing PR; do not merge or close in this cluster. |
| #82754 | keep_related | planned | related | Related but not viable for automation while draft/failing; no replacement closeout is planned in this cluster. |
| #44389 | route_security | planned | security_sensitive | Route only this closed security-sensitive ref to central OpenClaw security handling; do not use it as a repair source or closeout target here. |
| #44303 | keep_closed | skipped | superseded | Closed context ref only. |
| #71136 | needs_human | blocked | needs_human | Needs hydrated title/body/comments in a follow-up pass before classification. |

## Needs Human

- #71136 classification is blocked because the compacted artifact preserved only state and updated_at, not enough issue content to classify safely.
