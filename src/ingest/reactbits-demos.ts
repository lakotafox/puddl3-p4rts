import { join } from "node:path";
import { HOME, VAULT, walk, readJson, writeJson, rel } from "../lib/vault.ts";
import type { AssetRecord } from "../lib/types.ts";

/**
 * Link each free component to react-bits' own demo file.
 *
 * The gallery renders those demos directly (see gallery/src/demo.tsx), which is
 * what makes the preview identical to reactbits.dev — stage size, default props,
 * Customize controls and prop tables all come from upstream rather than being
 * reconstructed here.
 */

const VENDOR = join(HOME, "vendor/reactbits/demo");

const kebab = (s: string) =>
  s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();

const CATEGORY_LABEL: Record<string, string> = {
  TextAnimations: "Text Animations",
  Animations: "Animations",
  Components: "Components",
  Backgrounds: "Backgrounds",
};

export async function linkDemos() {
  const files = await walk(VENDOR, (p) => p.endsWith("Demo.jsx"));
  console.log(`→ ${files.length} vendored demo files`);

  // demoName -> {category}
  const byKebab = new Map<string, { demo: string; category: string }>();
  for (const f of files) {
    const parts = f.split("/");
    const demo = parts[parts.length - 1]!.replace(/Demo\.jsx$/, "");
    const category = CATEGORY_LABEL[parts[parts.length - 2]!] ?? parts[parts.length - 2]!;
    byKebab.set(kebab(demo), { demo, category });
  }

  const metas = await walk(join(VAULT, "reactbits-free"), (p) => p.endsWith("/meta.json"));
  let linked = 0;
  const unmatched: string[] = [];

  for (const m of metas) {
    const rec = await readJson<AssetRecord>(m);
    if (!rec) continue;
    // Match on the slug, then on the PascalCase name for the handful whose
    // kebab-casing differs (ASCIIText -> asciitext vs ascii-text).
    const hit =
      byKebab.get(rec.slug) ??
      byKebab.get(kebab(rec.name)) ??
      [...byKebab.values()].find((v) => v.demo.toLowerCase() === rec.name.toLowerCase());

    if (!hit) { unmatched.push(rec.slug); continue; }

    rec.demo = { name: hit.demo, path: rel(join(VENDOR, "..")) };
    rec.category = hit.category;
    if (!rec.tags.includes(hit.category.toLowerCase())) rec.keywords = [...new Set([...rec.keywords, hit.category])];
    rec.preview = { mode: "live", note: "react-bits demo" };
    await writeJson(m, rec);
    linked++;
  }

  console.log(`✓ demos linked: ${linked}/${metas.length}`);
  if (unmatched.length) console.log(`  unmatched (${unmatched.length}): ${unmatched.join(", ")}`);
  return { linked, unmatched };
}
