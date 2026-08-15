"use client";

/**
 * Full-screen preloader (index.html #preloader + main.js sequence):
 * 1. counter eases 0→100% over 2.5s (easeOutQuart), scroll locked
 * 2. on completion: counter + black backdrop fade out, the radial "hole" scales ×15
 *    and the hero h1 scramble starts (phase → "revealing")
 * 3. after 2s the whole overlay fades; at 3s it unmounts and scroll unlocks
 */

import { animated, easings, useSpring } from "@react-spring/web";
import { useEffect } from "react";

import { Spring } from "@/components/animation/springs/spring";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";

import { usePreloader } from "./preloader-store";

const COUNT_DURATION = 2500;
const HOLE_SCALE = 15;
const HOLE_DURATION = 3000;
const BG_FADE = 800;
const COUNTER_FADE = 1200;
const OVERLAY_FADE_DELAY = 2000;
const OVERLAY_FADE = 1000;
const DONE_AT = 3000;
/** Unlock scroll when the overlay starts its final fade — the hero is fully
 * revealed by then; waiting for the unmount adds a dead second. */
const SCROLL_UNLOCK_AT = OVERLAY_FADE_DELAY;

export const Preloader = () => {
  const phase = usePreloader((s) => s.phase);
  const setPhase = usePreloader((s) => s.setPhase);
  const stopScroll = useScroll((s) => s.stop);
  const startScroll = useScroll((s) => s.start);

  const revealing = phase !== "loading";

  useEffect(() => {
    stopScroll();
    return () => startScroll();
  }, [stopScroll, startScroll]);

  const { n } = useSpring({
    from: { n: 0 },
    to: { n: 100 },
    config: { duration: COUNT_DURATION, easing: easings.easeOutQuart },
    onRest: () => setPhase("revealing"),
  });

  useEffect(() => {
    if (phase !== "revealing") return;
    const unlockTimer = setTimeout(() => startScroll(), SCROLL_UNLOCK_AT);
    const doneTimer = setTimeout(() => setPhase("done"), DONE_AT);
    return () => {
      clearTimeout(unlockTimer);
      clearTimeout(doneTimer);
    };
  }, [phase, setPhase, startScroll]);

  if (phase === "done") return null;

  return (
    <Spring
      tag="div"
      aria-hidden
      className={`fixed inset-0 z-[9999] grid place-items-center ${revealing ? "pointer-events-none" : ""}`}
      from={{ opacity: 1 }}
      to={{ opacity: 0 }}
      enabled={revealing}
      delayIn={OVERLAY_FADE_DELAY}
      config={{ duration: OVERLAY_FADE }}
    >
      {/* black backdrop */}
      <Spring
        tag="div"
        className="pointer-events-none absolute inset-0 bg-background"
        from={{ opacity: 1 }}
        to={{ opacity: 0 }}
        enabled={revealing}
        config={{ duration: BG_FADE }}
      />

      {/* expanding hole — static radial gradient, scaled by the spring */}
      <Spring
        tag="div"
        className="bg-preloader-hole pointer-events-none absolute left-1/2 top-1/2 size-[300vmax]"
        from={{ x: "-50%", y: "-50%", scale: 1 }}
        to={{ x: "-50%", y: "-50%", scale: HOLE_SCALE }}
        enabled={revealing}
        config={{ duration: HOLE_DURATION, easing: easings.easeInOutQuart }}
      />

      {/* counter */}
      <Spring
        tag="div"
        className="text-counter font-display relative z-10 font-[250] text-foreground"
        from={{ opacity: 1 }}
        to={{ opacity: 0 }}
        enabled={revealing}
        config={{ duration: COUNTER_FADE }}
      >
        <animated.span>{n.to((v) => `${Math.floor(v)}%`)}</animated.span>
      </Spring>
    </Spring>
  );
};
