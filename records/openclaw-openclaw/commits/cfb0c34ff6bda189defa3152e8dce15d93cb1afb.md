---
sha: cfb0c34ff6bda189defa3152e8dce15d93cb1afb
parent: 4235f6b192986e5f70282f948fac8cd394ccb53e
repository: openclaw/openclaw
author: "VACInc"
committer: "Peter Steinberger"
github_author: VACInc
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-28T01:30:49-04:00"
commit_committed_at: "2026-05-09T06:51:20-04:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-09T11:00:27Z
---

# Commit cfb0c34

## Summary

Found two actionable bugs in the Control UI Talk consult override path. The voice-call plugin path is separately wired and covered by tests, but the core `chat.send` path used by browser realtime Talk does not fully honor the new one-shot overrides.

## Findings

### Medium: `talk.consultFastMode` is computed but never used for the agent run

- Kind: bug
- File: `src/auto-reply/reply/get-reply-run.ts`
- Line: 1054
- Evidence: `talk.client.toolCall` forwards `talk.consultFastMode` into `chat.send` as `fastMode`, and `chat.send` passes it as `replyOptions.fastModeOverride`. `resolveReplyDirectives` computes `resolvedFastMode` from that override, but `runPreparedReply` does not accept or receive `resolvedFastMode`. The actual embedded run recomputes `fastMode` from session/model config at `src/auto-reply/reply/get-reply-run.ts:1054`, so the new one-shot override is dropped before runtime.
- Impact: `talk.consultFastMode: true` or `false` has no effect for Control UI/browser realtime Talk consults unless the session or model defaults already happen to match it. Operators trying to lower latency/cost for realtime consults will get normal fast-mode behavior instead of the configured override.
- Suggested fix: Thread `resolvedFastMode` through `RunPreparedReplyParams` from `src/auto-reply/reply/get-reply.ts`, then use it when setting `run.fastMode`, e.g. `fastMode: useFastReplyRuntime ? false : resolvedFastMode`.
- Confidence: high

### Low: `talk.consultThinkingLevel: "off"` can still enable model-default reasoning

- Kind: bug
- File: `src/auto-reply/reply/get-reply-directives.ts`
- Line: 541
- Evidence: The one-shot thinking override is applied to `resolvedThinkLevel`, but `thinkingExplicitlySet` only checks inline directives, session state, and agent defaults. It does not count `opts.thinkingLevelOverride`. When the override is `"off"` and the selected model has a default reasoning capability, the later guard can call `modelState.resolveDefaultReasoningLevel()` and set `resolvedReasoningLevel` back to `"on"`.
- Impact: `talk.consultThinkingLevel: "off"` does not behave like an explicit `/think off` for realtime Talk consults on reasoning-capable models. That can preserve unwanted reasoning latency/cost despite an explicit consult override.
- Suggested fix: Normalize the override once and include it in `thinkingExplicitlySet`, so a valid one-shot override of `"off"` suppresses model-default reasoning the same way session/directive thinking-off does.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes. For the first finding, configure `talk.consultFastMode`, trigger a Control UI realtime `openclaw_agent_consult`, and inspect the embedded run params; `fastMode` comes from `resolveFastModeState(...)`, not the one-shot override. For the second, use `talk.consultThinkingLevel: "off"` with a model catalog entry whose default reasoning resolves to `"on"`.
- Is this the best way to solve the issue? Yes. The existing directive pipeline already computes the right per-run values; the missing piece is carrying them into `runPreparedReply` and counting one-shot thinking overrides as explicit thinking state.

## Reviewed

- Diff: `4235f6b192986e5f70282f948fac8cd394ccb53e..cfb0c34ff6bda189defa3152e8dce15d93cb1afb`
- Changed files: 30 files across Talk config/schema, Gateway protocol/chat/talk handlers, voice-call realtime config/runtime, UI realtime Talk, docs, and tests.
- Code read: changed files plus current `main` call paths through `talk.client.toolCall`, `chat.send`, `resolveReplyDirectives`, `runPreparedReply`, and voice-call realtime consult runtime.
- Dependencies/web: dependency files unchanged; no external web facts needed.

## Tests / Live Checks

- `pnpm install` to restore missing `node_modules`.
- `pnpm test src/config/talk.normalize.test.ts src/config/zod-schema.talk.test.ts src/gateway/server-methods/talk.test.ts src/talk/agent-consult-runtime.test.ts ui/src/ui/realtime-talk-consult.test.ts extensions/voice-call/src/config.test.ts extensions/voice-call/src/runtime.test.ts` passed.
- `pnpm test src/gateway/protocol/index.test.ts src/gateway/protocol/talk-config.contract.test.ts src/config/schema.help.quality.test.ts` passed.

## Limitations

- No live browser realtime Talk or telephony call was run; findings are from static call-path proof and targeted unit coverage.
