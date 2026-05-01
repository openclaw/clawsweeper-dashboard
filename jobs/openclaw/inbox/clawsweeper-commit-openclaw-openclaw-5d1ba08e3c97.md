---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-5d1ba08e3c97
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-5d1ba08e3c97
source: clawsweeper_commit
commit_sha: 5d1ba08e3c97afa3f90b065d293ceff2bfa9b767
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/5d1ba08e3c97afa3f90b065d293ceff2bfa9b767.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-5d1ba08e3c97`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/5d1ba08e3c97afa3f90b065d293ceff2bfa9b767
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/5d1ba08e3c97afa3f90b065d293ceff2bfa9b767.md
- Latest main at intake: eabab1f64f9e06642014eb93b1e82c7acdfc95af

## ClawSweeper Report

```md
---
sha: 5d1ba08e3c97afa3f90b065d293ceff2bfa9b767
parent: 07bc320a8ae791567a1832ced653e363283f9502
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-01T05:32:40+01:00"
commit_committed_at: "2026-05-01T05:33:03+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-01T04:54:31Z
---

# Commit 5d1ba08

## Summary

Found one actionable diagnostic gap in the new doctor warning: `group:plugins` is a supported plugin-tool allowlist shape, but this collector ignores it, so the warning can still miss a restrictive `plugins.allow` mismatch.

## Findings

### Low: `group:plugins` tool allowlists bypass the new mismatch warning

- Kind: bug
- File: `src/commands/doctor/shared/plugin-tool-allowlist-warnings.ts`
- Line: 142
- Evidence: The collector only treats `"*"` as the wildcard case, then filters `entry !== "group:plugins"` out of exact ownership checks. Runtime policy treats `group:plugins` as a plugin-tool group in `src/agents/tool-policy.ts:149`, and existing coverage preserves that as a plugin-only allowlist in `src/agents/tool-policy.plugin-only-allowlist.test.ts:22`. A focused probe with `plugins.allow: ["telegram"]`, `tools.allow: ["group:plugins"]`, and a registry containing a `firecrawl` plugin tool returned `[]` warnings.
- Impact: Users can still configure an explicit plugin-tool allowlist that resolves only against loaded plugins, while `plugins.allow` excludes the desired plugin, and `openclaw doctor` stays quiet. That leaves the same class of confusing no-callable-plugin-tool behavior this commit is meant to surface.
- Suggested fix: Treat `group:plugins` like the `"*"` plugin-tool wildcard under restrictive `plugins.allow`, with a warning that it only expands over loaded plugins and does not bypass the plugin allowlist.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: a read-only `pnpm exec tsx -e` probe calling `collectPluginToolAllowlistWarnings` for `tools.allow: ["group:plugins"]` returned an empty warning list.
- Is this the best way to solve the issue? yes: warning on `group:plugins` keeps behavior unchanged while making the supported plugin-tool group obey the same doctor guidance as `"*"` and plugin-owned tool names.

## Reviewed

- Diff: `07bc320a8ae791567a1832ced653e363283f9502..5d1ba08e3c97afa3f90b065d293ceff2bfa9b767`
- Changed files: `CHANGELOG.md`, `docs/gateway/doctor.md`, `docs/tools/plugin.md`, `src/commands/doctor-config-flow.ts`, `src/commands/doctor/shared/plugin-tool-allowlist-warnings.ts`, `src/commands/doctor/shared/plugin-tool-allowlist-warnings.test.ts`
- Code read: doctor config flow, warning collector/test, tool policy matching/group expansion, plugin tool loading, manifest registry loading, config tool policy types/schema, channel group policy surfaces.
- Dependencies/web: no dependency files changed; inspected GitHub issues #58009 and #64982 with `gh`.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because `node_modules` was missing.
- `pnpm test src/commands/doctor/shared/plugin-tool-allowlist-warnings.test.ts -- --reporter=verbose` passed.
- `git diff --check 07bc320a8ae791567a1832ced653e363283f9502..5d1ba08e3c97afa3f90b065d293ceff2bfa9b767` passed.

## Limitations

- I did not run broad changed gates; the focused collector test covered the touched implementation.
```
