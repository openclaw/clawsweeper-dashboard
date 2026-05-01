---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-73725"
mode: "autonomous"
run_id: "25218050709"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25218050709"
head_sha: "f1bb916a329faa6fdadc8549b12d2dd5453c7f91"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T14:40:33.758Z"
canonical: "https://github.com/openclaw/openclaw/pull/73725"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/73725"
actions_total: 9
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-73725

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25218050709](https://github.com/openclaw/clawsweeper/actions/runs/25218050709)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/73725

## Summary

PR #73725 is the canonical branch-writable repair path for the bounded WebChat New Chat create/switch fix, but it is not merge-ready because hydrated ClawSweeper and Greptile review state identify unresolved code-local blockers. No GitHub mutations are planned by this worker; emit a repair-contributor-branch fix artifact for the executor.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 9 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/73725 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #73725 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #73725 | fix_needed | planned | canonical | Canonical PR is useful and branch-writable, but unresolved ClawSweeper/Greptile findings require a bounded repair pass before review or merge gates can proceed. |
| cluster:automerge-openclaw-openclaw-73725 | build_fix_artifact | planned |  | Executor should update the existing PR branch, address the review blockers, run targeted tests plus pnpm check:changed, then request a fresh ClawSweeper review. |
| #26517 | keep_related | planned | related | Related to the canonical PR, but not a true duplicate or closable covered item in this automerge repair job. |
| #50404 | keep_related | planned | related | Keep open as related product work; #73725 should not close or subsume it. |
| #52042 | keep_closed | skipped | superseded | Historical source work only; keep closed and preserve attribution through #73725. |
| #52266 | keep_closed | skipped | duplicate | Already-closed duplicate context; no mutation needed. |
| #52746 | keep_closed | skipped | superseded | Historical source/context only; keep closed and preserve attribution through #73725. |
| #60741 | keep_related | planned | related | Related to #73725, but not fully covered by the bounded PR repair. |
| #70783 | keep_closed | skipped | duplicate | Already-closed related duplicate context; no mutation needed. |

## Needs Human

- none
