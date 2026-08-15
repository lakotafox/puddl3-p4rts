"use client";

// 📖 Docs: obsidian/frontend/components/ui.md

import { animated, useSpring } from "@react-spring/web";

export interface MeterProps {
  /** Filled share of the track, 0–1. */
  value: number;
  /** Accessible name for the bar. */
  label: string;
  /** Hold the fill at zero until this flips — lets a caller stage the fill. */
  play?: boolean;
  className?: string;
}

/**
 * Thin gradient progress bar. Figma nodes 706:440 (track) / 706:441 (fill).
 *
 * The fill is spring-driven rather than a static width so it can grow into
 * place; `play` is what a caller uses to start it (the hero holds it until the
 * preloader lifts).
 */
export const Meter = ({
  value,
  label,
  play = true,
  className = "",
}: MeterProps) => {
  const percent = Math.min(Math.max(value, 0), 1) * 100;
  const { width } = useSpring({
    width: play ? percent : 0,
    config: { tension: 90, friction: 26 },
  });

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-[0.375rem] w-full overflow-hidden rounded-meter bg-surface-meter ${className}`}
    >
      <animated.div
        className="h-full rounded-meter bg-gradient-to-r from-accent-gradient-from to-accent-gradient-to"
        style={{ width: width.to((current) => `${current}%`) }}
      />
    </div>
  );
};
