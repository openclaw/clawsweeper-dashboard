---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-af5a1fbddb14"
mode: "autonomous"
run_id: "25844699449"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25844699449"
head_sha: "1558af39eeca02b91e57ae98a885c7871229a8e8"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-14T06:09:56.117Z"
canonical: "https://github.com/openclaw/openclaw/tree/main"
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-af5a1fbddb14

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25844699449](https://github.com/openclaw/clawsweeper/actions/runs/25844699449)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/tree/main

## Summary

Verified the ClawSweeper commit finding against current main at 3b7d01b63f02ac620739b69e2d5fc3cc9fb39783. The reported macOS permission-denied regression is no longer present: the shared guest script writer now chmods scripts 755 instead of the reported root-owned 700 mode, so the macOS desktop-user execution path can read the script. No implementation PR is planned for this non-security lane; any follow-up to restore non-world-readable temp scripts would be credential-hardening/security-shaped work outside this commit-finding repair.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
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
| cluster:clawsweeper-commit-openclaw-openclaw-af5a1fbddb14 | keep_independent | skipped | independent | No fix artifact is needed because latest main already fixed the specific reliability finding from the ClawSweeper report. |

## Needs Human

- none
