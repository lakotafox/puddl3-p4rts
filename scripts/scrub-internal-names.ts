#!/usr/bin/env bun
import { join } from "node:path";
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { HOME } from "../src/lib/vault.ts";

/**
 * Scrub the LAST layer of old names out of component source: internal CSS
 * class names, @keyframes, data-attributes, CSS variables and className
 * strings still carry the old kebab slug (`.aurora-container` inside
 * Polar Glow). Self-consistent, invisible on the site — but the user's rule is
 * "no old names anywhere; the ref sheet is the only tie" (2026-08-15).
 *
 * Replaces the boundary-delimited old slug with the new slug inside each
 * component's OWN files: vault variants, the vendored tree copies (free), and
 * the component's demo pair. Also swaps the old spaced Title in comments.
 *
 * Deliberately NOT touched here (handled by rename-demo-machinery.ts):
 * camelCase compounds (`antigravityCode`) — the token is half of an
 * identifier that must be renamed together with its file.
 *
 * Idempotent: after the first run the old tokens are gone; after a re-vendor
 * they are back and the pass re-applies.
 */

const VAULT = join(HOME, "vault");
const VENDOR = join(HOME, "vendor/reactbits");
const TREES = ["content", "tailwind", "ts-default", "ts-tailwind"];

type Rename = { slug: string; source: string; oldTitle: string; newTitle: string; newSlug: string };

async function exists(p: string) { try { await stat(p); return true; } catch { return false; } }

async function walkFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkFiles(p)));
    else if (/\.(tsx|jsx|ts|js|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function scrub(src: string, oldSlug: string, newSlug: string, oldTitle: string, newTitle: string) {
  // Kebab token: not embedded in a longer alphanumeric run, and NOT the start
  // of a camel compound (`antigravityCode`) — a following capital letter means
  // it is half an identifier that pass 2 renames with its file.
  const kebab = new RegExp(`(?<![A-Za-z0-9])${esc(oldSlug)}(?![A-Za-z0-9])`, "g");
  // Old title as prose (comments, headings): case-sensitive, word-bounded.
  const title = new RegExp(`(?<![A-Za-z0-9])${esc(oldTitle)}(?![A-Za-z0-9])`, "g");
  return src
    .split("\n")
    .map((line) => {
      // package-import invariant: never rewrite a real npm specifier
      const m = line.match(/from\s+["']([^"']+)["']/);
      if (m && !m[1]!.startsWith(".") && !m[1]!.startsWith("@/")) return line;
      return line.replace(kebab, newSlug).replace(title, newTitle);
    })
    .join("\n");
}

async function main() {
  const renames: Rename[] = JSON.parse(await readFile(join(HOME, "scripts/data/renames.json"), "utf8"));
  let filesTouched = 0;

  for (const r of renames) {
    const base = r.source === "rb-free"
      ? join(VAULT, "reactbits-free/components", r.newSlug)
      : join(VAULT, "reactbits-starter/components", r.newSlug);
    if (!(await exists(base))) { console.log(`  !! missing: ${r.source}/${r.newSlug}`); continue; }

    const files = await walkFiles(base);

    if (r.source === "rb-free") {
      const meta = JSON.parse(await readFile(join(base, "meta.json"), "utf8"));
      // tree copies mirror the vault source and must stay identical
      for (const t of TREES) {
        const treeDir = join(VENDOR, t);
        if (!(await exists(treeDir))) continue;
        for (const cat of await readdir(treeDir)) {
          const d = join(treeDir, cat, meta.name);
          if (await exists(d)) files.push(...(await walkFiles(d)));
        }
      }
      // demo pair (file itself keeps its name until pass 2)
      const demoName: string | undefined = meta.demo?.name;
      if (demoName) {
        for (const cat of await readdir(join(VENDOR, "demo"))) {
          const d = join(VENDOR, "demo", cat);
          if (!(await stat(d)).isDirectory()) continue;
          for (const f of await readdir(d)) {
            if (f.startsWith(`${demoName}Demo`)) files.push(join(d, f));
          }
        }
      }
    }

    for (const p of files) {
      const src = await readFile(p, "utf8");
      const out = scrub(src, r.slug, r.newSlug, r.oldTitle, r.newTitle);
      if (out !== src) { await writeFile(p, out, "utf8"); filesTouched++; }
    }
  }
  console.log(`✓ scrub: ${filesTouched} files cleaned`);
}

main();
