---
sha: caf8fa2ebf39f7117aef6f3de278f5adda96fc98
parent: 58083866d0d76d6a780682f50e2b4d54b57cb676
repository: openclaw/openclaw
author: "Gio Della-Libera"
committer: "GitHub"
github_author: giodl73-repo
github_committer: web-flow
co_authors: ["Gio Della-Libera", "Copilot"]
commit_authored_at: "2026-05-16T07:07:39-07:00"
commit_committed_at: "2026-05-16T07:07:39-07:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-16T14:17:11Z
---

# Commit caf8fa2

## Summary

The revert removes the only `dist-runtime/extensions` fallback and boundary-root handling for bundled channel setup entries. Current `main` still has the same path shape described in the linked user report, so packaged doctor/setup flows can again reject bundled channel setup modules with `plugin module path escapes plugin root or fails alias checks`.

## Findings

### Medium: `dist-runtime` bundled setup entries can be checked against the wrong plugin root

- Kind: regression
- File: `src/channels/plugins/bundled.ts`
- Line: 173
- Evidence: `resolveBundledChannelBoundaryRoot` now recognizes only an override root and `dist/extensions/<id>`, then falls back to source `extensions/<id>`. The reverted parent had an explicit `dist-runtime/extensions/<id>` branch. `loadGeneratedBundledChannelModule` passes this selected root into `loadChannelPluginModule`, whose failure message is the exact reported setup-entry error. The paired metadata fallback was also removed from `src/plugins/bundled-plugin-metadata.ts:231`, and a focused inline check of the actual resolver returned `extensions/plugin/index.ts` even when `dist-runtime/extensions/plugin/index.js` existed and `dist/` did not.
- Impact: Installed/package layouts that resolve bundled setup entries from `dist-runtime/extensions/<channel>/setup-entry.js` can fail doctor/setup channel loading for bundled channels such as Telegram, IRC, Signal, and iMessage. Issue #77805 contains Windows and Linux reports with this exact failure; PR #82472 fixed it, then this commit reverted that fix and closed the issue.
- Suggested fix: Restore `dist-runtime/extensions/<id>` in `resolveBundledChannelBoundaryRoot`, using `isPathInside` as before, and restore `dist-runtime` before source fallback in `listBundledPluginEntryBaseDirs`. Also restore the deleted regressions or equivalent packaged-root tests.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes for the resolver regression: the actual `resolveBundledPluginGeneratedPath` prefers source over `dist-runtime` after this commit. Full packaged `openclaw doctor` was not run locally, but the linked issue and reverted PR contain concrete before/after failure evidence for that flow.
- Is this the best way to solve the issue? yes. The narrow fix is to recognize the missing packaged runtime root while preserving the existing `openRootFileSync` containment gate, not to relax boundary checks.

## Reviewed

- Diff: `58083866d0d76d6a780682f50e2b4d54b57cb676..caf8fa2ebf39f7117aef6f3de278f5adda96fc98`
- Changed files: `src/channels/plugins/bundled.ts`, `src/plugins/bundled-plugin-metadata.ts`, related tests.
- Code read: `src/channels/plugins/bundled.ts`, `src/channels/plugins/module-loader.ts`, `src/plugins/bundled-plugin-metadata.ts`, `src/plugins/bundled-channel-runtime.ts`, `src/plugins/bundled-dir.ts`, `src/infra/state-migrations.ts`, bundled channel package manifests.
- GitHub: PR #82472, PR #82612, issue #77805.

## Tests / Live Checks

- `git diff --check 58083866d0d76d6a780682f50e2b4d54b57cb676..caf8fa2ebf39f7117aef6f3de278f5adda96fc98` passed.
- `pnpm install` completed because dependencies were missing.
- `CI=1 node scripts/run-vitest.mjs src/plugins/bundled-plugin-metadata.test.ts src/channels/plugins/bundled.shape-guard.test.ts -t "dist-runtime"` selected no tests because this revert deleted the relevant regressions.
- Inline resolver check output: `extensions/plugin/index.ts`, confirming the current resolver skips existing `dist-runtime` before source fallback.
- `gh pr checks 82612` showed CI passing, but not covering the removed regression tests.

## Limitations

- No packaged Windows or Linux `openclaw doctor` run was performed in this checkout.
