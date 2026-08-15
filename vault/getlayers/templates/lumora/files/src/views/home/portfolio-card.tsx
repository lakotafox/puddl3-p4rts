"use client";

import Link from "next/link";
import { useRef } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { Hover } from "@/components/animation/springs/hover";
import { LogoMark } from "@/components/ui/logo-mark";
import { TagChip } from "@/components/ui/tag-chip";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { PortfolioItem } from "@/data/mocks/home";

export interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

export const PortfolioCard = ({ item, index }: PortfolioCardProps) => {
  const cardRef = useRef<HTMLElement>(null);

  return (
    <Inview
      tag="li"
      mode="once"
      from={{ opacity: 0, transform: "translateY(48px)" }}
      to={{ opacity: 1, transform: "translateY(0px)" }}
      config={{ tension: 180, friction: 26 }}
      delayIn={index * 90}
    >
      <Link
        href={item.href}
        aria-label={`Open the ${item.name} case study`}
        className="block rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <Hover
          ref={cardRef}
          tag="article"
          from={{ transform: "translateY(0px) scale(1)" }}
          to={{ transform: "translateY(-8px) scale(1.012)" }}
          config={{ tension: 260, friction: 22 }}
          className="relative min-h-[22rem] overflow-hidden rounded-card bg-ink p-6 text-white ring-1 ring-white/5 sm:min-h-[26rem] sm:p-8"
        >
          {/* top meta row */}
          <div className="relative z-10 flex items-center justify-between text-xs uppercase tracking-wide text-white/45">
            <span>
              {item.category} — {item.year}
            </span>
            <Hover
              tag="span"
              trigger={cardRef}
              from={{ transform: "rotate(0deg) scale(1)" }}
              to={{ transform: "rotate(45deg) scale(1.08)" }}
              config={{ tension: 280, friction: 18 }}
              className="grid size-11 place-items-center rounded-pill bg-white/10 text-lg text-white ring-1 ring-white/15"
            >
              <ArrowUpRightIcon />
            </Hover>
          </div>

          {/* centered brand mark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid place-items-center"
          >
            <span className="flex items-start gap-1 text-white/90">
              <LogoMark className="text-7xl" />
              <span className="text-xs text-white/60">®</span>
            </span>
          </div>

          {/* bottom meta */}
          <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
            <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
              {item.name}
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/55">
              {item.description}
            </p>
            <ul className="mt-5 flex flex-wrap items-center gap-2">
              {item.tags.map((tag) => (
                <li key={tag}>
                  <TagChip tone="light">{tag}</TagChip>
                </li>
              ))}
            </ul>
          </div>
        </Hover>
      </Link>
    </Inview>
  );
};
