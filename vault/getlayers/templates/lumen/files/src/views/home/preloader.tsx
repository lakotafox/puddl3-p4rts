"use client";

import { useEffect, useState } from "react";

import { animated, easings, useSpring } from "@react-spring/web";

import { usePreloader } from "@/views/home/use-preloader";

const R = 190; // ring radius (px, in the SVG's own coordinate space)
const SW = 5; // stroke width
const SIZE = 2 * R + SW;
const C = 2 * Math.PI * R; // circumference

/**
 * PUDDL3 intro preloader (Figma 446:382). A full-screen white overlay: a 0→100
 * counter spins in the centre while a brand-gradient ring fills around it. When
 * it completes it **slides down and out through a mask** (a soft-edged downward
 * wipe, snappy spring) revealing the hero — and flips `usePreloader.reveal()` so
 * the hero's own entrance animations only start now. All motion is spring-based
 * (hard rule #1). Client leaf; skipped for `prefers-reduced-motion`.
 */
export const Preloader = () => {
  const [gone, setGone] = useState(false);
  const reveal = usePreloader((s) => s.reveal);

  // 0 → 1 count/fill, then 0 → 1 downward exit.
  const [{ p }, countApi] = useSpring(() => ({ p: 0 }));
  const [{ e }, exitApi] = useSpring(() => ({ e: 0 }));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      setGone(true);
      return;
    }
    countApi.start({
      p: 1,
      config: { duration: 2600, easing: easings.easeInOutCubic },
      onRest: () => {
        reveal(); // hero entrance starts as the loader leaves
        exitApi.start({
          e: 1,
          delay: 120,
          config: { tension: 90, friction: 20 }, // snappy, a touch of momentum
          onRest: () => setGone(true),
        });
      },
    });
  }, [countApi, exitApi, reveal]);

  if (gone) return null;

  const count = p.to((v) => Math.round(v * 100));
  const dashoffset = p.to((v) => C * (1 - v));
  // downward wipe: the visible band recedes to the bottom with a hard edge.
  const mask = e.to((v) => {
    const cut = (v * 116).toFixed(1);
    return `linear-gradient(to bottom, transparent ${cut}%, #000 ${cut}%)`;
  });
  // content slides down + eases back a touch for momentum.
  const inner = e.to((v) => `translateY(${(v * 46).toFixed(1)}%) scale(${1 - v * 0.05})`);

  return (
    <animated.div
      role="progressbar"
      aria-label="Loading"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
      className="fixed inset-0 z-[100] bg-preloader-surface"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo.svg"
        alt="PUDDL3"
        width={84}
        height={29}
        className="absolute left-[2.222%] top-[2%] h-7 w-auto brightness-0"
      />

      <animated.div
        style={{ transform: inner }}
        className="absolute inset-0 grid place-items-center will-change-transform"
      >
        <div className="relative grid place-items-center">
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            fill="none"
            aria-hidden
            className="-rotate-90"
          >
            <defs>
              {/* matches --gradient-brand (primary CTA fill) */}
              <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="5.58%" stopColor="#000000" />
                <stop offset="59.63%" stopColor="#3700bd" />
                <stop offset="100%" stopColor="#d8c2eb" />
              </linearGradient>
            </defs>
            <animated.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth={SW}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={dashoffset}
            />
          </svg>

          <animated.span className="absolute font-hero text-counter tabular-nums text-preloader-ink">
            {count}
          </animated.span>
        </div>
      </animated.div>
    </animated.div>
  );
};
