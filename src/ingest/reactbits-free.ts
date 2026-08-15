import { join } from "node:path";
import { fetchJson, pool } from "../lib/http.ts";
import { extractExports, primaryExport } from "../lib/exports.ts";
import { reconcileDeps } from "../lib/imports.ts";
import {
  VAULT, RAW, hashFiles, journal, parseDep, rel, writeIfChanged, writeJson, sha256, normalizeContent,
} from "../lib/vault.ts";
import type { AssetRecord, Dep, RegistryItem, Variant } from "../lib/types.ts";
import { VAULT_VERSION } from "../lib/types.ts";

const BASE = "https://reactbits.dev/r";
const WEBGL = new Set(["three", "ogl", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing", "postprocessing", "maath", "gl-matrix"]);

const kebab = (s: string) =>
  s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();

/** "BlurText-TS-TW" -> {base:"BlurText", variant:"ts-tw", lang:"ts", styling:"tw"} */
function splitName(name: string) {
  const m = name.match(/^(.*)-(JS|TS)-(CSS|TW)$/);
  if (!m) return null;
  return {
    base: m[1]!,
    variant: `${m[2]!.toLowerCase()}-${m[3]!.toLowerCase()}`,
    lang: m[2]!.toLowerCase() as "ts" | "js",
    styling: m[3]!.toLowerCase() as "tw" | "css",
  };
}

/** The free registry ships no tags, so derive them from deps and title. */
function deriveTags(title: string, deps: Dep[]): string[] {
  const tags = new Set<string>();
  const t = title.toLowerCase();
  if (deps.some((d) => WEBGL.has(d.name))) tags.add("webgl");
  if (deps.some((d) => d.name === "gsap" || d.name === "@gsap/react")) tags.add("gsap");
  if (deps.some((d) => d.name === "motion")) tags.add("motion");
  for (const [re, tag] of [
    [/text|type|word|letter|char|caption/, "text"],
    [/cursor|pointer|mouse/, "cursor"],
    [/background|bg|aurora|orb|beam|grid|noise|dither|wave|particle|silk|hyperspeed|threads|lightning/, "background"],
    [/card|menu|nav|dock|carousel|gallery|list|stack|slider|pill|chip|tab|modal|accordion|form|button/, "ui"],
    [/scroll|parallax|reveal|marquee|infinite/, "scroll"],
    [/glitch|blur|fade|shiny|glare|gradient|shimmer|sparkle|glow/, "effect"],
    [/animat|spring|bounce|elastic|magnet|tilt|hover/, "animation"],
    [/3d|model|sphere|cube|globe|planet/, "3d"],
  ] as const) {
    if (re.test(t)) tags.add(tag);
  }
  if (!tags.size) tags.add("misc");
  return [...tags].sort();
}

export async function ingestFree(opts: { only?: string; force?: boolean } = {}) {
  console.log("→ fetching free registry index …");
  const index = await fetchJson<{ items: { name: string }[] }>(`${BASE}/registry.json`);
  let names = index.items.map((i) => i.name);
  if (opts.only) {
    const re = new RegExp(opts.only, "i");
    names = names.filter((n) => re.test(n));
  }
  console.log(`  ${names.length} registry items (${new Set(names.map((n) => splitName(n)?.base)).size} components)`);

  // reactbits.dev has no bot protection — verified 200 while pro was challenged.
  let done = 0;
  const items = await pool(names, 10, async (name) => {
    const item = await fetchJson<RegistryItem>(`${BASE}/${name}.json`);
    if (++done % 100 === 0) console.log(`  fetched ${done}/${names.length}`);
    return item;
  });

  // Group the 4 variants back into one component.
  const groups = new Map<string, RegistryItem[]>();
  for (const item of items) {
    const sp = splitName(item.name);
    if (!sp) {
      console.warn(`  ! unexpected name shape, skipping: ${item.name}`);
      continue;
    }
    (groups.get(sp.base) ?? groups.set(sp.base, []).get(sp.base)!).push(item);
  }

  const records: AssetRecord[] = [];
  let written = 0;

  for (const [base, group] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
    const slug = kebab(base);
    const root = join(VAULT, "reactbits-free/components", slug);
    const variants: Variant[] = [];
    const allDeps = new Map<string, Dep>();

    for (const item of [...group].sort((a, b) => a.name.localeCompare(b.name))) {
      const sp = splitName(item.name)!;
      const vdir = join(root, "variants", sp.variant);
      const vsrc = (item.files ?? []).map((f) => f.content).join("\n");
      const deps = reconcileDeps((item.dependencies ?? []).map(parseDep), vsrc);
      for (const d of deps) allDeps.set(d.name, d);

      const files = [];
      const exportRecs = [];
      for (const f of item.files ?? []) {
        const fname = f.path.split("/").pop()!;
        const abs = join(vdir, fname);
        if (await writeIfChanged(abs, f.content)) written++;
        files.push({
          path: rel(abs),
          bytes: Buffer.byteLength(f.content),
          sha256: sha256(normalizeContent(f.content)),
        });
        if (/\.(tsx?|jsx?)$/.test(fname)) exportRecs.push(...extractExports(f.content, rel(abs)));
      }

      // Keep verbatim upstream JSON so re-normalizing never needs the network.
      await writeJson(join(RAW, "reactbits-free", `${item.name}.json`), item);

      variants.push({
        id: sp.variant,
        lang: sp.lang,
        styling: sp.styling,
        upstreamName: item.name,
        path: rel(vdir),
        files,
        dependencies: deps,
        exports: exportRecs,
        hash: hashFiles((item.files ?? []).map((f) => ({ path: f.path, content: f.content }))),
      });
    }

    const defaultVariant = variants.find((v) => v.id === "ts-tw")?.id ?? variants[0]!.id;
    const dv = variants.find((v) => v.id === defaultVariant)!;
    const first = group[0]!;
    const deps = [...allDeps.values()].sort((a, b) => a.name.localeCompare(b.name));
    const content = (first.files ?? []).map((f) => f.content).join("\n");
    const tags = deriveTags(first.title ?? base, deps);

    const rec: AssetRecord = {
      id: `rb-free/component/${slug}`,
      source: "rb-free",
      kind: "component",
      slug,
      name: base,
      title: first.title ?? base,
      description: first.description ?? "",
      tags,
      tagSource: "derived",
      category: tags[0] ?? null,
      keywords: [],
      variants,
      defaultVariant,
      dependencies: deps,
      registryDependencies: first.registryDependencies ?? [],
      exports: [primaryExport(dv.exports, slug, dv.files[0]?.path ?? "")],
      requires: {
        tailwind: null,
        client: /["']use client["']/.test(content),
        webgl: deps.some((d) => WEBGL.has(d.name)),
        sizedParent: deps.some((d) => WEBGL.has(d.name)),
        providers: [
          ...(deps.some((d) => d.name === "react-router-dom") ? ["react-router"] : []),
          ...(deps.some((d) => d.name === "@chakra-ui/react") ? ["chakra"] : []),
        ],
      },
      paths: { root: rel(root), raw: rel(join(RAW, "reactbits-free")), preview: null, demo: null },
      preview: { mode: "live" },
      license: {
        spdx: "MIT AND Commons-Clause",
        redistributable: true,
        note: "React Bits free — personal and commercial use permitted.",
      },
      upstream: { url: `${BASE}/${dv.upstreamName}.json`, registry: "reactbits-free", docs: `https://reactbits.dev/components/${slug}` },
      hash: hashFiles(variants.flatMap((v) => v.files.map((f) => ({ path: f.path, content: f.sha256 })))),
      fetchedAt: new Date().toISOString(),
      vaultVersion: VAULT_VERSION,
    };

    await writeJson(join(root, "meta.json"), rec);
    records.push(rec);
    await journal("rb-free", { name: base, hash: rec.hash, status: "ok" });
  }

  console.log(`✓ rb-free: ${records.length} components, ${records.reduce((n, r) => n + r.variants.length, 0)} variants, ${written} files written`);
  return records;
}
