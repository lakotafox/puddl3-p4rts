#!/usr/bin/env bun
import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { HOME, walk } from "../src/lib/vault.ts";

/**
 * Rebrand the vendored react-bits site to foxbits.
 *
 * Idempotent and re-runnable, so re-vendoring upstream is: copy the tree, run
 * this. Editing the vendored files by hand instead would silently lose every
 * change the next time the source is refreshed.
 *
 * Display text only — real https URLs are left intact. Rewriting
 * https://pro.reactbits.dev to a foxbits domain would manufacture dead links,
 * which is worse than an honest one; the promo UI that shows them is removed
 * outright instead.
 */

const VENDOR = join(HOME, "vendor/reactbits");

/** Order matters: longest first, so "React Bits Pro" isn't half-replaced. */
const TEXT: [RegExp, string][] = [
  [/React Bits Pro/g, "foxbits Pro"],
  [/React Bits/g, "foxbits"],
  [/ReactBits/g, "FoxBits"],
  [/react-bits-logo/g, "foxbits-logo"],
  [/reactbits-gh/g, "foxbits-gh"],
  [/react-bits-sticker/g, "foxbits-sticker"],
  // display-brand pass (runs after the foxbits substitutions above):
  [/foxbits - /g, "PUDDL3 P4RTS - "],
  [/foxbits — an open source/g, "PUDDL3 P4RTS — an open source"],
  // AI-export prompts (user caught "More from foxbits" in a pasted prompt):
  [/component from foxbits/g, "component from PUDDL3 P4RTS"],
  [/### More from foxbits/g, "### More from PUDDL3 P4RTS"],
  [
    /The full library index, including everything reactbits\.dev offers, is at https:\/\/reactbits\.dev\/llms\.txt — fetch it/g,
    "The full library lives at https://lakotafox.com/PUDDL3P4RTS — browse it",
  ],
  // Catch-all (user, 2026-08-15: "no foxbits anywhere"): every remaining
  // display "foxbits" becomes the real brand. The lookahead protects the
  // internals that must keep the name: script markers (foxbits:pro-cli …),
  // generated asset filenames (foxbits-logo.svg …), and identifiers
  // (foxbits_…); FOXBITS_HOME and FoxBits bindings differ by case.
  [/foxbits(?![-:_])/g, "PUDDL3 P4RTS"],
];

/** Files whose content is copied into user projects — leave their code alone. */
const SKIP_DIRS = ["/content/", "/tailwind/", "/ts-default/", "/ts-tailwind/", "/assets/"];

const isCode = (p: string) => /\.(jsx?|tsx?|md|html)$/.test(p);

/**
 * The foxbits mark: an origami-style fox head, one path, fill-rule evenodd so
 * the eyes punch through to whatever is behind. Angular on purpose — it reads
 * at 16px (favicon) and stays crisp at any scale. currentColor everywhere a
 * variant doesn't pin a color.
 */
const FOX_HEAD =
  "M16 29 L3 13 L6 3 L13 8.5 L16 10 L19 8.5 L26 3 L29 13 Z " +
  "M9.5 14.5 L14 14.5 L11.75 19 Z " +
  "M18 14.5 L22.5 14.5 L20.25 19 Z";

const foxSvg = (fill: string, size = 32) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" fill="none">
  <title>PUDDL3 P4RTS</title>
  <path d="${FOX_HEAD}" fill="${fill}" fill-rule="evenodd"/>
</svg>
`;

/** Full lockup: fox head + wordmark, for the gh-logo demo assets. */
const foxLockup = (fill: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158 28" width="158" height="28" fill="none">
  <title>PUDDL3 P4RTS</title>
  <g transform="translate(0 2.5) scale(0.72)">
    <path d="${FOX_HEAD}" fill="${fill}" fill-rule="evenodd"/>
  </g>
  <text x="28" y="20" fill="${fill}" font-family="Geist, ui-sans-serif, system-ui, sans-serif" font-size="15" font-weight="600" letter-spacing="-0.3">PUDDL3 P4RTS</text>
</svg>
`;


async function main() {
  const files = (await walk(VENDOR, isCode)).filter((p) => !SKIP_DIRS.some((d) => p.includes(d)));
  let changed = 0;
  let hits = 0;

  for (const f of files) {
    const before = await readFile(f, "utf8");
    let after = before;
    for (const [re, to] of TEXT) {
      const m = after.match(re);
      if (m) hits += m.length;
      after = after.replace(re, to);
    }
    if (after !== before) {
      await writeFile(f, after, "utf8");
      changed++;
    }
  }

  console.log(`✓ rebranded ${changed} files (${hits} replacements) across ${files.length} scanned`);
  await mirrorLogos();
  await writeWordmark();
  await stripPromo();
  await pointHomeLink();
  await stripTools();
  await brandAssets();
  await stripOpenInAI();
  await retargetAIExport();
  await stripProStorefront();
  await simplifySearch();
  await stripNewBadges();
  await stripSponsors();
  await stripLanding();
}

/**
 * No landing page (user, 2026-08-15): the library IS the product. "/" redirects
 * into Get Started; the landing's storefront chrome (GET PRO, COMMUNITY,
 * Sponsors nav/route, showcase) goes with it. LandingPage.jsx stays on disk
 * unreferenced, same policy as tools/.
 */
async function stripLanding() {
  const app = join(VENDOR, "App.jsx");
  let s = await readFile(app, "utf8");
  const before = s;
  s = s.replace("import LandingPage from './pages/LandingPage';\n", "");
  if (!s.includes("Navigate")) {
    s = s.replace("import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';",
                  "import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';");
  }
  s = s.replace("<Router>", "<Router basename={import.meta.env.BASE_URL.replace(/\\/$/, '')}>");
  s = s.replace('<Route exact path="/" element={<LandingPage />} />',
                '<Route exact path="/" element={<Navigate to="/get-started/introduction" replace />} />');
  s = s.replace(/\s*<Route exact path="\/sponsors" element=\{<SponsorsPage \/>\} \/>/, "");
  s = s.replace(/import SponsorsPage from '\.\/pages\/SponsorsPage';\n/, "");
  if (s !== before) await writeFile(app, s, "utf8");

  // navbar: Sponsors link + GET PRO + COMMUNITY out
  const nav = join(VENDOR, "components/landingnew/Navbar/Navbar.jsx");
  let n = await readFile(nav, "utf8");
  const nBefore = n;
  n = n.replace(/const NAV_LINKS = \[[\s\S]*?\];/, "const NAV_LINKS = [];");
  n = n.replace('          <span className="ln-navbar-divider">/</span>\n\n', "");
  // the whole storefront cluster renders under {!showDocs && …} — one block
  n = n.replace(/\{!showDocs && \(\s*<>\s*<a\s*\{\.\.\.proLinkProps\('\/', 'navbar'\)\}[\s\S]*?COMMUNITY <span className="ln-navbar-soon">SOON<\/span>\s*<\/span>\s*<\/>\s*\)\}/, "");
  // github icon in the lakotafox button → the fox mark (user, 2026-08-15)
  n = n.replace('<FaGithub size={16} color="#fff" />',
    `<svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="\${FOX_HEAD}" fill="#ff8c1a" fillRule="evenodd" /></svg>`);
  // the person-icon Preferences hover menu (JS/TS + CSS/TW presets + Favorites
  // link) — redundant with the per-page Code tab switchers (user, 2026-08-15)
  n = n.replace(/\n\s*<div className="ln-navbar-prefs-wrapper"[\s\S]*?\n              <\/div>\n(?=\s*<\/>)/, "\n");
  if (n !== nBefore) await writeFile(nav, n, "utf8");
  console.log("  landing + storefront nav removed ('/' → library)");
}

/** Search dialog, minimal (user, 2026-08-15): plain placeholder, no Free-only
 *  toggle (everything here is "free" to us). */
async function simplifySearch() {
  const p = join(VENDOR, "components/common/SearchDialog.jsx");
  let s = await readFile(p, "utf8");
  const before = s;
  s = s.replace('placeholder="Search components, categories, or keywords..."', 'placeholder="Search..."');
  s = s.replace(/\s*<div className="search-footer">\s*<label className="search-toggle">[\s\S]*?Free only\s*<\/label>\s*<\/div>\n/, "\n");
  if (s !== before) await writeFile(p, s, "utf8");
  console.log("  search simplified");
}

/**
 * NEW badges off (user, 2026-08-15): the whole library is "new to foxbits", so
 * the tags are noise. Emptying NEW[] clears every badge; the array stays so a
 * future curated list drops straight in.
 */
async function stripNewBadges() {
  const p = join(VENDOR, "constants/Categories.js");
  let s = await readFile(p, "utf8");
  // Index page removed for now (user, 2026-08-15): its Browse-All cards use
  // upstream's prerecorded preview media. Redo later with our own screenshots.
  s = s.replace(/,?\s*'Index'/, "");
  const after = s.replace(/export const NEW = \[[\s\S]*?\];/, "export const NEW = [];");
  if (after !== s) await writeFile(p, after, "utf8");
  console.log("  NEW badges cleared");
}

/**
 * Sponsors, fully out (user, 2026-08-15): stripPromo removed the desktop cards;
 * this removes the last two surfaces — the mobile header's Sponsors button and
 * the drawer's SponsorsCard (with its remote-image loads).
 */
async function stripSponsors() {
  const p = join(VENDOR, "components/navs/Sidebar.jsx");
  let s = await readFile(p, "utf8");
  const before = s;
  s = s.replace(
    /        <IconButton px=\{3\} \{\.\.\.ICON_BUTTON_STYLES\} aria-label="Sponsors" onClick=\{onSponsorsClick\}>[\s\S]*?<\/IconButton>\n/,
    "",
  );
  s = s.replace("            <Box className=\"sponsors-overlay\">\n              <SponsorsCard />\n            </Box>",
                "            <Box className=\"sponsors-overlay\" />");
  s = s.replace("import SponsorsCard from '../common/SponsorsCard';\n", "");
  if (s !== before) await writeFile(p, s, "utf8");
  console.log("  sponsors surfaces removed");
}

/**
 * Remove the Tools tab (Background Studio, Shape Magic, Texture Lab) entirely.
 *
 * Everything is driven off the TOOLS constant, so emptying it clears the header,
 * sidebar and mobile nav in one move. The two loose ends are the route (which
 * would otherwise stay reachable by URL) and the "Open in BG Studio" affordance
 * that 61 demos render — neutralised at its single source rather than by editing
 * 61 files.
 */
async function stripTools() {
  const edit = async (rel: string, fn: (s: string) => string) => {
    const p = join(VENDOR, rel);
    let s: string;
    try { s = await readFile(p, "utf8"); } catch { return; }
    const out = fn(s);
    if (out !== s) {
      await writeFile(p, out, "utf8");
      console.log(`  tools stripped from ${rel}`);
    }
  };

  // Empties every nav that maps over TOOLS.
  await edit("constants/Tools.js", () =>
    `// Tools removed for PUDDL3 P4RTS (see scripts/rebrand.ts). Every header, sidebar
// and mobile nav maps over this list, so an empty array clears them all.
export const TOOLS = [];
`);

  await edit("components/landingnew/Navbar/Navbar.jsx", (s) =>
    s.replace(/\s*\{ label: 'Tools', to: '\/tools', match: '\/tools' \},?/, ""));

  // Drop the route so /tools is not reachable by direct URL.
  await edit("App.jsx", (s) =>
    s
      .replace(/^import ToolsPage from '\.\/pages\/ToolsPage';\n/m, "")
      .replace(/^\s*<Route path="\/tools\/:toolId\?" element=\{<ToolsPage \/>\} \/>\n/m, ""));

  // Covers all 61 demos that render the button.
  // Keep the full module surface: TabsLayout imports the named buildStudioUrl
  // alongside the default export, so a stub that only covers the component
  // breaks the build.
  await edit("components/common/Preview/OpenInStudioButton.jsx", () =>
    `// Background Studio was removed for PUDDL3 P4RTS. This keeps the same exports and
// props so none of the 61 demos rendering it need to change.
export const buildStudioUrl = () => null;

export default function OpenInStudioButton() {
  return null;
}
`);

  // TabsLayout renders its own "Open in BG Studio" overflow item, gated on
  // finding an OpenInStudioButton child. Cut it off at the source.
  await edit("components/common/TabsLayout.jsx", (s) =>
    s.replace(
      /const studioButtonProps = contentMap\.PreviewTab\s*\n\s*\? findChildProps\(contentMap\.PreviewTab\.props\.children, OpenInStudioButton\)\s*\n\s*: null;/,
      "const studioButtonProps = null; // Background Studio removed for PUDDL3 P4RTS",
    ));

  // The desktop header renders a standalone Tools link and hover menu that do
  // not go through TOOLS, so emptying that constant does not hide them.
  await edit("components/navs/Header.jsx", (s) =>
    s.replace(
      /<FadeContent blur>\s*<ToolsLink[\s\S]*?\/>\s*<\/FadeContent>\n/,
      "",
    ));

  // The sidebar renders Tools twice — once in the mobile drawer (ToolsLinks) and
  // once inline in the desktop tree — and both put the heading outside the TOOLS
  // map, so an empty list still leaves a stray "Tools" label behind.
  await edit("components/navs/Sidebar.jsx", (s) =>
    s
      .replace(
        /const ToolsLinks = \(\{ onClose \}\) => \(/,
        "const ToolsLinks = () => null; // Tools removed for PUDDL3 P4RTS\nconst _UnusedToolsLinks = ({ onClose }) => (",
      )
      .replace(
        /\{\/\* Tools Section - after Pro \*\/\}\s*\n(\s*)\{i === 0 && \(/,
        "{/* Tools section removed for PUDDL3 P4RTS */}\n$1{false && (",
      ));
}

/**
 * Repoint the header link at lakotafox.com and stop the GitHub star fetch.
 *
 * `useStars` hits the GitHub API on every load, so offline the button showed a
 * stale hardcoded 43.5k — a number about someone else's repo that could never be
 * right here. The stub keeps the same hook signature so no caller changes.
 */
async function pointHomeLink() {
  const site = join(VENDOR, "constants/Site.js");
  let s = await readFile(site, "utf8");
  s = s.replace(/export const GITHUB_URL = '[^']*';/, "export const GITHUB_URL = 'https://lakotafox.com';");
  await writeFile(site, s, "utf8");

  await writeFile(join(VENDOR, "hooks/useStars.js"),
    `// Offline stub: upstream polls the GitHub API for a star count. There is no
// meaningful count for a local mirror, and the request fails with no network, so
// the label is a static wordmark instead. Same signature as upstream.
export const useStars = () => 'lakotafox';
`, "utf8");

  // The navbar formats the value as "43.5k"; with a string label, show it as-is.
  const navbar = join(VENDOR, "components/landingnew/Navbar/Navbar.jsx");
  let n = await readFile(navbar, "utf8");
  n = n.replace(
    /\(\) => \(stars >= 1000 \? `\$\{\(stars \/ 1000\)\.toFixed\(1\)\.replace\(\/\\\.0\$\/, ''\)\}k` : stars\)/,
    "() => (typeof stars === 'number' ? (stars >= 1000 ? `${(stars / 1000).toFixed(1).replace(/\\.0$/, '')}k` : stars) : stars)",
  );
  await writeFile(navbar, n, "utf8");
  console.log("  header link → lakotafox.com (star fetch stubbed)");
}

/**
 * The navbar wordmark is not an asset — it's an inline SVG component whose
 * "React Bits" lettering is hand-drawn vector paths, so no string replacement
 * can touch it. Swap the whole component for a foxbits wordmark that keeps the
 * same export name and box so the navbar layout is unchanged.
 */
async function writeWordmark() {
  const p = join(VENDOR, "components/common/SVGComponents.jsx");
  await writeFile(p, `export const Logo = () => (
  <svg width="152" height="23" viewBox="0 0 160 24" fill="none"
       xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
    <g transform="translate(0 0.5) scale(0.72)">
      <path d="${FOX_HEAD}" fill="#ff8c1a" fillRule="evenodd" />
    </g>
    <text x="28" y="18" fill="white"
          fontFamily="Geist, ui-sans-serif, system-ui, sans-serif"
          fontSize="15" fontWeight="600" letterSpacing="-0.3">PUDDL3 P4RTS</text>
  </svg>
);
`, "utf8");
  console.log("  wordmark → components/common/SVGComponents.jsx");
}

/**
 * Upstream imports several logo variants (small, small-black, gh-white,
 * gh-black). The rebrand rewrites every specifier, so a foxbits counterpart is
 * generated for each from FOX_HEAD — no hand-drawn master file to maintain.
 */
async function mirrorLogos() {
  const dir = join(VENDOR, "assets/logos");
  const files: [string, string][] = [
    ["foxbits-logo.svg", foxSvg("#ff8c1a")],
    ["foxbits-logo-small.svg", foxSvg("#ff8c1a", 24)],
    ["foxbits-logo-small-black.svg", foxSvg("#111111", 24)],
    ["foxbits-gh-white.svg", foxLockup("#ff8c1a")],
    ["foxbits-gh-black.svg", foxLockup("#111111")],
  ];
  for (const [name, svg] of files) {
    await writeFile(join(dir, name), svg, "utf8");
  }
  console.log(`  logos → ${files.map(([n]) => n).join(", ")}`);
}

/**
 * Remove upstream's storefront chrome. These are not cosmetic preferences: the
 * announcement modal covers the page on load, the sponsor cards load remote
 * images that render broken offline, and the Pro card upsells a licence that is
 * already owned and mirrored locally.
 */
async function stripPromo() {
  const edits: [string, [string, string][]][] = [
    ["App.jsx", [
      ["import AnnouncementModal from './components/common/AnnouncementModal/AnnouncementModal';\n", ""],
      ["          <AnnouncementModal />\n", ""],
    ]],
  ];

  for (const [rel, subs] of edits) {
    const p = join(VENDOR, rel);
    let src: string;
    try { src = await readFile(p, "utf8"); } catch { continue; }
    const before = src;
    for (const [from, to] of subs) src = src.split(from).join(to);
    if (src !== before) {
      await writeFile(p, src, "utf8");
      console.log(`  stripped promo chrome from ${rel}`);
    }
  }

  // Written wholesale rather than patched: the right rail must go entirely, and
  // an already-patched file would no longer match a literal search. This is the
  // full layout minus the Pro/Sponsors rail, so it is idempotent either way.
  await writeFile(join(VENDOR, "components/layout/SidebarLayout.jsx"),
    `import Navbar from '../landingnew/Navbar/Navbar';
import Sidebar from '../../components/navs/Sidebar';

// The upstream right rail (ProCard + SponsorsCard) is removed for PUDDL3 P4RTS.
// Dropping the <aside> alone is not enough — .category-wrapper reserves
// --right-panel-width via padding-right, so that variable is zeroed in
// gallery/src/demo.css or the preview stays pushed to the left.
export default function SidebarLayout({ children }) {
  return (
    <main className="app-container">
      <Navbar showDocs />
      <section className="category-wrapper">
        <Sidebar />
        {children}
      </section>
    </main>
  );
}
`, "utf8");
  console.log("  right rail removed from components/layout/SidebarLayout.jsx");
}

main();

/**
 * Remaining brand surfaces the text pass cannot reach: the landing loader's
 * inline atom SVG, the author-credit footers, the testimonial naming the
 * upstream author, and the (previously absent) favicon.
 */
async function brandAssets() {
  // Loading splash on "/" — the atom was inline vector paths.
  await writeFile(join(VENDOR, "components/landingnew/LandingLoader/LandingLoader.jsx"),
    `import './LandingLoader.css';

const LandingLoader = ({ hiding }) => (
  <div className={\`ln-loader\${hiding ? ' ln-loader--hide' : ''}\`}>
    <svg className="ln-loader-logo" width="40" height="40" viewBox="0 0 32 32"
         fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${FOX_HEAD}" fill="white" fillRule="evenodd" />
    </svg>
  </div>
);

export default LandingLoader;
`, "utf8");
  console.log("  landing loader → fox mark");

  // Author credit under every component page. Keep the default export shape.
  await writeFile(join(VENDOR, "components/common/TabsFooter.jsx"),
    `// Credit footer removed for the PUDDL3 P4RTS mirror; upstream attribution lives in
// the repository (vendor/reactbits is MIT + Commons Clause).
const DemoFooter = () => null;

export default DemoFooter;
`, "utf8");
  console.log("  component-page credit footer removed");

  // Landing footer credit line.
  const footer = join(VENDOR, "components/landingnew/Footer/Footer.jsx");
  let f = await readFile(footer, "utf8");
  const fb = f;
  f = f.replace(/\s*<p className="ln-footer-attribution">[\s\S]*?<\/p>/, "");
  if (f !== fb) {
    await writeFile(footer, f, "utf8");
    console.log("  landing footer credit removed");
  }

  // Testimonial that names the upstream author.
  const t = join(VENDOR, "components/landingnew/Testimonials/Testimonials.jsx");
  let tj = await readFile(t, "utf8");
  const tb = tj;
  tj = tj.replace(/Have you heard of react bits\? David Haz has lovingly put together a collection of animated and fully customizable React components\./,
    "A collection of animated and fully customizable React components, mirrored for offline use.");
  if (tj !== tb) {
    await writeFile(t, tj, "utf8");
    console.log("  testimonial de-attributed");
  }

  // Favicon: SVG works in every modern browser and stays crisp.
  await writeFile(join(HOME, "gallery/public/favicon.svg"), foxSvg("#ff8c1a"), "utf8");
  const idx = join(HOME, "gallery/index.html");
  let h = await readFile(idx, "utf8");
  if (!h.includes("favicon.svg")) {
    h = h.replace("<title>", '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n    <title>');
    await writeFile(idx, h, "utf8");
  }
  console.log("  favicon → gallery/public/favicon.svg");
}

/**
 * Remove the "Open in ChatGPT / Claude / v0" menu entries — they hand the
 * component off to external AI sites, which has no place in an offline mirror.
 * The copy items (prompt, markdown, install, source) stay.
 */
/**
 * The upstream Pro storefront is an upsell for a licence already owned and
 * mirrored (the Deep zone). Three live surfaces carried it past the earlier
 * strips: the /pro + /pro/:section + /showcase routes, the mobile drawer's
 * ProLinks, and CategoryProFooter at the bottom of every component page.
 * Pages stay on disk unreferenced (same policy as tools/).
 */
async function stripProStorefront() {
  const app = join(VENDOR, "App.jsx");
  let a = await readFile(app, "utf8");
  const beforeA = a;
  a = a.replace("import ProPage from './pages/ProPage';\n", "");
  a = a.replace("import ProSectionPage from './pages/ProSectionPage';\n", "");
  a = a.replace("import ShowcasePage from './pages/ShowcasePage';\n", "");
  a = a.replace(`          <Route exact path="/showcase" element={<ShowcasePage />} />\n`, "");
  a = a.replace(`          <Route exact path="/pro" element={<ProPage />} />\n`, "");
  a = a.replace(
    `          <Route
            path="/pro/:section"
            element={
              <SidebarLayout hideProCard>
                <ProSectionPage />
              </SidebarLayout>
            }
          />\n`,
    "",
  );
  if (a !== beforeA) await writeFile(app, a, "utf8");

  const sidebar = join(VENDOR, "components/navs/Sidebar.jsx");
  let s = await readFile(sidebar, "utf8");
  if (!s.includes("_UnusedProLinks")) {
    s = s.replace(
      "const ProLinks = ({ onClose }) => (",
      "const ProLinks = () => null; // Pro storefront removed for PUDDL3 P4RTS\nconst _UnusedProLinks = ({ onClose }) => (",
    );
    await writeFile(sidebar, s, "utf8");
  }

  const tabs = join(VENDOR, "components/common/TabsLayout.jsx");
  let t = await readFile(tabs, "utf8");
  const beforeT = t;
  t = t.replace("import CategoryProFooter from './Pro/CategoryProFooter';\n", "");
  t = t.replace(/\n *<CategoryProFooter category=\{category\} \/>\n/, "\n");
  if (t !== beforeT) await writeFile(tabs, t, "utf8");

  // The navbar's mobile mega-menu injects a Pro group (dead /pro links) and a
  // Tools group after the first category — gate the whole block off.
  const nav = join(VENDOR, "components/landingnew/Navbar/Navbar.jsx");
  let n = await readFile(nav, "utf8");
  const beforeN = n;
  n = n.replace(
    /\{i === 0 && \(\s*<>\s*\{\/\* Mirrors the desktop sidebar/,
    "{false && ( /* Pro/Tools mobile groups removed for PUDDL3 P4RTS */\n                          <>\n                            {/* Mirrors the desktop sidebar",
  );
  if (n !== beforeN) await writeFile(nav, n, "utf8");

  await mobileMenuAccordion();
  await mobileGetMenu();
  await collapsibleSections();
  await hamburgerToPicker();
  await colorPickerDone();
  await trimComponentHeader();
  await componentPager();
  await searchMetadata();
  await demoLinksHome();
}

/**
 * Demo tiles must not send visitors to the upstream site (user, 2026-08-16 —
 * Tile Stream's tiles all linked to reactbits.dev). Real https URLs elsewhere
 * stay intact by policy; a CLICKABLE demo link is different, since it walks
 * someone straight off our site.
 */
async function demoLinksHome() {
  const p = join(VENDOR, "demo/Components/TileStreamDemo.jsx");
  let s = await readFile(p, "utf8");
  const before = s;
  s = s.replace(/href: 'https:\/\/reactbits\.dev'/g, "href: 'https://lakotafox.com/PUDDL3P4RTS'");
  if (s !== before) await writeFile(p, s, "utf8");
}

/**
 * Search matches descriptions and tags, not just names (user, 2026-08-16:
 * remove them from the page "yet still let it apply for search"). Upstream's
 * dialog only ever compared category and component names, so pulling the blurb
 * and tag row off the page would otherwise have made those words unfindable.
 * Sources: componentMetadata (free) and PRO_INDEX (Deep tags).
 */
async function searchMetadata() {
  const p = join(VENDOR, "components/common/SearchDialog.jsx");
  let s = await readFile(p, "utf8");
  if (s.includes("p4rts-search-meta")) return;
  s = s.replace(
    "import { fuzzyMatch } from '../../utils/fuzzy';",
    "import { fuzzyMatch } from '../../utils/fuzzy';\nimport { componentMetadata } from '../../constants/Information';\nimport { PRO_INDEX } from '../../constants/ProCatalog';",
  );
  s = s.replace(
    `function searchComponents(query) {`,
    `// p4rts-search-meta: the words we stopped rendering still have to be findable.
const CATEGORY_KEYS = {
  Animations: 'Animations',
  Backgrounds: 'Backgrounds',
  Components: 'Components',
  'Text Animations': 'TextAnimations'
};

const metaTextFor = (categoryName, component) => {
  const parts = [];
  const key = \`\${CATEGORY_KEYS[categoryName] || categoryName}/\${component.replace(/\\s+/g, '')}\`;
  const free = componentMetadata[key];
  if (free?.description) parts.push(free.description);
  const pro = PRO_INDEX[component.toLowerCase().replace(/\\s+/g, '-')];
  if (pro) {
    if (pro.description) parts.push(pro.description);
    if (Array.isArray(pro.tags)) parts.push(pro.tags.join(' '));
  }
  return parts.join(' ');
};

function searchComponents(query) {`,
  );
  s = s.replace(
    `        if (matchesSearch(component, query)) results.push({ categoryName, componentName: component });`,
    `        const meta = metaTextFor(categoryName, component);
        if (matchesSearch(component, query) || (meta && meta.toLowerCase().includes(query.trim().toLowerCase())))
          results.push({ categoryName, componentName: component });`,
  );
  await writeFile(p, s, "utf8");
}

/**
 * Component pages are title + Get + Reset, nothing else (user, 2026-08-16):
 * the blurb and tag row were noise above every preview. The data stays in the
 * manifest/constants, so search still matches on description and tags — only
 * the on-page render goes.
 */
async function trimComponentHeader() {
  const p = join(VENDOR, "demo/Pro/ProDemo.jsx");
  let s = await readFile(p, "utf8");
  if (s.includes("p4rts-trimmed-header")) return;
  s = s.replace(
    /        <Box mb=\{4\}>\n          \{\/\* page title comes from CategoryPage[\s\S]*?\n        <\/Box>\n\n/,
    "        {/* p4rts-trimmed-header: description + tag row removed; they still\n            feed search via the manifest */}\n\n",
  );
  await writeFile(p, s, "utf8");
}

/**
 * Prev/next pager under every component page (user, 2026-08-16) — step through
 * the library without going back to the menu. Walks every section's components
 * in sidebar order and crosses section boundaries.
 */
async function componentPager() {
  await writeFile(join(VENDOR, "components/common/ComponentPager.jsx"),
`import { Link, useParams } from 'react-router-dom';
import { CATEGORIES } from '../../constants/Categories';

// Generated by scripts/rebrand.ts (componentPager) — flat walk of every
// component page in sidebar order, so Next moves on to the following section
// when a section runs out.
//
// Two shapes: the full pair of cards at the foot of the page (desktop), and a
// \`compact\` pair of chevron pills that ride in the mobile toolbar beside Get,
// where they're reachable without scrolling past the whole page.
const slug = s => s.toLowerCase().replace(/\\s+/g, '-');

const PAGES = CATEGORIES.filter(c => c.name !== 'Get Started').flatMap(c =>
  c.subcategories.map(sub => ({ label: sub, section: c.name, to: \`/\${slug(c.name)}/\${slug(sub)}\` }))
);

const useNeighbours = (category, subcategory) => {
  const params = useParams();
  const cat = category ?? params.category;
  const sub = subcategory ?? params.subcategory;
  const i = PAGES.findIndex(p => p.to === \`/\${cat}/\${sub}\`);
  return i === -1 ? null : { prev: PAGES[i - 1], next: PAGES[i + 1] };
};

const ComponentPager = ({ category, subcategory, compact = false }) => {
  const n = useNeighbours(category, subcategory);
  if (!n) return null;
  const { prev, next } = n;

  if (compact) {
    return (
      <div className="p4rts-pager-mini" aria-label="Component navigation">
        {prev && (
          <Link className="p4rts-pager-mini-btn" to={prev.to} aria-label={\`Previous: \${prev.label}\`} title={prev.label}>‹</Link>
        )}
        {next && (
          <Link className="p4rts-pager-mini-btn" to={next.to} aria-label={\`Next: \${next.label}\`} title={next.label}>›</Link>
        )}
      </div>
    );
  }

  return (
    <nav className="p4rts-pager" aria-label="Component navigation">
      {prev ? (
        <Link className="p4rts-pager-link" to={prev.to}>
          <span className="p4rts-pager-dir">‹ Previous</span>
          <span className="p4rts-pager-name">{prev.label}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link className="p4rts-pager-link is-next" to={next.to}>
          <span className="p4rts-pager-dir">Next ›</span>
          <span className="p4rts-pager-name">{next.label}</span>
        </Link>
      ) : <span />}
    </nav>
  );
};

export default ComponentPager;
`, "utf8");

  // mobile toolbar: [‹][›] beside Get
  const tabs = join(VENDOR, "components/common/TabsLayout.jsx");
  let t = await readFile(tabs, "utf8");
  if (!t.includes("ComponentPager")) {
    t = t.replace(
      "import TabsFooter from './TabsFooter';",
      "import TabsFooter from './TabsFooter';\nimport ComponentPager from './ComponentPager';",
    );
    t = t.replace(
      `            <Box display={{ base: 'flex', md: 'none' }} flexShrink={0}>`,
      `            <Box display={{ base: 'flex', md: 'none' }} flexShrink={0} gap={2} alignItems="center">
              <ComponentPager compact />`,
    );
    await writeFile(tabs, t, "utf8");
  }

  const p = join(VENDOR, "pages/CategoryPage.jsx");
  let s = await readFile(p, "utf8");
  if (s.includes("ComponentPager")) return;
  s = s.replace(
    "import BackToTopButton from '../components/common/BackToTopButton';",
    "import BackToTopButton from '../components/common/BackToTopButton';\nimport ComponentPager from '../components/common/ComponentPager';",
  );
  s = s.replace(
    `            )}
          </Box>
          <BackToTopButton />`,
    `            )}
            {!isGetStartedRoute && <ComponentPager category={category} subcategory={subcategory} />}
          </Box>
          <BackToTopButton />`,
  );
  await writeFile(p, s, "utf8");
}

/**
 * Color picker needs an obvious way out (user, 2026-08-16): on touch the only
 * close was tapping the swatch again — outside-click dismissal is invisible on
 * a phone. Adds a full-width Done button under the presets.
 */
async function colorPickerDone() {
  const p = join(VENDOR, "components/common/Preview/PreviewColorPickerCustom.jsx");
  let s = await readFile(p, "utf8");
  if (s.includes("p4rts-color-done")) return;
  s = s.replace(
    `              ))}
            </div>
          </div>,
          document.body
        )}`,
    `              ))}
            </div>

            {/* p4rts-color-done */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                marginTop: 12,
                width: '100%',
                minHeight: 40,
                borderRadius: 8,
                border: '1px solid var(--border-primary)',
                background: 'rgba(168, 85, 247, 0.18)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.04em',
                cursor: 'pointer'
              }}
            >
              Done
            </button>
          </div>,
          document.body
        )}`,
  );
  await writeFile(p, s, "utf8");
}

/**
 * Mobile hamburger → the /library boss-dash picker (user, 2026-08-16): tapping
 * it fades all content out and lands on the centered LineSidebar, which hosts
 * the drill-down (LibraryHome's compact two-level mode) instead of the drawer.
 * The drawer code stays dormant (menuOpen is never set).
 */
async function hamburgerToPicker() {
  const nav = join(VENDOR, "components/landingnew/Navbar/Navbar.jsx");
  let s = await readFile(nav, "utf8");
  if (s.includes("p4rts-hamburger-picker")) return;
  s = s.replace(
    `            className={\`ln-navbar-hamburger\${menuOpen ? ' open' : ''}\`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"`,
    `            className={\`ln-navbar-hamburger\${menuOpen ? ' open' : ''}\`}
            onClick={() => { /* p4rts-hamburger-picker: fade out, land on /library */
              document.body.classList.add('p4rts-depart');
              setTimeout(() => { document.body.classList.remove('p4rts-depart'); navigate('/library'); }, 360);
            }}
            aria-label="Browse the library"`,
  );
  if (!s.includes("useNavigate")) {
    s = s.replace(
      /import \{ Link([^}]*)\} from 'react-router-dom';/,
      "import { Link$1, useNavigate } from 'react-router-dom';",
    );
    s = s.replace(
      "const [menuOpen, setMenuOpen] = useState(false);",
      "const navigate = useNavigate();\n  const [menuOpen, setMenuOpen] = useState(false);",
    );
  }
  await writeFile(nav, s, "utf8");
}

/**
 * Customize + Props sections collapse (user, 2026-08-16): both start collapsed
 * on every viewport and expand via a header chevron. One edit each in the
 * shared components covers all 166 free demos AND the Deep pages (ProDemo
 * renders the same <Customize>). Chevron styling in gallery/src/demo.css.
 */
async function collapsibleSections() {
  const cust = join(VENDOR, "components/common/Preview/Customize.jsx");
  let c = await readFile(cust, "utf8");
  if (!c.includes("p4rts-fold")) {
    await writeFile(cust,
`import { useState } from 'react';

// p4rts-fold: collapsed by default; the grid wraps only the controls so the
// header button sits outside .preview-options.
const Customize = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="p4rts-fold">
      <button type="button" className="p4rts-fold-head" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <h2 className="demo-title-extra">Customize</h2>
        <span className={\`p4rts-fold-chev\${open ? ' is-open' : ''}\`} aria-hidden="true">▾</span>
      </button>
      {open && <div className="preview-options">{children}</div>}
    </section>
  );
};

export default Customize;
`, "utf8");
  }

  const prop = join(VENDOR, "components/common/Preview/PropTable.jsx");
  let p = await readFile(prop, "utf8");
  if (!p.includes("p4rts-fold")) {
    p = p.replace(
      `import './PropTable.css';

const PropTable = ({ data }) => (
  <div className="prop-table-section">
    <h2 className="demo-title-extra">Props</h2>
`,
      `import { useState } from 'react';
import './PropTable.css';

// p4rts-fold: collapsed by default, expand via header chevron
const PropTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
  <div className="prop-table-section">
    <button type="button" className="p4rts-fold-head" aria-expanded={open} onClick={() => setOpen(o => !o)}>
      <h2 className="demo-title-extra">Props</h2>
      <span className={\`p4rts-fold-chev\${open ? ' is-open' : ''}\`} aria-hidden="true">▾</span>
    </button>
    {open && (<>
`,
    );
    p = p.replace(
      `      ))}
    </div>
  </div>
);

export default PropTable;`,
      `      ))}
    </div>
    </>)}
  </div>
  );
};

export default PropTable;`,
    );
    await writeFile(prop, p, "utf8");
  }
}

/**
 * Mobile component-page toolbar (user, 2026-08-16): the unlabeled ••• menu
 * becomes a "Get" pill, and the Code tab folds INTO it — the toolbar is just
 * [Preview][Get ▾]; the menu leads with a View code/View preview toggle, then
 * favorites and the copy actions. Requires controlled Tabs (the menu switches
 * the view). Desktop keeps the visible Code tab and full action buttons.
 */
async function mobileGetMenu() {
  const p = join(VENDOR, "components/common/TabsLayout.jsx");
  let s = await readFile(p, "utf8");
  if (s.includes("p4rts-get-menu")) return;

  s = s.replace(
    "import { RotateCcw, MoreHorizontal, Palette } from 'lucide-react';",
    "import { RotateCcw, MoreHorizontal, Palette, ChevronDown } from 'lucide-react';",
  );
  s = s.replace(
    "const aiActions = useAIExportActions({ category, subcategory, ...(aiExport || {}) });",
    "const aiActions = useAIExportActions({ category, subcategory, ...(aiExport || {}) });\n  const [p4rtsTab, setP4rtsTab] = useState('preview'); // p4rts-get-menu",
  );
  s = s.replace(
    "const hasOverflowActions = hasChanges || showFavorite || Boolean(codeExampleProps) || Boolean(studioButtonProps);",
    "const hasOverflowActions = true; // p4rts-get-menu — the mobile menu always hosts View code",
  );
  s = s.replace(
    `<Tabs.Root w="100%" variant="plain" lazyMount defaultValue="preview" className={className}>`,
    `<Tabs.Root w="100%" variant="plain" lazyMount value={p4rtsTab} onValueChange={e => setP4rtsTab(e.value)} className={className}>`,
  );
  s = s.replace(
    `<Tabs.Trigger value="code" {...TAB_STYLE_PROPS} flex={{ base: '1 1 0', md: '0 0 auto' }}>`,
    `<Tabs.Trigger value="code" {...TAB_STYLE_PROPS} display={{ base: 'none', md: 'flex' }} flex={{ base: '1 1 0', md: '0 0 auto' }}>`,
  );
  // Mobile shows the Preview pill only in code view (it's the way back) and
  // compact — a lone stretched tab wasted the whole row (user, 2026-08-16).
  s = s.replace(
    `<Tabs.Trigger value="preview" {...TAB_STYLE_PROPS} flex={{ base: '1 1 0', md: '0 0 auto' }}>`,
    `<Tabs.Trigger value="preview" {...TAB_STYLE_PROPS} display={{ base: p4rtsTab === 'code' ? 'flex' : 'none', md: 'flex' }} flex="0 0 auto">`,
  );
  s = s.replace(`aria-label="More actions"`, `aria-label="Get this component"`);
  s = s.replace(
    `                    {...TAB_STYLE_PROPS}
                    w={10}
                    px={0}
                    position="relative"
                  >
                    <MoreHorizontal size={18} color="#fff" />`,
    `                    {...TAB_STYLE_PROPS}
                    px={4}
                    position="relative"
                  >
                    <Box as="span" color="#fff" fontSize="14px" fontWeight="600">Get</Box>
                    <ChevronDown size={15} color="#fff" />`,
  );
  s = s.replace(
    `                      transformOrigin="top right"
                    >
`,
    `                      transformOrigin="top right"
                    >
                      <Menu.Item
                        value="p4rts-view-toggle"
                        onSelect={() => setP4rtsTab(p4rtsTab === 'code' ? 'preview' : 'code')}
                        display="flex"
                        alignItems="center"
                        gap={3}
                        px={3}
                        py={2}
                        fontSize="14px"
                        color="#fff"
                        borderRadius="8px"
                        cursor="pointer"
                        _hover={{ bg: colors.bgHover }}
                      >
                        <Icon as={p4rtsTab === 'code' ? FiEye : FiCode} boxSize={4} color="#fff" />
                        {p4rtsTab === 'code' ? 'View preview' : 'View code'}
                      </Menu.Item>
                      <Menu.Separator borderColor={colors.borderPrimary} my={1} />
`,
  );
  await writeFile(p, s, "utf8");
}

/**
 * Mobile mega-menu → accordion (user, 2026-08-16): every category rendered
 * fully expanded made the hamburger menu enormous. Category labels become
 * tap-to-expand buttons, one section open at a time, all collapsed on open.
 * Styling for .ln-navbar-mobile-acc lives in gallery/src/demo.css (ours).
 */
async function mobileMenuAccordion() {
  const nav = join(VENDOR, "components/landingnew/Navbar/Navbar.jsx");
  let n = await readFile(nav, "utf8");
  if (n.includes("p4rts-mobile-accordion")) return;

  n = n.replace(
    "const [menuOpen, setMenuOpen] = useState(false);",
    "const [menuOpen, setMenuOpen] = useState(false);\n  const [openCat, setOpenCat] = useState(null); // p4rts-mobile-accordion",
  );

  // Replace the whole CATEGORIES map (18-space `})}` closes it) with the
  // accordion version; the gated Pro/Tools chunk inside goes with it.
  n = n.replace(
    /\{CATEGORIES\.map\(\(cat, i\) => \{[\s\S]*?\n {18}\}\)\}/,
    `{CATEGORIES.map(cat => {
                    const slug = str => str.replace(/\\s+/g, '-').toLowerCase();
                    const open = openCat === cat.name;
                    return (
                      <div className="ln-navbar-mobile-section" key={cat.name}>
                        <button
                          type="button"
                          className={\`ln-navbar-mobile-label ln-navbar-mobile-acc\${open ? ' is-open' : ''}\`}
                          aria-expanded={open}
                          onClick={() => setOpenCat(open ? null : cat.name)}
                        >
                          {cat.name}
                          <span className="ln-navbar-mobile-acc-chev" aria-hidden="true">▾</span>
                        </button>
                        {open && cat.subcategories.map(sub => (
                          <Link
                            key={sub}
                            className="ln-navbar-mobile-link"
                            to={\`/\${slug(cat.name)}/\${slug(sub)}\`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    );
                  })}`,
  );
  await writeFile(nav, n, "utf8");
}

/**
 * The AI-export prompts must speak OUR ecosystem (user, 2026-08-15 — "why does
 * it say foxbits in this prompt"): SITE_ORIGIN becomes the live site (docs and
 * source links resolve for real), and the compact prompt stops referencing
 * upstream registry JSON — we don't serve /r/*.json, the Code tab is the source.
 */
async function retargetAIExport() {
  const p = join(VENDOR, "utils/aiExport.js");
  let s = await readFile(p, "utf8");
  const before = s;
  s = s.replace(
    "const SITE_ORIGIN = 'https://reactbits.dev';",
    "const SITE_ORIGIN = 'https://lakotafox.com/PUDDL3P4RTS'; // foxbits:own-origin",
  );
  s = s.replace(
    /,\n    `Component source \+ dependencies \(JSON\): \$\{registryUrl\(componentName, language, style\)\}`/,
    "",
  );
  s = s.replace(
    "'Please fetch the registry JSON above for the exact source, install any listed dependencies, add the component to my project, and wire it into the right place.',",
    "'Grab the exact source from the Code tab on the docs page above, install any listed dependencies, add the component to my project, and wire it into the right place.',",
  );
  s = s.replace(
    "`If this is not the right component, the full library index is at ${SITE_ORIGIN}/llms.txt.`",
    "`If this is not the right component, browse the full library at ${SITE_ORIGIN}.`",
  );
  if (s !== before) await writeFile(p, s, "utf8");
}

async function stripOpenInAI() {
  const hook = join(VENDOR, "hooks/useAIExportActions.js");
  let h = await readFile(hook, "utf8");
  if (!h.includes("foxbits:no-open-ai")) {
    h = h.replace(
      /return \[\n      \{ key: 'chatgpt'[\s\S]*?\.map\(item => \(\{ \.\.\.item, run: \(\) => openInAI\(item\.key, payload\) \}\)\);/,
      "return []; // foxbits:no-open-ai — external AI handoff removed",
    );
    await writeFile(hook, h, "utf8");
  }

  // Both menu render sites put a separator before openItems; with the list
  // empty it dangles, so gate it.
  for (const rel of ["components/common/CopyForAIMenu.jsx", "components/common/TabsLayout.jsx"]) {
    const p2 = join(VENDOR, rel);
    let s2 = await readFile(p2, "utf8");
    const before = s2;
    s2 = s2.replace(
      /<Menu\.Separator borderColor=\{colors\.borderPrimary\} my=\{1\} \/>(\s*)\{openItems\.map/g,
      "{openItems.length > 0 && <Menu.Separator borderColor={colors.borderPrimary} my={1} />}$1{openItems.map",
    );
    s2 = s2.replace(
      /<Menu\.Separator borderColor=\{colors\.borderPrimary\} my=\{1\} \/>(\s*)\{aiActions\.openItems\.map/g,
      "{aiActions.openItems.length > 0 && <Menu.Separator borderColor={colors.borderPrimary} my={1} />}$1{aiActions.openItems.map",
    );
    if (s2 !== before) await writeFile(p2, s2, "utf8");
  }
  console.log("  Open-in-AI menu entries removed");
}
