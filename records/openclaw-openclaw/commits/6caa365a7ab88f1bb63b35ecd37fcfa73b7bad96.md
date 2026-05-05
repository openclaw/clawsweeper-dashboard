---
sha: 6caa365a7ab88f1bb63b35ecd37fcfa73b7bad96
parent: 9fa685e3b3e48da193be74e13737b4eb746de887
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-05T10:07:30+01:00"
commit_committed_at: "2026-05-05T10:07:42+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-05T09:14:52Z
---

# Commit 6caa365

## Summary

Found one concrete bug in the new Convex credential path for Mantis Slack gateway setup: the leased Slack channel is added to the environment, but the rendered gateway config still uses the pre-lease default channel.

## Findings

### Medium: Convex-leased Slack gateway uses the wrong channel allowlist

- Kind: bug
- File: `extensions/qa-lab/src/mantis/slack-desktop-smoke.runtime.ts`
- Line: 759
- Evidence: `slackChannelId` is resolved before `prepareGatewayCredentialEnv()` mutates `env.OPENCLAW_QA_SLACK_CHANNEL_ID` from the leased credential. Later, `renderRemoteScript()` receives that stale `slackChannelId`, and the gateway patch writes it under `channels.slack.channels["$slack_channel_id"]` at line 486. The workflow invokes this path with `--gateway-setup --credential-source convex` and no `--slack-channel-id`, so it falls back to `DEFAULT_SLACK_CHANNEL_ID` instead of the leased payload channel.
- Impact: the VM browser opens the leased Slack channel via `OPENCLAW_QA_SLACK_CHANNEL_ID`, but the OpenClaw Slack gateway allowlist is patched for `C0AUXUC5AGN`. If the leased pool channel differs from that default, Slack messages in the visible channel will not be accepted by the gateway, making the new Convex-backed Mantis Slack desktop lane fail or appear idle.
- Suggested fix: after credential preparation, derive the effective channel from `opts.slackChannelId`, `env.OPENCLAW_MANTIS_SLACK_CHANNEL_ID`, or `env.OPENCLAW_QA_SLACK_CHANNEL_ID`, then pass that value to `renderRemoteScript()`. Add a test assertion that the Convex path renders `slack_channel_id='CLEASED'` and not the default.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. A focused mocked `runMantisSlackDesktopSmoke()` check with a Convex payload `{ channelId: "CLEASED" }` produced `envChannel: "CLEASED"` while the remote script contained `slack_channel_id='C0AUXUC5AGN'`.
- Is this the best way to solve the issue? yes. The credential payload is already trusted and copied into env; the missing step is using the post-lease effective channel when rendering the gateway config.

## Reviewed

- Diff: `9fa685e3b3e48da193be74e13737b4eb746de887..6caa365a7ab88f1bb63b35ecd37fcfa73b7bad96`
- Changed files: `docs/concepts/mantis.md`, `extensions/qa-lab/src/mantis/slack-desktop-smoke.runtime.ts`, `extensions/qa-lab/src/mantis/slack-desktop-smoke.runtime.test.ts`
- Code read: full touched runtime/test/doc sections, Slack live credential payload parsing, shared Convex credential lease runtime, Mantis Slack workflow invocation.
- Dependencies/web: no web lookup needed; behavior was established from current source and workflow.
- Commands: `pnpm docs:list`; `git show`; `git diff`; `pnpm install`; `pnpm test extensions/qa-lab/src/mantis/slack-desktop-smoke.runtime.test.ts`; focused `pnpm exec tsx --eval` renderer check; `git diff --check`.

## Tests / Live Checks

- `pnpm test extensions/qa-lab/src/mantis/slack-desktop-smoke.runtime.test.ts` passed, 4 tests.
- Focused renderer check reproduced the stale channel assignment.
- No live Slack/Crabbox run was needed for the finding; the failure is visible before any external service call.

## Limitations

- Did not run the full Mantis Slack desktop workflow live. The channel mismatch was proven with the runtime renderer and workflow arguments.
