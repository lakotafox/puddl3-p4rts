#!/usr/bin/env bun
import { join } from "node:path";
import { readFile, writeFile, rename, readdir, stat } from "node:fs/promises";
import { HOME } from "../src/lib/vault.ts";

/**
 * Adopt the site as ours: move the frontend out of `site/` and into
 * `site/`, then rewrite every reference to it across the repo.
 *
 * The directory is the app itself — gallery/src/main.tsx does
 * `import App from "@/App"` and `@` resolves here — so this is a rename, not a
 * deletion. References live in five shapes, all handled below:
 *   1. Vite aliases + build config      gallery/vite.config.ts
 *   2. CSS imports and @source globs    gallery/src/*.css
 *   3. import.meta.glob patterns        gallery/src/*.tsx
 *   4. Script constants                 scripts/*.ts  (VENDOR = join(HOME, …))
 *   5. Recorded asset paths             vault/**\/meta.json, vault/manifest.json
 *
 * Idempotent: once `site/` exists and the old directory is gone, re-running is
 * a no-op apart from sweeping any stale string that reappears (e.g. after a
 * script that hardcodes the old path is edited back in).
 *
 * Verify with: cd gallery && bun run build
 */

// Assembled, not written literally: this script sweeps the whole repo for the
// old path, and a plain literal here would rewrite its own source on the first
// run (it did) — leaving OLD_DIR === NEW_DIR and the script inert.
const OLD_DIR = ["vendor", "reactbits"].join("/");
const NEW_DIR = "site";

const SKIP = new Set(["node_modules", ".git", "dist", "_raw", "backups"]);
const TEXT = /\.(ts|tsx|js|jsx|json|css|html|md)$/;

async function walk(dir: string, out: string[] = []): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (SKIP.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (TEXT.test(e.name)) out.push(p);
  }
  return out;
}

const exists = async (p: string) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

async function main() {
  const oldPath = join(HOME, OLD_DIR);
  const newPath = join(HOME, NEW_DIR);

  // 1. move the tree (git sees a rename because the contents are unchanged)
  if (await exists(oldPath)) {
    if (await exists(newPath)) throw new Error(`${NEW_DIR}/ already exists — resolve by hand`);
    await rename(oldPath, newPath);
    console.log(`  moved ${OLD_DIR}/ → ${NEW_DIR}/`);
  } else if (!(await exists(newPath))) {
    throw new Error(`neither ${OLD_DIR}/ nor ${NEW_DIR}/ exists — nothing to adopt`);
  }

  // 2. rewrite every reference. A plain path-segment swap keeps relative
  //    prefixes correct: "../../site/styles.css" → "../../site/…".
  const files = await walk(HOME);
  let changed = 0;
  let hits = 0;
  for (const f of files) {
    const before = await readFile(f, "utf8");
    if (f.endsWith("adopt-site.ts")) continue; // never rewrite this script
    if (!before.includes(OLD_DIR)) continue;
    const after = before.split(OLD_DIR).join(NEW_DIR);
    hits += before.split(OLD_DIR).length - 1;
    await writeFile(f, after, "utf8");
    changed++;
  }
  console.log(`  rewrote ${hits} references across ${changed} files`);

  // 3. the vendored dir also held an empty parent once its only child moved
  const vendorParent = join(HOME, "vendor");
  if (await exists(vendorParent)) {
    const left = (await readdir(vendorParent)).filter((n) => !n.startsWith("."));
    if (left.length === 0) console.log("  note: vendor/ is now empty and can be removed");
    else console.log(`  vendor/ still holds: ${left.join(", ")}`);
  }

  console.log(`✓ site adopted as ${NEW_DIR}/ — verify: cd gallery && bun run build`);
}

main();
