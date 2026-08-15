"use client";

/**
 * Replaces the native cursor with the 3D pointer from `cursor.glb`.
 *
 * Position is written **straight from the `pointermove` handler**, not from the
 * render loop. A cursor that lags its own pointer by a frame is immediately
 * noticeable, and a single `transform` write costs nothing — the WebGL canvas
 * only re-renders for the spin.
 *
 * The native cursor is hidden by a class on `<html>` that is added *after* the
 * scene resolves, so a WebGL failure, a missing model or a slow network all
 * leave the real cursor in place rather than leaving the page with none.
 *
 * Never mounted on touch: `getDeviceProfile().pointer` gates it.
 *
 * 📖 Docs: obsidian/frontend/components/common.md
 */

import { useEffect, useRef } from "react";

import { createCursorScene, CURSOR_CANVAS_SIZE } from "@/lib/cursor-scene";
import { getDeviceProfile } from "@/lib/scene/device";

/**
 * Elements that should show the hover variant. Kept as a selector rather than
 * a listener per element so it keeps working for controls added later.
 */
const INTERACTIVE_SELECTOR =
  'a[href], button, summary, label, select, textarea, input, [role="button"], [role="link"]';

/**
 * Where the model's tip sits inside its canvas, as a fraction of the canvas.
 *
 * The canvas is centred on the pointer and then nudged by this much, so the
 * arrow's point lands on the hotspot instead of its middle. Measured against
 * the rendered output, not derived — flipping `TILT` does *not* mirror this,
 * because the model's arrow points up-left either way and only its lean angle
 * changes.
 *
 * Horizontal alignment can only ever be right on average: the model turns, so
 * its tip sweeps left and right by a few pixels every cycle.
 */
const HOTSPOT = { x: 0.46, y: 0.26 };

export const Cursor3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!getDeviceProfile().pointer) return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    let dispose: (() => void) | null = null;

    const offsetX = CURSOR_CANVAS_SIZE * HOTSPOT.x;
    const offsetY = CURSOR_CANVAS_SIZE * HOTSPOT.y;

    const onMove = (event: PointerEvent): void => {
      canvas.style.transform = `translate3d(${event.clientX - offsetX}px, ${event.clientY - offsetY}px, 0)`;
    };

    createCursorScene(canvas, reducedMotion)
      .then((handle) => {
        if (cancelled) {
          handle.dispose();
          return;
        }
        dispose = handle.dispose;

        const onOver = (event: PointerEvent): void => {
          const target = event.target;
          handle.setHovered(
            target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR)),
          );
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerover", onOver, { passive: true });
        root.classList.add("custom-cursor-active");
        canvas.style.opacity = "1";

        const previousDispose = dispose;
        dispose = () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerover", onOver);
          root.classList.remove("custom-cursor-active");
          previousDispose();
        };
      })
      .catch(() => {
        // Leave the native cursor alone — better a normal pointer than none.
      });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      width={CURSOR_CANVAS_SIZE}
      height={CURSOR_CANVAS_SIZE}
      className="pointer-events-none fixed top-0 left-0 z-50 opacity-0"
      style={{ width: CURSOR_CANVAS_SIZE, height: CURSOR_CANVAS_SIZE }}
    />
  );
};
