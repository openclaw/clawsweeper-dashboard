---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-af5a1fbddb14"
mode: "autonomous"
run_id: "25852241603"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25852241603"
head_sha: "1558af39eeca02b91e57ae98a885c7871229a8e8"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-14T09:34:00.486Z"
canonical: "https://github.com/openclaw/openclaw/commit/af5a1fbddb14a1f1ef2f6e9f3487f108d54ce066"
canonical_issue: null
canonical_pr: null
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-af5a1fbddb14

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25852241603](https://github.com/openclaw/clawsweeper/actions/runs/25852241603)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/commit/af5a1fbddb14a1f1ef2f6e9f3487f108d54ce066

## Summary

Verified the commit finding against current main `2268ce3a144c32e09489e6c330a5c0f6824d65b3`. The original macOS permission-denied symptom is partly masked by current `chmod 755`, but the safe repair from the source finding is still needed: chown the macOS temp script to the resolved desktop user and keep the script non-world-readable because the generated script contains provider credentials. No GitHub mutations were performed.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75293 | clawsweeper/clawsweeper-commit-openclaw-openclaw-af5a1fbddb14 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75293 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-af5a1fbddb14 | fix_needed | planned |  | A narrow fix PR is still appropriate: restore owner-only guest script permissions while chowning macOS scripts to the resolved desktop user for both `--current-user` and sudo fallback execution paths. |
| cluster:clawsweeper-commit-openclaw-openclaw-af5a1fbddb14 | build_fix_artifact | planned |  | No viable existing PR is present in the hydrated cluster. Build a new narrow fix PR from the commit-finding artifact. |

## Needs Human

- none
