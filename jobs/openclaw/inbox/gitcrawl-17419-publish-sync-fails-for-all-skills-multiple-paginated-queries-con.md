---
repo: openclaw/openclaw
cluster_id: gitcrawl-17419-publish-sync-fails-for-all-skills-multiple-paginated-queries-con
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
  - "#1176"
candidates:
  - "#614"
  - "#1170"
  - "#1171"
  - "#1173"
  - "#1175"
  - "#1176"
  - "#1179"
  - "#1182"
  - "#1184"
  - "#1188"
  - "#1195"
  - "#1197"
  - "#1201"
  - "#1204"
  - "#1205"
cluster_refs:
  - "#477"
  - "#491"
  - "#512"
  - "#614"
  - "#1170"
  - "#1171"
  - "#1173"
  - "#1175"
  - "#1176"
  - "#1179"
  - "#1182"
  - "#1183"
  - "#1184"
  - "#1187"
  - "#1188"
  - "#1189"
  - "#1190"
  - "#1192"
  - "#1194"
  - "#1195"
  - "#1196"
  - "#1197"
  - "#1201"
  - "#1202"
  - "#1203"
  - "#1204"
  - "#1205"
security_policy: central_security_only
security_sensitive: false
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_post_merge_close: true
require_fix_before_close: true
canonical_hint: "gitcrawl representative #1176 is open; worker must verify it is still the best live canonical."
notes: "Generated from gitcrawl run cluster 17419 on 2026-05-26."
---

# Gitcrawl Cluster 17419

Generated from local gitcrawl run cluster 17419 for `openclaw/openclaw`.

Display title:

> publish/sync fails for all skills: "multiple paginated queries" Convex error

Cluster shape from gitcrawl:

- total members: 27
- issues: 17
- pull requests: 10
- open candidates in local store: 15
- representative: #1176, currently open in local store
- latest member update: 2026-04-30T10:08:30.302102731Z

## Goal

Run one live autonomous classification pass. Classify open candidates only, verify live GitHub state, choose the current canonical issue or PR if the representative is obsolete, and emit only high-confidence planned close/comment/label actions. Closed context refs are evidence only and must not receive close actions.

## Member Inventory

Closed context refs:

- #477 Server Error Called by client
- #491 importGitHubSkill throws generic "Server Error" on import
- #512 Improve error handling in GitHub import
- #1183 fix(convex): replace paginate with collect to fix multi-pagination error
- #1187 fix(convex): avoid multiple paginated queries in publisher digest sync
- #1189 fix: replace paginate with collect in publisher trigger sync functions
- #1190 fix(convex): avoid multiple paginated queries in publisher digest sync
- #1192 fix(convex): schedule skill digest pagination to avoid dual-paginate + TDZ
- #1194 fix(convex): schedule skill digest pagination to avoid dual-paginate + TDZ
- #1196 fix(convex): schedule package+skill digest workers to avoid dual paginate
- #1202 fix: replace .paginate() with .collect() in publisher trigger sync (#1201)
- #1203 fix: split publisher digest sync scheduling

Open candidates:

- #614 https://clawhub.ai/u/jisuapi went wrong
- #1170 [Bug] [Blocking] ClawHub Cli publish bug
- #1171 Import + publish fails with Convex paginated query error after successful GitHub detection
- #1173 Cannot publish: Personal publisher not found / pagination error
- #1175 Publish fails: Convex pagination error in ensurePersonalPublisherForUser
- #1176 publish/sync fails for all skills: "multiple paginated queries" Convex error
- #1179 clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher)
- #1182 Publish/Import fails: Convex pagination error in syncSkillSearchDigestsForOwnerPublisherId
- #1184 clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId
- #1188 Getting "Personal publisher not found" when trying publish a new version of the skill
- #1195 Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId
- #1197 publish fails: "multiple paginated queries" Convex error on first publish
- #1201 CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser
- #1204 Security flag on agent-security-harness is incorrect — metadata gaps addressed but can't publish fix (blocked by #1175)
- #1205 clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0)
