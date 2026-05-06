---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-78278"
mode: "autonomous"
run_id: "25417261750"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25417261750"
head_sha: "12314945e8c7f8f0bddd7a263336ad939154fe24"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-06T05:08:28.749Z"
canonical: "https://github.com/openclaw/openclaw/pull/78278"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/78278"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-78278

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25417261750](https://github.com/openclaw/clawsweeper/actions/runs/25417261750)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/78278

## Summary

PR #78278 is the canonical automerge candidate, but it is not merge-ready. The branch is writable, the diff is narrow, and the correct path is to repair the contributor branch, address the ClawSweeper review finding, refresh real behavior proof, and rerun the exact-head review before any merge-capable router acts.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/78278 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #78278 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #78278 | fix_needed | planned | canonical | Repair the canonical contributor PR branch before any merge decision; merge is disallowed by this job and the current head has an unresolved ClawSweeper review/proof blocker. |
| cluster:automerge-openclaw-openclaw-78278 | build_fix_artifact | planned |  | Automerge repair is allowed, branch update is safe, and no security-sensitive signal is present. |

## Needs Human

- none
