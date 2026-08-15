import type { ExportRec } from "./types.ts";

/**
 * Extract export names + style from component source.
 *
 * This exists because React Bits block names do not map predictably to their
 * export identifiers: hero-1 -> Hero1, 404-3 -> NotFound3, cta-4 -> Cta4.
 * Blocks also mix `export default` with named exports. Getting this wrong means
 * printing a broken import line, which is the single most repeated papercut.
 */

const STRIP_COMMENTS = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

/** Turn a slug into a plausible PascalCase identifier: "404-3" -> "NotFound3". */
export function pascalFromSlug(slug: string): string {
  let s = slug;
  // A leading digit is not a valid identifier start. React Bits uses 404-* for
  // not-found blocks, which is the only such case observed upstream.
  if (/^404\b/.test(s)) s = s.replace(/^404/, "not-found");
  const out = s
    .split(/[-_\s.]+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  return /^[0-9]/.test(out) ? "C" + out : out;
}

export function extractExports(content: string, file: string): ExportRec[] {
  const src = STRIP_COMMENTS(content);
  const found: ExportRec[] = [];
  const push = (name: string, style: ExportRec["style"]) => {
    if (!name || !/^[A-Za-z_$][\w$]*$/.test(name)) return;
    if (found.some((e) => e.name === name && e.style === style)) return;
    found.push({ name, style, file, confidence: "parsed" });
  };

  // export default function Foo() / export default class Foo
  for (const m of src.matchAll(/^\s*export\s+default\s+(?:async\s+)?(?:function|class)\s+([A-Za-z_$][\w$]*)/gm))
    push(m[1]!, "default");

  // export default memo(Foo) / forwardRef(Foo) / React.memo(Foo)
  for (const m of src.matchAll(
    /^\s*export\s+default\s+(?:React\.)?(?:memo|forwardRef)\s*\(\s*([A-Za-z_$][\w$]*)/gm,
  ))
    push(m[1]!, "default");

  // export default Foo;
  for (const m of src.matchAll(/^\s*export\s+default\s+([A-Za-z_$][\w$]*)\s*;?\s*$/gm))
    push(m[1]!, "default");

  // export function Foo / export async function Foo / export class Foo
  for (const m of src.matchAll(/^\s*export\s+(?:async\s+)?(?:function|class)\s+([A-Za-z_$][\w$]*)/gm))
    push(m[1]!, "named");

  // export const Foo = / export const Foo: Type =
  for (const m of src.matchAll(/^\s*export\s+(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*[:=]/gm))
    push(m[1]!, "named");

  // export { Foo, Bar as Baz }  — `X as default` is a default export
  for (const m of src.matchAll(/^\s*export\s*\{([^}]+)\}/gm)) {
    for (const part of m[1]!.split(",")) {
      const bits = part.trim().split(/\s+as\s+/);
      if (!bits.length || !bits[0]) continue;
      const exported = (bits[1] ?? bits[0]).trim();
      if (exported === "default") push(bits[0]!.trim(), "default");
      else push(exported, "named");
    }
  }

  return found;
}

/**
 * Pick the export a consumer should import, preferring a default export and
 * otherwise the named export closest to the slug. Falls back to a guessed
 * PascalCase identifier so callers always get something, flagged as such.
 */
export function primaryExport(exports: ExportRec[], slug: string, file: string): ExportRec {
  const def = exports.find((e) => e.style === "default");
  if (def) return def;

  const want = pascalFromSlug(slug).toLowerCase();
  const named = exports.filter((e) => e.style === "named");
  const exact = named.find((e) => e.name.toLowerCase() === want);
  if (exact) return exact;

  // Prefer a component-looking name (capitalized) over helper exports.
  const capitalized = named.filter((e) => /^[A-Z]/.test(e.name));
  if (capitalized.length) return capitalized[0]!;
  if (named.length) return named[0]!;

  return { name: pascalFromSlug(slug), style: "default", file, confidence: "guessed" };
}

/** The import line a user should paste. */
export function importLine(exp: ExportRec, importPath: string): string {
  return exp.style === "default"
    ? `import ${exp.name} from "${importPath}";`
    : `import { ${exp.name} } from "${importPath}";`;
}
