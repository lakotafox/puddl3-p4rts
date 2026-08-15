#!/usr/bin/env bun
import { join, relative, dirname } from "node:path";
import { readFile, writeFile, mkdir, readdir, stat, copyFile, rm } from "node:fs/promises";
import { HOME } from "../src/lib/vault.ts";

/**
 * Production site build: vite build + everything the dev middlewares provide,
 * baked as static files —
 *   dist/scene/<name>/**        vanilla scenes (importmap injected, pointing at
 *   dist/three-vendor/**        a copied three build, since /@fs dies in prod)
 *   dist/t/<name>/**            each template's public/ under its namespace
 * The whole site then serves from any static host (Netlify).
 */

const DIST = join(HOME, "gallery/dist");
const GL = join(HOME, "vault/getlayers");
const SKIP = new Set(["node_modules", ".git"]);

async function copyTree(src: string, dest: string) {
  for (const e of await readdir(src, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const s = join(src, e.name);
    const d = join(dest, e.name);
    if (e.isDirectory()) { await mkdir(d, { recursive: true }); await copyTree(s, d); }
    else { await mkdir(dirname(d), { recursive: true }); await copyFile(s, d); }
  }
}

async function main() {
  // 1. vite build
  const proc = Bun.spawn(["bun", "run", "build"], { cwd: join(HOME, "gallery"), stdout: "inherit", stderr: "inherit" });
  if ((await proc.exited) !== 0) throw new Error("vite build failed");

  // 2. three for the scenes' importmap
  const threeSrc = join(HOME, "node_modules/three");
  await mkdir(join(DIST, "three-vendor/build"), { recursive: true });
  await copyFile(join(threeSrc, "build/three.module.js"), join(DIST, "three-vendor/build/three.module.js"));
  await copyTree(join(threeSrc, "examples/jsm"), join(DIST, "three-vendor/examples/jsm"));

  const IMPORTMAP = `<script type="importmap">${JSON.stringify({
    imports: { three: "/three-vendor/build/three.module.js", "three/examples/jsm/": "/three-vendor/examples/jsm/" },
  })}</script>`;

  // 3. scenes, whole, with the importmap baked into their html
  for (const name of await readdir(join(GL, "scenes"))) {
    const src = join(GL, "scenes", name, "files");
    try { await stat(src); } catch { continue; }
    const dest = join(DIST, "scene", name);
    await mkdir(dest, { recursive: true });
    await copyTree(src, dest);
    const html = join(dest, "index.html");
    try {
      let h = await readFile(html, "utf8");
      if (!h.includes("importmap")) h = h.replace(/<script type="module" src="(?!http)/, `${IMPORTMAP}\n<script type="module" src="`);
      await writeFile(html, h, "utf8");
    } catch { /* scene without index.html */ }
  }

  // 4. template publics under their namespace
  for (const name of await readdir(join(GL, "templates"))) {
    const pub = join(GL, "templates", name, "files/public");
    try { await stat(pub); } catch { continue; }
    await copyTree(pub, join(DIST, "t", name));
  }

  const size = await dirSize(DIST);
  console.log(`✓ site built: gallery/dist (${(size / 1e6).toFixed(0)} MB)`);
}

async function dirSize(d: string): Promise<number> {
  let n = 0;
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) n += await dirSize(p);
    else n += (await stat(p)).size;
  }
  return n;
}

main();
