import type { Dep } from "./types.ts";

const BUILTIN = new Set(["react", "react-dom", "react/jsx-runtime"]);

/**
 * Bare package specifiers actually imported by the source.
 *
 * Upstream `dependencies` metadata is occasionally incomplete — Lanyard imports
 * @react-three/rapier and meshline without declaring either, and ascii-cursor
 * omits @react-three/postprocessing. Installing only the declared set leaves
 * those components broken on first render, so the two are reconciled at ingest.
 */
/** npm package name, optionally scoped, optionally with a subpath. */
const VALID_PKG = /^(?:@[a-z0-9][\w.-]*\/)?[a-z0-9][\w.-]*$/i;

export function scanImports(source: string): string[] {
  const found = new Set<string>();
  const add = (spec: string) => {
    if (!spec || spec.startsWith(".") || spec.startsWith("/") || spec.startsWith("@/")) return;
    const parts = spec.split("/");
    const pkg = spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]!;
    // Guard against false positives: the word "from" also occurs inside string
    // literals (e.g. `console.error('Failed to load font from', url)`), which
    // previously captured multi-line garbage as a package name.
    if (pkg && !BUILTIN.has(pkg) && VALID_PKG.test(pkg)) found.add(pkg);
  };

  // Specifiers never span lines, so excluding newlines stops a stray match from
  // running to the next quote somewhere further down the file.
  for (const m of source.matchAll(/^\s*import\s[^;\n]*?\bfrom\s*["']([^"'\n]+)["']/gm)) add(m[1]!);
  for (const m of source.matchAll(/^\s*export\s[^;\n]*?\bfrom\s*["']([^"'\n]+)["']/gm)) add(m[1]!);
  for (const m of source.matchAll(/\bimport\s*\(\s*["']([^"'\n]+)["']\s*\)/g)) add(m[1]!);
  for (const m of source.matchAll(/^\s*import\s+["']([^"'\n]+)["']/gm)) add(m[1]!);
  for (const m of source.matchAll(/\brequire\s*\(\s*["']([^"'\n]+)["']\s*\)/g)) add(m[1]!);

  return [...found].sort();
}

/** Declared deps plus anything imported but undeclared (pinned loosely). */
export function reconcileDeps(declared: Dep[], source: string): Dep[] {
  const byName = new Map(declared.map((d) => [d.name, d]));
  for (const pkg of scanImports(source)) if (!byName.has(pkg)) byName.set(pkg, { name: pkg, range: "*" });
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}
