---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-82ca6ecdde80"
mode: "autonomous"
run_id: "25247655592"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25247655592"
head_sha: "26f2c55b6de0f674ad103ffa68e2456d40dc81b0"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T08:17:06.963Z"
canonical: "https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/82ca6ecdde801a4a858cf63f6400d25bec004308.md"
canonical_issue: null
canonical_pr: null
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-82ca6ecdde80

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25247655592](https://github.com/openclaw/clawsweeper/actions/runs/25247655592)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/82ca6ecdde801a4a858cf63f6400d25bec004308.md

## Summary

Verified the ClawSweeper commit finding against current main 06110de6f61ece018ec2f061708d40dd485e16ec. The pre-resolved requested-mode fallback is already fixed, but sandbox-scoped tool policy can still make the real message tool unavailable while dispatch believes it is available. A narrow fix PR is still warranted.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| execute_fix | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | fix_needed | planned |  | A narrow code/test fix remains needed for sandbox-aware message tool availability in source reply fallback. |
| cluster:clawsweeper-commit-openclaw-openclaw-82ca6ecdde80 | build_fix_artifact | planned |  | allow_fix_pr is true and no viable existing PR is present in the hydrated cluster. |

## Needs Human

- none
