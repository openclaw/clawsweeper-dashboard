---
sha: 4baf472285e0da70fd28a54e6d08ca5ffca5ffde
parent: 0905389ccf1a12d09bd6865777c13a025254786f
repository: openclaw/openclaw
author: "@steipete"
committer: "@steipete"
github_author: "steipete"
github_committer: "steipete"
co_authors: []
commit_authored_at: "2026-05-08T13:31:31+01:00"
commit_committed_at: "2026-05-08T13:31:31+01:00"
result: failed
confidence: low
highest_severity: none
check_conclusion: neutral
reviewed_at: 2026-05-08T12:36:22.075Z
---

# Commit 4baf472285e0

Commit review failed before a reliable report could be produced.

## Failure

```
exit 1
md - Generate videos via video_generate from text, image, or video references across 16 provider backends
  Read when: Generating videos via the agent; Configuring video-generation providers and models; Understanding the video_generate tool parameters
tools/web-fetch.md - web_fetch tool -- HTTP fetch with readable content extraction
  Read when: You want to fetch a URL and extract readable content; You need to configure web_fetch or its Firecrawl fallback; You want to understand web_fetch limits and caching
tools/web.md - web_search, x_search, and web_fetch -- search the web, search X posts, or fetch page content
  Read when: You want to enable or configure web_search; You want to enable or configure x_search; You need to choose a search provider; You want to understand auto-detection and provider fallback
tts.md - Redirect to /tools/tts
vps.md - Run OpenClaw on a Linux server or cloud VPS — provider picker, architecture, and tuning
  Read when: You want to run the Gateway on a Linux server or cloud VPS; You need a quick map of hosting guides; You want generic Linux server tuning for OpenClaw
web/control-ui.md - Browser-based control UI for the Gateway (chat, nodes, config)
  Read when: You want to operate the Gateway from a browser; You want Tailnet access without SSH tunnels
web/dashboard.md - Gateway dashboard (Control UI) access and auth
  Read when: Changing dashboard authentication or exposure modes
web/index.md - Gateway web surfaces: Control UI, bind modes, and security
  Read when: You want to access the Gateway over Tailscale; You want the browser Control UI and config editing
web/tui.md - Terminal UI (TUI): connect to the Gateway or run locally in embedded mode
  Read when: You want a beginner-friendly walkthrough of the TUI; You need the complete list of TUI features, commands, and shortcuts
web/webchat.md - Loopback WebChat static host and Gateway WS usage for chat UI
  Read when: Debugging or configuring WebChat access

Reminder: keep docs up to date as behavior changes. When your task matches any "Read when" hint above (React hooks, cache directives, database work, tests, etc.), read that doc before coding, and suggest new coverage when it is missing.

 succeeded in 1123ms:
/home/runner/work/clawsweeper/clawsweeper/target-openclaw
3708aad903605b1293d41af80bcec581db4c1a2b

codex
The docs list ran; this change is a test-only `oc-path` assertion adjustment, so no user docs appear relevant beyond the repository’s testing guidance. I’m checking scoped instructions and the commit metadata/diff before reading the full test file and related implementation.
exec
/bin/bash -lc "rg --files -g 'AGENTS.md' src src/oc-path test 2>/dev/null" in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
 succeeded in 0ms:
src/oc-path/tests/fixtures/real/AGENTS.md
test/helpers/AGENTS.md
src/infra/outbound/AGENTS.md
src/plugin-sdk/AGENTS.md
src/agents/tools/AGENTS.md
src/agents/AGENTS.md
src/agents/pi-embedded-runner/run/AGENTS.md
src/gateway/server-methods/AGENTS.md
src/gateway/protocol/AGENTS.md
src/gateway/AGENTS.md
src/oc-path/tests/fixtures/real/AGENTS.md
src/plugins/AGENTS.md
src/channels/AGENTS.md
src/channels/plugins/contracts/test-helpers/AGENTS.md

exec
/bin/bash -lc 'git show --no-ext-diff --format=fuller --stat --find-renames 4baf472285e0da70fd28a54e6d08ca5ffca5ffde' in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
 succeeded in 0ms:
commit 4baf472285e0da70fd28a54e6d08ca5ffca5ffde
Author:     Peter Steinberger <steipete@gmail.com>
AuthorDate: Fri May 8 13:31:31 2026 +0100
Commit:     Peter Steinberger <steipete@gmail.com>
CommitDate: Fri May 8 13:31:31 2026 +0100

    test: clarify oc-path pitfalls assertions

 src/oc-path/tests/scenarios/pitfalls.test.ts | 10 +++++++---
 1 file changed, 7 insertions(+), 3 deletions(-)

exec
/bin/bash -lc 'git diff --no-ext-diff --find-renames 0905389ccf1a12d09bd6865777c13a025254786f..4baf472285e0da70fd28a54e6d08ca5ffca5ffde -- src/oc-path/tests/scenarios/pitfalls.test.ts' in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
 succeeded in 0ms:
diff --git a/src/oc-path/tests/scenarios/pitfalls.test.ts b/src/oc-path/tests/scenarios/pitfalls.test.ts
index a70e9bb1ed..0952c266e7 100644
--- a/src/oc-path/tests/scenarios/pitfalls.test.ts
+++ b/src/oc-path/tests/scenarios/pitfalls.test.ts
@@ -55,7 +55,9 @@ describe("wave-23 pitfalls — encoding", () => {
   it("P-003 allows whitespace inside predicate values (content)", () => {
     // Spaces inside a predicate value are legitimate — they're filtering
     // against actual content.
-    expect(() => parseOcPath("oc://X/[name=hello world]")).not.toThrow();
+    const path = parseOcPath("oc://X/[name=hello world]");
+    expect(path.file).toBe("X");
+    expect(path.section).toBe("[name=hello world]");
   });
 
   it("P-004 / P-011 rejects control characters and null bytes", () => {
@@ -396,7 +398,7 @@ describe("wave-23 pitfalls — performance & limits", () => {
 
   it("P-032 path at the cap parses cleanly", () => {
     const justUnder = "oc://X/" + "a".repeat(MAX_PATH_LENGTH - "oc://X/".length);
-    expect(() => parseOcPath(justUnder)).not.toThrow();
+    expect(parseOcPath(justUnder).section).toBe("a".repeat(MAX_PATH_LENGTH - "oc://X/".length));
   });
 
   it("P-032 formatOcPath enforces the same cap on output", () => {
@@ -477,7 +479,9 @@ describe("wave-23 pitfalls — reserved characters", () => {
     // the first `?` as the query split.
     expect(parseOcPath("oc://X/foo?session=s").section).toBe("foo");
     // Empty key after `?` (no `=`): query parser silently ignores.
-    expect(() => parseOcPath("oc://X/foo?")).not.toThrow();
+    const path = parseOcPath("oc://X/foo?");
+    expect(path.section).toBe("foo");
+    expect(path.session).toBeUndefined();
   });
 
   it("P-040 negative-index magnitude is bounded", () => {

ERROR: Selected model is at capacity. Please try a different model.
ERROR: Selected model is at capacity. Please try a different model.
tokens used
55,340
```
