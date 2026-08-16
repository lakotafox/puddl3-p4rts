# PUDDL3 P4RTS

Your own offline library of UI components, backgrounds, blocks and full site
templates — 875 assets, all on local disk, no network needed. Live (private
repo, public site) at **lakotafox.com/PUDDL3P4RTS**.

The vault is plain files on disk and is the source of truth; the manifest, CLI
and gallery are all consumers of it.

```
p4rts search <q>          fuzzy search the manifest
p4rts show <id|slug>      details + the correct import line
p4rts cat <id>            raw source to stdout (agent-friendly)
p4rts grep <pattern>      ripgrep over vault source
p4rts add <id> --to DIR   copy into a project, install deps, print the import
p4rts index               rebuild manifest.json from meta.json files
p4rts doctor              env + vault health
```

`p4rts` is linked globally (`bun link` → `~/.bun/bin/p4rts`), and the MCP server
(`src/mcp/server.ts`) is registered user-scope as `puddl3-parts`, so every Claude
session can search the library and paste parts in. The global `~/.claude/CLAUDE.md`
tells sessions to check here first for any UI work.

`vault/manifest.json` is a **cache**. Delete it, run `p4rts index`, and it is
rebuilt from each asset's `meta.json` with no network.

## Layout

```
vault/<source>/<kind>/<slug>/meta.json + variants/<id>/<files>
vault/getlayers/{templates,scenes}/<name>/files/**
vendor/reactbits/                  THE SITE — see below
gallery/                           vite app that serves it
src/{cli,lib,mcp,ingest}/          CLI, manifest, MCP server
scripts/                           the idempotent build/brand pipeline
```

**`vendor/reactbits/` is the frontend, not a vendored reference copy.**
`gallery/src/main.tsx` does `import App from "@/App"`, and `@` resolves there.
1,607 files: `App.jsx`, `pages/`, `components/` (navbar, sidebar, search),
`constants/` (categories, catalog), `demo/` (all 166 live demos), `docs/`, CSS.
Every feature — the Get menu, the picker, the accordion, the pager — lives in
it. Deleting it leaves an empty `<div id="root">`. The directory name is the
last thing carrying an old name; renaming it is a contained change (a few Vite
aliases in `gallery/vite.config.ts` plus the `VENDOR` const in `scripts/*.ts`)
and has not been done yet.

Off-project archive: `~/Desktop/puddl3-archive/` holds `renames.json` (the
historical naming sheet) and the pristine pre-rename tarballs. Nothing in the
build needs them — `scripts/add-pro.ts` degrades to an empty map when the sheet
is absent, verified by a clean build.

## Never hand-edit the site — run the scripts

Everything in `vendor/reactbits/` is produced by idempotent scripts. Hand edits
survive until the next run and then vanish. Run in this order after any change:

| script | what it owns |
|---|---|
| `rebrand.ts` | brand text, wordmark/logos, stripped storefront + tools, search, mobile menu accordion, Get menu, collapsible Customize/Props, hamburger→picker, colour-picker Done, component pager, demo links |
| `write-docs.ts` | Get Started pages (merged intro, optional MCP) |
| `add-pro.ts` | publishes the 134 Deep components into the sidebar |
| `add-templates.ts` | Templates zone + per-template CSS wrappers |
| `personalize.ts` | demo content (names, copy) |
| `scrub-source-brand.ts` | brand strings baked into component source |
| `build-site.ts` | production build + bakes scenes, three, template publics |

Whole-library check: **`cd gallery && bun run build`** — resolves the site, all
166 demos, all 875 vault assets and every transitive import in one pass (~10k
modules, ~25s). Fastest way to prove nothing is broken.

Deploy: `P4RTS_BASE=/PUDDL3P4RTS/ bun run scripts/build-site.ts && netlify deploy --prod --dir gallery/dist --no-build`

## Licensing — read before publishing anything

The repo is **private and must stay private**. 710 of the 875 assets are
third-party commercial licences bought for your use and marked
`license.redistributable: false`; only the 166 free components (MIT) may be
redistributed, with attribution. Renaming does not change this: a renamed file
is byte-identical to its original (verified — undo the rename on any component
and the diff is 0 lines), so a public repo would be redistributing paid assets.
If you want a public link for the CLI, publish a **separate** repo containing the
CLI, the MCP server and only the free components.

## Gotchas — learned the hard way, don't rediscover

### Site + build
- **Component deps live in the ROOT `package.json`**, not `gallery/`. Vault files
  import from outside gallery's tree, so resolution walks up from the vault.
- **`resolve.alias` must use the array form.** Vite's alias plugin runs before
  every other plugin, so a plugin cannot intercept an aliased id. Deep blocks
  import starter components by a capture-group regex alias that must precede the
  catch-all `@`.
- **`lazy()` must sit at module scope.** Built during render it is a new
  component every pass, so it re-suspends forever — the symptom is an infinite
  "compiling…" with no error.
- **`react-icons` is pinned to 5.5.0** — 5.7 dropped `SiOpenai`.
- `.glb`/`.gltf` need `assetsInclude`; Badge Swing imports a GLTF binary.
- Demos need the full provider chain (Chakra + `MemoryRouter` + nuqs adapter +
  `Providers`); missing one fails deep inside a hook with a destructuring error.
- **Deep previews render in the isolated `/preview.html` iframe, never inline.**
  Site chrome is Chakra, whose emotion `@layer reset` collides with vault
  Tailwind in the same document — the symptom is surreal (`.text-5xl` exists,
  tokens resolve, heading still computes 16px). `preview.html` carries its own
  minimal stylesheet plus `@custom-variant dark (&:is(.dark *))`, without which
  Tailwind v4's `dark:` follows prefers-color-scheme and blocks render white.
- **`@source` must include `ProCatalog.js`** in preview.css — demoProps carry
  Tailwind classes and utilities only generate for scanned files.
- **Rules of Hooks**: ProDemo's early `if (!meta) return` must sit BELOW all
  hooks — putting hooks after it white-screens the page.
- Deep blocks assume **Tailwind v4** (`bg-linear-to-br`, `shadow-xs`). `p4rts add`
  refuses a v3 target without `--force`; for starter components on v3 it picks
  the `css` variant instead.

### Mobile (2026-08-16)
- **One unconditional CSS line broke every phone page.** Our right-sidebar flip
  re-declared `--content-inset-right` with no media query, defeating the
  ≤967px reset, so content collapsed to a ~110px column. The flip is now gated
  to `min-width: 968px`.
- **The invisible navbar still swallowed taps** — it re-enables `pointer-events`
  on inner elements, so hiding the parent isn't enough; the hero rule covers the
  whole subtree.
- **Effects run after first paint.** Hiding the picker list or the chrome from an
  effect flashed them for a frame; both are hidden in CSS / during render now.
- **A pre-React holding style must be torn down.** `index.html` injects
  `#p4rts-boot` when landing on `/library`; it carries `.category-page {opacity:0}`,
  so when it outlived the arrival it blanked every page reached afterwards (only
  a hard reload looked fine, because that path never injects it). The picker
  removes it on mount, plus a 4s failsafe.
- **A class on `<html>` is not safe for pre-React guards** — the theme provider
  assigns `className` outright and wipes it (taking `dark` with it, flashing the
  light theme). Use a `<style>` element.
- **StrictMode double-invokes effects in dev**, so a "first run only" flag set
  inside an effect never fires. Decide it in a ref during render.

### Templates
- **Static hosting can't disambiguate template assets by Referer**, so every
  root-absolute asset ref becomes `/t/<name>/…`. This runs INSIDE
  `ingest-templates.ts` — a re-ingest once silently dropped it, breaking images
  live only, while dev's referer fallback masked it.
- iOS Safari's retracting toolbar makes `100vh` overflow; the template stage uses
  `dvh` via `@supports`.
- `.env` (chmod 600, gitignored) holds the licence key; `src/lib/env.ts` refuses
  to run if `.gitignore` doesn't ignore `.env`.

### Assets
- The registries deliver text only. **Badge Swing** additionally needs
  `card.glb` + `badge-swing.png`, copied into each vault variant. Check with:
  `grep -rlE "from '\./[^']+\.(glb|png|jpg|hdr)'" vault/`
- **33 components depend on remote media** (picsum, unsplash, pravatar, Google
  Fonts, a GitHub-hosted `.glb`) and therefore can't look right offline. That,
  not source drift, is why some previews look off.
