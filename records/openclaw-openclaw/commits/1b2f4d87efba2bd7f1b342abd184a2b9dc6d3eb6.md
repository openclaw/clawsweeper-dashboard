---
sha: 1b2f4d87efba2bd7f1b342abd184a2b9dc6d3eb6
parent: 4a81aaa0c59aea27173aac75be90fa759efdd450
repository: openclaw/openclaw
author: "Ayaan Zaidi"
committer: "Ayaan Zaidi"
github_author: obviyus
github_committer: obviyus
co_authors: []
commit_authored_at: "2026-05-10T14:29:45+05:30"
commit_committed_at: "2026-05-10T15:10:39+05:30"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-10T09:48:24Z
---

# Commit 1b2f4d87

## Summary

Found one concrete limit bug in the new chunked credential storage path: payloads are chunked only after they have already crossed the Convex function argument and transaction boundary.

## Findings

### Medium: Large Telegram user credentials still cannot be added through the broker

- Kind: bug
- File: `qa/convex-credential-broker/convex/http.ts`
- Line: 405
- Evidence: `POST /qa-credentials/v1/admin/add` still passes the complete `payload` object into one `ctx.runMutation(internal.credentials.addCredentialSet, ...)` call at `qa/convex-credential-broker/convex/http.ts:405`. The mutation then serializes and splits the payload at `qa/convex-credential-broker/convex/credentials.ts:589`, but that happens after Convex has accepted the function argument, and the same mutation inserts every chunk in one transaction at `qa/convex-credential-broker/convex/credentials.ts:600`. Convex documents a 16 MiB function argument size limit and a 16 MiB transaction data-written limit, while the new `telegram-user` payload is explicitly made of two base64 archives (`tdlibArchiveBase64` and `desktopTdataArchiveBase64`). citeturn4fetch0
- Impact: a real Telegram user credential whose serialized JSON/base64 archives exceed 16 MiB will fail on `qa credentials add --kind telegram-user` before the new chunking can help. That leaves the new lease/restore workflow unable to seed larger Desktop or TDLib profiles, which is exactly the case chunked payload storage appears intended to support.
- Suggested fix: split before `runMutation`. For example, have the HTTP action validate/serialize the payload, store chunks via multiple bounded internal mutations, and finalize the credential row with a marker only after all chunks are written; alternatively use Convex file storage/blob storage for the archives and keep only references in the credential row.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? yes: create a `telegram-user` payload where `JSON.stringify(payload)` is over 16 MiB, then call `POST /qa-credentials/v1/admin/add` or `pnpm openclaw qa credentials add --kind telegram-user --payload-file <file>`. I did not run this against a live Convex deployment because no broker deployment/secret was available in the review environment.
- Is this the best way to solve the issue? yes: chunking must happen before crossing Convex function argument and mutation write limits. Lowering `PAYLOAD_CHUNK_SIZE` alone would not fix the complete-payload argument or single-transaction write.

## Reviewed

- Diff: `4a81aaa0c59aea27173aac75be90fa759efdd450..1b2f4d87efba2bd7f1b342abd184a2b9dc6d3eb6`
- Changed files: `extensions/qa-lab/src/live-transports/shared/credential-lease.runtime.ts`, `extensions/qa-lab/src/live-transports/telegram/telegram-user-credential.runtime.ts`, broker `credentials.ts`/`http.ts`/`payload-validation.ts`/`schema.ts`, README, and related tests.
- Code read: full touched runtime/broker files, QA credential admin client, Telegram user credential helper script, docs sections for the new `telegram-user` payload, and current `main` around the touched paths.
- Dependencies/web: Convex production limits docs; npm metadata/source tarball for `convex@1.35.1`.

## Tests / Live Checks

- `pnpm install`
- `pnpm test extensions/qa-lab/src/live-transports/shared/credential-lease.runtime.test.ts extensions/qa-lab/src/live-transports/telegram/telegram-user-credential.runtime.test.ts test/qa-convex-credential-payload-validation.test.ts -- --reporter=verbose` passed.

## Dependency / Web Checks

- Convex limits checked for function argument, transaction write, document size, and HTTP response limits. citeturn4fetch0
- `npm view convex@1.35.1 version dist.integrity dist.tarball --json`
- `npm pack convex@1.35.1` and inspected value serialization/source paths.

## Limitations

- No live Convex deployment credentials were available, so the >16 MiB add path was not executed end to end.
