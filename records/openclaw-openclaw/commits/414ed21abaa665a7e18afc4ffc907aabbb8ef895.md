---
sha: 414ed21abaa665a7e18afc4ffc907aabbb8ef895
parent: 85c29d156276b461605098d72e059e92a3616dae
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-02T08:00:48+01:00"
commit_committed_at: "2026-05-02T08:04:15+01:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-02T07:23:59Z
---

# Commit 414ed21

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.

## Reviewed

- Diff: `85c29d156276b461605098d72e059e92a3616dae..414ed21abaa665a7e18afc4ffc907aabbb8ef895`
- Changed files: `scripts/e2e/config-reload-source-docker.sh`, `scripts/e2e/lib/gateway-network/client.mjs`, `scripts/e2e/lib/upgrade-survivor/probe-gateway.mjs`, `scripts/e2e/lib/upgrade-survivor/run.sh`, `scripts/e2e/upgrade-survivor-docker.sh`
- Code read: full changed files; readiness/probe paths in `src/gateway/server/readiness.ts`, `src/gateway/server-http.ts`, `src/gateway/server-http.probe.test.ts`; Docker call paths in `scripts/e2e/gateway-network-docker.sh`, `scripts/lib/openclaw-e2e-instance.sh`
- Docs read: `scripts/AGENTS.md`, `docs/ci.md`, relevant sections of `docs/cli/gateway.md` and `docs/help/testing.md`
- Dependencies/web: no external web lookup needed; no dependency files changed

## Commands

- `pnpm docs:list`
- `git show --no-renames --stat --format=fuller 414ed21abaa665a7e18afc4ffc907aabbb8ef895`
- `git diff --no-renames 85c29d156276b461605098d72e059e92a3616dae..414ed21abaa665a7e18afc4ffc907aabbb8ef895 -- ...`
- `bash -n scripts/e2e/config-reload-source-docker.sh scripts/e2e/lib/upgrade-survivor/run.sh scripts/e2e/upgrade-survivor-docker.sh`
- `node --check scripts/e2e/lib/gateway-network/client.mjs && node --check scripts/e2e/lib/upgrade-survivor/probe-gateway.mjs`
- Focused local probe check for `/readyz` allowlisted 503, partial-allowlist rejection, and `/healthz` live success
- `pnpm install` after targeted test initially failed due missing `node_modules`
- `pnpm test src/gateway/server-http.probe.test.ts` passed: 11 tests
- `git diff --check 85c29d156276b461605098d72e059e92a3616dae..414ed21abaa665a7e18afc4ffc907aabbb8ef895`

## Limitations

- Full Docker smoke lanes were not run locally; the reviewed change is script/helper hardening, and focused syntax, probe-behavior, and gateway probe contract checks covered the changed behavior.
