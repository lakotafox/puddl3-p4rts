"use client";

import { useEffect } from "react";

import { animated, to, useSpring } from "@react-spring/web";

import { spawnRipple } from "@/lib/animation/ripple-bus";
import { usePreloader } from "@/views/home/use-preloader";

export interface TiltCardProps {
  src: string;
  alt: string;
}

const MAX_TILT = 12; // degrees of rotation at the screen edges
const WATERLINE = "79%"; // screen height where the reflection meets the sea

// One-time fan of waves as the card breaks the surface on load (screen UV,
// sy bottom-up). No idle ripples — the water only reacts to this and the cursor.
const WAKE: readonly [number, number, number][] = [
  [0.5, 0.23, 220],
  [0.4, 0.21, 320],
  [0.6, 0.21, 360],
  [0.34, 0.19, 470],
  [0.66, 0.19, 510],
  [0.5, 0.25, 650],
];

/**
 * Floating PUDDL3 card, dead-centre of the screen. It (1) tilts toward the
 * pointer, (2) rises smoothly out of the water on load — softly masked at the
 * waterline so it surfaces, spawning a one-time wave fan — and (3) carries a
 * subtle, realistic glossy reflection that tracks the tilt (no auto-motion).
 * All motion is spring-based (`@react-spring/web`, hard rule #1); `spawnRipple`
 * pokes the shader water via the ripple bus. Client leaf; honours
 * `prefers-reduced-motion`.
 */
export const TiltCard = ({ src, alt }: TiltCardProps) => {
  const [{ rx, ry }, tiltApi] = useSpring(() => ({
    rx: 0,
    ry: 0,
    config: { tension: 120, friction: 18 },
  }));
  const [{ ey }, riseApi] = useSpring(() => ({
    ey: 600, // submerged; real depth set on mount
    config: { tension: 45, friction: 22 }, // slow, smooth surfacing
  }));

  // Wait for the preloader before surfacing, so the card rises with the reveal.
  const revealed = usePreloader((s) => s.revealed);

  // Mount: hold the card below the surface and enable pointer tilt.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    riseApi.set({ ey: window.innerHeight * 0.62 }); // fully below the surface

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      tiltApi.start({ rx: -ny * MAX_TILT, ry: nx * MAX_TILT });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [tiltApi, riseApi]);

  // Reveal: surface the card and throw the wave fan.
  useEffect(() => {
    if (!revealed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      riseApi.set({ ey: 0 });
      return;
    }
    riseApi.start({ ey: 0, delay: 120 });
    const timers = WAKE.map(([sx, sy, delay]) =>
      window.setTimeout(() => spawnRipple(sx, sy), delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [revealed, riseApi]);

  const riseCard = ey.to((y) => `translate(-50%, calc(-50% + ${y}px))`);
  const riseReflection = ey.to((y) => `translateX(-50%) translateY(${y}px)`);
  const cardTilt = to(
    [rx, ry],
    (x, y) => `perspective(1100px) rotateX(${x}deg) rotateY(${y}deg)`,
  );
  const reflectionTilt = to(
    [rx, ry],
    (x, y) => `perspective(1100px) scaleY(-1) rotateX(${x}deg) rotateY(${y}deg)`,
  );
  // Polished-metal look: a soft mirror "environment" reflection — gentle
  // dark/bright bands that sweep as the card pitches, blended with `hard-light`
  // so a restrained highlight reads through the dark card without blowing out.
  const chrome = to([rx, ry], (x, y) => {
    const p = 50 - x * 4; // reflected horizon sweeps with pitch
    const a = 108 + y * 1.5; // angle rakes with yaw
    return (
      `linear-gradient(${a}deg,` +
      `rgba(0,0,0,0.20) 0%,` +
      `rgba(255,255,255,0.04) ${p - 24}%,` +
      `rgba(0,0,0,0.16) ${p - 13}%,` +
      `rgba(255,255,255,0.22) ${p - 5}%,` +
      `rgba(255,255,255,0.34) ${p}%,` +
      `rgba(255,255,255,0.2) ${p + 5}%,` +
      `rgba(0,0,0,0.16) ${p + 16}%,` +
      `rgba(255,255,255,0.08) ${p + 32}%,` +
      `rgba(0,0,0,0.14) ${p + 50}%,` +
      `rgba(255,255,255,0.03) 100%)`
    );
  });

  const maskStyle = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
  } as const;

  return (
    <>
      {/* CARD — centred; soft waterline mask so it surfaces on load */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_78%,transparent_83%)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
        <animated.div
          style={{ transform: riseCard }}
          className="absolute left-1/2 top-1/2 h-[54lvh] aspect-[900/1314] will-change-transform"
        >
          <animated.div
            style={{ transform: cardTilt }}
            className="absolute inset-0 will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="absolute inset-0 h-full w-full" />
            {/* mirror environment reflection (soft chrome contrast) */}
            <animated.div
              aria-hidden
              style={{ backgroundImage: chrome, ...maskStyle }}
              className="absolute inset-0 mix-blend-hard-light [mask-repeat:no-repeat] [mask-size:100%_100%]"
            />
          </animated.div>
        </animated.div>
      </div>

      {/* REFLECTION on the water — faint, synced to the same rise/tilt */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
        style={{ top: WATERLINE }}
      >
        <animated.div
          style={{ transform: riseReflection }}
          className="absolute left-1/2 top-0 h-[54lvh] aspect-[900/1314] will-change-transform"
        >
          <animated.img
            src={src}
            alt=""
            aria-hidden
            style={{ transform: reflectionTilt }}
            className="absolute inset-0 h-full w-full opacity-20 blur-[3px] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.5),transparent_50%)]"
          />
        </animated.div>
      </div>
    </>
  );
};
