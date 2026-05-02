---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-74525"
mode: "autonomous"
run_id: "25247272704"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25247272704"
head_sha: "15501de543ab27cbfd1e06f41733a5ef68184d1f"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T08:10:01.295Z"
canonical: "https://github.com/openclaw/openclaw/pull/74564"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/74564"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-74525

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25247272704](https://github.com/openclaw/clawsweeper/actions/runs/25247272704)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/74564

## Summary

Open replacement PR #74564 is the canonical repair path for the #74525 automerge cluster, but it is not merge-ready. The hydrated ClawSweeper review requests two narrow fixes, the PR branch is same-repo writable, and current main still shows the agentDir is not threaded into /models provider visibility. Emit a repair-contributor-branch fix artifact; do not merge or close anything.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/74564 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74564 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74423 | keep_closed | skipped | related | Closed linked context only; no mutation planned. |
| #74525 | keep_closed | skipped | superseded | Already closed; keep as credited source PR context only. |
| #74564 | fix_needed | planned | canonical | Repair #74564 in place; do not merge because merge is blocked by job policy and review/CI findings. |
| cluster:automerge-openclaw-openclaw-74525 | build_fix_artifact | planned |  | Executor should update the existing writable ClawSweeper PR branch. |

## Needs Human

- none
