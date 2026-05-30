---
repo: "openclaw/openclaw"
cluster_id: "issue-openclaw-openclaw-87646"
mode: "autonomous"
run_id: "26691526037"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26691526037"
head_sha: "e9cd92cdd73e23d129ae0c90479643204479cbbb"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-30T19:12:07.925Z"
canonical: "https://github.com/openclaw/openclaw/issues/87646"
canonical_issue: "https://github.com/openclaw/openclaw/issues/87646"
canonical_pr: null
actions_total: 6
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-87646

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26691526037](https://github.com/openclaw/clawsweeper/actions/runs/26691526037)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/87646

## Summary

Issue #87646 remains the open canonical Feishu inbound dispatch regression. Current main still has Feishu message and drive-comment dispatch paths calling `core.channel.inbound.run`, while sibling channels use the public `openclaw/plugin-sdk/channel-inbound` helpers. The prior Feishu PR #87664 is already closed unmerged and had failing proof, so the safe path is a new narrow fix PR from `clawsweeper/issue-openclaw-openclaw-87646`.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 6 |
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
| execute_fix | blocked |  |  | Codex review-fix worker timed out after 317816ms |
| issue_implementation_status_comment | updated | #87646 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87646 | fix_needed | planned | canonical | A narrow source-level fix is available: migrate Feishu inbound dispatch callsites to the public SDK inbound runner and add regression coverage with a runtime mock that omits `channel.inbound`. |
| cluster:issue-openclaw-openclaw-87646 | build_fix_artifact | planned |  | Create or update `clawsweeper/issue-openclaw-openclaw-87646` with the narrow Feishu SDK-inbound dispatch fix and focused tests. |
| #86439 | keep_closed | skipped | independent | Already closed and independent of this Feishu dispatch repair. |
| #87044 | keep_closed | skipped | related | Already closed and only related by broad message-delivery area. |
| #87664 | keep_closed | skipped | superseded | Already closed and superseded by the planned new narrow fix path. |
| #88187 | keep_closed | skipped | duplicate | Already closed duplicate of the canonical issue. |

## Needs Human

- none
