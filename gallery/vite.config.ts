import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { resolve } from "node:path";
import { existsSync, statSync, readdirSync, createReadStream, readFileSync } from "node:fs";


const HOME = process.env.FOXBITS_HOME || resolve(import.meta.dirname, "..");
const SHIMS = resolve(import.meta.dirname, "src/shims");
const GL = resolve(HOME, "vault/getlayers");

const tmplExts = [".tsx", ".ts", ".jsx", ".js", ".css"];
function resolveWithExt(base: string): string | null {
  for (const e of ["", ...tmplExts]) {
    const p = base + e;
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  for (const e of tmplExts) {
    const p = resolve(base, "index" + e);
    if (existsSync(p)) return p;
  }
  return null;
}

/**
 * GetLayers template assets + scenes, served from the vault (ported from the
 * harvest sandbox, with all its hard-won rules): Referer's ?t= picks the
 * template's files/public dir; byte-ranges are mandatory for video scrubbing;
 * js/mjs/wasm must be servable or Draco decoders get HTML ("<" SyntaxError,
 * empty 3D scenes); URLs must be decoded (space-named files).
 */
function getlayersAssets() {
  const MIME: Record<string, string> = {
    html: "text/html", js: "text/javascript", mjs: "text/javascript", wasm: "application/wasm",
    css: "text/css", json: "application/json", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
    webp: "image/webp", svg: "image/svg+xml", glb: "model/gltf-binary", gltf: "model/gltf+json",
    mp4: "video/mp4", webm: "video/webm", mp3: "audio/mpeg", woff2: "font/woff2", woff: "font/woff",
    hdr: "application/octet-stream", bin: "application/octet-stream",
  };
  const sendFile = (res: any, p: string, range?: string) => {
    const size = statSync(p).size;
    const ext = p.split(".").pop()!.toLowerCase();
    res.setHeader("accept-ranges", "bytes");
    res.setHeader("content-type", MIME[ext] ?? "application/octet-stream");
    const m = (range ?? "").match(/bytes=(\d*)-(\d*)/);
    if (m) {
      const start = m[1] ? parseInt(m[1]) : 0;
      const end = m[2] ? parseInt(m[2]) : size - 1;
      res.statusCode = 206;
      res.setHeader("content-range", `bytes ${start}-${end}/${size}`);
      res.setHeader("content-length", end - start + 1);
      createReadStream(p, { start, end }).pipe(res);
    } else {
      res.setHeader("content-length", size);
      createReadStream(p).pipe(res);
    }
  };
  return {
    name: "getlayers-assets",
    configureServer(server: any) {
      // vanilla scenes as whole pages, with a three importmap injected
      const NM = resolve(HOME, "node_modules");
      const IMPORTMAP = `<script type="importmap">${JSON.stringify({
        imports: { three: `/@fs${NM}/three/build/three.module.js`, "three/examples/jsm/": `/@fs${NM}/three/examples/jsm/` },
      })}</script>`;
      server.middlewares.use((req: any, res: any, next: any) => {
        const sm = decodeURIComponent((req.url ?? "").split("?")[0]).match(/^\/scene\/([a-z0-9-]+)\/(.*)$/);
        if (!sm) return next();
        const p = resolve(GL, "scenes", sm[1]!, "files", sm[2] === "" ? "index.html" : sm[2]!);
        if (!existsSync(p) || !statSync(p).isFile()) return next();
        if (p.endsWith(".html")) {
          let html = readFileSync(p, "utf8");
          html = html.replace(/<script type="module" src="(?!http)/, `${IMPORTMAP}\n<script type="module" src="`);
          res.setHeader("content-type", "text/html");
          res.end(html);
        } else {
          sendFile(res, p, req.headers.range);
        }
      });
      // namespaced template assets: /t/<name>/* → that template's files/public
      server.middlewares.use((req: any, res: any, next: any) => {
        const um = decodeURIComponent((req.url ?? "").split("?")[0]).match(/^\/t\/([a-z0-9-]+)\/(.+)$/);
        if (!um) return next();
        const p = resolve(GL, "templates", um[1]!, "files/public", um[2]!);
        if (existsSync(p) && statSync(p).isFile()) { sendFile(res, p, req.headers.range); return; }
        next();
      });
      // template public/ assets by Referer ?t= (legacy fallback)
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = decodeURIComponent((req.url ?? "").split("?")[0]);
        if (!/\.(webp|png|jpe?g|gif|svg|mp4|webm|glb|gltf|hdr|woff2?|ttf|json|bin|ktx2|js|mjs|wasm|mp3)$/i.test(url)) return next();
        if (url.startsWith("/vault/") || url.startsWith("/@") || url.startsWith("/src/")) return next();
        // the gallery's own public assets win; template /assets/* only serve
        // when the gallery doesn't have that file (both use "/assets/…")
        if (existsSync(resolve(import.meta.dirname, "public", "." + url))) return next();
        const ref = req.headers.referer ?? "";
        const m = ref.match(/[?&]t=([a-z0-9-]+)/i);
        const candidates: string[] = m ? [m[1]!] : [];
        try { for (const d of readdirSync(resolve(GL, "templates"))) if (!candidates.includes(d)) candidates.push(d); } catch { /* no templates */ }
        for (const t of candidates) {
          const p = resolve(GL, "templates", t, "files/public", "." + url);
          if (existsSync(p) && statSync(p).isFile()) { sendFile(res, p, req.headers.range); return; }
        }
        next();
      });
    },
  };
}

/**
 * The gallery compiles component source straight out of the vault. That works
 * because every dependency any component needs (20 packages, measured from the
 * manifest) is installed here once — so no per-component sandbox is required.
 */
/** Serve the vault (which lives outside Vite's root) at /vault/*. */
function serveVault() {
  return {
    name: "foxbits-vault",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith("/vault/")) return next();
        const { readFile } = await import("node:fs/promises");
        try {
          const buf = await readFile(resolve(HOME, decodeURIComponent(req.url.slice(1).split("?")[0])));
          res.setHeader("Content-Type", req.url.endsWith(".json") ? "application/json" : "text/plain; charset=utf-8");
          res.end(buf);
        } catch {
          res.statusCode = 404;
          res.end("not found");
        }
      });
    },
  };
}

export default defineConfig({
  // GetLayers templates read process.env at module scope (Next inlines it)
  define: { "process.env": {} },
  plugins: [react(), tailwind(), serveVault(), getlayersAssets()],
  server: {
    port: 5177,
    fs: { allow: [HOME] },   // let Vite serve files from ../vault
  },
  resolve: {
    // Array form: entries are tried in order, so the specific patterns must
    // precede the catch-all "@". Vite's alias plugin runs ahead of every other
    // plugin (even `enforce: "pre"`), so remapping has to happen here.
    alias: [
      // Pro blocks import the starter components they build on as
      // "@/components/react-bits/<name>" — where those land in a real shadcn
      // project. The vault stores them under a different shape, hence the
      // capture-group rewrite.
      {
        find: /^@\/components\/react-bits\/(.*)$/,
        replacement: resolve(HOME, "vault/reactbits-starter/components/$1/variants/tw/$1.tsx"),
      },
      { find: "@vault", replacement: resolve(HOME, "vault") },
      // react-bits' own demo layer, vendored verbatim. Running their real
      // <XDemo /> components gives an exact clone of the reactbits.dev preview
      // (stage, Customize controls, prop tables) with nothing reimplemented.
      // The four source-variant trees their code-constants read raw, for the Code tab.
      { find: "@content", replacement: resolve(HOME, "vendor/reactbits/content") },
      { find: "@ts-default", replacement: resolve(HOME, "vendor/reactbits/ts-default") },
      { find: "@ts-tailwind", replacement: resolve(HOME, "vendor/reactbits/ts-tailwind") },
      { find: "@tailwind", replacement: resolve(HOME, "vendor/reactbits/tailwind") },
      // Next.js surface for the GetLayers templates (shims from the harvest sandbox)
      { find: /^next\/image$/, replacement: resolve(SHIMS, "next-image.tsx") },
      { find: /^next\/link$/, replacement: resolve(SHIMS, "next-link.tsx") },
      { find: /^next\/navigation$/, replacement: resolve(SHIMS, "next-navigation.ts") },
      { find: /^next\/dynamic$/, replacement: resolve(SHIMS, "next-dynamic.ts") },
      { find: /^next\/font\/(google|local)$/, replacement: resolve(SHIMS, "next-font.ts") },
      { find: /^next\/script$/, replacement: resolve(SHIMS, "next-script.tsx") },
      { find: /^next\/headers$/, replacement: resolve(SHIMS, "next-headers.ts") },
      // "@/": two universes. Files inside a GetLayers template resolve to THAT
      // template's src; everything else keeps the vendored-reactbits mapping.
      {
        find: /^@\/(.*)/,
        replacement: "$1",
        customResolver(source: string, importer?: string) {
          const imp = (importer ?? "").replace(/\\/g, "/");
          const m = imp.match(/^(.*?\/vault\/getlayers\/(?:templates|scenes)\/[^/]+\/files\/src)\//);
          if (m) return resolveWithExt(resolve(m[1]!, source)) ?? resolve(m[1]!, source);
          // fall back to the joined path so non-code assets (@/assets/x.png)
          // keep flowing through vite's own pipeline, as the old prefix
          // replacement did
          return resolveWithExt(resolve(HOME, "vendor/reactbits", source)) ?? resolve(HOME, "vendor/reactbits", source);
        },
      },
    ],
    // Vault files and gallery files must share one React instance, or hooks
    // throw. Both resolve to the root install.
    dedupe: ["react", "react-dom", "three", "@react-three/fiber"],
  },
  // Lanyard imports a GLTF binary; Vite doesn't treat .glb as an asset by default.
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.hdr"],
  build: {
    // All three entries, so `bun run build` resolves every vendored demo and
    // its transitive imports — a fast whole-library breakage check.
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        preview: resolve(import.meta.dirname, "preview.html"),
        demo: resolve(import.meta.dirname, "demo.html"),
        template: resolve(import.meta.dirname, "template.html"),
      },
    },
  },
  optimizeDeps: {
    // These are pulled in dynamically from vault files Vite can't statically see.
    include: ["ogl", "gsap", "three", "motion", "@gsap/react", "lenis", "matter-js", "gl-matrix"],
  },
});
