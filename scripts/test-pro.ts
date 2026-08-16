#!/usr/bin/env bun
import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { HOME } from "../src/lib/vault.ts";

/**
 * Mechanical verification of every Pro component preview.
 *
 * Loads /preview.html for each component in headless Chromium and records what
 * actually happened: the page's own mount signal (ok/error/timeout via
 * postMessage), console errors, and whether anything painted. This is the
 * ground truth "does it work" check — agents diagnose failures, this finds them.
 */

const BASE = process.env.FOXBITS_PREVIEW_URL ?? "http://localhost:5177";
const CONCURRENCY = 6;

type Result = {
  slug: string;
  status: string;          // ok | error | timeout | crash
  detail?: string;
  consoleErrors: string[];
  painted: boolean;        // #root has visible content
};

async function main() {
  const catalog = await readFile(join(HOME, "site/constants/ProCatalog.js"), "utf8");
  const i = catalog.indexOf("PRO_INDEX = ");
  const j = catalog.indexOf(";\n", i);
  const index: Record<string, any> = JSON.parse(catalog.slice(i + 12, j));
  // PRO_INDEX carries alias keys (old slugs, "-pro" twins) pointing at the same
  // record — dedupe by source file so each component is tested exactly once.
  const seen = new Set<string>();
  const comps = Object.entries(index).filter(([, v]) => {
    if (v.kind !== "component" || seen.has(v.file)) return false;
    seen.add(v.file);
    return true;
  });
  console.log(`testing ${comps.length} components against ${BASE}`);

  const browser = await chromium.launch();
  const results: Result[] = [];
  let done = 0;

  const queue = [...comps];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      const ctx = await browser.newContext({ viewport: { width: 1100, height: 620 } });
      while (queue.length) {
        const next = queue.shift();
        if (!next) break;
        const [slug, meta] = next;
        const page = await ctx.newPage();
        const consoleErrors: string[] = [];
        page.on("console", (m) => {
          if (m.type() === "error") consoleErrors.push(m.text().slice(0, 300));
        });
        page.on("pageerror", (e) => consoleErrors.push("pageerror: " + String(e).slice(0, 300)));

        // preview.tsx posts its status to parent; as the top window that is
        // itself, so a listener installed before load catches it.
        await page.addInitScript(() => {
          (window as any).__p4rtsStatus = [];
          window.addEventListener("message", (e: MessageEvent) => {
            if ((e.data as any)?.type === "foxbits:preview") (window as any).__p4rtsStatus.push(e.data);
          });
        });

        const q = new URLSearchParams({
          path: meta.file,
          export: meta.exportName || "",
          fit: meta.stage || (meta.fill ? "fill" : "center"),
          props: JSON.stringify(meta.demoProps || {}),
        });
        let status = "crash";
        let detail = "";
        let painted = false;
        try {
          await page.goto(`${BASE}/preview.html?${q}`, { waitUntil: "domcontentloaded", timeout: 30_000 });
          // give it time to compile + mount + settle animations
          await page.waitForTimeout(6_000);
          // Scroll-driven components are legitimately blank at scroll zero; the
          // official posters show them mid-scroll, so capture them mid-scroll too.
          if ((meta.stage || "") === "scroll") {
            await page.evaluate(() => {
              const track = document.querySelector("#root > div > div");
              const scroller = document.querySelector("#root > div");
              if (scroller && track) scroller.scrollTop = (track.scrollHeight - scroller.clientHeight) * 0.5;
              window.scrollTo(0, document.body.scrollHeight * 0.5);
            });
            await page.waitForTimeout(1_500);
          }
          const msgs: any[] = await page.evaluate(() => (window as any).__p4rtsStatus);
          const last = msgs.filter((m) => m.status !== "timeout").pop() ?? msgs.pop();
          status = last?.status ?? "no-signal";
          detail = last?.detail ?? "";
          painted = await page.evaluate(() => {
            const root = document.getElementById("root");
            if (!root) return false;
            const r = root.getBoundingClientRect();
            // canvas, svg, or any text/element content counts as painted
            return r.width > 0 && r.height > 0 && (root.querySelector("canvas,svg,img,video") !== null || root.innerText.trim().length > 0 || root.children.length > 0);
          });
        } catch (e) {
          detail = String(e).slice(0, 200);
        }
        // Screenshot after settling — compared against upstream's official
        // preview posters (gallery/public/assets/pro/components/<slug>-poster.webp).
        try {
          await page.screenshot({ path: join(HOME, "scripts/data/shots", `${slug}.png`) });
        } catch { /* screenshot is best-effort */ }
        results.push({ slug, status, detail, consoleErrors: consoleErrors.slice(0, 3), painted });
        await page.close();
        if (++done % 20 === 0) console.log(`  ${done}/${comps.length}`);
      }
      await ctx.close();
    }),
  );

  await browser.close();

  results.sort((a, b) => a.slug.localeCompare(b.slug));
  const bad = results.filter((r) => r.status !== "ok" || !r.painted || r.consoleErrors.length > 0);
  console.log(`\n✓ ok+painted+clean: ${results.length - bad.length}/${results.length}`);
  for (const r of bad) {
    console.log(`  ✗ ${r.slug}: status=${r.status} painted=${r.painted}` +
      (r.detail ? ` detail=${r.detail.slice(0, 120)}` : "") +
      (r.consoleErrors.length ? ` console=${r.consoleErrors[0]!.slice(0, 120)}` : ""));
  }
  await writeFile(join(HOME, "scripts/data/pro-test-results.json"), JSON.stringify(results, null, 1));
  console.log(`\nfull results → scripts/data/pro-test-results.json`);
}

main();
