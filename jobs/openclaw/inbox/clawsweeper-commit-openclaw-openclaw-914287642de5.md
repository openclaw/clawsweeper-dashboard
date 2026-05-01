---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-914287642de5
mode: autonomous
allowed_actions:
  - comment
  - label
  - fix
  - raise_pr
blocked_actions:
  - close
  - merge
require_human_for:
  - close
  - merge
canonical: []
candidates: []
cluster_refs: []
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: false
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-914287642de5
source: clawsweeper_commit
commit_sha: 914287642de51e700d157f9a4b592a7e6df36a9b
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/914287642de51e700d157f9a4b592a7e6df36a9b.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-914287642de5`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/914287642de51e700d157f9a4b592a7e6df36a9b
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/914287642de51e700d157f9a4b592a7e6df36a9b.md
- Latest main at intake: 62fb87641eca39821e54ae560e7e90b1684903a3

## ClawSweeper Report

```md
---
sha: 914287642de51e700d157f9a4b592a7e6df36a9b
parent: 1e20babcf7eb8c8d7db9814f0c7996434568a0c8
repository: openclaw/openclaw
author: "loongfay"
committer: "GitHub"
github_author: loongfay
github_committer: web-flow
co_authors: ["loongzhao", "sliverp"]
commit_authored_at: "2026-04-30T16:02:40+08:00"
commit_committed_at: "2026-04-30T16:02:40+08:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T08:21:26Z
---

# Commit 9142876

## Summary

Found one actionable catalog regression: the new `yuanbao` alias resolves to a catalog id that does not match the pinned npm package’s actual runtime channel id, so setup can install the package and then fail to load/apply the channel.

## Findings

### Medium: `yuanbao` alias points at the wrong runtime channel id for the pinned package

- Kind: regression
- File: `scripts/lib/official-external-channel-catalog.json`
- Line: 41
- Evidence: The shipped catalog maps alias `yuanbao` to entry id `openclaw-plugin-yuanbao` at `scripts/lib/official-external-channel-catalog.json:34` and `scripts/lib/official-external-channel-catalog.json:41`. `resolveCatalogChannelEntry("yuanbao", null)` returns `{ id: "openclaw-plugin-yuanbao", npmSpec: "openclaw-plugin-yuanbao@2.11.0" }`. But `pnpm view openclaw-plugin-yuanbao@2.11.0 openclaw --json` and `npm pack openclaw-plugin-yuanbao@2.11.0` show the pinned package declares `openclaw.channel.id: "yuanbao"` and its packed `dist/src/channel.js` exports `yuanbaoPlugin.id = "yuanbao"`.
- Impact: `openclaw channels add --channel yuanbao ...` now resolves through the official catalog, installs `openclaw-plugin-yuanbao@2.11.0`, then `src/commands/channels/add.ts:331` sets `channel` from `catalogEntry.id` (`openclaw-plugin-yuanbao`). The subsequent scoped lookup only accepts a plugin whose `plugin.id` equals that channel id, so the installed package’s `yuanbao` plugin is not found and setup fails instead of configuring the documented `channels.yuanbao` channel.
- Suggested fix: Align the official catalog with the pinned npm artifact. Either set the catalog channel id back to `yuanbao` for `openclaw-plugin-yuanbao@2.11.0`, or publish/pin a package version whose package manifest and runtime plugin id are `openclaw-plugin-yuanbao` and update integrity/docs accordingly.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: in a clean setup path, `openclaw channels add --channel yuanbao --token appKey:appSecret` follows `resolveCatalogChannelEntry` to `openclaw-plugin-yuanbao`, installs the pinned npm package, then looks for a loaded channel plugin with id `openclaw-plugin-yuanbao`; the pinned package exports `yuanbao`.
- Is this the best way to solve the issue? yes: the catalog id must match the installable artifact’s channel id unless the setup/load path is changed to carry both catalog id and runtime channel id separately.

## Reviewed

- Diff: `1e20babcf7eb8c8d7db9814f0c7996434568a0c8..914287642de51e700d157f9a4b592a7e6df36a9b`
- Changed files: `CHANGELOG.md`, `docs/plugins/community.md`, `scripts/lib/official-external-channel-catalog.json`
- Code read: catalog loader/resolver, channel add/login resolution, setup plugin install/load path, official catalog tests, Yuanbao docs
- Dependencies/web: verified `YuanbaoTeam/yuanbao-openclaw-plugin` exists and is public; verified npm package `openclaw-plugin-yuanbao@2.11.0` metadata and packed files locally.

## Tests / Live Checks

- `pnpm install`: success
- `pnpm test src/channels/plugins/contracts/channel-catalog.contract.test.ts test/official-channel-catalog.test.ts`: passed, 2 shards, 13 tests
- `git diff --check 1e20babcf7eb8c8d7db9814f0c7996434568a0c8..914287642de51e700d157f9a4b592a7e6df36a9b`: passed
- `pnpm exec tsx -e ...resolveCatalogChannelEntry('yuanbao', null)...`: returned `id: "openclaw-plugin-yuanbao"`

## Dependency / Web Checks

- `gh pr view 74253 --repo openclaw/openclaw ...`
- `gh repo view YuanbaoTeam/yuanbao-openclaw-plugin ...`
- `pnpm view openclaw-plugin-yuanbao@2.11.0 openclaw name version peerDependencies --json`
- `npm pack openclaw-plugin-yuanbao@2.11.0 --pack-destination /tmp/...`

## Limitations

- I did not run a full live `openclaw channels add` because it would install plugin state/config; the failure path is traced from current source plus the packed npm artifact.
```
