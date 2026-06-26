---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-6257-fix-use-ssrf-guarded-fetch-for-tts-provider-requests"
mode: "autonomous"
run_id: "28229160559"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28229160559"
head_sha: "323f7bdf7236983896641b148e1ea9164f7ba917"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-26T09:26:10.181Z"
canonical: "https://github.com/openclaw/openclaw/tree/ec737ee74d9be52101992f0cd5d17f5d3953344b"
canonical_issue: null
canonical_pr: null
actions_total: 8
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# gitcrawl-6257-fix-use-ssrf-guarded-fetch-for-tts-provider-requests

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28229160559](https://github.com/openclaw/clawsweeper/actions/runs/28229160559)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/tree/ec737ee74d9be52101992f0cd5d17f5d3953344b

## Summary

Preflight shows every hydrated cluster item is already closed. No open canonical PR needs repair, no close action is valid, and no fix PR is needed because current main ec737ee74d9be52101992f0cd5d17f5d3953344b already contains the relevant TTS/Ollama guarded-fetch, cleanup, Edge TTS robustness, and Ollama model-id normalization behavior.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 8 |
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
| #43229 | keep_closed | skipped | fixed_by_candidate | Already closed; closed context only, so no mutation is valid. |
| #43273 | keep_closed | skipped | superseded | Already closed and superseded by current main implementation. |
| #43385 | keep_closed | skipped | fixed_by_candidate | Already closed/merged; no repair or close action remains. |
| #46333 | keep_closed | skipped | superseded | Representative canonical hint is obsolete because the PR is closed and the equivalent behavior is already on current main. |
| #47232 | keep_closed | skipped | fixed_by_candidate | Already closed after the fix was ported to main. |
| #61517 | keep_closed | skipped | fixed_by_candidate | Already closed after current main implemented the guarded streaming path and awaited cleanup; no open candidate remains. |
| #67435 | keep_closed | skipped | fixed_by_candidate | Already closed and covered by current main behavior. |
| #67484 | keep_closed | skipped | superseded | Already closed as superseded by the better current-main builder-level normalization. |

## Needs Human

- none
