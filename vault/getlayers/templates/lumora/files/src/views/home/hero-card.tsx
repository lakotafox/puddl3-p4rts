"use client";

import { useState } from "react";
import { animated, useTransition } from "@react-spring/web";
import { Inview } from "@/components/animation/springs/in-view";
import { LogoMark } from "@/components/ui/logo-mark";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { HeroCardItem } from "@/data/mocks/home";

export interface HeroCardProps {
  cards: readonly HeroCardItem[];
  /** Gate the entrance animation on the intro loader. */
  enabled?: boolean;
}

/**
 * The floating panel in the hero's top-right. Acts as a carousel: clicking the
 * card (or the prev/next controls) swaps the caption + title with an
 * exit/enter animation.
 */
export const HeroCard = ({ cards, enabled = true }: HeroCardProps) => {
  const [{ index, dir }, setState] = useState({ index: 0, dir: 1 });
  const count = cards.length;

  const go = (step: number) =>
    setState((prev) => ({
      index: (prev.index + step + count) % count,
      dir: step,
    }));

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0, transform: `translateY(${dir * 14}px)` },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: `translateY(${dir * -14}px)` },
    config: { tension: 300, friction: 28 },
  });

  return (
    <Inview
      tag="div"
      mode="once"
      enabled={enabled}
      from={{ opacity: 0, transform: "translateY(16px) scale(0.96)" }}
      to={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
      config={{ tension: 200, friction: 24 }}
      delayIn={400}
      className="w-full max-w-sm rounded-card-sm bg-white/70 p-2 shadow-sm ring-1 ring-line/70 backdrop-blur-md lg:w-[19rem]"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => go(1)}
        onKeyDown={(e) => {
          if (e.key === "Enter") go(1);
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        aria-label="Next highlight"
        className="flex cursor-pointer items-stretch gap-2 rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div className="grid aspect-square w-24 shrink-0 place-items-center rounded-control bg-ink text-3xl text-white">
          <LogoMark className="text-accent-from" />
        </div>
        <div className="flex flex-1 flex-col justify-between rounded-control bg-surface/70 p-3">
          <div className="relative min-h-[3.25rem] flex-1">
            {transitions((style, i) => (
              <animated.div
                style={style}
                className="absolute inset-0 flex flex-col gap-0.5"
              >
                <span className="text-[0.65rem] font-medium uppercase tracking-wide text-foreground/45">
                  {cards[i].caption}
                </span>
                <p className="max-w-[8rem] text-sm font-medium leading-snug">
                  {cards[i].title}
                </p>
              </animated.div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1" aria-hidden>
              {cards.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-pill transition-all duration-300 ${
                    i === index
                      ? "w-4 bg-foreground/70"
                      : "w-1.5 bg-foreground/20"
                  }`}
                />
              ))}
            </span>
            <span className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="grid size-7 place-items-center rounded-pill bg-white text-foreground/70 ring-1 ring-line transition hover:text-foreground hover:ring-foreground/30"
              >
                <ArrowRightIcon className="rotate-180 text-xs" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="grid size-7 place-items-center rounded-pill bg-white text-foreground/70 ring-1 ring-line transition hover:text-foreground hover:ring-foreground/30"
              >
                <ArrowRightIcon className="text-xs" />
              </button>
            </span>
          </div>
        </div>
      </div>
    </Inview>
  );
};
