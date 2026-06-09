---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-17426-clawhub-login-token-returns-unauthorized-for-valid-tokens"
mode: "autonomous"
run_id: "27196822033"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27196822033"
head_sha: "205a27a9d70ddd72b0bd1c72229a435b88e9a06e"
workflow_conclusion: "success"
result_status: "blocked"
published_at: "2026-06-09T09:34:45.412Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 11
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 1
---

# gitcrawl-17426-clawhub-login-token-returns-unauthorized-for-valid-tokens

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27196822033](https://github.com/openclaw/clawsweeper/actions/runs/27196822033)

Workflow conclusion: success

Worker result: blocked

Canonical: unknown

## Summary

No mutating action is safe. The hydrated live-state artifact contradicts the job inventory: the hinted canonical #72 and every listed candidate are closed or unavailable, and the hydrated titles/bodies are unrelated to the ClawHub login-token Unauthorized report. Because broad GitHub search is out of scope for this autonomous worker, the correct next step is to regenerate or rehydrate the cluster from the intended ClawHub refs before closing, labeling, or creating a fix PR.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 11 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 1 |

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
| cluster:gitcrawl-17426-clawhub-login-token-returns-unauthorized-for-valid-tokens | needs_human | blocked | needs_human | Regenerate or rehydrate the intended ClawHub login-token cluster; current hydrated refs do not represent the cluster. |
| #41 | keep_closed | skipped | independent | Closed context ref; no closure action allowed. |
| #72 | keep_closed | skipped | independent | Closed unrelated PR; no canonical path. |
| #73 | keep_closed | skipped | independent | Closed context ref; no closure action allowed. |
| #99 | keep_closed | skipped | independent | Closed unrelated issue; no closure action allowed. |
| #100 | keep_closed | skipped | independent | Closed unrelated PR; no closure action allowed. |
| #101 | needs_human | blocked | needs_human | Cannot classify unavailable ref from the artifact; rerun hydration if #101 matters to the intended cluster. |
| #115 | keep_closed | skipped | independent | Closed unrelated PR; no closure action allowed. |
| #121 | keep_closed | skipped | independent | Closed context ref; no closure action allowed. |
| #377 | keep_closed | skipped | independent | Closed linked context ref; no closure action allowed. |
| #702 | keep_closed | skipped | independent | Closed unrelated issue; no closure action allowed. |

## Needs Human

- Regenerate or rehydrate cluster gitcrawl-17426 from the intended ClawHub login-token Unauthorized refs; the provided live artifact does not contain an open canonical issue or any matching ClawHub candidate.
