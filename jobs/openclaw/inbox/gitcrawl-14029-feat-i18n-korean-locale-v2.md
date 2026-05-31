---
repo: openclaw/openclaw
cluster_id: gitcrawl-14029-feat-i18n-korean-locale-v2
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
  - "#40817"
candidates:
  - "#43911"
  - "#45309"
  - "#53345"
  - "#57531"
  - "#57644"
  - "#62063"
cluster_refs:
  - "#40405"
  - "#40817"
  - "#43911"
  - "#44902"
  - "#45309"
  - "#48245"
  - "#48287"
  - "#49028"
  - "#53345"
  - "#53346"
  - "#57531"
  - "#57644"
  - "#62063"
  - "#65190"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #40817 is closed; worker must verify whether an open canonical should replace it."
notes: "Generated from gitcrawl run cluster 14029 on 2026-05-31."
---

# Gitcrawl Cluster 14029

Generated from local gitcrawl run cluster 14029 for `openclaw/openclaw`.

Display title:

> Feat/i18n korean locale v2

Cluster shape from gitcrawl:

- total members: 14
- issues: 1
- pull requests: 13
- open candidates in local store: 6
- representative: #40817, currently closed in local store
- latest member update: 2026-05-27T11:28:58.011536451Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #40405 feat(ui): add Turkish control UI locale
- #40817 Feat/i18n korean locale v2
- #44902 i18n: add Korean (ko-KR) locale and translations
- #48245 i18n: add Russian (ru) locale
- #48287 feat(i18n): add Indonesian (id) locale [AI-assisted]
- #49028 feat(i18n): add Vietnamese (vi) locale and translations
- #53346  feat: add Korean language support to Control UI and AI agent
- #65190 feat(i18n): add Vietnamese (vi-VN) localization

Open candidates:

- #43911 UI: add ru-RU locale for Control UI
- #45309 feat: add Catalan translation
- #53345 [Feature]: Add Korean (ko) language support to Control UI and AI agent
- #57531 feat(i18n): add Korean locale for control UI
- #57644 i18n: add Korean (ko) locale to Control UI [AI-assisted]
- #62063 Add Swedish control UI locale
