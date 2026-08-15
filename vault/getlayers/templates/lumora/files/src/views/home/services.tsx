"use client";

import TextEngine from "spring-text-engine";
import { easings } from "@react-spring/web";
import { Inview } from "@/components/animation/springs/in-view";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceRow } from "./service-row";
import type { homeContent } from "@/data/mocks/home";

export interface ServicesProps {
  services: (typeof homeContent)["services"];
}

export const Services = ({ services }: ServicesProps) => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-background"
    >
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:py-28">
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, transform: "translateY(12px)" }}
          to={{ opacity: 1, transform: "translateY(0px)" }}
        >
          <Eyebrow>{services.eyebrow}</Eyebrow>
        </Inview>

        <TextEngine
          tag="h2"
          id="services-heading"
          mode="once"
          overflow
          lineIn={{ y: "0%", opacity: 1 }}
          lineOut={{ y: "100%", opacity: 0 }}
          lineConfig={{ duration: 900, easing: easings.easeOutCubic }}
          delayIn={120}
          className="mb-12 mt-5 max-w-[16ch] text-4xl font-semibold tracking-tight sm:mb-14 sm:text-5xl"
        >
          {services.heading}
        </TextEngine>

        <ul>
          {services.items.map((item, index) => (
            <ServiceRow key={item.index} item={item} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};
