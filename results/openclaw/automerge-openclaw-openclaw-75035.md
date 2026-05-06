---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75035"
mode: "autonomous"
run_id: "25425143031"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25425143031"
head_sha: "1f9fcbc5089921a390e47d48f49e4f2a9b77e6d4"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-06T09:18:01.070Z"
canonical: "https://github.com/openclaw/openclaw/pull/75035"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75035"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75035

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25425143031](https://github.com/openclaw/clawsweeper/actions/runs/25425143031)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75035

## Summary

#75035 is the calibrated canonical PR. The hydrated preflight shows a passing ClawSweeper review at head c67fa908e67d33d281c4fd4e6afda4f7d21d16ed, no security-sensitive item, no actionable inline review comments, and only a non-actionable Copilot size-limit review note. The automerge marker says the PR is behind or has merge conflicts; the PR is same-repo and branch_writable=true, so the deterministic executor should repair the contributor branch rather than replace it. Merge and close are blocked by job policy.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| #75035 | fix_needed | planned | canonical | Canonical PR is useful and writable but not merge-ready because the hydrated preflight reports mergeable=false/dirty and the automerge marker requests a rebase repair. |
| cluster:automerge-openclaw-openclaw-75035 | build_fix_artifact | planned |  | A repair artifact is required for the automerge executor to rebase or otherwise repair the contributor branch before a later exact-head review/merge gate. |

## Needs Human

- none
