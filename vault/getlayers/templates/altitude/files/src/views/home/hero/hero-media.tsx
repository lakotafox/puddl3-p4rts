"use client";

// 📖 Docs: obsidian/frontend/animation-system.md

import { useEffect, useRef } from "react";
import { useSpring } from "@react-spring/web";

import { subscribeToTicker } from "@/lib/animation/ticker";
import {
  createFluidSimulation,
  type FluidConfig,
  type FluidColor,
} from "@/lib/animation/fluid-simulation";
import { isMobileDisabled, springsConfig } from "@/lib/springs/config";
import { useWindowWidth } from "@/hooks/use-window-size";
import { readColorToken } from "@/utils/color";
import type { HeroVideo } from "@/data/mocks/home";

/** Solver tuning — the oily, marbled, vivid-on-dark look. */
const FLUID_CONFIG: FluidConfig = {
  simResolution: 200,
  dyeResolution: 512,
  densityDissipation: 0.93,
  velocityDissipation: 0.96,
  pressureDissipation: 0.8,
  pressureIterations: 20,
  curl: 42,
  splatRadius: 0.16,
};

/** Loose enough that the vortex drifts after the cursor instead of pinning to it. */
const FOLLOW_CONFIG = { tension: 90, friction: 24, mass: 1.3 } as const;
/** Slower, so the ink swells in and dies away rather than switching. */
const FADE_CONFIG = { tension: 24, friction: 22, mass: 1.2 } as const;

/** Radians per frame — one revolution every ~4s. */
const ORBIT_SPEED = 0.026;
/** Orbit radius in px, capped against the viewport so it stays a vortex. */
const ORBIT_RADIUS = 150;
/** Injected velocity per frame, scaled off how far the orbit point moved. */
const STIR_STRENGTH = 9;
/**
 * How hard the ink is pushed into the dye buffer. The reference engine used 3.2
 * against a near-black page; over video the dye saturates and the vortex turns
 * into a flat white sun, so it stays well under 1.
 */
const INK_GAIN = 0.3;
/** ms between colour picks along the two-hue band. */
const COLOR_INTERVAL = 120;
/** ms of a motionless cursor before the vortex starts fading out. */
const IDLE_TIMEOUT = 180;
/** How far the flow drags the video. */
const WARP_STRENGTH = 0.2;
/** Colour split along the displacement, as a fraction of it. */
const ABERRATION = 0.09;
const FIXED_STEP = 0.016;

export interface HeroMediaProps {
  video: HeroVideo;
  className?: string;
}

/**
 * The hero's background: a looping video with a fluid vortex that follows the
 * cursor, warps the picture, and fades away when the cursor stops.
 *
 * The video and the canvas live together in this one client leaf because the
 * canvas needs the `<video>` element itself as a GPU texture — the warp samples
 * the frame at `uv + velocity`, which is impossible while the video is a
 * separate DOM layer underneath. The canvas therefore draws the video *and* the
 * ink; when the simulation has no frame yet (or fails, or is skipped on mobile)
 * it stays transparent and the plain `<video>` shows through unchanged.
 *
 * Motion is spring-based (hard rule #1): one invisible stirring point orbits a
 * spring chasing the pointer and the solver swirls that into the vortex, while a
 * second spring drives the fade — which also scales the warp, so a still cursor
 * means a still picture. Frames come from the shared ticker (ADR-0009), colour
 * from the `--vortex-*` tokens.
 */
export const HeroMedia = ({ video, className }: HeroMediaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const width = useWindowWidth();
  const disabled = isMobileDisabled(springsConfig.disableOnMobile.hover, width);

  const [vortex, vortexApi] = useSpring(() => ({
    x: 0,
    y: 0,
    intensity: 0,
    config: FOLLOW_CONFIG,
  }));

  /** Seeded on the first pointer move, so the vortex never flies in from (0,0). */
  const seeded = useRef(false);
  const lastMoveAt = useRef(0);
  const idle = useRef(true);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.height === 0) return;

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (!seeded.current) {
        seeded.current = true;
        vortexApi.set({ x, y });
      }

      lastMoveAt.current = performance.now();
      if (idle.current) {
        idle.current = false;
        vortexApi.start({ intensity: 1, config: FADE_CONFIG });
      }

      vortexApi.start({ x, y, config: FOLLOW_CONFIG });
    };

    const handleLeave = () => {
      idle.current = true;
      vortexApi.start({ intensity: 0, config: FADE_CONFIG });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);
    window.addEventListener("blur", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, [vortexApi, disabled]);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = Math.max(1, canvas.clientWidth);
    canvas.height = Math.max(1, canvas.clientHeight);

    const fluid = createFluidSimulation(canvas, FLUID_CONFIG);
    if (!fluid) return;

    const warm = readColorToken("--vortex-warm");
    const cool = readColorToken("--vortex-cool");

    /**
     * Lands near one hue or the other rather than anywhere between them: an even
     * spread would spend most of its splats in the washed-out middle, and the
     * two colours would never read as two colours. The solver does the mixing.
     */
    const pickColor = (): FluidColor => {
      // Biased toward the warm end: over a blue night sky the cool ink gets a
      // free boost from the backdrop, so an even split reads as all-blue.
      const t =
        Math.random() < 0.55 ? Math.random() * 0.2 : 0.8 + Math.random() * 0.2;
      return {
        r: (warm[0] + (cool[0] - warm[0]) * t) * INK_GAIN,
        g: (warm[1] + (cool[1] - warm[1]) * t) * INK_GAIN,
        b: (warm[2] + (cool[2] - warm[2]) * t) * INK_GAIN,
      };
    };

    let angle = 0;
    let previousX = 0;
    let previousY = 0;
    let orbiting = false;
    let color = pickColor();
    let lastColorAt = 0;

    const unsubscribe = subscribeToTicker((time) => {
      fluid.resize();

      // A cursor that stopped moving is treated as gone: the feed stops and the
      // dye dissipates, so the vortex fades out on its own within ~a second.
      if (!idle.current && time - lastMoveAt.current > IDLE_TIMEOUT) {
        idle.current = true;
        vortexApi.start({ intensity: 0, config: FADE_CONFIG });
      }

      const intensity = vortex.intensity.get();

      if (intensity > 0.01) {
        // One stirring point circling the spring-lagged cursor. Its own motion
        // is what the solver turns into a vortex — a stationary splat would just
        // be a blob.
        const radius =
          Math.min(ORBIT_RADIUS, canvas.width * 0.22, canvas.height * 0.28) *
          (0.72 + 0.28 * Math.sin(angle * 0.37));
        angle += ORBIT_SPEED;

        const x = vortex.x.get() + Math.cos(angle) * radius;
        const y = vortex.y.get() + Math.sin(angle) * radius;

        if (!orbiting) {
          orbiting = true;
          previousX = x;
          previousY = y;
        } else {
          if (time - lastColorAt > COLOR_INTERVAL) {
            color = pickColor();
            lastColorAt = time;
          }

          fluid.splat(
            x,
            y,
            (x - previousX) * STIR_STRENGTH,
            (y - previousY) * STIR_STRENGTH,
            {
              r: color.r * intensity,
              g: color.g * intensity,
              b: color.b * intensity,
            },
          );
          previousX = x;
          previousY = y;
        }
      } else {
        orbiting = false;
      }

      fluid.step(FIXED_STEP);

      const element = videoRef.current;
      const ready = element && element.readyState >= 2 && element.videoHeight > 0;

      fluid.render({
        source: ready ? element : null,
        sourceAspect: ready ? element.videoWidth / element.videoHeight : 1,
        warp: WARP_STRENGTH * intensity,
        aberration: ABERRATION,
      });
    }, () => 0);

    return () => {
      unsubscribe();
      fluid.destroy();
    };
  }, [vortex, vortexApi, disabled]);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src={video.src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {!disabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 size-full"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
