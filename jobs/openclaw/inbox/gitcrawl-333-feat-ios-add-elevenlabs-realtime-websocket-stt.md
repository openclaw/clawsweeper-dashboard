---
repo: openclaw/openclaw
cluster_id: gitcrawl-333-feat-ios-add-elevenlabs-realtime-websocket-stt
mode: autonomous
job_intent: repair_cluster
allowed_actions:
  - comment
  - label
  - close
  - fix
  - raise_pr
blocked_actions:
  - force_push
  - bypass_checks
  - merge
require_human_for:
  - security_sensitive
  - failing_checks
  - conflicting_prs
  - unclear_canonical
  - broad_code_delta
canonical:
  - "#38744"
candidates:
  - "#47584"
  - "#71195"
cluster_refs:
  - "#38744"
  - "#47584"
  - "#64318"
  - "#71195"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #38744 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 333 on 2026-06-29."
---

# Gitcrawl Cluster 333

Generated from local gitcrawl run cluster 333 for `openclaw/openclaw`.

Display title:

> feat(ios): add ElevenLabs realtime WebSocket STT

Cluster shape from gitcrawl:

- total members: 4
- issues: 2
- pull requests: 2
- open candidates in local store: 2
- representative: #38744, currently closed in local store
- latest member update: 2026-06-28T08:01:18.728906079Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #38744 feat(ios): add ElevenLabs realtime WebSocket STT
- #64318 feat: Add unified Amazon plugin — Polly TTS, Transcribe STT, Nova Sonic realtime voice

Open candidates:

- #47584 feat(ios): Siri App Intent integration — native "Hey Siri, ask OpenClaw..." support
- #71195 feat(talk/macOS): add OpenAI Realtime (speech-to-speech) path for Talk Mode — parity with the voice-call plugin's phone experience
