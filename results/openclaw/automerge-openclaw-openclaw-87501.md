---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87501"
mode: "autonomous"
run_id: "26558806070"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26558806070"
head_sha: "666e707a828896056556870083d5c23184a474f8"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-28T07:08:33.937Z"
canonical: "https://github.com/openclaw/openclaw/pull/87523"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/87523"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87501

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26558806070](https://github.com/openclaw/clawsweeper/actions/runs/26558806070)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87523

## Summary

The current canonical repair path is the writable same-repo replacement PR #87523. It is not merge-ready because the hydrated exact-head state is unstable with a failing checks-node-agentic-agents check, and this job blocks merge/close actions, so the safe output is a repair fix artifact for #87523. The original contributor PR #87501 is already closed as superseded, and linked issue #86687 stays open because this PR only covers the sticky image cache-ref regression, not the separate group-chat policy decision.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/87523 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87523 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87523 | fix_needed | planned | canonical | Repair the existing writable replacement branch, then rerun exact-head review and pnpm check:changed before any later automerge gate. |
| cluster:automerge-openclaw-openclaw-87501 | build_fix_artifact | planned |  | Emit an executable repair artifact for the ClawSweeper executor. |
| #87501 | keep_closed | skipped | superseded | Historical source PR only; the live repair continues in #87523. |
| #86687 | keep_related | planned | related | Keep the broader issue open; this cluster repairs only the sticky image cache-ref portion. |

## Needs Human

- none
