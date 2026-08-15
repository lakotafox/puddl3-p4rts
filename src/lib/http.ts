/** HTTP with retry, politeness pacing, and bot-challenge detection. */

export class ChallengeError extends Error {
  constructor(public url: string) {
    super(
      `Blocked by bot protection at ${url}\n` +
        `  The host returned a Vercel Security Checkpoint instead of JSON.\n` +
        `  This is IP-scoped and clears on its own — wait a few minutes and re-run.\n` +
        `  Progress is journaled, so re-running resumes where it stopped.`,
    );
    this.name = "ChallengeError";
  }
}

export function redact(s: string): string {
  return s
    .replace(/RBPU-[A-Z0-9-]+/gi, "RBPU-****")
    .replace(/Bearer\s+[\w.\-]+/gi, "Bearer ****");
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type FetchOpts = {
  headers?: Record<string, string>;
  tries?: number;
  timeoutMs?: number;
};

/**
 * Fetch JSON, treating a non-JSON body as a hard failure.
 *
 * pro.reactbits.dev sits behind Vercel bot protection: when tripped it returns
 * HTTP 403 with a 33KB HTML challenge page. Parsing that as JSON would either
 * throw or, if written straight to disk, silently corrupt the vault. So the
 * content-type and body shape are checked before anything is returned.
 */
export async function fetchJson<T = unknown>(url: string, opts: FetchOpts = {}): Promise<T> {
  const { headers = {}, tries = 8, timeoutMs = 30_000 } = opts;
  let lastErr: unknown;

  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const res = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(timeoutMs),
      });

      if (res.headers.get("x-vercel-mitigated") === "challenge") throw new ChallengeError(url);

      const body = await res.text();

      if (!res.ok) {
        // A challenge can also present as a plain 403 HTML page.
        if (res.status === 403 && /<!DOCTYPE|Security Checkpoint/i.test(body))
          throw new ChallengeError(url);
        // 4xx other than 429 is a real error — fail fast, don't burn retries.
        if (res.status !== 429 && res.status < 500)
          throw new Error(`HTTP ${res.status} for ${redact(url)}: ${redact(body.slice(0, 200))}`);
        // Rate limited: obey Retry-After when the server supplies it.
        if (res.status === 429) {
          const ra = Number(res.headers.get("retry-after"));
          await sleep(Number.isFinite(ra) && ra > 0 ? ra * 1000 : 5000 * (attempt + 1));
        }
        throw new Error(`HTTP ${res.status} for ${redact(url)}`);
      }

      if (!body.trim()) throw new Error(`Empty body from ${redact(url)}`);
      if (/^\s*</.test(body)) throw new ChallengeError(url);

      return JSON.parse(body) as T;
    } catch (err) {
      // Never retry into a deeper block.
      if (err instanceof ChallengeError) throw err;
      if (err instanceof Error && /^HTTP 4/.test(err.message) && !/429/.test(err.message)) throw err;
      lastErr = err;
      if (attempt < tries - 1) await sleep(Math.min(1000 * 2 ** attempt, 60_000));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

/** Run tasks with bounded concurrency and inter-dispatch pacing. */
export async function pool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, i: number) => Promise<R>,
  paceMs = 0,
): Promise<R[]> {
  const out = new Array<R>(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      if (paceMs) await sleep(paceMs);
      out[i] = await fn(items[i]!, i);
    }
  });
  await Promise.all(workers);
  return out;
}
