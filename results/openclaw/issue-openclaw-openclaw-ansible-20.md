---
repo: "openclaw/openclaw-ansible"
cluster_id: "issue-openclaw-openclaw-ansible-20"
mode: "autonomous"
run_id: "27490278205"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27490278205"
head_sha: "58ee19f2efee55b6546e57829f9cf332f2714ae0"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-14T06:24:25.588Z"
canonical: "https://github.com/openclaw/openclaw-ansible/issues/20"
canonical_issue: "https://github.com/openclaw/openclaw-ansible/issues/20"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-ansible-20

Repo: openclaw/openclaw-ansible

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27490278205](https://github.com/openclaw/clawsweeper/actions/runs/27490278205)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw-ansible/issues/20

## Summary

Issue #20 remains a valid open implementation target on main b52506035fb399ed963e98a61a99cd782b704789. Current main still writes /etc/sudoers.d/{{ openclaw_user }} and validates with /usr/sbin/visudo, but the Debian/Ubuntu prerequisite package list does not install sudo, and the Ubuntu test image masks the bug by preinstalling sudo. Emit a narrow new fix PR artifact; local patching and full validation were blocked by the read-only worker filesystem.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw-ansible/pull/49 | clawsweeper/issue-openclaw-openclaw-ansible-20 |  |
| issue_implementation_status_comment | updated | #20 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #49 | merge_canonical | blocked | fix_pr | checks are not clean: Ansible Lint: FAILURE |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #20 | keep_canonical | planned | canonical | #20 is the source issue and best canonical thread for this narrow install prerequisite bug. |
| cluster:issue-openclaw-openclaw-ansible-20 | fix_needed | planned |  | A narrow playbook and test-harness change can satisfy the issue without changing Docker/firewall ordering or broadening sudo permissions. |
| cluster:issue-openclaw-openclaw-ansible-20 | build_fix_artifact | planned |  | Build a new fix PR from target branch clawsweeper/issue-openclaw-openclaw-ansible-20. |
| cluster:issue-openclaw-openclaw-ansible-20 | open_fix_pr | planned |  | The source issue remains viable and no existing PR owns the fix. |

## Needs Human

- none
