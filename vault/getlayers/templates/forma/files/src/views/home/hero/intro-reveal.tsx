"use client";

import type { ReactNode } from "react";

import { Spring } from "@/components/animation/springs/spring";
import { useIntro } from "@/hooks/intro/use-intro";

export interface IntroRevealProps {
  children: ReactNode;
  /** Delay (ms) after the preloader lifts. */
  delay?: number;
  className?: string;
  /** Rise distance (px). 0 for elements that should only fade. */
  distance?: number;
  /** Starting blur (px). */
  blur?: number;
}

/**
 * Gates a `<Spring>` on the intro flag.
 *
 * `<Spring enabled={false}>` holds its target at `from`, so wrapped content
 * rests hidden under the preloader and springs in only once the curtain lifts.
 * This wrapper exists so the hero can stay a Server Component — the store
 * subscription lives here, at the leaf.
 */
export const IntroReveal = ({
  children,
  delay = 0,
  className = "",
  distance = 26,
  blur = 6,
}: IntroRevealProps) => {
  const hasEntered = useIntro((state) => state.hasEntered);

  return (
    <Spring
      tag="div"
      enabled={hasEntered}
      delayIn={delay}
      className={className}
      from={{ opacity: 0, y: distance, filter: `blur(${blur}px)` }}
      to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      config={{ tension: 150, friction: 26, mass: 1 }}
    >
      {children}
    </Spring>
  );
};
