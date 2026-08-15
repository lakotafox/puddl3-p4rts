"use client";

// 📖 Docs: obsidian/frontend/animation-system.md

import { Spring } from "@/components/animation/springs/spring";
import { useIntro } from "@/hooks/intro/use-intro";

/**
 * The two column rules, drawn from the masthead down past the stats bar.
 *
 * They draw themselves downward once the intro finishes — `scaleY` from a top
 * origin, which reads as the line being ruled rather than switched on. Inset by
 * the same amount from each edge so they stay symmetrical at any width, and
 * hidden below `lg`, where 260px is most of the screen.
 */
export const HeroRules = () => {
  const isComplete = useIntro((state) => state.isComplete);

  const shared = {
    enabled: isComplete,
    mode: "once" as const,
    from: { scaleY: 0, opacity: 0 },
    to: { scaleY: 1, opacity: 1 },
    config: { tension: 40, friction: 26, mass: 1.2 },
    delayIn: 240,
  };

  return (
    <>
      <Spring
        {...shared}
        tag="div"
        aria-hidden="true"
        className="absolute top-15 bottom-0 left-65 z-30 hidden w-px origin-top bg-on-media/20 lg:block"
      />
      <Spring
        {...shared}
        tag="div"
        aria-hidden="true"
        className="absolute top-15 right-65 bottom-0 z-30 hidden w-px origin-top bg-on-media/20 lg:block"
      />
    </>
  );
};
