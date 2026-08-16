#!/usr/bin/env bun
import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { HOME, walk } from "../src/lib/vault.ts";

/**
 * Upstream's brand baked into COMPONENT SOURCE (user, 2026-08-16: "why does
 * liquid pane say react bits"). It hides in default prop values, JSX copy and
 * doc comments — e.g. DustType's `text = 'React Bits'`, LiquidPane's pane
 * label, waitlist-1's launch line. These ship to user projects via `p4rts add`
 * and render on our own pages, so they carry our name.
 *
 * Scope: source files only, in the vault AND the vendored variant/content trees
 * (the site renders from vendor/, the CLI ships from vault/ — both must match).
 * meta.json license notes are deliberately untouched: "React Bits free —
 * personal and commercial use permitted" is an upstream licensing fact, not
 * our branding, and rewriting it would misstate where the licence comes from.
 *
 * Idempotent: re-run after any `p4rts sync`.
 */

const TARGETS = [
  join(HOME, "vault"),
  join(HOME, "site/content"),
  join(HOME, "site/tailwind"),
  join(HOME, "site/ts-default"),
  join(HOME, "site/ts-tailwind"),
];

const SUBS: [RegExp, string][] = [
  [/React Bits Pro/g, "PUDDL3 P4RTS Deep"],
  [/React Bits/g, "PUDDL3 P4RTS"],
  [/ReactBits/g, "Puddl3P4rts"],
];

const isSource = (p: string) => /\.(jsx?|tsx?)$/.test(p);

let changed = 0;
let hits = 0;
for (const root of TARGETS) {
  let files: string[] = [];
  try {
    files = await walk(root, isSource);
  } catch {
    continue;
  }
  for (const f of files) {
    const before = await readFile(f, "utf8");
    let after = before;
    for (const [re, to] of SUBS) {
      const m = after.match(re);
      if (m) hits += m.length;
      after = after.replace(re, to);
    }
    if (after !== before) {
      await writeFile(f, after, "utf8");
      changed++;
    }
  }
}
console.log(`✓ source brand scrubbed: ${changed} files, ${hits} replacements`);
