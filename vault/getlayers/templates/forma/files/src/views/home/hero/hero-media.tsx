"use client";

import { Spring } from "@/components/animation/springs/spring";
import { useIntro } from "@/hooks/intro/use-intro";

import { RippleVideo } from "./ripple-video";

export interface HeroMediaProps {
  src: string;
  /** Describes the footage for assistive technology. */
  label: string;
  /** Delay (ms) after the preloader lifts. */
  delay?: number;
  className?: string;
}

/**
 * The hero's centre panel. It is the layout's only flexible row — it absorbs
 * whatever height is left once the header, heading and card row are placed, so
 * the 30px gutter to every screen edge holds at any viewport height.
 *
 * A client component only because the reveal waits on the intro flag; the
 * panel itself is markup.
 */
export const HeroMedia = ({
  src,
  label,
  delay = 0,
  className = "",
}: HeroMediaProps) => {
  const hasEntered = useIntro((state) => state.hasEntered);

  return (
    <div
      className={`relative w-full flex-1 overflow-hidden rounded-card border border-border-subtle ${className}`}
    >
      {/* `absolute inset-0`, not `size-full`. Below `lg` the panel's height
          comes from `min-height` (there is no free space left to flex into),
          and a percentage height does not resolve against a parent whose
          `height` is auto — so `h-full` collapsed to 0 and the video vanished.
          Insetting sidesteps percentage resolution entirely. */}
      <Spring
        tag="div"
        enabled={hasEntered}
        delayIn={delay}
        className="absolute inset-0"
        from={{ opacity: 0, scale: 1.12 }}
        to={{ opacity: 1, scale: 1 }}
        config={{ tension: 90, friction: 28, mass: 1.2 }}
      >
        <RippleVideo src={src} label={label} />
      </Spring>
    </div>
  );
};
