---
repo: openclaw/openclaw
cluster_id: gitcrawl-17411-dianping-search-flagged-as-suspicious-request-manual-review
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
  - "#967"
candidates:
  - "#208"
  - "#321"
  - "#387"
  - "#469"
  - "#740"
  - "#747"
  - "#834"
  - "#967"
  - "#1010"
  - "#1024"
  - "#1030"
  - "#1085"
  - "#1090"
  - "#1091"
  - "#1266"
  - "#1354"
  - "#1378"
  - "#1387"
  - "#1442"
  - "#1444"
cluster_refs:
  - "#208"
  - "#259"
  - "#320"
  - "#321"
  - "#331"
  - "#379"
  - "#387"
  - "#408"
  - "#469"
  - "#740"
  - "#747"
  - "#834"
  - "#839"
  - "#919"
  - "#967"
  - "#1010"
  - "#1024"
  - "#1030"
  - "#1081"
  - "#1085"
  - "#1090"
  - "#1091"
  - "#1102"
  - "#1165"
  - "#1266"
  - "#1354"
  - "#1378"
  - "#1387"
  - "#1424"
  - "#1442"
  - "#1443"
  - "#1444"
  - "#1516"
  - "#1572"
  - "#1576"
  - "#1610"
  - "#1612"
  - "#1645"
  - "#1718"
  - "#1821"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #967 is open; worker must verify it is still the best live canonical."
notes: "Generated from gitcrawl run cluster 17411 on 2026-05-26."
---

# Gitcrawl Cluster 17411

Generated from local gitcrawl run cluster 17411 for `openclaw/openclaw`.

Display title:

> dianping-search flagged as suspicious - request manual review

Cluster shape from gitcrawl:

- total members: 40
- issues: 40
- pull requests: 0
- open candidates in local store: 20
- representative: #967, currently open in local store
- latest member update: 2026-04-30T10:08:30.234367241Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #259 False positive: OpenTIL skill flagged as suspicious (clawhub.ai/biao29/til)
- #320 False Flag on xint (X Intelligence CLI)
- #331 False positive: 4 skills by @alirezarezvani incorrectly flagged as suspicious
- #379 VirusTotal badge shows 'Suspicious' despite 0/54 clean scan
- #408 [Appeal] False Positive Flag for Skill: LINE Chat for Official Account (@PicSeeInc)
- #839 Our skill `persistent-agent-memory` (https://clawhub.ai/skills/persistent-agent-memory) is being flagged as suspicious. We would like to understand why and how to resolve it.
- #919 False positive: ros2-engineering-skills flagged as suspicious
- #1081 HostGuard flagged as Suspicious despite 0/64 VirusTotal detections
- #1102 china-summarizer flagged Suspicious — 0/66 VT detections, Code Insights SSRF/injection concern addressed
- #1165 Possible false positive: ytmusic-player skill flagged as suspicious despite CDP-only playback and no install script
- #1424 booking-manager skill incorrectly flagged as suspicious
- #1443 False positive: jobautopilot-search flagged as suspicious by VirusTotal Code Insight
- #1516 False positive: multi-engine-websearch flagged as suspicious
- #1572 False positive: @daririnch/dcl-policy-enforcer flagged as suspicious (MEDIUM) — transmits to author's own webhook
- #1576 False positive: DCL Sentinel Trace flagged as Suspicious — webhook is the product, not a risk
- #1610 wolverine-ai skill flagged as suspicious — requesting guidance
- #1612 Skill flagged as "Suspicious" despite VirusTotal 0/65 — possible VT status parsing issue
- #1645 my skill got flagged when its safe
- #1718 False positive: rocky-know-how skill flagged as suspicious — benign experience/knowledge management skill
- #1821 Scan flag review request — saschahu/fred-bot v0.2.0

Open candidates:

- #208 Security Scanner False Positive: xiao-fan-ka and half-full skills flagged as suspicious
- #321 submit-to-agentbeat: Skill incorrectly flagged — request scan breakdown
- #387 Skill flagged as suspicious despite clean VirusTotal scan (0/63)
- #469 False positive security flag on kiro-x-publisher skill
- #740 False Positive: My legitimate visual automation tool was flagged as suspicious
- #747 Supplementary Info - Legitimate Original Tool
- #834 False positive: social-metrics skill flagged as suspicious
- #967 dianping-search flagged as suspicious - request manual review
- #1010 False positive: NoPUA flagged as suspicious
- #1024 Security scan guidance request: suspicious flag on microsoft-365-graph-openclaw
- #1030 Request manual review: mofang-records flagged as "suspicious", not indexed for search
- #1085 PII-Redactor skill flagged as suspicious despite 0/66 VirusTotal Score
- #1090 Appeal: yinxiang-notes skill incorrectly flagged as suspicious
- #1091 False positive: greydanus/tidepool flagged as suspicious
- #1266 VirusTotal integration shows "Suspicious" despite 0/63 detections
- #1354 False Positive: r-stats skill flagged as suspicious — legitimate Rscript execution for statistical analysis
- #1378 False positive: ofek-galim / webtop-galim flagged as suspicious
- #1387 codebase-search skill flagged as suspicious — false positive on legitimate file system operations
- #1442 False positive: jobautopilot-bundle flagged as suspicious by VirusTotal Code Insight
- #1444 False positive: jobautopilot-submitter flagged as suspicious by VirusTotal Code Insight
