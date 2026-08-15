#!/usr/bin/env bun
import { join, basename, dirname } from "node:path";
import { readFile, writeFile, rename, readdir, stat } from "node:fs/promises";
import { HOME } from "../src/lib/vault.ts";

/**
 * Phase B of the full rename: the vendored variant trees that feed the FREE
 * site's Code tab (`content/`, `tailwind/`, `ts-default/`, `ts-tailwind/`) plus
 * the demo + code-loader files that reference them by path and identifier.
 * After this, the code a visitor sees and copies says LetterBreak, matching the
 * page title and what `foxbits add` ships from the (already renamed) vault.
 *
 * Idempotent like rebrand.ts: after a re-vendor the old names are back and the
 * pass re-applies; on a clean tree every step is a no-op.
 *
 * Authoritative Pascal pairs come from the renamed vault's meta.json
 * (upstreamName ↔ name) — NOT pascal(title), which mis-cases ASCIIText-style
 * names.
 *
 * Guards carried over from rename-stockroom.ts (learned the hard way):
 * - never rewrite identifiers on a line importing from a real package
 *   (free SplitText imports GSAP's own "gsap/SplitText" plugin);
 * - in demo files, only apply the pascals of components that file actually
 *   imports from a tree path, so generic words in other demos stay untouched.
 */

const VENDOR = join(HOME, "vendor/reactbits");
const TREES = ["content", "tailwind", "ts-default", "ts-tailwind"];
const INTERNAL = /^(\.|@\/|@content|@tailwind|@ts-default|@ts-tailwind)/;

type Rename = { slug: string; source: string; oldTitle: string; newTitle: string; newSlug: string };

async function exists(p: string) { try { await stat(p); return true; } catch { return false; } }

const isPkgImport = (line: string) => {
  const m = line.match(/from\s+["']([^"']+)["']/);
  return !!m && !INTERNAL.test(m[1]!);
};

const swapIdents = (src: string, oldP: string, newP: string) =>
  src.split("\n").map((line) =>
    isPkgImport(line) ? line : line.replace(new RegExp(`\\b${oldP}`, "g"), newP)
  ).join("\n");

async function main() {
  const renames: Rename[] = JSON.parse(await readFile(join(HOME, "scripts/data/renames.json"), "utf8"));
  const free = renames.filter((r) => r.source === "rb-free");

  // oldPascal ↔ newPascal from the renamed vault's meta (exact upstream casing).
  const pairs: { old: string; neu: string }[] = [];
  for (const r of free) {
    const metaPath = join(HOME, "vault/reactbits-free/components", r.newSlug, "meta.json");
    if (!(await exists(metaPath))) { console.log(`  !! no vault meta for ${r.newSlug}`); continue; }
    const meta = JSON.parse(await readFile(metaPath, "utf8"));
    if (meta.upstreamName && meta.name) pairs.push({ old: meta.upstreamName, neu: meta.name });
  }

  // ── 1. the four trees: dirs, filenames, identifiers ──────────────────────
  let dirs = 0;
  for (const tree of TREES) {
    const treeDir = join(VENDOR, tree);
    if (!(await exists(treeDir))) continue;
    for (const cat of await readdir(treeDir, { withFileTypes: true })) {
      if (!cat.isDirectory()) continue;
      const catDir = join(treeDir, cat.name);
      for (const { old, neu } of pairs) {
        const oldDir = join(catDir, old);
        if (!(await exists(oldDir))) continue;
        for (const f of await readdir(oldDir)) {
          const p = join(oldDir, f);
          let target = p;
          if (f.startsWith(old)) {
            target = join(oldDir, f.replace(old, neu));
            await rename(p, target);
          }
          if (/\.(tsx|jsx|ts|js|css)$/.test(target)) {
            const src = await readFile(target, "utf8");
            let out = swapIdents(src, old, neu);
            out = out.split(`./${old}.css`).join(`./${neu}.css`);
            if (out !== src) await writeFile(target, out, "utf8");
          }
        }
        await rename(oldDir, join(catDir, neu));
        dirs++;
      }
    }
  }
  console.log(`  trees: ${dirs} component dirs renamed`);

  // ── 2. referencing files: demos + code loaders ───────────────────────────
  const walk = async (dir: string): Promise<string[]> => {
    const out: string[] = [];
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) out.push(...(await walk(p)));
      else if (/\.(jsx|js|tsx|ts)$/.test(e.name)) out.push(p);
    }
    return out;
  };
  // Everything in the vendored site can reference a tree — not just demos and
  // code loaders (Header/CTA/LiveDemo/ProPage mount live components as page
  // chrome). Skip the trees themselves (part 1 handled them) and tools/ (Tools
  // is stripped; unreferenced, kept upstream-exact for clean re-vendors).
  const SKIP_DIRS = new Set([...TREES, "tools", "node_modules", ".git"]);
  const refFiles = (
    await Promise.all(
      (await readdir(VENDOR, { withFileTypes: true }))
        .filter((e) => e.isDirectory() && !SKIP_DIRS.has(e.name))
        .map((e) => walk(join(VENDOR, e.name)))
    )
  ).flat();
  const treeRef = (p: string) =>
    /(@content|@tailwind|@ts-default|@ts-tailwind|\/(content|tailwind|ts-default|ts-tailwind)\/)/.test(p);

  let refs = 0;
  for (const f of refFiles) {
    let src = await readFile(f, "utf8");
    const before = src;
    // which renamed components does this file pull from a tree? The doubled
    // /Name/Name segment only occurs in tree paths, and the file must reference
    // a tree at all — together that rules out coincidental prose matches.
    if (!treeRef(src)) continue;
    const active = pairs.filter(({ old }) =>
      new RegExp(`[/]${old}[/]${old}(\\.[a-z]+)?(\\?raw)?["']`).test(src));
    for (const { old, neu } of active) {
      // the tree path segments…
      src = src.replace(new RegExp(`([/])${old}([/])${old}(\\.|['"])`, "g"), `$1${neu}$2${neu}$3`);
      // …and every identifier/usage/snippet in the file (package lines excluded).
      // `(?!Demo\b)` keeps the demo-machinery compounds (PixelSwapDemo, its
      // ./PixelSwapDemo.css) on their upstream names — demo FILES are not
      // renamed, so a renamed self-reference is a dead path.
      src = src.split("\n").map((line) =>
        isPkgImport(line) ? line : line.replace(new RegExp(`\\b${old}(?!Demo\\b)`, "g"), neu)
      ).join("\n");
    }
    if (src !== before) { await writeFile(f, src, "utf8"); refs++; }
  }
  console.log(`  refs: ${refs} demo/loader files rewritten`);
}

main();
