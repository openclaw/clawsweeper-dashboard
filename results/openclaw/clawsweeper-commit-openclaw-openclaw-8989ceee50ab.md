---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-8989ceee50ab"
mode: "autonomous"
run_id: "25230038498"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25230038498"
head_sha: "2adcf6015a4cdb05370cca2e3cf02502e4e76f6b"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T19:46:04.409Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-8989ceee50ab

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25230038498](https://github.com/openclaw/clawsweeper/actions/runs/25230038498)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

The ClawSweeper commit finding is still valid on current main. Current runtime still defaults group/channel replies to message_tool_only, while doctor preview warnings return early when the message tool is available, so configured channels can get private final replies without the removed runtime warning or a doctor advisory. No hydrated GitHub item targets were provided; no security-sensitive signal was found. A narrow fix PR should split the default-private group/channel advisory from the unavailable-message-tool mismatch warning.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| cluster:clawsweeper-commit-openclaw-openclaw-8989ceee50ab | fix_needed | planned |  | No viable canonical PR was hydrated, the source finding remains present on current main, and the patch can stay limited to doctor warning logic, tests, docs/changelog as needed. |
| cluster:clawsweeper-commit-openclaw-openclaw-8989ceee50ab | build_fix_artifact | planned |  | The fix artifact is needed for the deterministic executor to create or update the ClawSweeper fix branch. |
| cluster:clawsweeper-commit-openclaw-openclaw-8989ceee50ab | open_fix_pr | planned |  | After applying the narrow fix, open or update one implementation PR from the configured ClawSweeper target branch. |

## Needs Human

- none
