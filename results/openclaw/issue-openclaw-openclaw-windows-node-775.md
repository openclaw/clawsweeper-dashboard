---
repo: "openclaw/openclaw-windows-node"
cluster_id: "issue-openclaw-openclaw-windows-node-775"
mode: "autonomous"
run_id: "27717782966"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27717782966"
head_sha: "f2b07a7265fb9eb4547c7959e7f055a164510cd8"
workflow_conclusion: "failure"
result_status: "blocked"
published_at: "2026-06-17T20:49:29.494Z"
canonical: "https://github.com/openclaw/openclaw-windows-node/issues/775"
canonical_issue: "https://github.com/openclaw/openclaw-windows-node/issues/775"
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-windows-node-775

Repo: openclaw/openclaw-windows-node

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27717782966](https://github.com/openclaw/clawsweeper/actions/runs/27717782966)

Workflow conclusion: failure

Worker result: blocked

Canonical: https://github.com/openclaw/openclaw-windows-node/issues/775

## Summary

Issue #775 is still a viable narrow setup-engine fix on main. Current WSL environment detection does not match the reporter's exact `WSL2 is not supported with your current machine configuration` status output, but this worker has a read-only filesystem and could not apply or validate the implementation branch.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| #775 | keep_canonical | planned | canonical | #775 is the canonical source issue and should remain open until a fix PR lands. |
| cluster:issue-openclaw-openclaw-windows-node-775 | fix_needed | planned |  | A narrow code/test fix is needed; current main still falls through for the exact reporter diagnostic. |
| cluster:issue-openclaw-openclaw-windows-node-775 | build_fix_artifact | planned |  | Emit a deterministic fix plan for a new credited PR from `clawsweeper/issue-openclaw-openclaw-windows-node-775`. |

## Needs Human

- none
