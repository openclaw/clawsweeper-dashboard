---
sha: baecb6b4d64b9d1b2f69aaed696b1c656bf48e1e
parent: 6e8cdd7d59b548fcd3f11a20024254f2e7a22478
repository: openclaw/openclaw
author: "@vincentkoc"
committer: "@vincentkoc"
github_author: "vincentkoc"
github_committer: "vincentkoc"
co_authors: []
commit_authored_at: "2026-05-03T23:24:57-07:00"
commit_committed_at: "2026-05-04T01:40:58-07:00"
result: failed
confidence: low
highest_severity: none
check_conclusion: neutral
reviewed_at: 2026-05-04T08:49:37.416Z
---

# Commit baecb6b4d64b

Commit review failed before a reliable report could be produced.

## Failure

```
exit 1
upe";
extensions/mattermost/src/mattermost/monitor.ts:4:import { isReasoningReplyPayload } from "openclaw/plugin-sdk/reply-payload";
extensions/mattermost/src/mattermost/monitor.ts:5:import { resolvePinnedMainDmOwnerFromAllowlist } from "openclaw/plugin-sdk/security-runtime";
extensions/mattermost/src/mattermost/monitor.ts:6:import { isPrivateNetworkOptInEnabled } from "openclaw/plugin-sdk/ssrf-runtime";
extensions/mattermost/src/mattermost/monitor.ts:10:} from "openclaw/plugin-sdk/text-runtime";
extensions/mattermost/src/mattermost/monitor-websocket.ts:2:import { safeParseJsonWithSchema, safeParseWithSchema } from "openclaw/plugin-sdk/extension-shared";
extensions/mattermost/src/mattermost/monitor-websocket.ts:7:} from "openclaw/plugin-sdk/proxy-capture";
extensions/mattermost/src/mattermost/monitor-websocket.ts:8:import { z } from "openclaw/plugin-sdk/zod";
extensions/mattermost/src/mattermost/slash-http.send-config.test.ts:3:import type { OpenClawConfig } from "openclaw/plugin-sdk/core";
extensions/mattermost/src/mattermost/slash-http.send-config.test.ts:4:import type { RuntimeEnv } from "openclaw/plugin-sdk/runtime";
extensions/mattermost/src/mattermost/slash-http.ts:9:import { safeEqualSecret } from "openclaw/plugin-sdk/security-runtime";
extensions/mattermost/src/mattermost/slash-http.ts:10:import { isPrivateNetworkOptInEnabled } from "openclaw/plugin-sdk/ssrf-runtime";

exec
/bin/bash -lc "rg \"import\\s+[A-Za-z_"'$][A-Za-z0-9_$]*'"\\s+from\\s+[\\\"'](?:openclaw|@openclaw)/plugin-sdk/\" -n src extensions packages test --glob '"'!node_modules'"'" in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
exec
/bin/bash -lc "rg \"from\\s+[\\\"'](?:openclaw|@openclaw)/plugin-sdk[\\\"']|require\\([\\\"'](?:openclaw|@openclaw)/plugin-sdk[\\\"']\\)\" -n src extensions packages test --glob '"'!node_modules'"'" in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
exec
/bin/bash -lc "rg \"require\\([\\\"'](?:openclaw|@openclaw)/plugin-sdk/["'^'"\\\"']+[\\\"']\\)\\.default|\\.default\\s*=\\s*require\\([\\\"'](?:openclaw|@openclaw)/plugin-sdk/\" -n src extensions packages test --glob '"'!node_modules'"'" in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
 exited 1 in 106ms:
 succeeded in 133ms:
src/plugins/loader.test.ts:6577:  configSchema: (require("openclaw/plugin-sdk").emptyPluginConfigSchema)(),
src/plugins/loader.test.ts:6608:  configSchema: (require("openclaw/plugin-sdk").emptyPluginConfigSchema)(),
src/plugins/loader.test.ts:6610:    const { onDiagnosticEvent } = require("openclaw/plugin-sdk");
src/plugins/loader-sdk-import-guardrails.test.ts:7:  'src/plugins/loader.test.ts:configSchema: (require("openclaw/plugin-sdk").emptyPluginConfigSchema)(),',
src/plugins/loader-sdk-import-guardrails.test.ts:8:  'src/plugins/loader.test.ts:const { onDiagnosticEvent } = require("openclaw/plugin-sdk");',
src/plugins/loader-sdk-import-guardrails.test.ts:29:        line.includes('require("openclaw/plugin-sdk') ||
src/plugins/native-module-require.test.ts:70:    fs.writeFileSync(modulePath, 'require("openclaw/plugin-sdk");\n', "utf8");

 exited 1 in 142ms:
exec
/bin/bash -lc 'date -u +%Y-%m-%dT%H:%M:%SZ' in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
 succeeded in 0ms:
2026-05-04T08:49:15Z

exec
/bin/bash -lc "git show -s --format='%H%n%P%n%an%n%cn%n%aI%n%cI' baecb6b4d64b9d1b2f69aaed696b1c656bf48e1e" in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
 succeeded in 0ms:
baecb6b4d64b9d1b2f69aaed696b1c656bf48e1e
6e8cdd7d59b548fcd3f11a20024254f2e7a22478
Vincent Koc
Vincent Koc
2026-05-03T23:24:57-07:00
2026-05-04T01:40:58-07:00

exec
/bin/bash -lc 'git rev-parse HEAD && git rev-parse 6e8cdd7d59b548fcd3f11a20024254f2e7a22478 && git merge-base 6e8cdd7d59b548fcd3f11a20024254f2e7a22478 baecb6b4d64b9d1b2f69aaed696b1c656bf48e1e' in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
 succeeded in 0ms:
be41b8cbc73c7a7927ec09bac879d2ce7bdeee70
6e8cdd7d59b548fcd3f11a20024254f2e7a22478
6e8cdd7d59b548fcd3f11a20024254f2e7a22478

exec
/bin/bash -lc 'git status --short' in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
 succeeded in 146ms:
exec
/bin/bash -lc 'git log --oneline --decorate baecb6b4d64b9d1b2f69aaed696b1c656bf48e1e..HEAD -- src/plugins/native-module-require.ts src/plugins/plugin-module-loader-cache.ts src/plugins/plugin-sdk-dist-alias.ts src/plugins/loader.test.ts src/plugins/native-module-require.test.ts src/plugins/plugin-module-loader-cache.test.ts' in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
 succeeded in 0ms:
exec
/bin/bash -lc 'git diff --no-ext-diff baecb6b4d64b9d1b2f69aaed696b1c656bf48e1e..HEAD -- src/plugins/native-module-require.ts src/plugins/plugin-module-loader-cache.ts src/plugins/plugin-sdk-dist-alias.ts' in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
exec
/bin/bash -lc 'git diff --no-ext-diff --stat baecb6b4d64b9d1b2f69aaed696b1c656bf48e1e..HEAD -- src/plugins/native-module-require.ts src/plugins/plugin-module-loader-cache.ts src/plugins/plugin-sdk-dist-alias.ts src/plugins/loader.test.ts src/plugins/native-module-require.test.ts src/plugins/plugin-module-loader-cache.test.ts' in /home/runner/work/clawsweeper/clawsweeper/target-openclaw
 succeeded in 0ms:
 succeeded in 0ms:
ERROR: Reconnecting... 1/5
ERROR: Reconnecting... 2/5
ERROR: Reconnecting... 3/5
ERROR: Reconnecting... 4/5
ERROR: Reconnecting... 5/5
ERROR: stream disconnected before completion: Rate limit reached for gpt-5.5 in organization org-uV7eiQ9Go91bzhgJ7xfsJBZj on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 123820. Please try again in 185ms. Visit https://platform.openai.com/account/rate-limits to learn more.
ERROR: stream disconnected before completion: Rate limit reached for gpt-5.5 in organization org-uV7eiQ9Go91bzhgJ7xfsJBZj on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 123820. Please try again in 185ms. Visit https://platform.openai.com/account/rate-limits to learn more.
tokens used
415,895
```
