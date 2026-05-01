---
sha: 01c384cbf92d0dbfaaa0ebc514736ee686dfa0dc
parent: 4def4073d48103294f3e9b40f226abad4be1e0e3
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-01T22:08:24+01:00"
commit_committed_at: "2026-05-01T22:08:28+01:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-01T21:27:57Z
---

# Commit 01c384cbf9

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.

## Reviewed

- Diff: `4def4073d48103294f3e9b40f226abad4be1e0e3..01c384cbf92d0dbfaaa0ebc514736ee686dfa0dc`
- Changed files: `scripts/postinstall-bundled-plugins.mjs`, `src/channels/plugins/bundled.shape-guard.test.ts`, `test/scripts/postinstall-bundled-plugins.test.ts`
- Code read: full changed files plus `src/infra/package-dist-inventory.ts`, `src/infra/install-package-dir.ts`, `src/plugins/install.ts`, `src/hooks/install.ts`, `src/infra/update-global.ts`, `scripts/stage-bundled-plugin-runtime.mjs`, and relevant `package.json` package-file exclusions.
- Dependencies/web: no external web lookup needed; inspected GitHub issue `openclaw/openclaw#71752` for legacy staging-debris context.
- Commands: `pnpm docs:list`; initial `pnpm test ...` failed because `node_modules` was missing; `pnpm install`; `pnpm test test/scripts/postinstall-bundled-plugins.test.ts src/infra/package-dist-inventory.test.ts src/channels/plugins/bundled.shape-guard.test.ts`; `pnpm exec oxfmt --check --threads=1 scripts/postinstall-bundled-plugins.mjs test/scripts/postinstall-bundled-plugins.test.ts src/channels/plugins/bundled.shape-guard.test.ts`; `git diff --check 4def4073d48103294f3e9b40f226abad4be1e0e3..01c384cbf92d0dbfaaa0ebc514736ee686dfa0dc`.

## Limitations

- none
