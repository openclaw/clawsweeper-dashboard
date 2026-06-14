---
repo: "openclaw/openclaw-ansible"
cluster_id: "issue-openclaw-openclaw-ansible-20"
mode: "autonomous"
run_id: "27489351771"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27489351771"
head_sha: "9891eb077ca503354874ab4292c19d41c10e4bf6"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-06-14T05:26:23.902Z"
canonical: "https://github.com/openclaw/openclaw-ansible/issues/20"
canonical_issue: "https://github.com/openclaw/openclaw-ansible/issues/20"
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

# issue-openclaw-openclaw-ansible-20

Repo: openclaw/openclaw-ansible

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27489351771](https://github.com/openclaw/clawsweeper/actions/runs/27489351771)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw-ansible/issues/20

## Summary

Issue #20 is a valid open implementation target. Current main still installs scoped sudoers in roles/openclaw/tasks/user.yml with visudo validation, but the Debian/Ubuntu prerequisite package list does not install sudo, and the Ubuntu test image masks the bug by preinstalling sudo. Emit a narrow new fix PR artifact; local patching/validation was blocked by the read-only worker filesystem.

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
| #20 | keep_canonical | planned | canonical | #20 is the source issue and best canonical thread for this narrow install prerequisite bug. |
| cluster:issue-openclaw-openclaw-ansible-20 | fix_needed | planned |  | A narrow playbook/test change can satisfy the issue without changing Docker/firewall ordering or broadening sudo permissions. |
| cluster:issue-openclaw-openclaw-ansible-20 | build_fix_artifact | planned |  | Build a new fix PR from target branch clawsweeper/issue-openclaw-openclaw-ansible-20. |
| cluster:issue-openclaw-openclaw-ansible-20 | open_fix_pr | planned |  | The source issue remains viable and no existing PR owns the fix. |

## Needs Human

- none
