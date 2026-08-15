"use client";

import Link from "next/link";
import { useRef } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { Hover } from "@/components/animation/springs/hover";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { ServiceItem } from "@/data/mocks/home";

export interface ServiceRowProps {
  item: ServiceItem;
  index: number;
}

export const ServiceRow = ({ item, index }: ServiceRowProps) => {
  const rowRef = useRef<HTMLElement>(null);

  return (
    <Inview
      tag="li"
      mode="once"
      from={{ opacity: 0, transform: "translateY(24px)" }}
      to={{ opacity: 1, transform: "translateY(0px)" }}
      config={{ tension: 200, friction: 24 }}
      delayIn={index * 80}
      className="border-t border-line first:border-t-0"
    >
      <Link
        href={item.href}
        className="block rounded-card-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Hover
          ref={rowRef}
          tag="div"
          from={{
            backgroundColor: "rgba(241,240,238,0)",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
          to={{
            backgroundColor: "rgba(241,240,238,1)",
            paddingLeft: "2rem",
            paddingRight: "1.25rem",
          }}
          config={{ tension: 240, friction: 26 }}
          className="flex items-center gap-4 rounded-card-sm py-6 sm:gap-6 sm:py-8"
        >
          <span className="w-7 shrink-0 text-sm font-medium text-foreground/40 sm:w-10">
            {item.index}
          </span>
          <h3 className="flex-1 text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
            {item.title}
          </h3>
          <p className="hidden max-w-xs text-sm text-foreground/55 lg:block">
            {item.description}
          </p>
          <Hover
            tag="span"
            trigger={rowRef}
            from={{ transform: "translateX(0px)" }}
            to={{ transform: "translateX(5px)" }}
            config={{ tension: 300, friction: 18 }}
            className="grid size-10 shrink-0 place-items-center rounded-pill bg-ink text-base text-white sm:size-12"
          >
            <ArrowUpRightIcon />
          </Hover>
        </Hover>
      </Link>
    </Inview>
  );
};
