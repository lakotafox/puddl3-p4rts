/**
 * Home view — the Figma hero over the interactive chess scene.
 *
 * A Server Component: the scene itself is a `ssr: false` client leaf, so
 * three.js never touches the server render or the initial bundle. Crawlers and
 * Lighthouse get the copy and the layout but no scene — reading the UA opts this
 * route out of static prerendering, which is the deliberate trade for never
 * shipping a WebGL bundle to a robot.
 *
 * Layout is the design's, expressed proportionally: the shell is inset 20px with
 * a rule down each side, and the body splits 493 / 414 / 493 — copy, scene,
 * figures. Those are `fr` ratios rather than fixed widths, so the composition
 * holds at any width while the starter's adaptive grid scales the type and
 * gutters with it.
 *
 * 📖 Docs: obsidian/frontend/chess-scene.md
 */

import { LazyChessScene } from "@/components/common/chess-scene";
import { homeCopy } from "@/data/mocks/home";
import { isBot } from "@/utils/is-bot";
import { HeroIntro } from "@/views/home/hero-intro";
import { SiteHeader } from "@/views/home/site-header";
import { StatGrid } from "@/views/home/stat-grid";

export const HomeView = async () => {
  const bot = await isBot();

  return (
    <main className="relative z-0 flex min-h-lvh flex-col px-shell-inset lg:h-lvh">
      <h1 className="sr-only">{homeCopy.title}</h1>

      <div className="border-rule flex min-h-0 flex-1 flex-col border-x">
        <SiteHeader company={homeCopy.company} links={homeCopy.nav} contact={homeCopy.contact} />

        {/* Three columns from `lg`, stacked below it. The scene needs an
            explicit aspect while stacked — with no fixed body height there is
            nothing for it to fill. */}
        <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[493fr_414fr_493fr]">
          <HeroIntro
            headline={homeCopy.headline}
            description={homeCopy.description}
            action={homeCopy.action}
            actionHref={homeCopy.contact.href}
          />

          {/* At `lg` this fills the cell exactly, as `image 640` does in the design. */}
          <div className="border-rule relative aspect-[4/5] border-y sm:aspect-[3/2] lg:aspect-auto lg:border-y-0">
            {bot ? null : <LazyChessScene />}
          </div>

          <StatGrid stats={homeCopy.stats} />
        </div>
      </div>
    </main>
  );
};
