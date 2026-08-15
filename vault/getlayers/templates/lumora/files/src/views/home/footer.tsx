"use client";

import TextEngine from "spring-text-engine";
import { easings } from "@react-spring/web";
import { PillButton } from "@/components/ui/pill-button";
import { AnimatedLink } from "@/components/ui/animated-link";
import { LogoMark } from "@/components/ui/logo-mark";
import { useRequestModal } from "@/hooks/ui-store";
import type { homeContent } from "@/data/mocks/home";

export interface FooterProps {
  brand: string;
  footer: (typeof homeContent)["footer"];
}

export const Footer = ({ brand, footer }: FooterProps) => {
  const openModal = useRequestModal((state) => state.openModal);

  return (
    <footer className="relative overflow-hidden rounded-t-card bg-ink text-white">
      <div className="relative z-10 mx-auto max-w-shell px-5 pb-10 pt-20 sm:px-8 lg:pt-24">
        {/* CTA */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <TextEngine
            tag="h2"
            mode="once"
            overflow
            lineIn={{ y: "0%", opacity: 1 }}
            lineOut={{ y: "100%", opacity: 0 }}
            lineStagger={100}
            lineConfig={{ duration: 900, easing: easings.easeOutCubic }}
            className="max-w-[16ch] text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            {footer.cta.heading}
          </TextEngine>
          <PillButton
            label={footer.cta.button.label}
            onClick={openModal}
            variant="light"
            withArrow
            arrow="up-right"
          />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2 text-lg font-semibold">
              <LogoMark className="text-xl" />
              {brand}
            </span>
            <p className="max-w-xs text-sm text-white/55">{footer.tagline}</p>
          </div>

          {footer.columns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col gap-4"
            >
              <p className="text-xs uppercase tracking-wide text-white/40">
                {column.title}
              </p>
              <ul className="flex flex-col gap-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <AnimatedLink href={link.href} className="text-white">
                      {link.label}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <p>{footer.legal.copyright}</p>
          <ul className="flex items-center gap-6">
            {footer.legal.links.map((link) => (
              <li key={link.label}>
                <AnimatedLink
                  href={link.href}
                  className="text-white/70"
                  from={{ transform: "translateX(0px)", opacity: 0.7 }}
                  to={{ transform: "translateX(3px)", opacity: 1 }}
                >
                  {link.label}
                </AnimatedLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Brand watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-6 z-0 select-none text-center font-bold leading-none text-watermark text-white/5"
      >
        {footer.brandWatermark}
      </span>
    </footer>
  );
};
