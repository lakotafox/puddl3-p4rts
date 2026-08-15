// 📖 Docs: obsidian/workflows/new-page.md

import type { HeroContent } from "@/data/mocks/home";

import { HeroForm } from "./hero-form";
import { HeroHeading } from "./hero-heading";
import { HeroMedia } from "./hero-media";
import { HeroNav } from "./hero-nav";
import { HeroRules } from "./hero-rules";
import { HeroStats } from "./hero-stats";

export interface HeroProps {
  content: HeroContent;
}

/**
 * Full-bleed hero — Figma "Get Layers", node 698:174.
 *
 * The frame is 1440×800 and every measurement below is that design's px ÷ 16,
 * because the adaptive rem grid pins 1rem to 16px at 1440 (see
 * obsidian/frontend/design-system.md). So `gap-16` is the design's 64px gap,
 * `w-138.25` its 553px field, and the whole composition scales as one.
 *
 * A Server Component — only the media layer and the form are client leaves
 * (hard rule #6).
 */
export const Hero = ({ content }: HeroProps) => {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-lvh w-full flex-col overflow-hidden bg-surface-base"
    >
      <HeroMedia video={content.video} className="absolute inset-0 size-full" />

      {/* Sits above the canvas: the fluid layer draws the video itself, so a
          scrim underneath it would be painted over. */}
      <div className="absolute inset-0 bg-scrim/30" aria-hidden="true" />

      <HeroNav
        brand={content.brand}
        start={content.navStart}
        end={content.navEnd}
      />

      {/* The two column rules. Inset by the same amount from each edge rather
          than pinned to absolute x positions, so they stay symmetrical on any
          viewport instead of drifting left on wide ones. Drawn above the stats
          bar, as in the design, where they carry on across the glass. */}
      <HeroRules />

      {/* Takes the whole band between the masthead and the stats bar and centres
          in it — the design's 225px top offset is exactly that centre, so this
          reproduces it at 1440 and keeps it true at every other height. */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-5 py-12 sm:px-7.5">
        <HeroHeading id="hero-title" lines={content.headingLines} />

        <HeroForm fields={content.fields} submitLabel={content.submitLabel} />
      </div>

      <HeroStats summary={content.summary} stats={content.stats} />
    </section>
  );
};
