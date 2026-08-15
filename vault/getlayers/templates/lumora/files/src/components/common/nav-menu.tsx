"use client";

import { useEffect, useState } from "react";
import { animated, useTransition } from "@react-spring/web";
import { LogoMark } from "@/components/ui/logo-mark";
import { XIcon } from "@/components/ui/icons";
import { useNavMenu, useRequestModal } from "@/hooks/ui-store";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { useClock } from "@/hooks/use-clock";
import { scrollTo } from "@/utils/scroll-to";
import { homeContent } from "@/data/mocks/home";

/**
 * Full-screen navigation overlay opened by the header Menu button. Provides
 * navigation on every breakpoint (the inline nav is hidden below `lg`), routes
 * Contact to the request modal, and smooth-scrolls to in-page sections.
 */
export const NavMenu = () => {
  const open = useNavMenu((state) => state.open);
  const closeMenu = useNavMenu((state) => state.closeMenu);
  const openModal = useRequestModal((state) => state.openModal);
  const stopScroll = useScroll((state) => state.stop);
  const startScroll = useScroll((state) => state.start);
  const clock = useClock();

  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!open) return;
    stopScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      setEntered(false);
      startScroll();
    };
  }, [open, closeMenu, stopScroll, startScroll]);

  const handleNav = (href: string) => {
    closeMenu();
    if (href === "#contact") {
      openModal();
      return;
    }
    scrollTo(href.replace("#", ""));
  };

  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 280, friction: 32 },
  });

  return transitions((style, item) =>
    item ? (
      <animated.div
        style={style}
        className="fixed inset-0 z-[115] flex flex-col bg-ink text-white"
      >
        <div className="mx-auto flex w-full max-w-shell items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
          <span className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <LogoMark className="text-xl text-accent-from" />
            {homeContent.brand}
          </span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="inline-flex items-center gap-2 rounded-control border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white/70 transition hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <XIcon className="text-sm" />
            Close
          </button>
        </div>

        <nav
          aria-label="Overlay"
          className="mx-auto flex w-full max-w-shell flex-1 flex-col justify-center px-5 sm:px-8"
        >
          <ul className="flex flex-col gap-1">
            {homeContent.nav.map((link, index) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => handleNav(link.href)}
                  style={{ transitionDelay: `${index * 45 + 80}ms` }}
                  className={`group flex w-full items-center gap-4 py-2 text-left text-4xl font-semibold tracking-tight transition-all duration-500 ease-out sm:text-6xl ${
                    entered
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <span className="text-base font-normal text-white/30 transition group-hover:text-accent-from">
                    0{index + 1}
                  </span>
                  <span className="text-white/70 transition-colors duration-300 group-hover:text-white">
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-auto flex w-full max-w-shell flex-col gap-3 border-t border-white/10 px-5 py-6 text-xs uppercase tracking-wide text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span suppressHydrationWarning>
            {clock.ready
              ? `${homeContent.meta.statusLabel} — ${clock.time}`
              : homeContent.meta.statusLabel}
          </span>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              openModal();
            }}
            className="text-white/70 underline-offset-4 transition hover:text-white hover:underline"
          >
            Start streaming →
          </button>
        </div>
      </animated.div>
    ) : null,
  );
};
