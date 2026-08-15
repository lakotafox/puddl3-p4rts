"use client";

import { useRef } from "react";
import { Inview } from "@/components/animation/springs/in-view";
import { Hover } from "@/components/animation/springs/hover";
import { LogoMark } from "@/components/ui/logo-mark";
import { GridIcon } from "@/components/ui/icons";
import { useClock } from "@/hooks/use-clock";
import { useIntro, useNavMenu, useRequestModal } from "@/hooks/ui-store";
import { scrollTo } from "@/utils/scroll-to";
import type { NavLink } from "@/data/mocks/home";

export interface HeaderProps {
  brand: string;
  nav: NavLink[];
  meta: { statusLabel: string; time: string; date: string };
}

export const Header = ({ brand, nav, meta }: HeaderProps) => {
  const ready = useIntro((state) => state.ready);
  const openMenu = useNavMenu((state) => state.openMenu);
  const openModal = useRequestModal((state) => state.openModal);
  const clock = useClock();

  const handleNav = (href: string) => {
    if (href === "#contact") {
      openModal();
      return;
    }
    scrollTo(href.replace("#", ""));
  };

  return (
    <Inview
      tag="header"
      mode="once"
      enabled={ready}
      from={{ opacity: 0, transform: "translateY(-14px)" }}
      to={{ opacity: 1, transform: "translateY(0px)" }}
      config={{ tension: 210, friction: 26 }}
      delayIn={150}
      className="absolute inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-5 py-5 sm:px-8 sm:py-6">
        <button
          type="button"
          onClick={() => scrollTo("home")}
          aria-label={`${brand} — home`}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Hover
            tag="span"
            from={{ transform: "scale(1)" }}
            to={{ transform: "scale(1.04)" }}
            config={{ tension: 320, friction: 18 }}
            className="flex items-center gap-2 text-lg font-semibold tracking-tight"
          >
            <LogoMark className="text-xl text-accent" />
            <span>{brand}</span>
          </Hover>
        </button>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {nav.map((link, index) => (
              <li key={link.label}>
                <NavItem
                  label={link.label}
                  hasDropdown={link.hasDropdown}
                  current={index === 0}
                  onClick={() => handleNav(link.href)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <p className="hidden items-center gap-3 rounded-control border border-line/80 bg-white/40 px-3 py-2 text-xs text-foreground/70 backdrop-blur-sm md:flex">
            <span className="text-foreground/45">{meta.statusLabel}</span>
            <span
              suppressHydrationWarning
              className="min-w-[3.5rem] font-medium tabular-nums text-foreground"
            >
              {clock.ready ? clock.time : meta.time}
            </span>
            <span aria-hidden className="text-foreground/30">
              •
            </span>
            <time
              suppressHydrationWarning
              className="font-medium text-foreground"
            >
              {clock.ready ? clock.date : meta.date}
            </time>
          </p>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            className="rounded-control border border-line/80 bg-white/40 backdrop-blur-sm transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Hover
              tag="span"
              from={{ transform: "scale(1)" }}
              to={{ transform: "scale(1.05)" }}
              config={{ tension: 320, friction: 18 }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wide"
            >
              <GridIcon className="text-sm" />
              <span className="hidden sm:inline">Menu</span>
            </Hover>
          </button>
        </div>
      </div>
    </Inview>
  );
};

interface NavItemProps {
  label: string;
  hasDropdown?: boolean;
  current?: boolean;
  onClick: () => void;
}

const NavItem = ({ label, hasDropdown, current, onClick }: NavItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className="inline-flex w-fit items-center gap-1 text-foreground/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Hover
        tag="span"
        trigger={ref}
        from={{ transform: "translateY(0px)", opacity: 0.8 }}
        to={{ transform: "translateY(-2px)", opacity: 1 }}
        config={{ tension: 320, friction: 22 }}
        className="inline-flex items-center gap-1"
      >
        {label}
        {hasDropdown ? (
          <span aria-hidden className="text-xs opacity-60">
            ▾
          </span>
        ) : null}
      </Hover>
    </button>
  );
};
