import { createHash } from "node:crypto";
import { mkdir, writeFile, readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

export const HOME = process.env.FOXBITS_HOME || join(process.env.HOME!, "foxbits");
export const VAULT = join(HOME, "vault");
export const RAW = join(VAULT, "_raw");
export const STATE = join(VAULT, "_state");

export const sha256 = (s: string | Buffer) => createHash("sha256").update(s).digest("hex");

/** Normalize before hashing so line-ending noise doesn't churn the vault. */
export const normalizeContent = (s: string) => s.replace(/\r\n/g, "\n");

export function hashFiles(files: { path: string; content: string }[]): string {
  const h = createHash("sha256");
  for (const f of [...files].sort((a, b) => a.path.localeCompare(b.path)))
    h.update(f.path).update("\0").update(normalizeContent(f.content)).update("\0");
  return h.digest("hex");
}

export const rel = (abs: string) => relative(HOME, abs);

export async function writeIfChanged(abs: string, content: string): Promise<boolean> {
  const next = normalizeContent(content);
  try {
    if ((await readFile(abs, "utf8")) === next) return false;
  } catch {
    /* missing — write it */
  }
  await mkdir(dirname(abs), { recursive: true });
  await writeFile(abs, next, "utf8");
  return true;
}

export async function writeJson(abs: string, value: unknown): Promise<boolean> {
  return writeIfChanged(abs, JSON.stringify(value, null, 2) + "\n");
}

export async function readJson<T>(abs: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(abs, "utf8")) as T;
  } catch {
    return null;
  }
}

export async function exists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

/** Recursively collect files matching a predicate. */
export async function walk(dir: string, match: (p: string) => boolean): Promise<string[]> {
  const out: string[] = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p, match)));
    else if (match(p)) out.push(p);
  }
  return out;
}

/** Append-only journal so an interrupted sync resumes instead of restarting. */
export async function journal(source: string, entry: Record<string, unknown>): Promise<void> {
  await mkdir(STATE, { recursive: true });
  const line = JSON.stringify({ ...entry, at: new Date().toISOString() }) + "\n";
  await writeFile(join(STATE, `sync-${source}.jsonl`), line, { flag: "a" });
}

export function parseDep(raw: string): { name: string; range: string } {
  // "motion@^12.23.12" -> {motion, ^12.23.12};  "@react-three/fiber" -> {..., "*"}
  const at = raw.lastIndexOf("@");
  if (at > 0) return { name: raw.slice(0, at), range: raw.slice(at + 1) };
  return { name: raw, range: "*" };
}
