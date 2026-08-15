"use client";

// 📖 Docs: obsidian/frontend/components/common.md

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef } from "react";

/** Diameter at rest and over an interactive target (rem). */
const SIZE = 0.75;
const SIZE_ACTIVE = 1.75;
/** Anything that should make the dot swell. */
const INTERACTIVE = "a, button, input, textarea, select, [role='button']";

/**
 * Black dot that replaces the native cursor on fine-pointer devices.
 *
 * Deliberately **stateless**: react-spring re-applies a hook's declared props on
 * every re-render, so a single `setState` here would re-declare `x: 0, y: 0`
 * and fling the dot to the top-left corner mid-move. Everything therefore runs
 * through refs and the imperative api, and the component renders exactly once.
 * See the warning in obsidian/frontend/animation-system.md.
 *
 * Renders nothing on coarse pointers (touch) or under
 * `prefers-reduced-motion`, and never receives pointer events itself.
 */
export const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  const [{ x, y, scale, opacity }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 0,
    config: { tension: 520, friction: 34 },
  }));

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const move = (event: PointerEvent) => {
      const overInteractive = Boolean(
        (event.target as Element | null)?.closest?.(INTERACTIVE),
      );
      api.start({
        x: event.clientX,
        y: event.clientY,
        opacity: 1,
        scale: overInteractive ? SIZE_ACTIVE / SIZE : 1,
        // Position is not animated: a cursor that eases toward the pointer
        // reads as lag, not as polish. Only the swell and the fade spring.
        immediate: (key) => key === "x" || key === "y",
      });
    };
    const hide = () => api.start({ opacity: 0 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [api]);

  return (
    <animated.div
      ref={dotRef}
      aria-hidden="true"
      style={{
        x,
        y,
        scale,
        opacity,
        width: `${SIZE}rem`,
        height: `${SIZE}rem`,
      }}
      className="pointer-events-none fixed top-0 left-0 z-[60] -ml-[0.375rem] -mt-[0.375rem] rounded-full bg-foreground-strong ring-2 ring-foreground-inverse will-change-transform"
    />
  );
};
