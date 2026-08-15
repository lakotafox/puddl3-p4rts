"use client";

// 📖 Docs: obsidian/frontend/components/common.md

import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import { subscribeToTicker } from "@/lib/animation/ticker";
import { useIntro } from "@/hooks/intro/use-intro";
import { readColorToken } from "@/utils/color";

import { createCometField } from "./comet-field";

/** Radius of the progress ring in the SVG's own coordinate space. */
const RING_RADIUS = 48;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Counting to 90 happens on trust; the last ten wait for the `load` event. */
const HOLD_AT = 90;
/**
 * Floor on how long the overlay stays up. On a warm cache `load` has already
 * fired by the time this mounts, and without a floor the whole intro is over in
 * ~200ms — which reads as a glitch rather than a loader.
 */
const MIN_VISIBLE_MS = 1300;
const COUNT_CONFIG = { tension: 18, friction: 26, mass: 1.4 } as const;
const FINISH_CONFIG = { tension: 130, friction: 26 } as const;
/** The reveal wants to feel like an aperture opening, not a curtain snapping. */
const REVEAL_CONFIG = {
  tension: 90,
  friction: 32,
  mass: 1,
  // The mask travels 145 units, so the default precision leaves a long, invisible
  // tail during which the overlay is still mounted. Rest sooner.
  precision: 0.5,
} as const;
/** Mask radius at full reveal, in % of the overlay — past the far corners. */
const REVEAL_END = 145;
/** Width of the mask's soft edge, in the same units. */
const REVEAL_FEATHER = 14;

/**
 * The aperture, as a mask image.
 *
 * The feather is on the **inside** of the radius, not the outside. Putting the
 * transparent stop at the radius itself (`transparent r, black r+feather`) means
 * that at `r = 0` the centre is already partly see-through: the hero video shows
 * through the middle of the overlay and washes out the counter sitting on it.
 * Anchoring the opaque stop at `r` instead keeps the overlay solid until the
 * reveal actually starts.
 */
const aperture = (radius: number): string => {
  const inner = Math.max(0, radius - REVEAL_FEATHER);
  return `radial-gradient(circle at 50% 50%, transparent ${inner}%, black ${radius}%)`;
};

/**
 * Full-screen preloader: a counting figure inside a filling ring, over a field
 * of drifting comets.
 *
 * **The exit is a mask, not a fade.** A radial-gradient hole opens from the
 * centre and grows past the corners, so the page is uncovered like an aperture
 * rather than dissolved — the overlay never changes opacity. The soft stop on
 * the gradient keeps the leading edge from looking like a cut.
 *
 * Timing is honest: the figure springs to 90 on its own, then waits for the
 * window `load` event before finishing. The intro store flips at 100, i.e. as
 * the aperture starts to open, so the hero animates in *through* it.
 *
 * `useReducedMotion` is mounted at the app root, which sets react-spring's
 * global `skipAnimation` — under that setting every spring here jumps to its end
 * state and the overlay clears immediately, which is the right behaviour.
 */
export const Preloader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const complete = useIntro((state) => state.complete);
  const [dismissed, setDismissed] = useState(false);

  const [counter, counterApi] = useSpring(() => ({
    value: 0,
    config: COUNT_CONFIG,
  }));

  const [reveal, revealApi] = useSpring(() => ({
    radius: 0,
    config: REVEAL_CONFIG,
  }));

  // Count up, then hand over to the reveal.
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const mountedAt = performance.now();

    counterApi.start({ value: HOLD_AT, config: COUNT_CONFIG });

    const run = () => {
      if (cancelled) return;
      counterApi.start({
        value: 100,
        config: FINISH_CONFIG,
        onRest: () => {
          if (cancelled) return;
          // Flip the gate first: the hero starts moving as the aperture opens.
          complete();
          revealApi.start({
            radius: REVEAL_END,
            config: REVEAL_CONFIG,
            onRest: () => setDismissed(true),
          });
        },
      });
    };

    const finish = () => {
      if (cancelled) return;
      const remaining = MIN_VISIBLE_MS - (performance.now() - mountedAt);
      if (remaining <= 0) {
        run();
        return;
      }
      timer = setTimeout(run, remaining);
    };

    if (document.readyState === "complete") {
      finish();
      return () => {
        cancelled = true;
        if (timer) clearTimeout(timer);
      };
    }

    window.addEventListener("load", finish);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, [counterApi, revealApi, complete]);

  // Comet field, on the shared ticker.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const field = createCometField(canvas, readColorToken("--on-media"));
    if (!field) return;

    let previous = performance.now();

    const unsubscribe = subscribeToTicker((time) => {
      const delta = Math.min((time - previous) / 1000, 0.05);
      previous = time;
      field.resize();
      field.draw(delta);
    }, () => 0);

    return unsubscribe;
  }, []);

  if (dismissed) return null;

  return (
    <animated.div
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed inset-0 z-60 flex items-center justify-center bg-intro-ground"
      style={{
        maskImage: reveal.radius.to(aperture),
        WebkitMaskImage: reveal.radius.to(aperture),
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 size-full"
      />

      <div className="relative flex size-75 items-center justify-center sm:size-85">
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="absolute size-full -rotate-90"
        >
          <animated.circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.25"
            strokeLinecap="round"
            className="text-on-media/70"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={counter.value.to(
              (value) => RING_CIRCUMFERENCE * (1 - value / 100),
            )}
          />
        </svg>

        <p className="font-display text-counter leading-display text-on-media">
          <animated.span>
            {counter.value.to((value) => Math.round(value))}
          </animated.span>
          <span className="text-on-media/60">%</span>
        </p>
      </div>
    </animated.div>
  );
};
