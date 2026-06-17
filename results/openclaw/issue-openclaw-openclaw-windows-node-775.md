---
repo: "openclaw/openclaw-windows-node"
cluster_id: "issue-openclaw-openclaw-windows-node-775"
mode: "autonomous"
run_id: "27723655699"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27723655699"
head_sha: "f2b07a7265fb9eb4547c7959e7f055a164510cd8"
workflow_conclusion: "failure"
result_status: "blocked"
published_at: "2026-06-17T22:28:43.294Z"
canonical: "https://github.com/openclaw/openclaw-windows-node/issues/775"
canonical_issue: "https://github.com/openclaw/openclaw-windows-node/issues/775"
canonical_pr: null
actions_total: 4
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27723655699](https://github.com/openclaw/clawsweeper/actions/runs/27723655699)

Workflow conclusion: failure

Worker result: blocked

Canonical: https://github.com/openclaw/openclaw-windows-node/issues/775

## Summary

Issue #775 remains a viable narrow setup-engine fix on current main 6811d6a3e21bddd362e3957127d19a4b887f0ace. The exact reporter diagnostic is still absent from WslInstallSupport.TryGetEnvironmentIssue, but this worker's checkout is read-only, so no local branch, patch, validation, or PR can be produced in this run.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| #775 | keep_canonical | planned | canonical | #775 is the source issue and should remain open until a fix PR is created and validated. |
| cluster:issue-openclaw-openclaw-windows-node-775 | fix_needed | planned |  | Current main still misses the reporter's exact WSL status output, and the requested fix can stay narrow. |
| cluster:issue-openclaw-openclaw-windows-node-775 | build_fix_artifact | planned |  | A new fix PR is appropriate, but this worker can only emit the artifact because the filesystem is read-only. |
| cluster:issue-openclaw-openclaw-windows-node-775 | open_fix_pr | blocked |  | Implementation and PR creation are blocked by the read-only checkout, not by product ambiguity or security concerns. |

## Needs Human

- none
