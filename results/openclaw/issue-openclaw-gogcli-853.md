---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-853"
mode: "autonomous"
run_id: "27837625748"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27837625748"
head_sha: "471bf8065dd4055ae2a464bb90e5358753e60171"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-06-19T19:17:05.410Z"
canonical: "https://github.com/openclaw/gogcli/issues/853"
canonical_issue: "https://github.com/openclaw/gogcli/issues/853"
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-gogcli-853

Repo: openclaw/gogcli

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27837625748](https://github.com/openclaw/clawsweeper/actions/runs/27837625748)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/gogcli/issues/853

## Summary

Current main at d2e0bd74809d8c6f4f4000f2073d0ffc8bf05329 does not have `gog docs replace-image`; the open canonical issue is viable and non-security. A narrow new-fix PR should add the command by reusing existing Docs image enumeration and local-file upload helpers.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| #853 | keep_canonical | planned | canonical | #853 remains the canonical open product request; no duplicate or active implementation PR was hydrated. |
| cluster:issue-openclaw-gogcli-853 | fix_needed | planned |  | A narrow implementation PR is appropriate; this worker emits the plan for the applicator/executor and does not merge or close. |
| cluster:issue-openclaw-gogcli-853 | build_fix_artifact | planned |  | The fix plan is narrow enough for a single new PR from `clawsweeper/issue-openclaw-gogcli-853`. |

## Needs Human

- none
