import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { HOME, VAULT, RAW, walk, readJson, writeJson, parseDep } from "../lib/vault.ts";
import { reconcileDeps } from "../lib/imports.ts";
import { extractExports, primaryExport } from "../lib/exports.ts";
import type { AssetRecord, RegistryItem } from "../lib/types.ts";

/**
 * Recompute derived fields (dependencies, exports) from what's already on disk.
 *
 * This is why verbatim upstream JSON is kept in vault/_raw: when a normalizer
 * bug is fixed, the whole vault can be corrected in seconds instead of
 * re-fetching 859 rate-limited items.
 */
export async function renormalize() {
  const metas = await walk(VAULT, (p) => p.endsWith("/meta.json"));
  let changed = 0;

  for (const m of metas) {
    const rec = await readJson<AssetRecord>(m);
    if (!rec) continue;
    const before = JSON.stringify(rec.dependencies) + JSON.stringify(rec.exports);
    const union = new Map<string, { name: string; range: string }>();

    for (const v of rec.variants) {
      // Prefer the raw registry item's declared deps; fall back to what's stored.
      const rawDir = rec.source === "rb-free" ? "reactbits-free"
        : rec.source === "rb-starter" ? "reactbits-starter" : "reactbits-pro";
      const raw = await readJson<RegistryItem>(join(RAW, rawDir, `${v.upstreamName}.json`));
      const declared = (raw?.dependencies ?? v.dependencies.map((d) => `${d.name}@${d.range}`)).map(
        (d) => (typeof d === "string" ? parseDep(d) : d),
      );

      let src = "";
      const exps = [];
      for (const f of v.files) {
        if (!/\.(tsx?|jsx?)$/.test(f.path)) continue;
        try {
          const text = await readFile(join(HOME, f.path), "utf8");
          src += text + "\n";
          exps.push(...extractExports(text, f.path));
        } catch { /* file missing — leave deps as declared */ }
      }

      v.dependencies = reconcileDeps(declared, src);
      if (exps.length) v.exports = exps;
      for (const d of v.dependencies) union.set(d.name, d);
    }

    rec.dependencies = [...union.values()].sort((a, b) => a.name.localeCompare(b.name));
    const dv = rec.variants.find((v) => v.id === rec.defaultVariant) ?? rec.variants[0];
    const isMd = ["skill", "prompt", "recipe"].includes(rec.kind);
    if (dv && !isMd) rec.exports = [primaryExport(dv.exports, rec.slug, dv.files[0]?.path ?? "")];

    if (JSON.stringify(rec.dependencies) + JSON.stringify(rec.exports) !== before) {
      await writeJson(m, rec);
      changed++;
    }
  }

  console.log(`✓ renormalized ${metas.length} assets, ${changed} changed`);
}
