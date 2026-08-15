"use client";

// 📖 Docs: obsidian/frontend/components/common.md

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

import { useIntro } from "@/hooks/intro/use-intro";

/** Held at 100% this long before the curtain starts to lift. */
const HOLD_AT_FULL = 150;
/** Head start (ms) the bar's collapse gets over the curtain's fade. */
const FADE_DELAY = 110;
/** Never uncover sooner than this — a flashed preloader reads as a glitch. */
const MIN_DURATION = 900;
/** Never hold the page hostage longer than this, whatever is still loading. */
const MAX_DURATION = 7000;
/** How often progress is re-evaluated (ms). */
const POLL_INTERVAL = 120;

export interface PreloaderProps {
  /** Wordmark shown while loading. */
  brand: string;
  /** Images to have decoded before uncovering the page. */
  images?: string[];
}

/**
 * Full-screen loading curtain: wordmark, a spring-driven percentage counter,
 * and a progress bar the height of the hero's card row.
 *
 * Progress tracks real signals (fonts, the images passed in, `window.load`) so
 * the number means something, but it is floored by a slow creep — a bar that
 * sits still reads as broken even when it is honestly waiting. At 100% the
 * curtain fades, the bar collapses into its right edge, and
 * `useIntro().enter()` releases the hero reveals.
 */
export const Preloader = ({ brand, images = [] }: PreloaderProps) => {
  const enter = useIntro((state) => state.enter);
  /** 0–100. The single source of truth for the counter and the bar fill. */
  const [progress, setProgress] = useState(0);
  const [isLifted, setIsLifted] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const targetRef = useRef(0);
  const liftedRef = useRef(false);

  // One spring feeds both the counter and the fill, so they cannot disagree.
  //
  // Declarative — driven by `progress` state rather than an imperative api.
  // That is not a style choice: react-spring re-applies a hook's declared props
  // on re-render, so the imperative form (`useSpring(() => ({ value: 0 }))`,
  // with or without a deps array) fired `start({ to: { value: 0 } })` on every
  // state change and dragged the counter back down from 100 — the "progress
  // resets on the way out" this component was accused of for days. Declaring
  // the *current* value makes that re-application a no-op instead of a bug.
  const { value } = useSpring({
    value: progress,
    config:
      progress >= 100
        ? // Stiff, with a loose `precision`, because the lift waits on this
          // spring's `onRest`. The default precision chases the last fraction
          // of a percent for ~800ms after the counter already reads 100%, which
          // is dead time the viewer reads as the page hanging.
          { tension: 180, friction: 26, precision: 0.1 }
        : { tension: 46, friction: 22 },
    onRest: () => {
      if (progress < 100 || liftedRef.current) return;
      liftedRef.current = true;
      window.setTimeout(() => {
        // Release the hero as the curtain *starts* leaving, not once it has
        // gone — waiting for the spring to rest left the entrance visibly late.
        setIsLifted(true);
        enter();
      }, HOLD_AT_FULL);
    },
  });

  // The curtain itself just fades — no transform, so nothing it contains gets
  // squashed. It is held back a beat so the bar's collapse reads first.
  const curtain = useSpring({
    opacity: isLifted ? 0 : 1,
    delay: isLifted ? FADE_DELAY : 0,
    config: { tension: 95, friction: 26 },
    onRest: () => {
      if (isLifted) setIsGone(true);
    },
  });

  // Only the bar moves: it collapses into its right edge, carrying on in the
  // direction it was just filling. That also keeps it from cross-dissolving
  // into the metric card's meter directly beneath it — which starts empty, and
  // which made a *stationary* fading bar read as progress snapping back to
  // zero. Collapsing rightward is the opposite motion to a reset.
  //
  // This animates **width**, not `scaleX`. A horizontal scale also scales the
  // 16px corner radius and the 1px border, so the rounded ends stretch into
  // long ellipses and the bar looks like it is closing from both sides at once
  // before drifting right. Width keeps the geometry honest; the element is
  // right-anchored (`ml-auto`) so the left edge is the one that travels.
  const bar = useSpring({
    width: isLifted ? 0 : 100,
    config: { tension: 150, friction: 28 },
  });

  // Lock scrolling while the curtain is up. Below `lg` the hero is a scrolling
  // document (ADR-0022), so the page behind the loader is taller than the
  // viewport and put a scrollbar alongside it — and a page you cannot see
  // should not scroll anyway. Keyed off `isGone` so the lock lifts with the
  // component.
  useEffect(() => {
    if (isGone) return;
    document.documentElement.classList.add("is-loading");
    return () => document.documentElement.classList.remove("is-loading");
  }, [isGone]);

  useEffect(() => {
    const startedAt = performance.now();
    let done = false;

    const signals: Promise<unknown>[] = [
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((resolve) => {
        if (document.readyState === "complete") return resolve();
        window.addEventListener("load", () => resolve(), { once: true });
      }),
      ...images.map(
        (src) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = src;
          }),
      ),
    ];

    const total = signals.length;
    let settled = 0;
    const bump = () => {
      settled += 1;
      targetRef.current = Math.max(targetRef.current, settled / total);
    };
    signals.forEach((signal) => void Promise.resolve(signal).then(bump, bump));

    const finish = () => {
      if (done) return;
      done = true;
      setProgress(100);
    };

    // Creep floor: eases toward 90% over MAX_DURATION so the bar always moves.
    const poll = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const creep = Math.min(elapsed / MAX_DURATION, 1) ** 0.65 * 0.9;
      const reached = Math.max(targetRef.current, creep);

      if (
        (settled === total && elapsed >= MIN_DURATION) ||
        elapsed >= MAX_DURATION
      ) {
        window.clearInterval(poll);
        finish();
        return;
      }
      setProgress(Math.min(reached, 0.97) * 100);
    }, POLL_INTERVAL);

    return () => window.clearInterval(poll);
    // Mount-only: `images` is static content and `enter` is a stable store action.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isGone) return null;

  return (
    <animated.div
      style={curtain}
      aria-hidden={isLifted}
      className="pointer-events-none fixed inset-0 z-50 flex flex-col bg-background px-[1.875rem] pt-[1.875rem] pb-[1.875rem]"
    >
      <p className="shrink-0 text-center text-title leading-none text-foreground-strong">
        {brand}
      </p>

      <div
        role="progressbar"
        aria-label="Loading"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="flex min-h-0 flex-1 items-center justify-center"
      >
        <animated.span className="text-display leading-none font-light text-foreground">
          {value.to((current) => `${Math.round(current)}%`)}
        </animated.span>
      </div>

      <animated.div
        style={{ width: bar.width.to((current) => `${current}%`) }}
        className="ml-auto h-[8.8125rem] shrink-0 overflow-hidden rounded-card border border-border-subtle bg-surface-raised"
      >
        <animated.div
          className="h-full rounded-card bg-gradient-to-r from-accent-gradient-from to-accent-gradient-to"
          style={{ width: value.to((current) => `${current}%`) }}
        />
      </animated.div>
    </animated.div>
  );
};
