---
repo: openclaw/openclaw
cluster_id: gitcrawl-17410-title-false-positive-wechat-toolkit-incorrectly-flagged-as-suspi
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
  - "#1059"
candidates:
  - "#369"
  - "#410"
  - "#450"
  - "#484"
  - "#532"
  - "#655"
  - "#733"
  - "#768"
  - "#770"
  - "#838"
  - "#873"
  - "#910"
  - "#914"
  - "#975"
  - "#1028"
  - "#1059"
  - "#1249"
  - "#1358"
  - "#1426"
  - "#1448"
cluster_refs:
  - "#369"
  - "#410"
  - "#418"
  - "#450"
  - "#462"
  - "#484"
  - "#532"
  - "#544"
  - "#610"
  - "#655"
  - "#684"
  - "#733"
  - "#768"
  - "#770"
  - "#838"
  - "#873"
  - "#910"
  - "#914"
  - "#964"
  - "#975"
  - "#1028"
  - "#1031"
  - "#1059"
  - "#1073"
  - "#1249"
  - "#1295"
  - "#1358"
  - "#1389"
  - "#1426"
  - "#1446"
  - "#1448"
  - "#1458"
  - "#1462"
  - "#1510"
  - "#1541"
  - "#1568"
  - "#1615"
  - "#1644"
  - "#1830"
  - "#1877"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #1059 is open; worker must verify it is still the best live canonical."
notes: "Generated from gitcrawl run cluster 17410 on 2026-05-26."
---

# Gitcrawl Cluster 17410

Generated from local gitcrawl run cluster 17410 for `openclaw/openclaw`.

Display title:

> Title: [False Positive] wechat-toolkit incorrectly flagged as Suspicious

Cluster shape from gitcrawl:

- total members: 40
- issues: 39
- pull requests: 1
- open candidates in local store: 20
- representative: #1059, currently open in local store
- latest member update: 2026-04-30T10:08:30.321629655Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #418 fix: clear stale suspicious flag when VT verdict improves
- #462 Remove stale suspicious flag on self-improving-agent
- #544 False positive: AgentCall skill flagged as suspicious despite 0 detections
- #610 False-positive review request: theta-edgecloud-skill remains suspicious after hardening sequence (0.1.0 -> 0.1.3)
- #684 False positive: 微信QQ自动发消息 skill incorrectly flagged as suspicious
- #964 [False Positive] Skill "bili-mindmap" incorrectly flagged as suspicious - request manual review
- #1031 Request for Review: huahua-daily skill incorrectly flagged as suspicious
- #1073 agent-census skill incorrectly flagged by VirusTotal — OpenClaw scan shows Benign HIGH CONFIDENCE
- #1295 Skill falsely flagged: telegram-cli-tdlib
- #1389 [False Positive] huanzhi-fa-skill-pro incorrectly flagged as suspicious - Request for re-review
- #1446 False Positive: Skill [Memory Never Forget v2.2.2] incorrectly flagged as suspicious by OpenClaw Security Scan
- #1458 [Security Flag Review] 动画视频制作skill incorrectly flagged as suspicious
- #1462 [False Positive Appeal] Skill "Fa.Pro-融资顾问" Incorrectly Flagged as Suspicious
- #1510 False positive review request: kmind-markdown-to-mindmap is flagged as suspicious on ClawHub
- #1541 False positive suspicious flag on emotion-shared-experience skill
- #1568 False positive: 错敏信息检测 (ucap-sensitive-check-skill v1.0.1) incorrectly flagged as suspicious
- #1615 False Positive: Memory Never Forget v3.2.1 incorrectly flagged as Suspicious
- #1644 False positive: bitfence flagged as suspicious by VirusTotal Code Insight
- #1830 False positive: skill-factory incorrectly flagged as suspicious
- #1877 Regression: manually cleared skill shows suspicious status again after ClawHub update

Open candidates:

- #369 False Positive: Skill flagged as "suspicious"
- #410 False positive: HabitChat skill flagged as suspicious despite clean scans
- #450 Suspicious banner shown for Laravel Forge skill with VT "Suspicious" Code Insights but 0/64 detections
- #484 flagged suspicious by VirusTotal even the VirusTotal report is green: Markdown Editor with Chat
- #532 BitNote Skill Incorrectly flagged as suspicious
- #655 False Positive: Skill Flagged as Suspicious Despite Clean Security Scans
- #733 Stale suspicious flag: 3 skills with VT 0/65 clean + OpenClaw Benign still flagged
- #768 False positive: gateway-watchdog-lite flagged Suspicious by VirusTotal despite OpenClaw Benign HIGH CONFIDENCE
- #770 False positive: telegram-autopilot skill flagged as suspicious
- #838 Stale top-level suspicious banner for web-search-pro despite both scan badges showing Benign
- #873 Appeal: a-stock-n-pattern skill marked as Suspicious - false positive
- #910 Title False Positive Review Request — openclaw-smartness-eval flagged as suspicious
- #914 False positive: zalo-agent skill flagged as suspicious
- #975 False positive: 'vibe-reading' and 'vibe-reading-cn' skills flagged as suspicious
- #1028 [False Positive Appeal] baidu-netdisk-skill Flagged as Suspicious - Request Review
- #1059 Title: [False Positive] wechat-toolkit incorrectly flagged as Suspicious
- #1249 [Request] Remove Suspicious Flag from memory-palace skill (lanzhou3/memory-palace)
- #1358 False positive: telegram-cli-agent flagged as suspicious
- #1426 Request review for recurring suspicious flag on wwt1995/triz-problem-solver
- #1448 [Security Flag Review] session-task-tracker skill incorrectly flagged as suspicious
