import { LettersIn } from "./animated-text";

export interface HeroHeadingProps {
  /** First line — set in Light. */
  lead: string;
  /** Second line — set in Regular. */
  follow: string;
  /** Delay (ms) before the first line starts. */
  delay?: number;
  className?: string;
}

/**
 * The page `h1`. Two lines at the same size but different weights, revealed
 * letter by letter from the left. No `overflow` clip, so the design's 1.0
 * leading is safe and the blur is not cut off at the line box
 * (obsidian/frontend/text-engine.md → "Alignment & line-height").
 */
export const HeroHeading = ({
  lead,
  follow,
  delay = 0,
  className = "",
}: HeroHeadingProps) => (
  <h1
    className={`flex flex-col text-[2.25rem] leading-none text-foreground sm:text-[3rem] lg:text-display ${className}`}
  >
    <LettersIn
      tag="span"
      className="justify-start text-left font-light"
      delay={delay}
    >
      {lead}
    </LettersIn>
    <LettersIn
      tag="span"
      className="justify-start text-left font-normal"
      delay={delay + 260}
    >
      {follow}
    </LettersIn>
  </h1>
);
