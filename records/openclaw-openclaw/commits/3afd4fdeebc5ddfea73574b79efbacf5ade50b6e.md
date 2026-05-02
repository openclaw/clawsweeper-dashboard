---
sha: 3afd4fdeebc5ddfea73574b79efbacf5ade50b6e
parent: 282051a14fa5a49031c7d801db5f0e1293d1122c
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-02T22:19:28+01:00"
commit_committed_at: "2026-05-02T22:19:28+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-02T21:38:42Z
---

# Commit 3afd4fde

## Summary

Found one release-gate regression: the commit excludes ACPX, Google Chat, and LINE from the npm tarball, but the release checker still requires those same dist artifacts.

## Findings

### Medium: `release:check` still requires the newly excluded plugin dist files

- Kind: regression
- File: `package.json`
- Line: 36
- Evidence: `package.json` now excludes `dist/extensions/acpx/**`, `dist/extensions/googlechat/**`, and `dist/extensions/line/**`, and a minimal `npm pack --dry-run --json --ignore-scripts` simulation confirmed those negated `files` entries remove matching files from the packed file list. Current `scripts/release-check.ts` still builds `requiredPathGroups` from `listBundledPluginPackArtifacts()` and `listStaticExtensionAssetOutputs()`, which still include 32 required paths under those excluded trees, including `dist/extensions/acpx/index.js`, `dist/extensions/acpx/mcp-proxy.mjs`, `dist/extensions/googlechat/index.js`, and `dist/extensions/line/index.js`.
- Impact: `pnpm release:check` will fail on a prepared build because `npm pack --dry-run` cannot include files explicitly excluded by the root package manifest while `release-check` reports them as missing required pack files. That blocks release/package validation for this commit’s intended packaging change.
- Suggested fix: make the required pack artifact list use the same externalized-extension exclusion source as `package.json` or `collectPackageDistInventory`, and add a focused test that `collectMissingPackPaths` accepts a packed file list with ACPX/Google Chat/LINE omitted.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Run `pnpm build && pnpm ui:build && pnpm release:check` on this tree; the focused helper probe already showed `collectMissingPackPaths` reports 32 missing ACPX/Google Chat/LINE paths when those package-file exclusions are applied.
- Is this the best way to solve the issue? yes. The package exclusion and release-check required artifact policy need one shared source of truth; otherwise future externalized plugins can reintroduce the same release-gate break.

## Reviewed

- Diff: `282051a14fa5a49031c7d801db5f0e1293d1122c..3afd4fdeebc5ddfea73574b79efbacf5ade50b6e`
- Changed files: `CHANGELOG.md`, `package.json`
- Code read: root package `files` list, changelog entry, `scripts/release-check.ts`, `scripts/lib/bundled-plugin-build-entries.mjs`, `scripts/runtime-postbuild.mjs`, `src/infra/package-dist-inventory.ts`, related package/release tests, official external plugin/channel catalogs, ACPX/Google Chat/LINE manifests.
- GitHub: no PR found by commit SHA.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` because `node_modules` was missing.
- `pnpm test test/scripts/bundled-plugin-build-entries.test.ts test/release-check.test.ts src/infra/package-dist-inventory.test.ts` passed.
- Minimal `npm pack --dry-run --json --ignore-scripts` simulation confirmed negated `files` entries exclude matching `dist/extensions/*` files.
- Focused `pnpm exec tsx` probe confirmed current release-check helpers still require 32 ACPX/Google Chat/LINE paths that the package manifest excludes.

## Dependency / Web Checks

- No web lookup needed; npm pack behavior was checked directly with the installed npm CLI.

## Limitations

- Did not run full `pnpm release:check` because the checkout had no built `dist/` tree; the focused reproduction used the same release-check helper code and npm pack include/exclude behavior.

https://github.com/openclaw/openclaw/commit/3afd4fdeebc5ddfea73574b79efbacf5ade50b6e
