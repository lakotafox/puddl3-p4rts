"use client";

/**
 * Staged entrance for one piece of hero UI, held until the load curtain lifts.
 *
 * The curtain used to do the whole reveal on its own, with nothing underneath
 * animating. This is the deliberate reversal of that: the page now assembles
 * itself once the curtain has gone, block by block, so the two read as one
 * continuous move rather than a wipe followed by a static page.
 *
 * Two things make that safe to do:
 *
 * - **It is gated on `done`, not on mount.** `enabled` stays false for the whole
 *   curtain, and `Spring` renders at `from` while inactive — so nothing burns
 *   its entrance behind an opaque overlay, and the order below is the order the
 *   user actually sees.
 * - **Only `opacity` and `transform` move.** The markup is in the document at
 *   full size from the first paint either way, which is what keeps this off the
 *   list of things [[seo-metadata]] warns about, and a transform ancestor is now
 *   harmless here — the controls panel that used to be a `fixed` descendant of
 *   `<main>` is gone, and the 3D cursor and the background field are siblings of
 *   it in the layout, not children.
 *
 * 📖 Docs: obsidian/frontend/home-hero.md
 */

import type { ReactNode } from "react";

import { Spring } from "@/components/animation/springs/spring";
import { usePreloader } from "@/lib/preloader";
import type { Tags } from "@/types/springs";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  tag?: Tags;
  /** Milliseconds after the curtain lifts. */
  delay?: number;
  /** Offset it travels in from, px. Sign gives the direction. */
  x?: number;
  y?: number;
  /** Blocks arriving from further away want a slower spring. */
  config?: Record<string, number>;
  /**
   * Tag-specific attributes. `Spring` forwards anything it does not recognise to
   * the element it renders, but its prop type only covers `HTMLAttributes`, so
   * the few used here are declared.
   */
  href?: string;
  type?: "button";
  onClick?: () => void;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

/** Soft, slightly overshooting — the blocks settle rather than snap. */
const SETTLE = { tension: 190, friction: 26 };

export const Reveal = ({
  children,
  className,
  tag = "div",
  delay = 0,
  x = 0,
  y = 24,
  config = SETTLE,
  ...rest
}: RevealProps) => {
  const done = usePreloader((state) => state.done);

  return (
    <Spring
      tag={tag}
      mode="once"
      enabled={done}
      className={className}
      {...rest}
      from={{ opacity: 0, x, y }}
      to={{ opacity: 1, x: 0, y: 0 }}
      delayIn={delay}
      config={config}
    >
      {children}
    </Spring>
  );
};
