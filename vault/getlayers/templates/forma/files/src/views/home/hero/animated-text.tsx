"use client";

import type { ReactNode } from "react";
import TextEngine from "spring-text-engine";

import { useIntro } from "@/hooks/intro/use-intro";

/** Elements these wrappers are allowed to render — keeps the outline honest. */
type TextTag = "h1" | "h2" | "h3" | "p" | "span";

interface AnimatedTextProps {
  children: ReactNode;
  tag?: TextTag;
  className?: string;
  /** Extra delay (ms) after the intro is released. */
  delay?: number;
}

/**
 * Client leaves for the hero's text reveals.
 *
 * Both gate on `useIntro().hasEntered` through TextEngine's `enabled` switch,
 * so the copy sits at its hidden resting state under the preloader and only
 * plays once the curtain has lifted. Neither sets `overflow`: these reveals
 * blur, and a clip box would cut the blur off at the line-height edge (it is
 * also what lets the heading keep its 1.0 design leading — see
 * obsidian/frontend/text-engine.md).
 */

/**
 * Letter-by-letter. Letters slide in from the left, so the stagger reads as a
 * wipe across the line. For headings.
 */
export const LettersIn = ({
  children,
  tag = "span",
  className = "",
  delay = 0,
}: AnimatedTextProps) => {
  const hasEntered = useIntro((state) => state.hasEntered);

  return (
    <TextEngine
      tag={tag}
      mode="once"
      enabled={hasEntered}
      className={className}
      delayIn={delay}
      letterOut={{ x: -34, opacity: 0, filter: "blur(11px)" }}
      letterIn={{ x: 0, opacity: 1, filter: "blur(0px)" }}
      letterStagger={20}
      letterConfig={{ tension: 115, friction: 24, mass: 1.1 }}
    >
      {children}
    </TextEngine>
  );
};

/**
 * Word-by-word, rising from below. For subheadings and body copy, where a
 * per-letter cascade would be noisy at small sizes.
 */
export const WordsIn = ({
  children,
  tag = "p",
  className = "",
  delay = 0,
}: AnimatedTextProps) => {
  const hasEntered = useIntro((state) => state.hasEntered);

  return (
    <TextEngine
      tag={tag}
      mode="once"
      enabled={hasEntered}
      className={className}
      delayIn={delay}
      wordOut={{ y: 26, opacity: 0, filter: "blur(8px)" }}
      wordIn={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      wordStagger={52}
      wordConfig={{ tension: 140, friction: 25, mass: 1 }}
    >
      {children}
    </TextEngine>
  );
};
