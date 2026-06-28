---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-221-linux-windows-clawdbot-apps"
mode: "autonomous"
run_id: "28317628860"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28317628860"
head_sha: "ae63b16d6c7483773359acebfa114792a84ed5a4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-28T09:22:42.509Z"
canonical: "https://github.com/openclaw/openclaw/issues/75"
canonical_issue: "https://github.com/openclaw/openclaw/issues/75"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 2
---

# gitcrawl-221-linux-windows-clawdbot-apps

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28317628860](https://github.com/openclaw/clawsweeper/actions/runs/28317628860)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/75

## Summary

Classified the cluster with #75 as the surviving open canonical issue. Current main is d17b970bb50d8835ee3e8d23e43aec91a08da4e0; the checkout has no in-repo apps/linux, apps/linux-gtk, or apps/windows companion app directories, docs say Windows Hub is shipped while native Linux companion apps remain planned, and the open Linux implementation PRs are security-sensitive and out of ClawSweeper Repair scope. No close, merge, or fix PR action is safe in this run.

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
| Needs human | 2 |

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
| #75 | keep_canonical | planned | canonical | #75 remains the canonical umbrella for the remaining Linux companion product work. Windows appears partially satisfied by Windows Hub, but the issue should stay open because Linux is still planned and the open implementation candidates require security/product review. |
| #44013 | route_security | planned | security_sensitive | Quarantine the hydrated security-sensitive PR for central OpenClaw security handling only; closed state means no repair or closeout action should be emitted. |
| #59859 | route_security | planned | security_sensitive | Open PR #59859 is useful implementation context for #75, but it is security-sensitive and broad. ClawSweeper Repair should not repair, close, or merge it; central security/product review must own the next step. |
| #61576 | route_security | planned | security_sensitive | Open PR #61576 is an alternative Linux implementation track for #75, but it is security-sensitive and broad. ClawSweeper Repair should not repair, close, or merge it; central security/product review must own the next step. |

## Needs Human

- Central OpenClaw security/product review is required for the open Linux companion candidates #59859 and #61576 before any repair, replacement, closeout, or merge path can be chosen.
- Maintainers still need to decide the Linux companion direction under #75; the cluster contains competing C/GTK and Rust/GTK tracks, both broad and security-sensitive.
