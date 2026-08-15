"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { Hover } from "@/components/animation/springs/hover";

export interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Inner spring resting / hovered states. Defaults to a subtle x-shift + fade. */
  from?: Record<string, string | number>;
  to?: Record<string, string | number>;
  "aria-current"?: "page" | undefined;
  "aria-label"?: string;
}

/**
 * A `next/link` whose label springs on hover via the engine's `<Hover>` (the
 * link root is the hover trigger, so the whole link reacts). Defaults read well
 * for nav/footer link lists; pass `from`/`to` to retune the motion.
 */
export const AnimatedLink = ({
  href,
  children,
  className,
  from = { transform: "translateX(0px)", opacity: 0.65 },
  to = { transform: "translateX(4px)", opacity: 1 },
  "aria-current": ariaCurrent,
  "aria-label": ariaLabel,
}: AnimatedLinkProps) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
      className={`inline-flex w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className ?? ""}`}
    >
      <Hover
        tag="span"
        trigger={ref}
        from={from}
        to={to}
        config={{ tension: 320, friction: 22 }}
        className="inline-flex items-center gap-1"
      >
        {children}
      </Hover>
    </Link>
  );
};
