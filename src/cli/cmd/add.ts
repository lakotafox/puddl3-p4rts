import { join, basename } from "node:path";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { loadManifest, resolveAsset } from "../../lib/manifest.ts";
import { inspectTarget, installCmd } from "../../lib/project.ts";
import { importLine } from "../../lib/exports.ts";
import { HOME, exists, readJson, sha256, normalizeContent } from "../../lib/vault.ts";
import type { AssetRecord } from "../../lib/types.ts";

const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;

type Receipt = { id: string; variant: string; hash: string; files: string[]; addedAt: string };

/** Choose the variant that matches the target project's language + styling. */
function pickVariant(a: AssetRecord, want: string | undefined, tsx: boolean, tw: boolean): string {
  if (want) return want;
  const ids = a.variants.map((v) => v.id);
  const lang = tsx ? "ts" : "js";
  const style = tw ? "tw" : "css";
  return (
    ids.find((i) => i === `${lang}-${style}`) ??
    ids.find((i) => i === style) ??
    a.defaultVariant
  );
}

export async function cmdAdd(args: string[], flags: { [k: string]: string | boolean }) {
  const q = args[0];
  if (!q) throw new Error("usage: p4rts add <id|slug> [--to DIR] [--variant V] [--no-install]");

  const { assets } = await loadManifest();
  const a = resolveAsset(assets, q);
  if (!a) throw new Error(`not found: ${q}   (try: p4rts search ${q})`);

  const target = await inspectTarget((flags.to as string) ?? process.cwd());
  const vid = pickVariant(a, flags.variant as string | undefined, target.tsx, target.tailwind !== 3);
  const v = a.variants.find((x) => x.id === vid);
  if (!v) throw new Error(`${a.id} has no variant "${vid}" (have: ${a.variants.map((x) => x.id).join(", ")})`);

  console.log(`\n${bold(a.title)} ${dim(a.id)}  → ${dim(target.root)}`);
  console.log(`  ${dim("variant")} ${vid}   ${dim("tailwind")} ${target.tailwind ?? "not detected"}   ${dim("pm")} ${target.pm}`);

  // Tailwind v4 blocks silently render no-ops on v3 — refuse without --force.
  if (a.requires.tailwind === "v4" && target.tailwind === 3 && !flags.force) {
    throw new Error(
      `${a.id} requires Tailwind v4 but the target uses v3.\n` +
        `  It uses v4-only utilities (bg-linear-to-*, shadow-xs); gradients and shadows will render as no-ops.\n` +
        `  Re-run with --force to add it anyway.`,
    );
  }

  const destDir = a.kind === "block"
    ? join(target.componentsDir, "blocks")
    : join(target.componentsDir, "puddl3", a.slug);

  const writes: { abs: string; content: string }[] = [];
  for (const f of v.files) {
    const content = await readFile(join(HOME, f.path), "utf8");
    const name = basename(f.path);
    writes.push({ abs: join(destDir, a.kind === "block" ? name : name), content });
  }

  // Refuse to clobber a locally-modified copy.
  for (const w of writes) {
    if (await exists(w.abs)) {
      const cur = await readFile(w.abs, "utf8");
      if (normalizeContent(cur) === normalizeContent(w.content)) {
        console.log(green(`  ✓ already up to date: ${w.abs.replace(target.root + "/", "")}`));
      } else if (!flags.force) {
        throw new Error(
          `${w.abs.replace(target.root + "/", "")} exists and differs from the vault copy.\n` +
            `  Re-run with --force to overwrite.`,
        );
      }
    }
  }

  if (flags["dry-run"]) {
    console.log(dim("\n  dry run — would write:"));
    for (const w of writes) console.log(`    ${w.abs.replace(target.root + "/", "")}`);
    return;
  }

  await mkdir(destDir, { recursive: true });
  for (const w of writes) {
    await writeFile(w.abs, w.content, "utf8");
    console.log(`  ${green("+")} ${w.abs.replace(target.root + "/", "")}`);
  }

  // Dependencies the target doesn't already have.
  const missing = v.dependencies.filter((d) => !target.deps[d.name]).map((d) => d.name);
  if (missing.length) {
    const cmd = installCmd(target.pm, missing);
    if (flags["no-install"]) {
      console.log(`\n  ${yellow("deps needed:")} ${cmd}`);
    } else {
      console.log(`\n  ${dim("installing:")} ${cmd}`);
      const proc = Bun.spawn(cmd.split(" "), { cwd: target.root, stdout: "inherit", stderr: "inherit" });
      const code = await proc.exited;
      if (code !== 0) console.log(yellow(`  ! install exited ${code} — run manually: ${cmd}`));
    }
  }

  // The payoff for extracting exports at ingest: a correct import line.
  const exp = a.exports[0];
  if (exp) {
    const importPath = `${target.alias}/${a.kind === "block" ? `blocks/${basename(writes[0]!.abs).replace(/\.\w+$/, "")}` : `puddl3/${a.slug}/${basename(writes[0]!.abs).replace(/\.\w+$/, "")}`}`;
    console.log(`\n  ${bold(importLine(exp, importPath))}`);
    if (exp.confidence === "guessed") console.log(yellow(`  ! export name was guessed — verify against the file`));
  }

  const notes = [
    a.requires.client && `add "use client" if your framework needs it (already in the file if upstream set it)`,
    a.requires.sizedParent && `WebGL — the parent element needs an explicit width/height`,
    a.requires.providers.length && `wrap in: ${a.requires.providers.join(", ")}`,
  ].filter(Boolean);
  if (notes.length) console.log(`\n  ${notes.map((n) => yellow(`! ${n}`)).join("\n  ")}`);

  // Receipt enables `p4rts update --check` to spot stale/modified copies.
  const rcPath = join(target.root, ".p4rts.json");
  const rc = (await readJson<{ installed: Receipt[] }>(rcPath)) ?? { installed: [] };
  rc.installed = rc.installed.filter((r) => r.id !== a.id);
  rc.installed.push({
    id: a.id, variant: vid, hash: v.hash,
    files: writes.map((w) => w.abs.replace(target.root + "/", "")),
    addedAt: new Date().toISOString(),
  });
  await writeFile(rcPath, JSON.stringify(rc, null, 2) + "\n", "utf8");
  console.log();
}
