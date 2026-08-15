#!/usr/bin/env bun
import { join, basename } from "node:path";
import { readFile, writeFile, rename, readdir, stat } from "node:fs/promises";
import { HOME } from "../src/lib/vault.ts";

/**
 * Rename the vault itself ("the stockroom") to the foxbits names — user
 * decision 2026-08-14, pre-rename backup at backups/vault-upstream-2026-08-14.tar.gz.
 *
 * For every renamed component: directory, source filenames, and the code
 * identifiers inside (SplitText → LetterBreak, incl. SplitTextProps etc.), plus
 * meta.json. Each meta keeps `upstreamSlug`/`upstreamName`, and each variant
 * keeps its registry `upstreamName` — those are the threads that let
 * `foxbits sync` keep matching upstream without re-downloading the world.
 *
 * Idempotent: a component already at its new slug is skipped.
 */

const VAULT = join(HOME, "vault");

type Rename = { slug: string; source: string; oldTitle: string; newTitle: string; newSlug: string };

const pascal = (title: string) => title.split(/[^A-Za-z0-9]+/).filter(Boolean)
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");

async function exists(p: string) { try { await stat(p); return true; } catch { return false; } }

async function renameComponent(baseDir: string, r: Rename, fileStyle: "pascal" | "kebab") {
  const oldDir = join(baseDir, r.slug);
  const newDir = join(baseDir, r.newSlug);
  if (!(await exists(oldDir))) {
    if (await exists(newDir)) return "done";        // already renamed
    return "missing";
  }

  // Identifier roots: the export name recorded at ingest is authoritative.
  const meta = JSON.parse(await readFile(join(oldDir, "meta.json"), "utf8"));
  const oldPascal: string = meta.exports?.[0]?.name || pascal(meta.title || r.oldTitle);
  const newPascal = pascal(r.newTitle);

  await rename(oldDir, newDir);

  // Walk variant dirs: rename files and rewrite identifiers inside code.
  const walk = async (dir: string): Promise<string[]> => {
    const out: string[] = [];
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) out.push(...(await walk(p)));
      else out.push(p);
    }
    return out;
  };

  for (const f of await walk(newDir)) {
    const name = basename(f);
    if (name === "meta.json") continue;
    let target = f;
    // filenames: free = SplitText.tsx / SplitText.css ; starter = split-text.tsx
    if (fileStyle === "pascal" && name.startsWith(oldPascal)) {
      target = join(f.slice(0, f.length - name.length), name.replace(oldPascal, newPascal));
      await rename(f, target);
    } else if (fileStyle === "kebab" && name.startsWith(r.slug)) {
      target = join(f.slice(0, f.length - name.length), name.replace(r.slug, r.newSlug));
      await rename(f, target);
    }
    if (/\.(tsx|jsx|ts|js|css)$/.test(target)) {
      let src = await readFile(target, "utf8");
      const before = src;
      // identifier root + derived names (Props, Ref, ...): prefix match on a
      // word boundary — but NEVER inside a package-import line: a component can
      // share its name with a third-party API (free SplitText imports GSAP's
      // own "gsap/SplitText" plugin), and renaming that specifier breaks the
      // build on a nonexistent module.
      const isPkgImport = (line: string) => {
        const m = line.match(/from\s+["']([^"']+)["']/);
        return !!m && !m[1]!.startsWith(".") && !m[1]!.startsWith("@/");
      };
      src = src.split("\n").map((line) =>
        isPkgImport(line) ? line : line.replace(new RegExp(`\\b${oldPascal}`, "g"), newPascal)
      ).join("\n");
      // relative asset/import references by old file stem
      if (fileStyle === "pascal") src = src.split(`./${oldPascal}.css`).join(`./${newPascal}.css`);
      else src = src.split(`./${r.slug}.css`).join(`./${r.newSlug}.css`);
      if (src !== before) await writeFile(target, src, "utf8");
    }
  }

  // meta.json: new identity, upstream threads preserved.
  const rel = (p: string) => p; // stored paths are HOME-relative strings
  const swapPath = (p: string) => {
    let out = p.split(`/${r.slug}/`).join(`/${r.newSlug}/`);
    // bare terminal directory segment (paths.root has no trailing slash and no
    // extension, so neither of the other two patterns touches it)
    out = out.replace(new RegExp(`/${r.slug}$`), `/${r.newSlug}`);
    if (fileStyle === "pascal") out = out.replace(new RegExp(`/${oldPascal}(\\.[a-z]+)$`), `/${newPascal}$1`);
    else out = out.replace(new RegExp(`/${r.slug}(\\.[a-z]+)$`), `/${r.newSlug}$1`);
    return rel(out);
  };
  meta.upstreamSlug = meta.upstreamSlug ?? r.slug;
  meta.upstreamName = meta.upstreamName ?? oldPascal;
  meta.slug = r.newSlug;
  meta.name = newPascal;
  meta.title = r.newTitle;
  meta.id = meta.id.replace(`/${r.slug}`, `/${r.newSlug}`);
  meta.paths.root = swapPath(meta.paths.root);
  for (const v of meta.variants ?? []) {
    v.path = swapPath(v.path);
    for (const f of v.files ?? []) f.path = swapPath(f.path);
    for (const ex of v.exports ?? []) {
      ex.name = ex.name.replace(new RegExp(`^${oldPascal}`), newPascal);
      ex.file = swapPath(ex.file);
    }
    // v.upstreamName stays — it is the registry fetch key.
  }
  for (const ex of meta.exports ?? []) {
    ex.name = ex.name.replace(new RegExp(`^${oldPascal}`), newPascal);
    ex.file = swapPath(ex.file);
  }
  await writeFile(join(newDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf8");
  return "renamed";
}

/**
 * Pro blocks import starter components by slug (`@/components/react-bits/flicker`
 * in auth-1). Those specifiers must follow the starter rename or the path is
 * dead — both in the gallery's vite alias and in a user project after
 * `foxbits add`. Idempotent: an already-new slug matches nothing in the map.
 */
async function retargetCrossRefs(renames: Rename[]) {
  const starterMap = new Map(renames.filter((r) => r.source === "rb-starter").map((r) => [r.slug, r.newSlug]));
  const walk = async (dir: string): Promise<string[]> => {
    const out: string[] = [];
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) out.push(...(await walk(p)));
      else if (/\.(tsx|jsx|ts|js)$/.test(e.name)) out.push(p);
    }
    return out;
  };
  const pascalByOldSlug = new Map(renames.filter((r) => r.source === "rb-starter")
    .map((r) => [r.slug, { old: pascal(r.oldTitle), neu: pascal(r.newTitle) }]));
  let hits = 0;
  for (const f of await walk(join(VAULT, "reactbits-pro"))) {
    let src = await readFile(f, "utf8");
    const before = src;
    const touched: { old: string; neu: string }[] = [];
    src = src.replace(/@\/components\/react-bits\/([a-z0-9-]+)/g, (m, slug) => {
      if (!starterMap.has(slug)) return m;
      touched.push(pascalByOldSlug.get(slug)!);
      return `@/components/react-bits/${starterMap.get(slug)}`;
    });
    // The import binding and its JSX usages must follow the export rename
    // (auth-1: `import { Flicker }` → `{ TwinkleField }`, `<Flicker` → …).
    for (const { old, neu } of touched) src = src.replace(new RegExp(`\\b${old}\\b`, "g"), neu);
    if (src !== before) { await writeFile(f, src, "utf8"); hits++; }
  }
  console.log(`  cross-refs: ${hits} pro files retargeted`);
}

async function main() {
  const renames: Rename[] = JSON.parse(await readFile(join(HOME, "scripts/data/renames.json"), "utf8"));
  const tally = { renamed: 0, done: 0, missing: 0 };
  for (const r of renames) {
    const base = r.source === "rb-free"
      ? join(VAULT, "reactbits-free/components")
      : join(VAULT, "reactbits-starter/components");
    const res = await renameComponent(base, r, r.source === "rb-free" ? "pascal" : "kebab");
    tally[res as keyof typeof tally]++;
    if (res === "missing") console.log(`  !! missing: ${r.source}/${r.slug}`);
  }
  await retargetCrossRefs(renames);
  console.log(`✓ stockroom: ${tally.renamed} renamed, ${tally.done} already done, ${tally.missing} missing`);
}

main();
