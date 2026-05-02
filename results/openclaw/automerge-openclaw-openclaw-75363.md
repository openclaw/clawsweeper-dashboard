---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75363"
mode: "autonomous"
run_id: "25246263965"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25246263965"
head_sha: "232d53855deb5d19f8f29d2439d377f705770039"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T07:02:03.439Z"
canonical: "https://github.com/openclaw/openclaw/pull/75363"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75363"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75363

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25246263965](https://github.com/openclaw/clawsweeper/actions/runs/25246263965)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75363

## Summary

PR #75363 is the canonical adopted automerge candidate, but it is not merge-ready. The hydrated artifact shows a current ClawSweeper needs-changes finding on the Discord interaction one-off component wait path, unresolved exact-head CI state with one failing unrelated-looking agentic shard plus pending shards, and merge is blocked by job frontmatter. The branch is same-repo writable, so the deterministic executor should repair the contributor branch rather than replace it.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75363 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75363 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75363 | fix_needed | planned | canonical | Repair the writable contributor branch for the remaining ClawSweeper interaction-helper blocker, then rerun exact-head review and changed-surface validation. |
| cluster:automerge-openclaw-openclaw-75363 | build_fix_artifact | planned |  | A narrow repair artifact is required for the executor to update #75363 and request a fresh exact-head ClawSweeper review. |

## Needs Human

- none
