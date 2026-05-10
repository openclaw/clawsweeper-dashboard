---
sha: b5ade0db8a8cf0ac7e9a7b699abc74dce81921ed
parent: f7d6ce9a767321d6572f3780aee4c98cc05a9862
repository: openclaw/openclaw
author: "@steipete"
committer: "@steipete"
github_author: "steipete"
github_committer: "steipete"
co_authors: []
commit_authored_at: "2026-05-10T19:49:32+01:00"
commit_committed_at: "2026-05-10T19:49:36+01:00"
result: failed
confidence: low
highest_severity: none
check_conclusion: neutral
reviewed_at: 2026-05-10T18:54:52.273Z
---

# Commit b5ade0db8a8c

Commit review failed before a reliable report could be produced.

## Failure

```
exit 1
hecks instead of forcing local pinned-DNS first.
    58	   */
    59	  trustExplicitProxyDns?: boolean;
    60	};
    61	
    62	function stripQuotes(value: string): string {
    63	  return value.replace(/^["']|["']$/g, "");
    64	}
    65	
    66	function parseContentDispositionFileName(header?: string | null): string | undefined {
    67	  if (!header) {
    68	    return undefined;
    69	  }
    70	  const starMatch = /filename\*\s*=\s*([^;]+)/i.exec(header);
    71	  if (starMatch?.[1]) {
    72	    const cleaned = stripQuotes(starMatch[1].trim());
    73	    const encoded = cleaned.split("''").slice(1).join("''") || cleaned;
    74	    try {
    75	      return path.basename(decodeURIComponent(encoded));
    76	    } catch {
    77	      return path.basename(encoded);
    78	    }
    79	  }
    80	  const match = /filename\s*=\s*([^;]+)/i.exec(header);
    81	  if (match?.[1]) {
    82	    return path.basename(stripQuotes(match[1].trim()));
    83	  }
    84	  return undefined;
    85	}
    86	
    87	async function readErrorBodySnippet(
    88	  res: Response,
    89	  opts?: {
    90	    maxChars?: number;
    91	    chunkTimeoutMs?: number;
    92	  },
    93	): Promise<string | undefined> {
    94	  try {
    95	    return await readResponseTextSnippet(res, {
    96	      maxBytes: 8 * 1024,
    97	      maxChars: opts?.maxChars,
    98	      chunkTimeoutMs: opts?.chunkTimeoutMs,
    99	    });
   100	  } catch {
   101	    return undefined;
   102	  }
   103	}
   104	
   105	function redactMediaUrl(url: string): string {
   106	  return redactSensitiveText(url);
   107	}
   108	
   109	export async function fetchRemoteMedia(options: FetchMediaOptions): Promise<FetchMediaResult> {
   110	  const {
   111	    url,
   112	    fetchImpl,
   113	    requestInit,
   114	    filePathHint,
   115	    maxBytes,
   116	    maxRedirects,
   117	    readIdleTimeoutMs,
   118	    ssrfPolicy,
   119	    lookupFn,
   120	    dispatcherPolicy,
   121	    dispatcherAttempts,
   122	    shouldRetryFetchError,
   123	    trustExplicitProxyDns,
   124	  } = options;
   125	  const sourceUrl = redactMediaUrl(url);
   126	
   127	  let res: Response;
   128	  let finalUrl = url;
   129	  let release: (() => Promise<void>) | null = null;
   130	  const attempts =
   131	    dispatcherAttempts && dispatcherAttempts.length > 0
   132	      ? dispatcherAttempts
   133	      : [{ dispatcherPolicy, lookupFn }];
   134	  const runGuardedFetch = async (attempt: FetchDispatcherAttempt) =>
   135	    await fetchWithSsrFGuard(
   136	      (trustExplicitProxyDns && attempt.dispatcherPolicy?.mode === "explicit-proxy"
   137	        ? withTrustedExplicitProxyGuardedFetchMode
   138	        : withStrictGuardedFetchMode)({
   139	        url,
   140	        fetchImpl,
   141	        init: requestInit,
   142	        maxRedirects,
   143	        policy: ssrfPolicy,
   144	        lookupFn: attempt.lookupFn ?? lookupFn,
   145	        dispatcherPolicy: attempt.dispatcherPolicy,
   146	      }),
   147	    );
   148	  try {
   149	    let result!: Awaited<ReturnType<typeof fetchWithSsrFGuard>>;
   150	    const attemptErrors: unknown[] = [];
   151	    for (let i = 0; i < attempts.length; i += 1) {
   152	      try {
   153	        result = await runGuardedFetch(attempts[i]);
   154	        break;
   155	      } catch (err) {
   156	        if (
   157	          typeof shouldRetryFetchError !== "function" ||
   158	          !shouldRetryFetchError(err) ||
   159	          i === attempts.length - 1
   160	        ) {
   161	          if (attemptErrors.length > 0) {
   162	            const combined = new Error(
   163	              `Primary fetch failed and fallback fetch also failed for ${sourceUrl}`,
   164	              { cause: err },
   165	            );
   166	            (
   167	              combined as Error & {
   168	                primaryError?: unknown;
   169	                attemptErrors?: unknown[];
   170	              }

 succeeded in 0ms:
     1	// Narrow SSRF helpers for extensions that need pinned-dispatcher and policy
     2	// utilities without loading the full infra-runtime surface.
     3	
     4	export {
     5	  closeDispatcher,
     6	  createPinnedDispatcher,
     7	  SsrFBlockedError,
     8	  isBlockedHostnameOrIp,
     9	  isPrivateIpAddress,
    10	  resolvePinnedHostname,
    11	  resolvePinnedHostnameWithPolicy,
    12	  ssrfPolicyFromHttpBaseUrlAllowedHostname,
    13	  type LookupFn,
    14	  type SsrFPolicy,
    15	} from "../infra/net/ssrf.js";
    16	export { formatErrorMessage } from "../infra/errors.js";
    17	export { fetchWithSsrFGuard } from "../infra/net/fetch-guard.js";
    18	export {
    19	  assertHttpUrlTargetsPrivateNetwork,
    20	  buildHostnameAllowlistPolicyFromSuffixAllowlist,
    21	  createLegacyPrivateNetworkDoctorContract,
    22	  hasLegacyFlatAllowPrivateNetworkAlias,
    23	  isPrivateNetworkOptInEnabled,
    24	  mergeSsrFPolicies,
    25	  migrateLegacyFlatAllowPrivateNetworkAlias,
    26	  ssrfPolicyFromDangerouslyAllowPrivateNetwork,
    27	  ssrfPolicyFromPrivateNetworkOptIn,
    28	  ssrfPolicyFromAllowPrivateNetwork,
    29	} from "./ssrf-policy.js";
    30	export { isPrivateOrLoopbackHost } from "../gateway/net.js";

ERROR: Reconnecting... 1/5
ERROR: Reconnecting... 2/5
ERROR: Reconnecting... 3/5
ERROR: Reconnecting... 4/5
ERROR: Reconnecting... 5/5
ERROR: stream disconnected before completion: Rate limit reached for gpt-5.5 in organization org-uV7eiQ9Go91bzhgJ7xfsJBZj on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 81251. Please try again in 121ms. Visit https://platform.openai.com/account/rate-limits to learn more.
ERROR: stream disconnected before completion: Rate limit reached for gpt-5.5 in organization org-uV7eiQ9Go91bzhgJ7xfsJBZj on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 81251. Please try again in 121ms. Visit https://platform.openai.com/account/rate-limits to learn more.
tokens used
71,809
```
