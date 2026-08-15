"use client";

// 📖 Docs: obsidian/frontend/html-semantics.md · obsidian/frontend/text-engine.md

import TextEngine from "spring-text-engine";

import { Spring } from "@/components/animation/springs/spring";
import { useIntro } from "@/hooks/intro/use-intro";
import type { HeroContent, HeroStat } from "@/data/mocks/home";

export interface HeroStatsProps {
  summary: HeroContent["summary"];
  stats: HeroContent["stats"];
}

/** Words drift up out of focus, same language as the heading's letters. */
const WORD_OUT = { y: 16, opacity: 0, filter: "blur(7px)" } as const;
const WORD_IN = { y: 0, opacity: 1, filter: "blur(0px)" } as const;

/**
 * A single figure and its label.
 *
 * A description list — `flex-col-reverse` puts the value above its term visually
 * while keeping the required `dt` → `dd` order in the DOM. The label never wraps;
 * the column is sized by its content rather than the design's fixed 100px, which
 * is what used to break "Cabins scouted" across two lines.
 */
const Figure = ({ stat, align }: { stat: HeroStat; align: "start" | "end" }) => (
  <dl
    className={`flex flex-col-reverse justify-between gap-2 lg:h-31.25 lg:gap-0 ${
      align === "end" ? "items-end text-right" : "items-start"
    }`}
  >
    <dt className="text-body leading-body whitespace-nowrap text-on-media/70">
      {stat.label}
    </dt>
    <dd className="font-display text-title leading-display text-on-media uppercase">
      {stat.value}
    </dd>
  </dl>
);

/**
 * The glass bar across the foot of the hero: a figure on each flank and a short
 * pitch between them.
 *
 * Below `lg` the three cells stack — the pitch takes a full row of its own with
 * the two figures side by side underneath. From `lg` it becomes the design's
 * three-column bar: equal `1fr` flanks around an `auto` centre keep the pitch on
 * the page's centre line whatever the figures measure.
 *
 * The bar itself rises as one once the intro finishes; the pitch then reads in
 * word by word.
 */
export const HeroStats = ({ summary, stats }: HeroStatsProps) => {
  const isComplete = useIntro((state) => state.isComplete);

  return (
    <Spring
      tag="div"
      mode="once"
      enabled={isComplete}
      from={{ opacity: 0, y: 30 }}
      to={{ opacity: 1, y: 0 }}
      config={{ tension: 55, friction: 26 }}
      delayIn={900}
      className="relative z-10 grid shrink-0 grid-cols-2 items-start gap-x-8 gap-y-8 border-t border-on-media/20 bg-scrim/40 p-5 backdrop-blur-glass-strong sm:p-7.5 lg:grid-cols-[1fr_auto_1fr]"
    >
      <div className="order-first col-span-2 flex flex-col items-center gap-4 lg:order-none lg:col-span-1 lg:w-131">
        <h2 className="font-display text-title leading-display text-on-media text-center">
          {summary.title}
        </h2>
        <span
          aria-hidden="true"
          className="size-1 shrink-0 rounded-full bg-on-media/20"
        />
        <TextEngine
          tag="p"
          mode="once"
          enabled={isComplete}
          wordOut={WORD_OUT}
          wordIn={WORD_IN}
          wordStagger={18}
          wordConfig={{ tension: 80, friction: 24 }}
          delayIn={1150}
          className="text-body leading-body justify-center text-on-media/70 text-center"
        >
          {summary.body}
        </TextEngine>
      </div>

      <div className="lg:order-first lg:justify-self-start">
        <Figure stat={stats.start} align="start" />
      </div>

      <div className="justify-self-end">
        <Figure stat={stats.end} align="end" />
      </div>
    </Spring>
  );
};
