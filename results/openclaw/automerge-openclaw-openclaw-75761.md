---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75761"
mode: "autonomous"
run_id: "25257253992"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25257253992"
head_sha: "318e9c4fe108f42cc946a791a729d46e50e7c9c7"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T17:41:10.074Z"
canonical: "https://github.com/openclaw/openclaw/pull/75761"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75761"
actions_total: 3
fix_executed: 0
fix_failed: 1
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75761

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25257253992](https://github.com/openclaw/clawsweeper/actions/runs/25257253992)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75761

## Summary

PR #75761 is the canonical automerge repair target, but it is not merge-ready: the hydrated artifact shows a dirty merge state and relevant failing checks, while the branch is writable. Emit a repair-contributor-branch fix artifact for the existing PR branch. Linked PR #75860 is related memory/QMD recall work and should stay separate.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
| Fix executed | 0 |
| Fix failed | 1 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | failed |  |  | To https://github.com/codexGW/openclaw.git
 ! [remote rejected]       HEAD -> fix/active-memory-empty-search-fast-fail (refusing to allow a GitHub App to create or update workflow `.github/workflows/ci.yml` without `workflows` permission)
error: failed to push some refs to 'https://github.com/codexGW/openclaw.git' |
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/76183 | clawsweeper/automerge-openclaw-openclaw-75761 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76183 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75761 | fix_needed | planned | canonical | Repair the existing writable contributor branch for #75761; do not replace, close, or merge from this worker. |
| #75860 | keep_related | planned | related | Keep #75860 open as related follow-up work outside this automerge repair cluster. |
| cluster:automerge-openclaw-openclaw-75761 | build_fix_artifact | planned |  | Automerge worker may plan fixes but cannot merge or close; the deterministic executor should repair the existing branch and re-review. |

## Needs Human

- none
