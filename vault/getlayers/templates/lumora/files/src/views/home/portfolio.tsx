"use client";

import TextEngine from "spring-text-engine";
import { easings } from "@react-spring/web";
import { Inview } from "@/components/animation/springs/in-view";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PortfolioCard } from "./portfolio-card";
import type { homeContent } from "@/data/mocks/home";

export interface PortfolioProps {
  portfolio: (typeof homeContent)["portfolio"];
}

export const Portfolio = ({ portfolio }: PortfolioProps) => {
  return (
    <section
      id="works"
      aria-labelledby="portfolio-heading"
      className="bg-background"
    >
      <div className="mx-auto max-w-shell px-5 pb-20 pt-10 sm:px-8 lg:pb-28">
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, transform: "translateY(12px)" }}
          to={{ opacity: 1, transform: "translateY(0px)" }}
          className="flex justify-center"
        >
          <Eyebrow className="rounded-pill border border-line px-4 py-1.5">
            {portfolio.eyebrow}
          </Eyebrow>
        </Inview>

        <div className="mb-12 mt-5 flex justify-center">
          <TextEngine
            tag="h2"
            id="portfolio-heading"
            mode="once"
            overflow
            lineIn={{ y: "0%", opacity: 1 }}
            lineOut={{ y: "100%", opacity: 0 }}
            lineConfig={{ duration: 900, easing: easings.easeOutCubic }}
            delayIn={120}
            className="w-fit text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {portfolio.heading}
          </TextEngine>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {portfolio.items.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};
