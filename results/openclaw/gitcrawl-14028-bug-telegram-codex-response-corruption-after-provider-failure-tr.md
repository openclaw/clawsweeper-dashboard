---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-14028-bug-telegram-codex-response-corruption-after-provider-failure-tr"
mode: "autonomous"
run_id: "26679844121"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26679844121"
head_sha: "485f71abc664da503090d6de9975c8f912e4f285"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-30T09:07:56.193Z"
canonical: "https://github.com/openclaw/openclaw/issues/44910"
canonical_issue: "https://github.com/openclaw/openclaw/issues/44910"
canonical_pr: null
actions_total: 10
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# gitcrawl-14028-bug-telegram-codex-response-corruption-after-provider-failure-tr

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26679844121](https://github.com/openclaw/clawsweeper/actions/runs/26679844121)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/44910

## Summary

Representative #55019 is closed and should not remain canonical. The current actionable canonical path is #44910: current main sanitizes Codex/server_error payloads, but the shared formatter still does not recognize top-level FastAPI/Codex {detail:string} error payloads, and the useful source PR #45216 is closed, unmerged, uneditable, and had unresolved proof/review gaps. #63188, #63210, and #44965 are related stopReason/repetition follow-ups; #64362 and #53329 are separate session-lock/tool-error work. No GitHub mutations are recommended before a narrow credited replacement fix PR is opened.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 10 |
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
| #55019 | keep_closed | skipped | superseded | Closed context only; no close/comment action is valid. |
| #44910 | fix_needed | planned | canonical | No viable canonical PR exists; build a narrow credited replacement PR for #44910 before any closeout. |
| #63188 | keep_related | planned | related | Related follow-up subcluster; keep open until a separate stopReason-length recovery design/fix path is chosen. |
| #63210 | keep_related | planned | related | Open related canonical for the stopReason-length subfamily; not closable or covered by the #44910 formatter fix. |
| #64362 | keep_independent | planned | independent | Different root cause and affected subsystem; keep open outside this repair path. |
| #39612 | keep_related | planned | related | Related but broader than the repairable formatter gap. |
| #44965 | keep_related | planned | related | Related follow-up; no close or merge action is safe in this run. |
| #53329 | keep_independent | planned | independent | Not a canonical fix for this cluster; keep open for its own review path. |
| #45216 | keep_closed | skipped | superseded | Use as credited source material for the replacement fix artifact only. |
| cluster:gitcrawl-14028-bug-telegram-codex-response-corruption-after-provider-failure-tr | build_fix_artifact | planned |  | No viable canonical PR exists and allow_fix_pr=true. |

## Needs Human

- none
