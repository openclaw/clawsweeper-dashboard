---
sha: 9ab0af270ab47ccd3f93cc89ddea1ab4482d86da
parent: 15ff89bf5d58b0c7d1a70b05c35ab5e1cfd99060
repository: openclaw/openclaw
author: "@steipete"
committer: "@steipete"
github_author: "steipete"
github_committer: "steipete"
co_authors: []
commit_authored_at: "2026-05-24T01:04:08+01:00"
commit_committed_at: "2026-05-24T03:55:49+01:00"
result: failed
confidence: low
highest_severity: none
check_conclusion: neutral
reviewed_at: 2026-05-24T03:15:29.909Z
---

# Commit 9ab0af270ab4

Commit review failed before a reliable report could be produced.

## Failure

```
exit 1
uild spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `externalize-deps`. See https://rolldown.rs/options/checks#plugintimings for more details.

[33m[PLUGIN_TIMINGS] [0mYour build spent significant time in plugin `inject-file-scope-variables`. See https://rolldown.rs/options/checks#plugintimings for more details.


 RUN  v4.1.7 /home/runner/work/clawsweeper/clawsweeper/target-openclaw


 Test Files  3 passed (3)
      Tests  64 passed (64)
   Start at  03:15:14
   Duration  6.52s (transform 2.53s, setup 1.31s, import 1.39s, tests 5.47s, environment 0ms)


ERROR: Reconnecting... 1/5
ERROR: Reconnecting... 2/5
ERROR: Reconnecting... 3/5
ERROR: Reconnecting... 4/5
ERROR: Reconnecting... 5/5
ERROR: stream disconnected before completion: Rate limit reached for gpt-5.5 in organization org-uV7eiQ9Go91bzhgJ7xfsJBZj on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 112101. Please try again in 168ms. Visit https://platform.openai.com/account/rate-limits to learn more.
ERROR: stream disconnected before completion: Rate limit reached for gpt-5.5 in organization org-uV7eiQ9Go91bzhgJ7xfsJBZj on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 112101. Please try again in 168ms. Visit https://platform.openai.com/account/rate-limits to learn more.
tokens used
131,231
```
