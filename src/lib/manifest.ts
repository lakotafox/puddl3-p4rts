import { join } from "node:path";
import { VAULT, HOME, walk, readJson, writeJson } from "./vault.ts";
import type { AssetRecord, Manifest } from "./types.ts";
import { SCHEMA_VERSION } from "./types.ts";

export const MANIFEST = join(VAULT, "manifest.json");

/**
 * Rebuild the manifest from each asset's meta.json. The manifest is a cache;
 * the files on disk are the source of truth. Delete it, run `PUDDL3 P4RTS index`,
 * get it back — no network required.
 */
export async function rebuildIndex(): Promise<Manifest> {
  const metas = await walk(VAULT, (p) => p.endsWith("/meta.json"));
  const assets: AssetRecord[] = [];
  for (const m of metas) {
    const rec = await readJson<AssetRecord>(m);
    if (rec?.id) assets.push(rec);
  }
  assets.sort((a, b) => a.id.localeCompare(b.id));

  const counts: Record<string, number> = { total: assets.length };
  for (const a of assets) {
    counts[a.source] = (counts[a.source] ?? 0) + 1;
    counts[`kind:${a.kind}`] = (counts[`kind:${a.kind}`] ?? 0) + 1;
  }

  const manifest: Manifest = {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    counts,
    assets,
  };
  await writeJson(MANIFEST, manifest);
  return manifest;
}

export async function loadManifest(): Promise<Manifest> {
  const m = await readJson<Manifest>(MANIFEST);
  if (!m) throw new Error(`No manifest at ${MANIFEST}. Run: p4rts index   (or: PUDDL3 P4RTS index)`);
  return m;
}

export function resolveAsset(assets: AssetRecord[], q: string): AssetRecord | null {
  return (
    assets.find((a) => a.id === q) ??
    assets.find((a) => a.slug === q) ??
    assets.find((a) => a.id.endsWith(`/${q}`)) ??
    assets.find((a) => a.name.toLowerCase() === q.toLowerCase()) ??
    // Pre-rename names (stockroom rename 2026-08-14): "split-text" still finds
    // letter-break via the upstream thread, so old habits and upstream docs work.
    assets.find((a) => a.upstreamSlug === q) ??
    assets.find((a) => a.upstreamName?.toLowerCase() === q.toLowerCase()) ??
    null
  );
}

export { HOME };
