---
sha: c7bbb3f9af360ec3c4b07f305c5a972fb1dc9ecb
parent: 188c3b74badc593c7a3b8152ee02c23f44a16294
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-05-02T23:29:22-07:00"
commit_committed_at: "2026-05-02T23:47:25-07:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-03T06:53:19+00:00
---

# Commit c7bbb3f

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.

## Reviewed

- Diff: `188c3b74badc593c7a3b8152ee02c23f44a16294..c7bbb3f9af360ec3c4b07f305c5a972fb1dc9ecb`
- Changed files: `extensions/acpx/package.json`, `extensions/diffs/package.json`, `scripts/lib/static-extension-assets.mjs`, `scripts/run-node.mjs`, `src/plugins/runtime-sidecar-paths-baseline.ts`, `src/plugins/runtime-sidecar-paths.ts`, `test/scripts/runtime-postbuild.test.ts`
- Code read: static asset discovery/copying, runtime postbuild, run-node dirty/rebuild checks, plugin npm runtime build planning, bundled plugin metadata/runtime sidecar baseline, release package required-path checks, ACPX and diffs asset consumers.
- Current main: touched files are unchanged since the reviewed commit.
- Dependencies/web: no dependency version or lockfile changes; no web lookup needed.

## Tests / Live Checks

- `git diff --check 188c3b74badc593c7a3b8152ee02c23f44a16294..c7bbb3f9af360ec3c4b07f305c5a972fb1dc9ecb`
- `pnpm install` to restore missing dependencies; `git status` remained clean.
- Static asset discovery probe: all declared assets exist, no duplicate destinations.
- Package/release metadata probes for root-package excluded plugins and `acpx`/`diffs` runtime plans.
- `pnpm test test/scripts/runtime-postbuild.test.ts test/plugin-npm-runtime-build.test.ts src/plugins/bundled-plugin-metadata.test.ts`
- `pnpm test test/release-check.test.ts`

## Limitations

- Full `pnpm build` and package-local runtime build commands were not run because this was a report-only review and those commands write generated `dist` outputs. Focused tests and read-only probes covered the changed behavior.
