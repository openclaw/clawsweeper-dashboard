---
sha: 4856cbb017dac9cea4eac6f8f2eb87fd8e09fb28
parent: ecab09870a3b31ecb528718bb5d20562fa94d0c5
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-04T01:48:11+01:00"
commit_committed_at: "2026-05-04T01:52:14+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-04T00:58:09Z
---

# Commit 4856cbb

## Summary

Found one actionable supply-chain regression in the new workflow path. The TypeScript CLI/runtime changes otherwise held up under focused tests.

## Findings

### Medium: Secret-bearing workflow executes a floating Crabbox release asset

- Kind: supply_chain
- File: `.github/workflows/mantis-discord-status-reactions.yml`
- Line: 266
- Evidence: the new `Install Crabbox CLI` step runs `gh release download --repo openclaw/crabbox --pattern 'crabbox_*_linux_amd64.tar.gz'` without a tag, pinned version, or checksum verification, then immediately extracts and executes the downloaded `crabbox` binary. The same workflow later runs with live QA secrets and publish credentials: `OPENAI_API_KEY`, Convex QA secrets, Crabbox access secrets, and a Mantis GitHub App token with contents/issues/PR write permissions.
- Impact: a changed, replaced, or compromised latest `openclaw/crabbox` release asset can execute arbitrary code inside this privileged QA workflow. The current latest release metadata from `gh release view --repo openclaw/crabbox` shows `v0.4.0`, a linux amd64 asset digest, and `isImmutable: false`, so the workflow is not tied to immutable reviewed bytes.
- Suggested fix: pin the expected Crabbox release tag and verify `checksums.txt` or the GitHub asset digest before installing. Prefer the existing `pnpm crabbox:*` wrapper if CI can provision a known Crabbox binary, or add an explicit `CRABBOX_VERSION` plus checksum gate in the workflow.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes for the unsafe behavior: inspect or run the workflow step and observe that `gh release download` selects the latest matching release asset, with no tag or checksum verification before execution. I did not attempt a live compromise or asset replacement.
- Is this the best way to solve the issue? Yes: pinning and verifying the artifact keeps the new desktop screenshot feature while closing the new floating-binary execution path.

## Reviewed

- Diff: `ecab09870a3b31ecb528718bb5d20562fa94d0c5..4856cbb017dac9cea4eac6f8f2eb87fd8e09fb28`
- Changed files: `.github/workflows/mantis-discord-status-reactions.yml`, `docs/concepts/mantis.md`, `extensions/qa-lab/src/cli.test.ts`, `extensions/qa-lab/src/mantis/cli.ts`, `extensions/qa-lab/src/mantis/desktop-browser-smoke.runtime.test.ts`, `extensions/qa-lab/src/mantis/desktop-browser-smoke.runtime.ts`
- Code read: full changed Mantis desktop runtime, CLI registration, runtime command wrapper, targeted tests, Discord live evidence writer, CLI path helpers, workflow job body, and relevant Mantis docs.
- Dependencies/web: checked `openclaw/crabbox` release metadata with `gh release view`; latest was `v0.4.0`, linux amd64 asset digest present, release immutable flag false.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` after the first test run failed because `node_modules` was missing
- `pnpm test extensions/qa-lab/src/mantis/desktop-browser-smoke.runtime.test.ts extensions/qa-lab/src/cli.test.ts` passed: 2 files, 20 tests
- YAML parse smoke for `.github/workflows/mantis-discord-status-reactions.yml` passed
- `git diff --check ecab09870a3b31ecb528718bb5d20562fa94d0c5..4856cbb017dac9cea4eac6f8f2eb87fd8e09fb28` passed

## Limitations

- Did not run the live Mantis/Crabbox desktop workflow, because that would allocate remote infrastructure and use live QA credentials.
- No repository mutations were made; dependency install only populated ignored `node_modules`.
