import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { HOME } from "./vault.ts";

/**
 * Load the React Bits license key, refusing to proceed if the repo is set up in
 * a way that could leak it. The key grants access to paid, non-redistributable
 * assets, so a leak is not recoverable by rotating a cache.
 */
export async function licenseKey(): Promise<string> {
  await assertSecretsSafe();
  const key = process.env.REACTBITS_LICENSE_KEY?.trim();
  if (!key) {
    throw new Error(
      "REACTBITS_LICENSE_KEY is not set.\n" +
        `  Put it in ${join(HOME, ".env")} (chmod 600) or export it in your shell.`,
    );
  }
  if (!/^RBPU?-/i.test(key)) throw new Error("REACTBITS_LICENSE_KEY does not look like a React Bits key.");
  return key;
}

/** Preflight: .env must be gitignored and not world-readable. */
export async function assertSecretsSafe(): Promise<void> {
  const gi = join(HOME, ".gitignore");
  let ignored = "";
  try {
    ignored = await readFile(gi, "utf8");
  } catch {
    throw new Error(`Refusing to use the license key: ${gi} is missing.`);
  }
  if (!/^\s*\.env\s*$/m.test(ignored))
    throw new Error(`Refusing to use the license key: .gitignore does not ignore .env`);

  const envPath = join(HOME, ".env");
  try {
    const st = await stat(envPath);
    const mode = st.mode & 0o777;
    if (mode & 0o077)
      throw new Error(
        `Refusing to use the license key: ${envPath} is mode ${mode.toString(8)}; run: chmod 600 ${envPath}`,
      );
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("Refusing")) throw e;
    // No .env file — key must be coming from the shell environment. Fine.
  }
}

export function authHeaders(key: string): Record<string, string> {
  // Exactly one Authorization header — duplicates silently break the API.
  return { Authorization: `Bearer ${key}`, Accept: "application/json" };
}
