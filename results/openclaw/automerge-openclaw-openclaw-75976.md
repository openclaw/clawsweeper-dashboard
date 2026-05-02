---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75976"
mode: "autonomous"
run_id: "25247244737"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25247244737"
head_sha: "15501de543ab27cbfd1e06f41733a5ef68184d1f"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T07:56:22.712Z"
canonical: "https://github.com/openclaw/openclaw/pull/75976"
canonical_issue: "https://github.com/openclaw/openclaw/issues/72097"
canonical_pr: "https://github.com/openclaw/openclaw/pull/75976"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75976

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25247244737](https://github.com/openclaw/clawsweeper/actions/runs/25247244737)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75976

## Summary

PR #75976 is the canonical repairable path for the plugin management hot-reload work, but it is not merge-ready because hydrated exact-head checks include failing and pending jobs. The same-repo head branch is writable, so the next deterministic action is to repair the contributor branch, rerun ClawSweeper review/checks, and keep linked issue #72097 open until the canonical PR is clean and landed.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75976 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75976 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75976 | fix_needed | planned | canonical | Automerge is blocked on relevant failing/pending exact-head checks, but the canonical same-repo PR branch is writable and should be repaired rather than replaced. |
| #72097 | keep_related | planned | related | Keep the linked issue open as related context until PR #75976 is repaired, validated, reviewed on the repaired head, and landed. |
| cluster:automerge-openclaw-openclaw-75976 | build_fix_artifact | planned |  | The canonical PR is useful and writable, but exact-head validation is not clean. |

## Needs Human

- none
