"use client";

import { useEffect, useRef, useState } from "react";
import { animated, easings, useSpring } from "@react-spring/web";
import { LogoMark } from "@/components/ui/logo-mark";
import { useIntro } from "@/hooks/ui-store";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";

type Phase = "loading" | "exiting" | "done";

/** Total time the counter takes to reach 100% (ms). */
const FILL_MS = 1300;

/**
 * Full-screen intro loader. Rendered on top of the page from first paint, it
 * locks scrolling while a counter fills to 100%, then slides up and flips the
 * shared intro gate (`useIntro`) so above-the-fold reveals play only once it
 * has left. Self-unmounts when done.
 */
export const PageLoader = () => {
  const setReady = useIntro((state) => state.setReady);
  const stopScroll = useScroll((state) => state.stop);
  const startScroll = useScroll((state) => state.start);

  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const startedAt = useRef<number | null>(null);

  // Lock scroll for the duration of the intro.
  useEffect(() => {
    stopScroll();
  }, [stopScroll]);

  // Drive the counter 0 → 100 on an eased curve, then hand off to the exit.
  useEffect(() => {
    if (phase !== "loading") return;
    let raf = 0;
    const step = (now: number) => {
      if (startedAt.current === null) startedAt.current = now;
      const t = Math.min((now - startedAt.current) / FILL_MS, 1);
      setProgress(Math.round(easings.easeInOutCubic(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setPhase("exiting");
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const exit = useSpring({
    y: phase === "loading" ? "0%" : "-100%",
    config: { tension: 220, friction: 30 },
    onRest: () => {
      if (phase === "exiting") {
        setPhase("done");
        setReady(true);
        startScroll();
      }
    },
  });

  const content = useSpring({
    opacity: phase === "loading" ? 1 : 0,
    transform: phase === "loading" ? "translateY(0px)" : "translateY(-12px)",
    config: { tension: 260, friction: 26 },
  });

  if (phase === "done") return null;

  return (
    <animated.div
      aria-hidden
      suppressHydrationWarning
      style={{ transform: exit.y.to((y) => `translateY(${y})`) }}
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-8 rounded-b-card bg-ink text-white"
    >
      <animated.div
        style={content}
        suppressHydrationWarning
        className="flex flex-col items-center gap-5 px-6 text-center"
      >
        <span className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight sm:text-3xl">
          <LogoMark className="text-3xl text-accent-from sm:text-4xl" />
          PUDDL3
        </span>
        <p className="max-w-[24ch] text-sm text-white/55">
          Payday, every second.
        </p>
      </animated.div>

      {/* Progress line + counter */}
      <div className="flex w-[min(22rem,72vw)] flex-col gap-3">
        <div className="h-px w-full overflow-hidden bg-white/15">
          <div
            className="h-full bg-accent-from transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-white/45">
          <span>Loading</span>
          <span className="tabular-nums text-white/80">
            {progress.toString().padStart(3, "0")}
          </span>
        </div>
      </div>
    </animated.div>
  );
};
