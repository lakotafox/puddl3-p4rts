"use client";

// 📖 Docs: obsidian/frontend/text-engine.md

import TextEngine from "spring-text-engine";

import { useIntro } from "@/hooks/intro/use-intro";

export interface HeroHeadingProps {
  lines: string[];
  id: string;
}

/** Letters float up out of focus. No `overflow` — clipping would cut the blur. */
const LETTER_OUT = { y: 26, opacity: 0, filter: "blur(10px)" } as const;
const LETTER_IN = { y: 0, opacity: 1, filter: "blur(0px)" } as const;
const LETTER_STAGGER = 26;
const BASE_DELAY = 120;

/**
 * The display heading, revealed letter by letter once the preloader is done.
 *
 * `enabled` is the gate: the engine holds every letter in its `Out` state while
 * the preloader counts, so the copy is in the DOM from the first paint (and in
 * the crawler-visible `seo` fallback) but nothing moves until the aperture opens.
 *
 * **One engine per designed line.** Feeding the whole sentence to a single
 * TextEngine re-wraps it — the container is a flex row of per-letter
 * inline-blocks, which measures differently from a plain paragraph, and the
 * design's two lines came out as three. Each line gets its own engine, and the
 * second one's `delayIn` continues the first one's stagger so it still reads as
 * a single sweep.
 *
 * Deliberately **not** using `overflow`: the clip layer is what makes a slide-in
 * look like type emerging from behind a mask, but it would also crop the blur
 * halo, which is the point of this reveal. The letters travel in free space.
 *
 * The left-to-right fade is a **mask**, not a clipped background —
 * `background-clip: text` does not reach through the engine's transformed letter
 * spans and renders the heading invisible. See `--display-fade`.
 */
export const HeroHeading = ({ lines, id }: HeroHeadingProps) => {
  const isComplete = useIntro((state) => state.isComplete);

  // Each line picks up where the previous one's letters left off, so the two
  // engines read as one continuous sweep.
  const lineDelays = lines.map(
    (_, index) =>
      BASE_DELAY +
      lines
        .slice(0, index)
        .reduce((total, line) => total + line.replace(/\s/g, "").length, 0) *
        LETTER_STAGGER,
  );

  return (
    <h1
      id={id}
      className="flex w-176.75 max-w-full flex-col items-center [-webkit-mask-image:var(--display-fade)] [mask-image:var(--display-fade)] text-center font-display text-display-compact leading-display text-on-media lg:text-display"
    >
      {lines.map((line, index) => (
          <TextEngine
            key={line}
            tag="span"
            mode="once"
            enabled={isComplete}
            letterOut={LETTER_OUT}
            letterIn={LETTER_IN}
            // The engine's default word gap is 0.3em, wider than the space this
            // face actually sets, which pushed the design's first line over its
            // 707px measure and wrapped it.
            columnGap={0.24}
            letterStagger={LETTER_STAGGER}
            letterConfig={{ tension: 90, friction: 24, mass: 1.1 }}
            delayIn={lineDelays[index]}
            className="justify-center leading-display"
          >
            {line}
          </TextEngine>
      ))}
    </h1>
  );
};
