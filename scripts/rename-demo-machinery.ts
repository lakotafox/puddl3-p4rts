#!/usr/bin/env bun
import { join, basename, dirname } from "node:path";
import { readFile, writeFile, rename, readdir, stat } from "node:fs/promises";
import { HOME } from "../src/lib/vault.ts";

/**
 * Pass 2 of the no-old-names scrub: the demo/loader MACHINERY that was
 * deliberately left upstream-named while it was "internal" — the user's rule
 * is now "no old names anywhere; the ref sheet is the only tie" (2026-08-15).
 *
 * Per free component: the demo file pair (AntigravityDemo.jsx → RepelFieldDemo.jsx),
 * the code-loader file (antigravityCode.js → repelFieldCode.js) and its export
 * const, the demo's import binding/usages, Components.js loader import paths,
 * and meta.json's demo.name. Also repairs the scrub's collateral: single-word
 * old slugs doubled as loader binding names, so `import { antigravity }` had
 * become the invalid `import { repel-field }`.
 *
 * Idempotent: everything keys off the OLD names; once gone, re-runs no-op.
 */

const VENDOR = join(HOME, "vendor/reactbits");
const VAULT = join(HOME, "vault");

type Rename = { slug: string; source: string; oldTitle: string; newTitle: string; newSlug: string };

const camel = (kebab: string) =>
  kebab.split("-").map((w, i) => (i ? w.charAt(0).toUpperCase() + w.slice(1) : w)).join("");
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
async function exists(p: string) { try { await stat(p); return true; } catch { return false; } }

async function main() {
  const renames: Rename[] = JSON.parse(await readFile(join(HOME, "scripts/data/renames.json"), "utf8"));
  const free = renames.filter((r) => r.source === "rb-free");
  let demosRenamed = 0, loadersRenamed = 0;
  const renamedStems: [string, string][] = [];

  for (const r of free) {
    const metaPath = join(VAULT, "reactbits-free/components", r.newSlug, "meta.json");
    if (!(await exists(metaPath))) { console.log(`  !! no meta: ${r.newSlug}`); continue; }
    const meta = JSON.parse(await readFile(metaPath, "utf8"));
    const newPascal: string = meta.name;
    const demoName: string | undefined = meta.demo?.name;
    if (!demoName || demoName === newPascal) continue;

    // locate the demo pair
    let demoDir: string | null = null;
    for (const cat of await readdir(join(VENDOR, "demo"))) {
      const d = join(VENDOR, "demo", cat);
      if ((await stat(d)).isDirectory() && (await exists(join(d, `${demoName}Demo.jsx`)))) { demoDir = d; break; }
    }
    if (!demoDir) { console.log(`  !! no demo file: ${demoName} (${r.newSlug})`); continue; }

    const demoJsx = join(demoDir, `${demoName}Demo.jsx`);
    let src = await readFile(demoJsx, "utf8");

    // the loader import: binding may be intact camelCase OR scrub-damaged kebab
    const im = src.match(/import \{ ([\w-]+) \} from '([^']*\/constants\/code\/[^']*\/)([\w]+)Code'/);
    const camelNew = camel(r.newSlug);
    if (im) {
      const [, binding, , loaderBase] = im as unknown as [string, string, string, string];
      // Exactly two usage sites exist per demo. A broad boundary replace would
      // also hit the scrubbed kebab slug inside class names and prose, so stay
      // surgical: the import binding and the codeObject pass-through.
      src = src.replace(`import { ${binding} } from`, `import { ${camelNew} } from`);
      src = src.replace(`codeObject={${binding}}`, `codeObject={${camelNew}}`);
      src = src.replace(new RegExp(`${esc(loaderBase)}Code`, "g"), `${camelNew}Code`);
      // loader file: rename + export const
      const loaderPath = join(VENDOR, "constants/code", basename(demoDir), `${loaderBase}Code.js`);
      if (await exists(loaderPath)) {
        let loader = await readFile(loaderPath, "utf8");
        const ex = loader.match(/export const (\w+) =/);
        if (ex) loader = loader.replace(new RegExp(`(?<![A-Za-z0-9_])${esc(ex[1]!)}(?![A-Za-z0-9_])`, "g"), camelNew);
        await writeFile(join(VENDOR, "constants/code", basename(demoDir), `${camelNew}Code.js`), loader, "utf8");
        if (`${loaderBase}Code.js` !== `${camelNew}Code.js`) {
          const { unlink } = await import("node:fs/promises");
          await unlink(loaderPath);
        }
        loadersRenamed++;
      } else {
        console.log(`  !! loader not found: ${loaderPath}`);
      }
    }

    // demo compounds: identifiers + ./XxxDemo.css self-import
    src = src.replace(new RegExp(`${esc(demoName)}Demo`, "g"), `${newPascal}Demo`);
    await writeFile(demoJsx, src, "utf8");
    await rename(demoJsx, join(demoDir, `${newPascal}Demo.jsx`));
    const demoCss = join(demoDir, `${demoName}Demo.css`);
    if (await exists(demoCss)) await rename(demoCss, join(demoDir, `${newPascal}Demo.css`));
    renamedStems.push([demoName, newPascal]);
    demosRenamed++;

    // meta: the thread demo.tsx / sync demos use to find the file
    meta.demo.name = newPascal;
    await writeFile(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");
  }

  // Components.js loader import paths: any '../demo/<Cat>/<X>Demo' that no
  // longer exists on disk is rewritten to the renamed file that does.
  const demoFiles = new Set<string>();
  const stems = new Map<string, string>(); // old demo stem -> new stem (this run's renames)
  for (const cat of await readdir(join(VENDOR, "demo"))) {
    const d = join(VENDOR, "demo", cat);
    if ((await stat(d)).isDirectory()) for (const f of await readdir(d)) demoFiles.add(`${cat}/${f}`);
  }
  for (const [oldStem, newStem] of renamedStems) stems.set(oldStem, newStem);
  const compPath = join(VENDOR, "constants/Components.js");
  let comp = await readFile(compPath, "utf8");
  let pathFixes = 0;
  comp = comp.replace(/\.\.\/demo\/([A-Za-z]+)\/([A-Za-z0-9]+)Demo/g, (m, cat, stem) => {
    if (demoFiles.has(`${cat}/${stem}Demo.jsx`)) return m;         // still valid
    const neu = stems.get(stem);
    if (neu && demoFiles.has(`${cat}/${neu}Demo.jsx`)) { pathFixes++; return `../demo/${cat}/${neu}Demo`; }
    return m;
  });
  await writeFile(compPath, comp, "utf8");

  console.log(`✓ machinery: ${demosRenamed} demos, ${loadersRenamed} loaders, ${pathFixes} loader paths in Components.js`);
}

main();
