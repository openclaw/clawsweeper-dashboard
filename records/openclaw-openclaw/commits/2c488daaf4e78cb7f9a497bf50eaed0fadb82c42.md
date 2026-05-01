---
sha: 2c488daaf4e78cb7f9a497bf50eaed0fadb82c42
parent: b547286937cda3a182ee1205694daa06bffa70dd
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-01T11:48:39+01:00"
commit_committed_at: "2026-05-01T11:49:05+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T11:08:46+00:00
---

# Commit 2c488daa

## Summary

Found one CI-contract regression. The runtime fix direction appears sound, and QR rendering itself passes focused checks, but the commit leaves an existing extension dependency contract failing because `qrcode` is now declared by WhatsApp without being recognized as an intentional indirect SDK-mediated runtime dependency.

## Findings

### Medium: WhatsApp `qrcode` dependency fails the extension runtime dependency contract

- Kind: regression
- File: `extensions/whatsapp/package.json`
- Line: 10
- Evidence: The commit adds `qrcode` as a direct WhatsApp runtime dependency, but `src/plugins/contracts/extension-runtime-dependencies.contract.test.ts` only allows `jimp` as an indirect WhatsApp dependency. The contract scans WhatsApp runtime source text and reports declared deps that are not directly referenced; WhatsApp only re-exports QR helpers from `openclaw/plugin-sdk/media-runtime`, while the actual value import is in `src/media/qr-runtime.ts`. Running the focused check fails with `expected [ 'qrcode' ] to deeply equal []` at `src/plugins/contracts/extension-runtime-dependencies.contract.test.ts:249`.
- Impact: The plugin dependency contract lane is red on current `main` for this commit, so the change is not CI-clean even though it fixes the packaged runtime dependency.
- Suggested fix: Add `qrcode` to the WhatsApp `INDIRECT_RUNTIME_DEPENDENCIES` allowlist with a comment explaining that WhatsApp stages it for the SDK QR helper, or teach the contract to follow SDK-mediated runtime dependencies.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: after installing dependencies, run `pnpm test src/plugins/contracts/extension-runtime-dependencies.contract.test.ts`; the WhatsApp unused-direct-dependency case fails on `qrcode`.
- Is this the best way to solve the issue? yes: the dependency is intentionally indirect through the shared media SDK QR helper, so the contract metadata should be updated rather than removing `qrcode` from the plugin manifest.

## Reviewed

- Diff: `b547286937cda3a182ee1205694daa06bffa70dd..2c488daaf4e78cb7f9a497bf50eaed0fadb82c42`
- Changed files: `CHANGELOG.md`, `extensions/whatsapp/package.json`, `pnpm-lock.yaml`, `src/plugins/bundled-runtime-deps-drift.test.ts`
- Code read: WhatsApp manifest and QR wrappers, shared QR runtime/media SDK exports, bundled runtime dependency planning/staging, root mirror guards, release/postpublish tests, extension dependency contract.
- Dependencies/web: inspected GitHub issue `#75394`; checked `qrcode@1.5.4` package metadata/source and `pnpm audit --prod`.

## Tests / Live Checks

- Failed: `pnpm test src/plugins/bundled-runtime-deps-drift.test.ts test/scripts/bundled-plugin-staged-runtime-deps.test.ts src/plugins/bundled-runtime-deps.test.ts src/plugins/contracts/extension-runtime-dependencies.contract.test.ts test/release-check.test.ts test/openclaw-npm-postpublish-verify.test.ts`
- Passed after excluding the known failing contract file: `pnpm test src/plugins/bundled-runtime-deps-drift.test.ts test/scripts/bundled-plugin-staged-runtime-deps.test.ts src/plugins/bundled-runtime-deps.test.ts test/release-check.test.ts test/openclaw-npm-postpublish-verify.test.ts`
- Passed: `pnpm test src/media/qr-image.test.ts src/media/qr-terminal.test.ts extensions/whatsapp/src/login.test.ts extensions/whatsapp/src/login-qr.test.ts`
- Passed: direct Node smoke for `qrcode` `toString(..., { type: "terminal" })` and `toDataURL(..., { type: "image/png" })`
- Note: initial test attempt failed because `node_modules` was missing; ran `pnpm install` once per repo instructions. No tracked files changed.

## Dependency / Web Checks

- `npm view qrcode@1.5.4`: MIT, Node `>=10.13.0`, dependencies `dijkstrajs`, `pngjs`, `yargs`, integrity matches lockfile, no deprecation marker.
- `pnpm audit --prod --json`: 0 production vulnerabilities.
- Issue reference: https://github.com/openclaw/openclaw/issues/75394

## Limitations

- Did not run full `pnpm check:changed`, build, Docker/package acceptance, or live WhatsApp login. The focused contract failure is already actionable, and QR rendering was covered by unit/smoke checks.
