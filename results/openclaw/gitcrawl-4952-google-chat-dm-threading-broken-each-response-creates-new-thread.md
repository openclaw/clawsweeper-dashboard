---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-4952-google-chat-dm-threading-broken-each-response-creates-new-thread"
mode: "autonomous"
run_id: "26877204626"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26877204626"
head_sha: "9c50a95427c21d5e0e33e57295e68b1548cc9953"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-03T10:23:22.851Z"
canonical: "https://github.com/openclaw/openclaw/issues/42510"
canonical_issue: "https://github.com/openclaw/openclaw/issues/42510"
canonical_pr: "https://github.com/openclaw/openclaw/pull/74235"
actions_total: 11
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# gitcrawl-4952-google-chat-dm-threading-broken-each-response-creates-new-thread

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26877204626](https://github.com/openclaw/clawsweeper/actions/runs/26877204626)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/42510

## Summary

Classified the obsolete closed representative #41788 into a narrower open canonical path: #42510 remains the canonical issue for Google Chat reply-thread routing/replyToMode behavior, with #74235 as the current repair candidate but not merge-ready. The spaceType/group-detection, add-on payload, and sessionThread items are related subfamilies and should stay open rather than be closed as duplicates.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 11 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/89790 | clawsweeper/gitcrawl-4952-google-chat-dm-threading-broken-each-response-creates-new-thread |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #89790 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #41788 | keep_closed | skipped | superseded | Representative is obsolete and closed; keep it historical only. |
| #42510 | keep_canonical | planned | canonical | This is the best surviving issue for the thread/replyToMode family. |
| #74235 | fix_needed | planned | canonical | The PR is the active repair candidate for the thread-delivery family but needs a repair pass before any merge or closeout. |
| #69422 | keep_related | planned | related | Likely covered by the thread-delivery fix path, but keep open until #74235 or a replacement fix lands and the full issue body is rehydrated. |
| #44347 | keep_related | planned | related | Related umbrella issue; not a true duplicate and not safe to close in this thread-delivery repair pass. |
| #58514 | keep_related | planned | related | Real but separate spaceType/group-detection bug; keep open for its own #58993 repair path. |
| #58993 | keep_related | planned | related | Keep as a related repairable PR in the spaceType subcluster, not as canonical for this cluster. |
| #65007 | keep_related | planned | related | Related Google Chat message-loss report, but distinct from the thread-delivery canonical path and not closure-ready. |
| #68967 | keep_related | planned | related | Related but too broad and not merge-ready; keep open outside this narrow repair path. |
| #70041 | keep_closed | skipped | fixed_by_candidate | Closed context only; no action needed. |
| cluster:gitcrawl-4952-google-chat-dm-threading-broken-each-response-creates-new-thread | build_fix_artifact | planned |  | A concrete fix path is needed before any duplicate/fixed-by-candidate closeout. |

## Needs Human

- none
