---
sha: dce66a32a293e7e9e24caab67fc7e4d6bd72d0fd
parent: 0a4f9cfe8cac19660afb0d456b958fd6d464605f
repository: openclaw/openclaw
author: "@steipete"
committer: "@steipete"
github_author: "steipete"
github_committer: "steipete"
co_authors: []
commit_authored_at: "2026-05-11T05:31:46+01:00"
commit_committed_at: "2026-05-11T05:31:50+01:00"
result: failed
confidence: low
highest_severity: none
check_conclusion: neutral
reviewed_at: 2026-05-11T04:36:38.411Z
---

# Commit dce66a32a293

Commit review failed before a reliable report could be produced.

## Failure

```
exit 1
/session-transcript-key.ts:66:  const { store } = loadCombinedSessionStoreForGateway(cfg);
src/gateway/sessions-resolve.test.ts:11:  loadCombinedSessionStoreForGatewayMock: vi.fn(),
src/gateway/sessions-resolve.test.ts:42:    loadCombinedSessionStoreForGateway: hoisted.loadCombinedSessionStoreForGatewayMock,
src/gateway/sessions-resolve.test.ts:59:    hoisted.loadCombinedSessionStoreForGatewayMock.mockReset();
src/gateway/sessions-resolve.test.ts:189:    hoisted.loadCombinedSessionStoreForGatewayMock.mockReturnValue({
src/gateway/sessions-resolve.test.ts:210:    hoisted.loadCombinedSessionStoreForGatewayMock.mockReturnValue({
src/gateway/sessions-resolve.test.ts:232:    hoisted.loadCombinedSessionStoreForGatewayMock.mockReturnValue({
src/gateway/agent-list.ts:15:function listExistingAgentIdsFromDisk(): string[] {
src/gateway/agent-list.ts:29:function listConfiguredAgentIds(cfg: OpenClawConfig): string[] {
src/gateway/agent-list.ts:40:  for (const id of listExistingAgentIdsFromDisk()) {
src/gateway/agent-list.ts:75:  let agentIds = listConfiguredAgentIds(cfg).filter((id) =>
src/gateway/server-session-key.test.ts:7:  loadCombinedSessionStoreForGatewayMock: vi.fn(),
src/gateway/server-session-key.test.ts:22:    loadCombinedSessionStoreForGateway: (cfg: OpenClawConfig) =>
src/gateway/server-session-key.test.ts:23:      hoisted.loadCombinedSessionStoreForGatewayMock(cfg),
src/gateway/server-session-key.test.ts:33:    hoisted.loadCombinedSessionStoreForGatewayMock.mockReset();
src/gateway/server-session-key.test.ts:50:    hoisted.loadCombinedSessionStoreForGatewayMock.mockReturnValue({
src/gateway/server-session-key.test.ts:59:    expect(hoisted.loadCombinedSessionStoreForGatewayMock).toHaveBeenCalledTimes(1);
src/gateway/server-session-key.test.ts:60:    expect(hoisted.loadCombinedSessionStoreForGatewayMock).toHaveBeenCalledWith(cfg);
src/gateway/server-session-key.test.ts:67:    hoisted.loadCombinedSessionStoreForGatewayMock.mockReturnValue({
src/gateway/server-session-key.test.ts:74:    expect(hoisted.loadCombinedSessionStoreForGatewayMock).toHaveBeenCalledTimes(1);
src/gateway/server-session-key.test.ts:79:    expect(hoisted.loadCombinedSessionStoreForGatewayMock).toHaveBeenCalledTimes(2);
src/gateway/server-session-key.test.ts:85:    hoisted.loadCombinedSessionStoreForGatewayMock.mockReturnValue({
src/gateway/server-session-key.test.ts:98:    hoisted.loadCombinedSessionStoreForGatewayMock.mockReturnValue({
src/gateway/server-methods/usage.ts:47:  loadCombinedSessionStoreForGateway,
src/gateway/server-methods/usage.ts:834:    const { storePath, store } = loadCombinedSessionStoreForGateway(config);
src/gateway/server-methods/usage.sessions-usage.test.ts:22:    loadCombinedSessionStoreForGateway: vi.fn(() => ({ storePath: "(multiple)", store: {} })),
src/gateway/server-methods/usage.sessions-usage.test.ts:90:import { loadCombinedSessionStoreForGateway } from "../session-utils.js";
src/gateway/server-methods/usage.sessions-usage.test.ts:183:        vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({
src/gateway/server-methods/usage.sessions-usage.test.ts:232:        vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({
src/gateway/server-methods/usage.sessions-usage.test.ts:320:        vi.mocked(loadCombinedSessionStoreForGateway).mockReturnValue({
src/gateway/server-methods/sessions.ts:92:  loadCombinedSessionStoreForGateway,
src/gateway/server-methods/sessions.ts:712:            loadCombinedSessionStoreForGateway(cfg, {
src/commands/tasks.ts:8:  resolveAllAgentSessionStoreTargetsSync,
src/commands/tasks.ts:145:  for (const target of resolveAllAgentSessionStoreTargetsSync(cfg)) {
src/plugins/host-hook-cleanup.ts:4:import { resolveAllAgentSessionStoreTargetsSync } from "../config/sessions/targets.js";
src/plugins/host-hook-cleanup.ts:212:    resolveAllAgentSessionStoreTargetsSync(params.cfg)
src/plugins/host-hook-cleanup.ts:248:    resolveAllAgentSessionStoreTargetsSync(params.cfg)
src/plugins/host-hook-state.ts:6:  resolveAllAgentSessionStoreTargetsSync,
src/plugins/host-hook-state.ts:134:  for (const target of resolveAllAgentSessionStoreTargetsSync(params.cfg)) {
src/gateway/sessions-resolve.ts:15:  loadCombinedSessionStoreForGateway,
src/gateway/sessions-resolve.ts:169:    const { store } = loadCombinedSessionStoreForGateway(cfg);
src/gateway/sessions-resolve.ts:203:  const { storePath, store } = loadCombinedSessionStoreForGateway(cfg);
src/gateway/session-utils.subagent.test.ts:16:  loadCombinedSessionStoreForGateway,
src/gateway/session-utils.subagent.test.ts:1239:describe("loadCombinedSessionStoreForGateway includes disk-only agents (#32804)", () => {
src/gateway/session-utils.subagent.test.ts:1275:      const { store } = loadCombinedSessionStoreForGateway(cfg);
src/gateway/session-utils.subagent.test.ts:1319:      const { store, storePath } = loadCombinedSessionStoreForGateway(cfg, { agentId: "codex" });
src/gateway/session-utils.subagent.test.ts:1366:      const { store } = loadCombinedSessionStoreForGateway(cfg, { agentId: "codex" });
src/gateway/server-session-key.ts:6:import { loadCombinedSessionStoreForGateway } from "./session-utils.js";
src/gateway/server-session-key.ts:53:  const { store } = loadCombinedSessionStoreForGateway(cfg);

ERROR: Reconnecting... 1/5
ERROR: Reconnecting... 2/5
ERROR: Reconnecting... 3/5
ERROR: Reconnecting... 4/5
ERROR: Reconnecting... 5/5
ERROR: stream disconnected before completion: Rate limit reached for gpt-5.5 in organization org-uV7eiQ9Go91bzhgJ7xfsJBZj on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 77251. Please try again in 115ms. Visit https://platform.openai.com/account/rate-limits to learn more.
ERROR: stream disconnected before completion: Rate limit reached for gpt-5.5 in organization org-uV7eiQ9Go91bzhgJ7xfsJBZj on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 77251. Please try again in 115ms. Visit https://platform.openai.com/account/rate-limits to learn more.
tokens used
189,455
```
