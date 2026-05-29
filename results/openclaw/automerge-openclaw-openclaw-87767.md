---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87767"
mode: "autonomous"
run_id: "26614509380"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26614509380"
head_sha: "558017d383b7eae02be713280ae75e24d0cb8bd2"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-29T03:06:03.912Z"
canonical: "https://github.com/openclaw/openclaw/pull/87810"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/87810"
actions_total: 5
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87767

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26614509380](https://github.com/openclaw/clawsweeper/actions/runs/26614509380)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87810

## Summary

Canonical repair path is the open same-repo replacement PR #87810. The original fork PR #87767 is already closed as superseded, #86939 is already closed historical context, and security-sensitive linked PR #87017 is quarantined without blocking the non-security gateway repair. #87810 has a passing ClawSweeper review and real-behavior proof, but merge remains blocked by job policy and a cancelled required preflight check, so the deterministic executor should repair/revalidate the writable #87810 branch rather than merge.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/87810 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87810 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #86939 | keep_closed | skipped | fixed_by_candidate | Historical closed issue; no mutation allowed or needed. |
| #87017 | route_security | planned | security_sensitive | Security-sensitive linked ref is out of ClawSweeper Repair scope except for quarantine routing. |
| #87767 | keep_closed | skipped | superseded | Already superseded by the open writable replacement PR #87810. |
| #87810 | fix_needed | planned | canonical | Repair the writable replacement branch, rerun the exact changed-surface validation, and clear the cancelled preflight before merge consideration. |
| cluster:automerge-openclaw-openclaw-87767 | build_fix_artifact | planned |  | Executable repair path exists on the same-repo #87810 branch. |

## Needs Human

- none
