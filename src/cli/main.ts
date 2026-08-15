#!/usr/bin/env bun
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { ingestFree } from "../ingest/reactbits-free.ts";
import { ingestPro } from "../ingest/reactbits-pro.ts";
import { cmdAdd } from "./cmd/add.ts";
import { linkDemos } from "../ingest/reactbits-demos.ts";
import { renormalize } from "../ingest/renormalize.ts";
import { loadManifest, rebuildIndex, resolveAsset } from "../lib/manifest.ts";
import { search, applyFilters } from "../lib/search.ts";
import { importLine } from "../lib/exports.ts";
import { HOME, exists } from "../lib/vault.ts";
import { ChallengeError, redact } from "../lib/http.ts";
import type { AssetRecord } from "../lib/types.ts";

const argv = process.argv.slice(2);
const cmd = argv[0] ?? "help";
const rest = argv.slice(1);

function flag(name: string): string | undefined {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? rest[i + 1] : undefined;
}
const has = (name: string) => rest.includes(`--${name}`);
const positional = () => rest.filter((a, i) => !a.startsWith("--") && !(i > 0 && rest[i - 1]!.startsWith("--") && !["json", "files", "deps", "force", "dry-run"].includes(rest[i - 1]!.slice(2))));

const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;

function line(a: AssetRecord) {
  const v = a.variants.map((x) => x.id).join(",");
  return `${cyan(a.id.padEnd(38))} ${a.title.padEnd(26).slice(0, 26)} ${dim(a.tags.slice(0, 3).join(" "))}${v ? dim(`  [${v}]`) : ""}`;
}

const HELP = `${bold("p4rts")} — PUDDL3 P4RTS: offline vault of UI components, blocks and templates

  ${bold("sync")} [source]        mirror a source into the vault (rb-free, rb-pro, all)
  ${bold("index")}                rebuild manifest.json from the vault's meta.json files
  ${bold("ls")}                   list assets           [--source S --kind K --tag T --dep D --json]
  ${bold("search")} <query>       fuzzy search          [--kind K --tag T -n 20 --json]
  ${bold("grep")} <pattern>       search source content via ripgrep
  ${bold("show")} <id|slug>       details for one asset [--variant V --json]
  ${bold("cat")} <id> [file]      print source to stdout [--variant V]
  ${bold("add")} <id>            copy into a project  [--to DIR --variant V --no-install --force]
  ${bold("doctor")}               environment + vault health checks

  Vault: ${dim(join(HOME, "vault"))}
`;

async function main() {
  switch (cmd) {
    case "sync": {
      const source = rest.find((a) => !a.startsWith("--")) ?? "all";
      if (source === "rb-free" || source === "all") {
        await ingestFree({ only: flag("only"), force: has("force") });
      }
      if (source === "rb-pro" || source === "rb-starter" || source === "all") {
        await ingestPro({
          only: flag("only"),
          force: has("force"),
          registry: source === "rb-starter" ? "starter" : undefined,
        });
      }
      if (source === "rb-free" || source === "demos" || source === "all") await linkDemos();
      const m = await rebuildIndex();
      console.log(`✓ manifest: ${m.counts.total} assets`);
      break;
    }

    case "index": {
      if (has("renormalize")) await renormalize();
      const m = await rebuildIndex();
      console.log(`✓ ${m.counts.total} assets indexed`);
      for (const [k, v] of Object.entries(m.counts)) if (k !== "total") console.log(`  ${k.padEnd(20)} ${v}`);
      break;
    }

    case "ls": {
      const { assets } = await loadManifest();
      const out = applyFilters(assets, {
        source: flag("source"), kind: flag("kind"), tag: flag("tag"), dep: flag("dep"),
      });
      if (has("json")) return console.log(JSON.stringify(out, null, 2));
      for (const a of out) console.log(line(a));
      console.log(dim(`\n${out.length} assets`));
      break;
    }

    case "search": {
      const q = rest.find((a) => !a.startsWith("--")) ?? "";
      const { assets } = await loadManifest();
      const n = Number(flag("n") ?? 20);
      const out = search(assets, q, { source: flag("source"), kind: flag("kind"), tag: flag("tag"), dep: flag("dep") }, n);
      if (has("json")) return console.log(JSON.stringify(out, null, 2));
      if (!out.length) return console.log(dim(`no matches for "${q}"`));
      for (const a of out) console.log(line(a));
      break;
    }

    case "show": {
      const q = rest.find((a) => !a.startsWith("--"));
      if (!q) throw new Error("usage: p4rts show <id|slug>");
      const { assets } = await loadManifest();
      const a = resolveAsset(assets, q);
      if (!a) throw new Error(`not found: ${q}`);
      if (has("json")) return console.log(JSON.stringify(a, null, 2));

      console.log(`\n${bold(a.title)}  ${dim(a.id)}`);
      if (a.description) console.log(a.description);
      console.log(`\n  ${dim("source")}    ${a.source}   ${dim("kind")} ${a.kind}   ${dim("license")} ${a.license.spdx}`);
      console.log(`  ${dim("tags")}      ${a.tags.join(", ")}`);
      console.log(`  ${dim("variants")}  ${a.variants.map((v) => (v.id === a.defaultVariant ? bold(v.id) : v.id)).join("  ")}`);
      if (a.dependencies.length)
        console.log(`  ${dim("deps")}      ${a.dependencies.map((d) => d.name).join(", ")}`);
      const exp = a.exports[0];
      if (exp) {
        const p = `@/components/puddl3/${a.slug}`;
        console.log(`\n  ${importLine(exp, p)}${exp.confidence === "guessed" ? dim("   ← guessed, verify") : ""}`);
      }
      const r = a.requires;
      const notes = [
        r.client && `needs "use client"`,
        r.webgl && "WebGL — parent needs an explicit size",
        r.tailwind === "v4" && "requires Tailwind v4",
        r.providers.length && `providers: ${r.providers.join(", ")}`,
      ].filter(Boolean);
      if (notes.length) console.log(`\n  ${notes.map((n) => `! ${n}`).join("\n  ")}`);
      const dv = a.variants.find((v) => v.id === (flag("variant") ?? a.defaultVariant));
      if (dv) console.log(`\n  ${dim("files")}     ${dv.files.map((f) => f.path).join("\n            ")}`);
      console.log();
      break;
    }

    case "cat": {
      const args = rest.filter((a) => !a.startsWith("--"));
      const { assets } = await loadManifest();
      const a = resolveAsset(assets, args[0] ?? "");
      if (!a) throw new Error(`not found: ${args[0]}`);
      const v = a.variants.find((x) => x.id === (flag("variant") ?? a.defaultVariant)) ?? a.variants[0]!;
      const f = args[1] ? v.files.find((x) => x.path.endsWith(args[1]!)) : v.files.find((x) => /\.(tsx?|jsx?)$/.test(x.path));
      if (!f) throw new Error(`no such file in ${a.id} [${v.id}]`);
      process.stdout.write(await readFile(join(HOME, f.path), "utf8"));
      break;
    }

    case "add": {
      const args = rest.filter((a, i) => !a.startsWith("--") && !(i > 0 && ["--to", "--variant"].includes(rest[i - 1]!)));
      await cmdAdd(args, {
        to: flag("to")!, variant: flag("variant")!,
        force: has("force"), "dry-run": has("dry-run"), "no-install": has("no-install"),
      });
      break;
    }

    case "grep": {
      const pattern = rest.find((a) => !a.startsWith("--"));
      if (!pattern) throw new Error("usage: p4rts grep <pattern>");
      const proc = Bun.spawn(
        ["rg", "--line-number", "--color=always", "-g", "!*.json", pattern, join(HOME, "vault")],
        { stdout: "inherit", stderr: "inherit" },
      );
      process.exit(await proc.exited);
    }

    case "doctor": {
      const checks: [string, boolean, string][] = [];
      const gi = await Bun.file(join(HOME, ".gitignore")).text().catch(() => "");
      checks.push([".gitignore ignores .env", /^\s*\.env\s*$/m.test(gi), "secrets could be committed"]);
      checks.push(["vault exists", await exists(join(HOME, "vault")), "run: p4rts sync"]);
      const key = !!process.env.REACTBITS_LICENSE_KEY;
      checks.push(["REACTBITS_LICENSE_KEY set", key, "pro sources unavailable"]);

      let guessed = 0, total = 0;
      try {
        const { assets } = await loadManifest();
        total = assets.length;
        guessed = assets.filter((a) => a.exports[0]?.confidence === "guessed").length;
      } catch { /* no manifest yet */ }

      for (const [name, ok, hint] of checks)
        console.log(`  ${ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m"} ${name}${ok ? "" : dim(`  — ${hint}`)}`);
      if (total) console.log(`  ${guessed ? "\x1b[33m!\x1b[0m" : "\x1b[32m✓\x1b[0m"} exports: ${total - guessed}/${total} parsed${guessed ? dim(`, ${guessed} guessed`) : ""}`);
      break;
    }

    default:
      console.log(HELP);
  }
}

main().catch((e) => {
  if (e instanceof ChallengeError) console.error(`\n\x1b[31m${e.message}\x1b[0m\n`);
  else console.error(`\x1b[31merror:\x1b[0m ${redact(e instanceof Error ? e.message : String(e))}`);
  process.exit(1);
});
