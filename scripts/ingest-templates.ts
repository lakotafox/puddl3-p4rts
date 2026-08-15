#!/usr/bin/env bun
import { join, relative } from "node:path";
import { readFile, writeFile, mkdir, readdir, stat, copyFile, rm } from "node:fs/promises";
import { HOME } from "../src/lib/vault.ts";

/**
 * Ingest the PUDDL3-rebranded GetLayers templates from ~/foxbits-harvest/raw
 * into the vault as first-class assets:
 *   vault/getlayers/templates/<name>/files/**   (React templates — whole src+public)
 *   vault/getlayers/scenes/<name>/files/**      (vanilla three.js one-pagers)
 * plus a meta.json each, in the same shape the manifest indexes.
 *
 * Idempotent: re-copy is cheap and byte-stable; run after any harvest change.
 * User decisions encoded here: scenes stay whole/non-React (2026-08-15), and
 * the sidebar shows TEMPLATE NAMES while the content speaks PUDDL3.
 */

const RAW = join(process.env.HOME!, "foxbits-harvest/raw");
const LEDGER = join(process.env.HOME!, "foxbits-harvest/rebrand.json");
const OUT = join(HOME, "vault/getlayers");

const SCENES = new Set(["laocoon", "soda"]);
const SKIP = new Set(["node_modules", ".git", ".next", "package-lock.json", "bun.lock", "obsidian", ".claude"]);

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const title = (slug: string) =>
  slug.split("-").map((w) => (w === "ai" ? "AI" : w.charAt(0).toUpperCase() + w.slice(1))).join(" ");

/**
 * Static hosting cannot disambiguate template assets by Referer, so every
 * root-absolute asset ref becomes /t/<name>/… . Runs INSIDE ingest so a
 * re-ingest can never silently lose it (which it once did — live-only broken
 * images while dev's referer fallback masked it).
 */
async function namespaceAssets(filesDir: string, name: string) {
  const src = join(filesDir, "src");
  try { await stat(src); } catch { return; }
  const pat = /(["'`(])\/(assets|images|videos|fonts|models|draco|sounds|textures)\//g;
  let n = 0;
  const walkAll = async (d: string): Promise<string[]> => {
    const out: string[] = [];
    for (const e of await readdir(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) out.push(...(await walkAll(p)));
      else if (/\.(tsx|ts|jsx|js|css|json)$/.test(e.name)) out.push(p);
    }
    return out;
  };
  for (const f of await walkAll(src)) {
    const before = await readFile(f, "utf8");
    if (before.includes(`/t/${name}/`)) continue;
    const after = before.replace(pat, (_m, q, root) => `${q}/t/${name}/${root}/`);
    if (after !== before) { await writeFile(f, after, "utf8"); n++; }
  }
  if (n) console.log(`    namespaced ${n} files → /t/${name}/`);
}

async function main() {
  const ledger = JSON.parse(await readFile(LEDGER, "utf8"));
  const names = (await readdir(RAW, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name);
  let n = 0;
  for (const name of names) {
    const src = join(RAW, name, name);
    try { await stat(src); } catch { console.log(`  !! skip ${name} (no inner dir)`); continue; }
    const kind = SCENES.has(name) ? "scene" : "template";
    const destRoot = join(OUT, kind === "scene" ? "scenes" : "templates", name);
    const filesDir = join(destRoot, "files");
    await rm(filesDir, { recursive: true, force: true });
    const files = await walk(src);
    const fileRecs: { path: string }[] = [];
    for (const f of files) {
      const rel = relative(src, f);
      const dest = join(filesDir, rel);
      await mkdir(join(dest, ".."), { recursive: true });
      await copyFile(f, dest);
      fileRecs.push({ path: relative(HOME, dest) });
    }
    const led = ledger[name] ?? {};
    const meta = {
      id: `getlayers/${kind}/${name}`,
      source: "getlayers",
      kind,
      slug: name,
      name: title(name).replace(/\s+/g, ""),
      title: title(name),
      description: led.browserNote ?? `${title(name)} — GetLayers ${kind}, PUDDL3-branded`,
      tags: [kind, "getlayers", led.themeFit === "puddl3-direct" ? "puddl3" : "puddl3-universe"],
      tagSource: "derived",
      category: "Templates",
      keywords: [name, led.newBrandName ?? "PUDDL3"].filter(Boolean),
      variants: [{ id: "default", upstreamName: name, path: relative(HOME, filesDir), files: fileRecs, exports: [] }],
      defaultVariant: "default",
      dependencies: [],
      registryDependencies: [],
      exports: [],
      requires: { webgl: true, tailwind: kind === "template" ? 4 : 0 },
      paths: { root: relative(HOME, destRoot), raw: null, preview: null, demo: null },
      preview: { mode: "iframe" },
      brand: { contentBrand: led.newBrandName ?? "PUDDL3", tagline: led.tagline ?? "" },
      license: { spdx: "LicenseRef-GetLayers", redistributable: false, note: "GetLayers template, PUDDL3-rebranded; not redistributable" },
      upstream: { url: `https://www.getlayers.ai/?tab=templates&layer=${name}`, registry: "getlayers" },
      hash: "",
      fetchedAt: new Date().toISOString(),
      vaultVersion: 1,
    };
    if (kind === "template") await namespaceAssets(filesDir, name);
    await writeFile(join(destRoot, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf8");
    n++;
    console.log(`  ${kind}: ${name} (${fileRecs.length} files)`);
  }
  console.log(`✓ ingested ${n} getlayers assets — run: p4rts index`);
}

main();
