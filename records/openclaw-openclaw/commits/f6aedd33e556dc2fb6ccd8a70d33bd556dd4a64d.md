---
sha: f6aedd33e556dc2fb6ccd8a70d33bd556dd4a64d
parent: 43aaeeee15e3e7ccaa70e452b7e0aabeaff93b7a
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-05-02T11:16:08-07:00"
commit_committed_at: "2026-05-02T11:16:08-07:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-02T18:35:23Z
---

# Commit f6aedd33e5

## Summary

Found one low-severity reliability issue in the new live ClawHub npm registry override.

## Findings

### Low: Live npm registry override is not passed into the Docker E2E container

- Kind: reliability
- File: `scripts/e2e/plugins-docker.sh`
- Line: 15
- Evidence: `scripts/e2e/lib/plugins/clawhub.sh:40` now reads `OPENCLAW_PLUGINS_E2E_LIVE_NPM_REGISTRY` to set `NPM_CONFIG_REGISTRY`, but the Docker wrapper only forwards the explicit allowlist in `scripts/e2e/plugins-docker.sh:15` through `scripts/e2e/plugins-docker.sh:24`. That list includes the live ClawHub flag and ClawHub auth/url variables, but not the new npm registry variable. `rg` finds the new name only in the inner script and the string-presence test.
- Impact: running the main Docker smoke entrypoint with `OPENCLAW_PLUGINS_E2E_LIVE_NPM_REGISTRY=https://mirror.example/ pnpm test:docker:plugins` will silently drop the override before the container starts. Environments that need a mirror or controlled registry still use `https://registry.npmjs.org/`, which can fail or unexpectedly reach public npm.
- Suggested fix: add `OPENCLAW_PLUGINS_E2E_LIVE_NPM_REGISTRY` to the env allowlist in `scripts/e2e/plugins-docker.sh`, and extend `test/scripts/docker-build-helper.test.ts` to assert the wrapper forwards it.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes. The wrapper constructs Docker `-e` flags only from its static allowlist; the new variable is absent, so it cannot cross the host-to-container boundary through the documented Docker runner.
- Is this the best way to solve the issue? Yes. Forwarding the variable at the Docker wrapper boundary preserves the commit’s intended default while making the new override usable in the path it is meant to support.

## Reviewed

- Diff: `43aaeeee15e3e7ccaa70e452b7e0aabeaff93b7a..f6aedd33e556dc2fb6ccd8a70d33bd556dd4a64d`
- Changed files: `scripts/e2e/lib/plugins/clawhub.sh`, `test/scripts/docker-build-helper.test.ts`
- Code read: full changed files, `scripts/e2e/plugins-docker.sh`, `scripts/e2e/lib/plugins/sweep.sh`, `scripts/e2e/lib/plugins/fixtures.sh`, ClawHub install/update/archive paths, npm install env helpers
- Docs read: `docs/tools/clawhub.md`
- Dependencies/web: verified locally that `NPM_CONFIG_REGISTRY` controls npm’s registry setting; no external web lookup was needed

## Tests / Live Checks

- `pnpm docs:list`
- `git diff --check 43aaeeee15e3e7ccaa70e452b7e0aabeaff93b7a..f6aedd33e556dc2fb6ccd8a70d33bd556dd4a64d`
- `pnpm test test/scripts/docker-build-helper.test.ts` initially failed because `vitest` was missing from `node_modules`
- `pnpm install`
- `pnpm test test/scripts/docker-build-helper.test.ts` passed: 1 file, 17 tests
- `bash -n scripts/e2e/lib/plugins/clawhub.sh scripts/e2e/plugins-docker.sh scripts/e2e/lib/plugins/sweep.sh scripts/e2e/lib/plugins/fixtures.sh`

## Limitations

- I did not run the full Docker live ClawHub E2E because that is a broad/heavy path. The finding is based on the deterministic wrapper allowlist and does not require a live registry to confirm.
