"use client";

import TextEngine from "spring-text-engine";
import { easings } from "@react-spring/web";
import { Inview } from "@/components/animation/springs/in-view";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StatCounter } from "./stat-counter";
import type { homeContent } from "@/data/mocks/home";

export interface StatsProps {
  stats: (typeof homeContent)["stats"];
}

export const Stats = ({ stats }: StatsProps) => {
  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-background"
    >
      <div className="mx-auto max-w-shell px-5 pb-20 sm:px-8 lg:pb-28">
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, transform: "translateY(40px) scale(0.99)" }}
          to={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
          config={{ tension: 180, friction: 26 }}
          className="rounded-card bg-ink px-6 py-12 text-white sm:px-8 sm:py-16 md:px-16"
        >
          <Eyebrow tone="light">{stats.eyebrow}</Eyebrow>

          <TextEngine
            tag="h2"
            id="stats-heading"
            mode="once"
            overflow
            lineIn={{ y: "0%", opacity: 1 }}
            lineOut={{ y: "100%", opacity: 0 }}
            lineConfig={{ duration: 900, easing: easings.easeOutCubic }}
            delayIn={120}
            className="mt-4 max-w-[20ch] text-3xl font-medium tracking-tight md:text-4xl"
          >
            {stats.heading}
          </TextEngine>

          <ul className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {stats.items.map((stat, index) => (
              <StatCounter key={stat.label} stat={stat} index={index} />
            ))}
          </ul>
        </Inview>
      </div>
    </section>
  );
};
