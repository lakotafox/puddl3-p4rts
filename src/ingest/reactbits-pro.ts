import { join } from "node:path";
import { fetchJson, pool } from "../lib/http.ts";
import { extractExports, primaryExport } from "../lib/exports.ts";
import { reconcileDeps } from "../lib/imports.ts";
import { licenseKey, authHeaders } from "../lib/env.ts";
import {
  VAULT, RAW, hashFiles, journal, parseDep, rel, writeIfChanged, writeJson, sha256,
  normalizeContent, readJson,
} from "../lib/vault.ts";
import type { AssetRecord, Dep, Kind, RegistryItem, SourceId, Variant } from "../lib/types.ts";
import { VAULT_VERSION } from "../lib/types.ts";

const BASE = "https://pro.reactbits.dev/api/r";
const WEBGL = new Set(["three", "ogl", "@react-three/fiber", "@react-three/drei", "@paper-design/shaders-react"]);

/** Tailwind v4-only utilities. Their presence means a v3 target renders no-ops. */
const V4_MARKERS = /\bbg-linear-to-|\bshadow-xs\b|\bring-3\b|@theme\b|\bblur-xs\b|\boutline-hidden\b/;

type IndexItem = { name: string; type: string; title?: string; description?: string; tags?: string[] };

function kindOf(reg: "starter" | "pro", item: IndexItem): Kind {
  if (item.type === "registry:block") return "block";
  if (item.type === "registry:file") {
    if (item.name.startsWith("skill-")) return "skill";
    if (item.name.startsWith("prompt-")) return "prompt";
    if (item.name.startsWith("recipe-")) return "recipe";
    // The starter registry ships a bare "skill" markdown file; anything served
    // as registry:file is documentation, never a renderable component.
    return "skill";
  }
  return "component";
}

/**
 * Starter components REQUIRE a -tw/-css suffix; pro blocks must NOT have one.
 * Violating either returns a 404, so the index names are used verbatim.
 */
export async function ingestPro(opts: { only?: string; force?: boolean; registry?: "starter" | "pro" } = {}) {
  const key = await licenseKey();
  const headers = authHeaders(key);
  const regs: ("starter" | "pro")[] = opts.registry ? [opts.registry] : ["starter", "pro"];
  const all: AssetRecord[] = [];

  for (const reg of regs) {
    const source: SourceId = reg === "starter" ? "rb-starter" : "rb-pro";
    console.log(`→ fetching ${reg} registry index …`);
    const index = await fetchJson<{ items: IndexItem[] }>(`${BASE}/${reg}/registry.json`, { headers });
    let items = index.items;
    if (opts.only) {
      const re = new RegExp(opts.only, "i");
      items = items.filter((i) => re.test(i.name));
    }
    console.log(`  ${items.length} items`);

    // Group starter components by base slug so -tw/-css become variants of one asset.
    const groups = new Map<string, IndexItem[]>();
    for (const it of items) {
      const base = reg === "starter" ? it.name.replace(/-(tw|css)$/, "") : it.name;
      if (!groups.has(base)) groups.set(base, []);
      groups.get(base)!.push(it);
    }

    let done = 0, written = 0, skipped = 0;
    let entries = [...groups].sort(([a], [b]) => a.localeCompare(b));

    // Resume: anything already mirrored is skipped, so a 429 mid-run costs
    // nothing but the time already spent. --force re-fetches everything.
    if (!opts.force) {
      const before = entries.length;
      const keep: typeof entries = [];
      for (const e of entries) {
        const kind = kindOf(reg, e[1][0]!);
        const root = join(VAULT, kind === "block" ? "reactbits-pro/blocks"
          : kind === "component" ? `reactbits-${reg}/components`
          : "reactbits-pro/agent-kit", e[0]);
        const existing = await readJson<AssetRecord>(join(root, "meta.json"));
        if (existing?.hash && existing.variants.length === e[1].length) all.push(existing);
        else keep.push(e);
      }
      entries = keep;
      skipped = before - entries.length;
      if (skipped) console.log(`  resuming — ${skipped} already mirrored, ${entries.length} to go`);
    }

    // Serial with 1.2s pacing. This host is both bot-protected (403 challenge at
    // concurrency 8-10) and rate-limited (429 at concurrency 2 / 300ms). Slow is
    // the whole point; resumability above makes a trip-up cheap.
    await pool(entries, 1, async ([slug, group]) => {
      const kind = kindOf(reg, group[0]!);
      const root = join(VAULT, kind === "block" ? "reactbits-pro/blocks"
        : kind === "component" ? `reactbits-${reg}/components`
        : "reactbits-pro/agent-kit", slug);

      const variants: Variant[] = [];
      const allDeps = new Map<string, Dep>();
      let anyContent = "";

      for (const gi of group) {
        const item = await fetchJson<RegistryItem>(`${BASE}/${reg}/${gi.name}.json`, { headers });
        const vid = reg === "starter" ? (gi.name.match(/-(tw|css)$/)?.[1] ?? "default") : "default";
        const vdir = join(root, reg === "starter" ? join("variants", vid) : "files");
        const vsrc = (item.files ?? []).map((f) => f.content).join("\n");
        const deps = reconcileDeps((item.dependencies ?? []).map(parseDep), vsrc);
        for (const d of deps) allDeps.set(d.name, d);

        const files = [];
        const exportRecs = [];
        for (const f of item.files ?? []) {
          const fname = f.path.split("/").pop()!;
          const abs = join(vdir, fname);
          if (await writeIfChanged(abs, f.content)) written++;
          files.push({ path: rel(abs), bytes: Buffer.byteLength(f.content), sha256: sha256(normalizeContent(f.content)) });
          if (/\.(tsx?|jsx?)$/.test(fname)) exportRecs.push(...extractExports(f.content, rel(abs)));
          anyContent += f.content;
        }
        await writeJson(join(RAW, `reactbits-${reg}`, `${item.name}.json`), item);

        variants.push({
          id: vid,
          lang: kind === "block" ? "ts" : null,
          styling: vid === "tw" ? "tw" : vid === "css" ? "css" : null,
          upstreamName: item.name,
          path: rel(vdir),
          files, dependencies: deps, exports: exportRecs,
          hash: hashFiles((item.files ?? []).map((f) => ({ path: f.path, content: f.content }))),
        });
      }

      const defaultVariant = variants.find((v) => v.id === "tw")?.id ?? variants[0]!.id;
      const dv = variants.find((v) => v.id === defaultVariant)!;
      const meta = group[0]!;
      const deps = [...allDeps.values()].sort((a, b) => a.name.localeCompare(b.name));
      const isMd = kind === "skill" || kind === "prompt" || kind === "recipe";

      const rec: AssetRecord = {
        id: `${source}/${kind}/${slug}`,
        source, kind, slug, name: slug,
        // Upstream titles are per-variant ("Staggered Text (CSS)"); the asset
        // spans both variants, so drop the parenthetical.
        title: (meta.title ?? slug).replace(/\s*\((CSS|Tailwind|TW)\)\s*$/i, ""),
        description: meta.description ?? "",
        tags: meta.tags ?? [],
        tagSource: "upstream",
        category: meta.tags?.[0] ?? null,
        keywords: [],
        variants, defaultVariant,
        dependencies: deps,
        registryDependencies: [],
        exports: isMd ? [] : [primaryExport(dv.exports, slug, dv.files[0]?.path ?? "")],
        requires: {
          tailwind: kind === "block" || V4_MARKERS.test(anyContent) ? "v4" : null,
          client: /["']use client["']/.test(anyContent),
          webgl: deps.some((d) => WEBGL.has(d.name)),
          sizedParent: deps.some((d) => WEBGL.has(d.name)),
          providers: deps.some((d) => d.name === "next-themes") ? ["next-themes"] : [],
        },
        paths: { root: rel(root), raw: rel(join(RAW, `reactbits-${reg}`)), preview: null, demo: null },
        preview: { mode: isMd ? "code" : "live" },
        license: {
          spdx: "Proprietary",
          redistributable: false,
          note: "React Bits Pro (Ultimate) — licensed to this user. Do not redistribute.",
        },
        upstream: { url: `${BASE}/${reg}/${dv.upstreamName}.json`, registry: `reactbits-${reg}` },
        hash: hashFiles(variants.flatMap((v) => v.files.map((f) => ({ path: f.path, content: f.sha256 })))),
        fetchedAt: new Date().toISOString(),
        vaultVersion: VAULT_VERSION,
      };

      await writeJson(join(root, "meta.json"), rec);
      all.push(rec);
      await journal(source, { name: slug, hash: rec.hash, status: "ok" });
      if (++done % 25 === 0) console.log(`  ${done}/${entries.length} …`);
    }, 1200);

    console.log(`✓ ${source}: ${done} fetched, ${skipped} skipped, ${written} files written`);
  }
  return all;
}
