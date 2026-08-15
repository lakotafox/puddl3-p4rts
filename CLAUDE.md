# foxbits

Offline vault of UI components, blocks and templates. The vault is plain files on
disk and is the source of truth; the manifest, CLI and gallery are all consumers.

```
foxbits search <q>          fuzzy search the manifest
foxbits show <id|slug>      details + the correct import line
foxbits cat <id>            raw source to stdout (agent-friendly)
foxbits grep <pattern>      ripgrep over vault source
foxbits add <id> --to DIR   copy into a project, install deps, print the import
foxbits sync [source]       mirror a source (rb-free | rb-starter | rb-pro | all)
foxbits index               rebuild manifest.json from meta.json files
foxbits doctor              env + vault health
```

`vault/manifest.json` is a **cache**. Delete it, run `foxbits index`, and it is
rebuilt from each asset's `meta.json` with no network.

## Sources

| id | auth | index | count |
|---|---|---|---|
| `rb-free` | none | `reactbits.dev/r/registry.json` | 166 components × 4 variants = 664 |
| `rb-starter` | Bearer | `pro.reactbits.dev/api/r/starter/registry.json` | 135 components × `tw`/`css` |
| `rb-pro` | Bearer | `pro.reactbits.dev/api/r/pro/registry.json` | 538 blocks + 19 agent-kit files |

License key: env `REACTBITS_LICENSE_KEY` only, from `.env` (chmod 600, gitignored).
`src/lib/env.ts` refuses to run if `.gitignore` doesn't ignore `.env` or the mode
is loose. This repo must never get a public remote — pro assets are not
redistributable (`license.redistributable: false` on every pro record).

## Gotchas (learned the hard way — don't rediscover)

- **`pro.reactbits.dev` is both bot-protected and rate-limited.** Concurrency 8–10
  trips a Vercel challenge: HTTP 403 with a 33KB `Security Checkpoint` HTML page
  (`x-vercel-mitigated: challenge`), IP-scoped, clears on its own; a browser
  User-Agent does not bypass it. Concurrency 2 / 300ms then hits plain 429s.
  Serial with ~1.2s pacing works. `reactbits.dev` (free) has neither and pulls all
  664 items at concurrency 10 in ~4s.
- **Always validate the response is JSON before writing.** A challenge page is
  HTML; written blindly it silently corrupts the vault. `src/lib/http.ts` throws
  `ChallengeError` on `<`-leading bodies and never retries into a deeper block.
  Verify with: `grep -rl "<!DOCTYPE" vault/` → must be 0.
- **Naming rules differ per registry and 404 if violated.** Free = PascalCase +
  `-{JS|TS}-{CSS|TW}`. Starter = kebab-case, `-tw`/`-css` **required**. Pro blocks
  = kebab-case, suffix **forbidden**.
- **Block export names are unguessable** — `hero-1`→`Hero1`, `404-3`→`NotFound3`,
  `cta-4`→`Cta4`, mixing default and named. `src/lib/exports.ts` extracts them at
  ingest; `foxbits doctor` reports any that fell back to a guess.
- **Upstream `dependencies` are sometimes incomplete.** `Lanyard` imports
  `@react-three/rapier` and `meshline` without declaring them; `ascii-cursor`
  omits `@react-three/postprocessing`; 16 Pro blocks use `d3-shape` and
  `editor-3` uses `shiki`, none declared. `src/lib/imports.ts` scans the source
  and reconciles, otherwise `foxbits add` installs a broken set.
- **The import scanner must not match `from` inside string literals.** A first
  version used `/\bfrom\s*["']([^"']+)["']/`, and
  `console.error('Failed to load font from', url)` in `circular-gallery` captured
  multi-line garbage as a package name straight into the manifest. Specifiers
  never span lines, and every name is validated against the npm-name pattern.
- **`foxbits index --renormalize` repairs derived fields offline.** It recomputes
  dependencies and exports from `vault/_raw/` plus the files on disk — which is
  why the raw JSON is kept. Fixing the scanner bug above took seconds instead of
  re-fetching 859 rate-limited items.
- **Duplicate `Authorization` headers silently break the Pro API** — send exactly one.
- **Component deps live in the ROOT `package.json`, not `gallery/`.** Vault files
  import from outside gallery's tree, so Node resolution walks up from the vault
  and must find them at the repo root. `gallery/` holds only vite/tailwind.
- **In `gallery/src/preview.tsx`, `lazy()` must stay at module scope.** Built
  inside render it is a new component every pass, so it re-suspends forever and
  the fallback never clears — the failure looks like an infinite "compiling…".
- Pro blocks assume **Tailwind v4** (`bg-linear-to-br`, `shadow-xs`). `foxbits add`
  refuses a v3 target without `--force`. For starter components on a v3 project it
  picks the `css` variant instead, which needs no Tailwind at all.
- `auralis.zip` / `new-era.zip` in `~/Downloads` are **GetLayers** templates, not
  React Bits (`next16-claude-starter` by Textura). GetLayers caps template zips at
  **3/day**, so bulk-mirroring templates is a multi-day job.

## The gallery IS the reactbits site, rebranded

`vendor/reactbits/` holds react-bits' **entire** site source (MIT + Commons
Clause), vendored verbatim: `App.jsx`, `pages/`, `demo/`, `content/`, the four
variant trees, `components/`, `hooks/`, `constants/`, `docs/`, `tools/`, `css/`,
`assets/`. `gallery/src/main.tsx` mounts their real `<App />`, so the sidebar,
category routing, search, Customize panels, prop tables, Copy for AI and docs are
the genuine article — not a lookalike. `bun run dev` in `gallery/` serves it at
:5177; routes match upstream (`/backgrounds/aurora`, `/get-started/introduction`).

All 166 free components are linked to their demo by `foxbits sync demos`
(`meta.json.demo.name`).

**Rebranding is a script, never hand edits: `bun run scripts/rebrand.ts`.**
It is idempotent, so refreshing upstream is "copy the tree, re-run it"; editing
vendored files by hand loses everything on the next re-vendor. It:
- replaces display text ("React Bits" → foxbits, longest-match first),
- generates a foxbits counterpart for every `react-bits-logo*.svg`,
- rewrites `components/common/SVGComponents.jsx` — the navbar wordmark is
  hand-drawn vector paths, so no string replace can touch it,
- strips the storefront chrome: the announcement modal covers the page on load,
  the sponsor cards load remote images that break offline, and the Pro card
  upsells a licence already owned and mirrored locally.

It also removes the **Tools tab** (Background Studio, Shape Magic, Texture Lab)
entirely. That takes six edits, not one, because the feature is wired in more
places than the `TOOLS` constant:
- `constants/Tools.js` → `TOOLS = []` (clears every nav that maps over it)
- `Navbar.jsx` `NAV_LINKS` → drop the Tools entry
- `App.jsx` → drop the `/tools/:toolId?` route and its import
- `OpenInStudioButton.jsx` → render null, **keeping the named `buildStudioUrl`
  export** that `TabsLayout` imports (a component-only stub fails the build).
  This covers the 61 demos rendering the button without touching any of them.
- `TabsLayout.jsx` → `studioButtonProps = null`, killing its own inline
  "Open in BG Studio" overflow item
- `Sidebar.jsx` → **two** sites: `ToolsLinks` (mobile drawer) and an inline
  desktop block gated on `i === 0`. Both put the "Tools" heading *outside* the
  `TOOLS` map, so an empty array still leaves a stray heading.

`vendor/reactbits/tools/` and `pages/ToolsPage.jsx` are left on disk but are
unreferenced, so they never enter the bundle (10,668 → 10,635 modules). Leaving
them keeps a re-vendor clean.

Real `https://` URLs are deliberately left intact. Rewriting
`https://pro.reactbits.dev` to a foxbits domain would manufacture dead links,
which is worse than an honest one.

`/content/`, `/tailwind/`, `/ts-default/`, `/ts-tailwind/` are excluded from the
rebrand — that source is copied into user projects, so it must stay upstream-exact.

An earlier attempt regex-extracted `DEFAULT_PROPS` and the `<Customize>` JSX out
of each demo to rebuild the panel by hand. Don't go back to that: it silently
mis-parsed inline styles, URLs and demo-local variables. Running their code is
both simpler and exact.

An earlier attempt regex-extracted `DEFAULT_PROPS` and the `<Customize>` JSX out
of each demo to rebuild the panel by hand. Don't go back to that: it silently
mis-parsed inline styles, URLs and demo-local variables. Running their code is
both simpler and exact.

Whole-library check: **`cd gallery && bun run build`**. It resolves all three
entries, the whole site, all 166 demos, all 859 vault assets and every transitive
import in one pass (~9.9k modules, ~18s). Fastest way to prove nothing is broken;
run it after any rebrand or re-vendor.

### Gallery gotchas

- **Component deps live in the ROOT `package.json`**, not `gallery/`. Vault files
  import from outside gallery's tree, so Node resolution walks up from the vault
  and must find them at the repo root. `gallery/` holds only vite/tailwind.
- **`resolve.alias` must use the array form.** Vite's alias plugin runs before
  every other plugin — even `enforce: "pre"` — so a plugin cannot intercept an
  aliased id. Pro blocks import starter components as
  `@/components/react-bits/<name>`, remapped by a capture-group regex alias that
  must precede the catch-all `@`.
- **`lazy()` must sit at module scope.** Built during render it is a new
  component every pass, so it re-suspends forever; the symptom is an infinite
  "compiling…" with no error.
- **`react-icons` is pinned to 5.5.0** — 5.7 dropped `SiOpenai`, which their
  Copy-for-AI menu imports.
- `.glb`/`.gltf` need `assetsInclude`; Lanyard imports a GLTF binary.
- Their demos need the full provider chain (Chakra + `MemoryRouter` + nuqs
  adapter + their `Providers`); missing one fails deep inside a hook with a
  destructuring error rather than anything obvious.

## Component renames — the reference sheet

Every component (166 free + 135 Pro) carries a foxbits name distinct from
upstream. **The old ↔ new mapping lives in `scripts/data/renames.json`** —
keyed by (source, slug): upstream slug/oldTitle ↔ newTitle/newSlug. Consult it
before touching anything name-related. Names were agent-generated
(descriptive-but-different brief), user-approved in bulk, then quality-judged
(15 replacements). Four "twin" slugs exist in both free and Pro (animated-list,
glitch-text, particle-text, scroll-stack) — always key by (source, slug), never
slug alone.

**The vault itself IS renamed** (user decision 2026-08-14, "rename it all"):
dirs, filenames, identifiers, meta.json — via `scripts/rename-stockroom.ts`.
Pristine pre-rename tarballs in `backups/` (gitignored). Each meta.json keeps
`upstreamSlug`/`upstreamName` plus each variant's `upstreamName` — the threads
that keep `foxbits sync` matching upstream and let `resolveAsset` accept old
names (`foxbits show split-text` finds letter-break). Damage classes the rename
hit, all now handled inside the script — don't re-learn them:
- **A component can share its name with a third-party API.** Free SplitText
  imports GSAP's own `gsap/SplitText` plugin; a blind `\bSplitText` replace
  corrupted the package path AND the imported binding. The script now skips any
  line importing from a non-relative specifier.
- **Pro blocks import starter components by slug** (`auth-1` →
  `@/components/react-bits/flicker`). `retargetCrossRefs` rewrites the specifier
  to the new slug AND the binding/JSX usages (`{ Flicker }` → `{ TwinkleField }`).
- `test-pro.ts` dedupes PRO_INDEX by `file` — alias keys (old slugs, `-pro`
  twins) otherwise inflate 134 components to 402 "tests".
Verified post-rename: build green (10,772 modules), sweep 132/134 clean (2 =
benign console noise), `foxbits add` ships renamed files with renamed exports
while third-party imports stay intact.

**The vendored variant trees are renamed too** (`scripts/rename-vendored-trees.ts`,
idempotent — re-run after any re-vendor). The four trees feed the free Code tab
via `?raw` imports, so without this the page says Letter Break while the code
says SplitText. Its own hard-won rules:
- Demo FILES keep upstream names (`PixelSwapDemo.jsx` + its css) — they're
  machinery keyed by meta.json `demo.name`. The identifier sweep uses
  `\bOld(?!Demo\b)` so `PixelSwap` renames but `PixelSwapDemo`/`./PixelSwapDemo.css`
  don't; renaming those compounds broke self-css imports for 164 demos.
- Tree references live OUTSIDE demo/ + constants/code/ too: Header, CTA,
  LiveDemo, ProCta, ComponentList, ProPage all mount live components as page
  chrome. The sweep walks all of vendor/reactbits except the trees themselves
  and tools/ (stripped feature, kept upstream-exact).
- resolveAsset (src/lib/manifest.ts) falls back to upstreamSlug/upstreamName, so
  `foxbits show split-text` still finds letter-break.

**5-agent audit (2026-08-14) found + fixed — the classes to re-check after any
future rename/re-vendor:**
- `swapPath` missed bare terminal dir segments → `paths.root` stale in all 301
  metas (fixed in script + backfilled). Only variant/file paths were correct.
- **The identifier root must be the FILE's base name, not `exports[0].name`.**
  focus-pull (was GradualBlur) records `GradualBlurMemo` (the memo wrapper) as
  its export, so every keyed-by-upstreamName pass skipped it — the one
  component of 301 that dodged the rename everywhere. It's the only memo-style
  divergence (`upstreamName != demo.name` for exactly 1 of 166).
- Pro blocks can BUNDLE a starter dep as a sibling file (auth-1 ships its own
  copy, now twinkle-field.tsx) — retargeting the import specifier alone leaves
  the bundled copy stale and breaks `foxbits add` of the block.
- Agent-kit SKILL.md files reference starter slugs as `@reactbits-starter/<slug>-tw`
  install specifiers — a different prefix than code cross-refs, easy to miss.
- **add-pro alias keys must exclude free slugs (both identities).** The 4 twin
  old slugs went into PRO_MAP, which is spread LAST into componentMap — it
  silently shadowed 4 free pages with "Unknown Pro asset". Twins are reachable
  via `-pro` aliases only.
- **Alias-by-reference is a trap for enumerating consumers.** Information.js
  aliases kept the old `name:` field (cards showed old titles) and doubled
  Object.entries (Browse All listed everything twice). apply-renames now renames
  the REAL entries in place and emits non-enumerable defineProperty compat keys
  for old routes; it recovers prior pairs from its own marker block on re-runs.
- Hand-authored marketing arrays don't read the constants: Features.jsx's
  homepage marquee had 19 stale titles (now a pass in apply-renames).
- **Python gotcha that truncated 8 files:** `open(p,'w').write(f(open(p).read()))`
  — the 'w' open truncates BEFORE the read evaluates. Read first, then write.
  Recovered from backups/ tarballs (their whole purpose).
**No old names anywhere — final policy (user, 2026-08-15).** The ONLY old↔new
tie is `scripts/data/renames.json` (internal, never ships) plus artifacts
mechanically GENERATED from it (compat alias blocks, meta upstream threads,
`_raw/`, backups). Everything hand-written or shipped carries new names only.
Enforced by two more idempotent scripts, re-run after any re-vendor, in order:
1. `scripts/scrub-internal-names.ts` — old kebab slug → new inside each
   component's own files (CSS classes/keyframes/data-attrs, className strings,
   title prose) across vault + tree copies + demo pair. Camel compounds
   (`antigravityCode`) are deliberately skipped — pass 2 renames them with
   their file.
2. `scripts/rename-demo-machinery.ts` — demo file pairs (AntigravityDemo →
   RepelFieldDemo), code-loader files + export consts, demo import bindings,
   Components.js loader paths, meta.demo.name. apply-renames.ts now also
   rewrites componentMap's REAL keys to new slugs (old slugs = generated
   compat aliases, same in-place strategy as Information.js).
Damage classes the scrub hit (all now guarded or fixed — don't re-learn):
- **Old slug used as a code identifier**: loader bindings (`import { antigravity }`),
  vars (`const particles`/`stack`/`hyperspeed` in mote-field/swipe-deck/
  warp-drive), asset import bindings (badge-swing's lanyard.png). A kebab
  replacement there is a syntax error. Fixed code-position-aware (string-region
  detection + multi-line template-literal tracking).
- **Old slug inside GLSL**: retro-static's shader function — string-position
  but still an identifier; kebab breaks the shader at RUNTIME, not build.
- **Old title as code vocabulary**: filament-weave's MAX_STRANDS/strandColor
  prop family — renamed wholesale (component + demo stay consistent; prop API
  is ours to change).
- Lanyard's binary asset renamed on disk to badge-swing.png (vault variants,
  tree copies, vendored assets/badge-swing/) to match rewritten import paths.
- WarpDrive's console TypeError (`reading 'alpha'`) is PRE-EXISTING upstream
  demo behavior — verified byte-equivalent to backup modulo renames; not scrub
  damage. Component renders fine.

## Pro: components only — blocks are not published

**Decision (user):** foxbits is a component library. The 538 Pro blocks and the
agent kit stay mirrored in the vault but are NOT shown on the site — no Sections
zone, no block pages. `scripts/add-pro.ts` publishes only the 135 Pro components
into the sidebar (with a PRO badge). Re-run it after any `foxbits sync`.

Gotchas that shaped this:
- **`componentMap` is keyed by slug alone** — 4 Pro slugs collide with free ones
  (`animated-list`, `glitch-text`, `particle-text`, `scroll-stack`) and get a
  " Pro" label suffix.
- Pro assets ship **no demos**; `inferDemoProps` fills content props (text/label)
  so components that bail on missing content still preview.
- Full-bleed components (webgl/shader/background tags) get `fill: true` in
  PRO_INDEX — flex-centering shrink-wraps them into a strip.

## Pro Customize panels + preview stages (how parity was reached)

Schemas in `scripts/data/pro-schemas.json` (agent-extracted per component:
controls, demoProps, stage) drive `ProDemo`'s Customize panel using the site's
own vendored PreviewSlider/Switch/Select/ColorPicker. Prop changes postMessage
into the preview iframe — never rebuild the src URL, or WebGL restarts.
`scripts/test-pro.ts` (playwright) mounts all 135, checks mount/paint/console,
screenshots into `scripts/data/shots/`; upstream's own preview images live at
`gallery/public/assets/pro/components/` for comparison.

Hard-won specifics:
- **Cursor components hover-gate themselves.** `user-cursor` needs
  `fullScreen: true` (only then does it bind window pointermove); the rest need
  a full-size wrapper (`className: 'w-full h-full'`) so their own hover area
  covers the stage.
- **Scroll components need `data-scroll-container` ON the stage scroller** —
  GSAP ScrollTrigger binds to `closest('[data-scroll-container]')`, else the
  (overflow:hidden) window, and wheeling does nothing. Component goes at the TOP
  of a tall track; it pins itself.
- **`@source` must include `ProCatalog.js`** in preview.css — demoProps carry
  Tailwind classes and utilities only generate for scanned files.
- **Copy-for-AI on Pro pages**: TabsLayout lights the whole toolbar up from a
  `CodeExample` child in CodeTab (it derives aiExport from codeExampleProps).
  `utils/cli.js` is patched (marker `foxbits:pro-cli`, applied by add-pro.ts) so
  pro-* categories emit `@reactbits-starter/<slug>-tw` install commands.
- **Rules of Hooks**: ProDemo's early `if (!meta) return` must sit BELOW all
  hooks — putting hooks after it white-screens the page.
- `foxbits-sticker.png` is generated by `scripts/make-sticker.ts` (playwright);
  the build fails on StickerPeelDemo if it is missing.

## Pro previews render in the isolated iframe — NEVER inline

`demo/Pro/ProDemo.jsx` renders previews via `/preview.html` (iframe), not inline.
This is load-bearing: the site chrome is Chakra, whose emotion `@layer reset`
global collides with vault Tailwind utilities in the same document — the symptom
is surreal (`.text-5xl` exists in `@layer utilities`, tokens resolve, and the
heading still computes 16px). Upstream never mixes the two either: their inline
demos all use the CSS variants. Debug trail that found it: utilities generated →
tokens on :root → clean element still 16px → binary-search disabling stylesheets
→ sheet #20, `data-emotion=css-global`.

The preview page has its own minimal stylesheet (`gallery/src/preview.css`):
`@import "tailwindcss"` + `@source` over the **vault** + the shadcn
`@custom-variant dark (&:is(.dark *))` — Tailwind v4's `dark:` defaults to
prefers-color-scheme, so without the custom variant blocks render bg-white.
`preview.html` carries `class="dark"`.

## Demo/public assets

Upstream serves media from its `public/` dir (`/assets/video/masked-heading.mp4`,
`/assets/3d/*.glb`, sounds, demo images). Vendored into `gallery/public/assets/`
(demo, 3d, video, sounds, fonts — 25MB; pro/sponsors/showcase promo skipped).
MaskedHeading rendering nothing was this: the demo references a public-dir video
that was never vendored.

## Components are verified byte-identical to upstream

`vault/reactbits-free` vs the vendored repo originals: **960/960 files
byte-identical, 166/166 components**, confirmed both by direct diff and by a
19-agent read-only audit. If a component looks wrong, the source is not the cause.

**33 components depend on remote assets** and therefore cannot look like
reactbits.dev offline — picsum.photos, images.unsplash.com, i.pravatar.cc,
fonts.googleapis.com, and (ModelViewer) GitHub-hosted `.glb` plus a drei HDRI
CDN. They render as blank frames or fall back to a different font. That, not any
source drift, is why some previews look "slightly off". Fixing it means
vendoring local placeholder media and rewriting those defaults.

## Assets the registry does not ship

The registries deliver text only. `Lanyard` additionally needs `card.glb` and
`lanyard.png`, copied from the repo's variant dirs into each vault variant. It is
the only such component today — check with:
`grep -rlE "from '\./[^']+\.(glb|png|jpg|hdr)'" vault/`

## Layout

```
vault/<source>/<kind>/<slug>/meta.json + variants/<id>/<files>
vault/_raw/<source>/<upstreamName>.json     verbatim upstream, re-normalize offline
vault/_state/sync-<source>.jsonl            append-only journal (resumability)
```

Sync is hash-gated: unchanged files are not rewritten, so a re-sync produces a
clean diff showing only what upstream actually changed. Pro ingest resumes by
skipping any asset that already has a complete `meta.json`.
