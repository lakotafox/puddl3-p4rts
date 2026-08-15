#!/usr/bin/env bun
import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { HOME } from "../src/lib/vault.ts";

/**
 * Swap upstream's demo copy for the user's own words (chosen by interview,
 * 2026-08-14). Free demos live in vendored files, so — like rebrand.ts — this
 * is a script, not hand edits: re-vendoring upstream is copy-the-tree, re-run.
 *
 * Each entry lists [upstreamString, foxbitsString]. After the first run the
 * upstream string is gone, so re-runs are no-ops; after a re-vendor the
 * upstream strings are back and the pass re-applies.
 */

const VENDOR = join(HOME, "vendor/reactbits");

const DEMO_TEXT: Record<string, [string, string][]> = {
  "demo/TextAnimations/SplitTextDemo.jsx": [
    ["'Hello, you!'", "'HELLO GRANDPA'"], ["'Hello grandpa'", "'HELLO GRANDPA'"],
  ],
  "demo/TextAnimations/MaskedHeadingDemo.jsx": [
    ["'Designed in the details'", "'SEE THROUGH THE WORDS'"], ["'See through the words'", "'SEE THROUGH THE WORDS'"],
  ],
  "demo/TextAnimations/ParticleTextDemo.jsx": [
    ["'Future Interfaces'", "'PUDDL3'"],
    // user-tuned defaults (2026-08-14 screenshot)
    ["  particleSize: 2.2,", "  particleSize: 1.1,"],
    ["  gatherDuration: 1600,", "  gatherDuration: 3000,"],
    ["  stagger: 420,", "  stagger: 360,"],
    ["  pointerRepel: 42,", "  pointerRepel: 40,"],
    ["  repelRadius: 120,", "  repelRadius: 90,"],
    ["  idleDrift: 0.8,", "  idleDrift: 0,"],
  ],
  "demo/TextAnimations/WarpTextDemo.jsx": [
    ["'Bend the moment'", "'TYPE SOMETHING'"], ["'Type Something'", "'TYPE SOMETHING'"],
  ],
  "demo/TextAnimations/FoldTextDemo.jsx": [
    ["'Design unfolds'", "'PAPER TRAIL'"], ["'Paper trail'", "'PAPER TRAIL'"],
  ],
  "demo/TextAnimations/StrokeTextDemo.jsx": [
    ["'Draw Attention'", "'HAND DRAWN'"], ["'Hand Drawn'", "'HAND DRAWN'"],
  ],
  "demo/TextAnimations/EchoTextDemo.jsx": [
    ["'Motion Echo'", "'PUDDL3'"], ["'echo echo echo'", "'PUDDL3'"],
  ],
  "demo/TextAnimations/BlurTextDemo.jsx": [
    [`"Isn't this so cool?!"`, `"WAKE UP, IT'S BLURRY"`], [`"Wake up, it's blurry"`, `"WAKE UP, IT'S BLURRY"`],
  ],
  "demo/TextAnimations/TextLoopDemo.jsx": [
    ["'React ✦ Bits'", "'TEXT ✦ LOOPING'"], ["'text ✦ looping'", "'TEXT ✦ LOOPING'"],
    [`'"React ✦ Bits"'`, `'"TEXT ✦ LOOPING"'`],
  ],
  "demo/TextAnimations/CurvedLoopDemo.jsx": [
    ["'Be ✦ Creative ✦ With ✦ React ✦ Bits ✦'", "'TEXT ✦ LOOPING ✦ TEXT ✦ LOOPING ✦'"],
    ["'text ✦ looping ✦ text ✦ looping ✦'", "'TEXT ✦ LOOPING ✦ TEXT ✦ LOOPING ✦'"],
  ],
  "demo/Animations/ScrollExpandDemo.jsx": [
    ["'Built to scale'", "'ROOM TO GROW'"], ["'Room to grow'", "'ROOM TO GROW'"],
  ],
  // Uppercase originals the rebrand's "React Bits" pass could not match.
  "demo/TextAnimations/CircularTextDemo.jsx": [
    ["'REACT*BITS*COMPONENTS*'", "'ROUND..WORDS..LOOPING..'"],
    ["'FOXBITS*COMPONENTS*'", "'ROUND..WORDS..LOOPING..'"],
  ],
  "demo/TextAnimations/ShuffleDemo.jsx": [
    ['text="REACT BITS"', 'text="PUDDL3"'],
    ['text="FOXBITS"', 'text="PUDDL3"'],
  ],
  "demo/Components/CurvedInputDemo.jsx": [['placeholder="david@reactbits.dev"', 'placeholder="elias@foxbits.dev"']],
};

async function main() {
  let applied = 0;
  let already = 0;
  for (const [rel, subs] of Object.entries(DEMO_TEXT)) {
    const p = join(VENDOR, rel);
    let s: string;
    try { s = await readFile(p, "utf8"); } catch { console.log(`  !! missing ${rel}`); continue; }
    const before = s;
    for (const [from, to] of subs) {
      if (s.includes(to)) { already++; continue; }
      if (!s.includes(from)) { console.log(`  !! no match in ${rel}: ${from}`); continue; }
      s = s.split(from).join(to);
      applied++;
    }
    if (s !== before) await writeFile(p, s, "utf8");
  }
  console.log(`✓ demo text: ${applied} applied, ${already} already done`);
}

main();
