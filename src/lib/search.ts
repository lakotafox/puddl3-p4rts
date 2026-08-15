import type { AssetRecord } from "./types.ts";

/**
 * Weighted in-memory scorer. At ~1,500 records (~2MB of JSON) a full scan is
 * sub-millisecond, so an index (sqlite FTS et al) would add a binary artifact
 * that can drift from the files it indexes for no measurable gain.
 */

function subsequence(needle: string, hay: string): boolean {
  let i = 0;
  for (const ch of hay) if (ch === needle[i] && ++i === needle.length) return true;
  return i === needle.length;
}

export type Filters = {
  source?: string;
  kind?: string;
  tag?: string;
  dep?: string;
};

export function applyFilters(assets: AssetRecord[], f: Filters): AssetRecord[] {
  return assets.filter(
    (a) =>
      (!f.source || a.source === f.source) &&
      (!f.kind || a.kind === f.kind) &&
      (!f.tag || a.tags.includes(f.tag)) &&
      (!f.dep || a.dependencies.some((d) => d.name === f.dep)),
  );
}

export function score(a: AssetRecord, q: string): number {
  const s = q.toLowerCase();
  let n = 0;
  const slug = a.slug.toLowerCase();
  const title = a.title.toLowerCase();

  if (slug === s) n += 100;
  else if (slug.startsWith(s)) n += 60;
  else if (slug.includes(s)) n += 35;

  if (title.toLowerCase() === s) n += 50;
  else if (title.includes(s)) n += 40;

  if (a.tags.some((t) => t.toLowerCase() === s)) n += 30;
  else if (a.tags.some((t) => t.toLowerCase().includes(s))) n += 12;

  if (a.description.toLowerCase().includes(s)) n += 10;
  if (a.keywords.some((k) => k.toLowerCase().includes(s))) n += 8;
  if (a.dependencies.some((d) => d.name.toLowerCase() === s)) n += 15;

  if (!n && subsequence(s, slug)) n += 5;
  return n;
}

export function search(assets: AssetRecord[], q: string, f: Filters = {}, limit = 20): AssetRecord[] {
  const pool = applyFilters(assets, f);
  if (!q) return pool.slice(0, limit);
  return pool
    .map((a) => ({ a, n: score(a, q) }))
    .filter((x) => x.n > 0)
    .sort((x, y) => y.n - x.n || x.a.id.localeCompare(y.a.id))
    .slice(0, limit)
    .map((x) => x.a);
}
