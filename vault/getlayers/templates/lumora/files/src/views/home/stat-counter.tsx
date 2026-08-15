"use client";

import { useState } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { ProgressTrigger } from "@/components/animation/springs/progress-trigger";
import type { Stat } from "@/data/mocks/home";

export interface StatCounterProps {
  stat: Stat;
  index: number;
}

/**
 * A single stat whose number counts up as the block scrolls toward centre.
 * `ProgressTrigger` drives the 0→1 scroll progress; we map it to the value.
 */
export const StatCounter = ({ stat, index }: StatCounterProps) => {
  const [value, setValue] = useState(0);

  return (
    <Inview
      tag="li"
      mode="once"
      from={{ opacity: 0, transform: "translateY(20px)" }}
      to={{ opacity: 1, transform: "translateY(0px)" }}
      config={{ tension: 200, friction: 24 }}
      delayIn={index * 90}
    >
      <ProgressTrigger
        tag="div"
        start="top bottom"
        end="center center"
        frameInterval={30}
        onChange={({ progress }) =>
          setValue(Math.round(progress * stat.value))
        }
      >
        <p className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
          {stat.prefix ?? ""}
          {value}
          {stat.suffix}
        </p>
        <p className="mt-3 text-sm text-white/55">{stat.label}</p>
      </ProgressTrigger>
    </Inview>
  );
};
