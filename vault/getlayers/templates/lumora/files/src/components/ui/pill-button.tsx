"use client";

import Link from "next/link";
import { useRef } from "react";
import { Hover } from "@/components/animation/springs/hover";
import { ArrowRightIcon, ArrowUpRightIcon } from "./icons";

type Variant = "dark" | "light" | "outline";

export interface PillButtonProps {
  label: string;
  /** Render as a link when set, otherwise a button. */
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  /** Append a circular icon badge that springs on hover. */
  withArrow?: boolean;
  arrow?: "right" | "up-right";
  type?: "button" | "submit";
  className?: string;
}

const surfaceByVariant: Record<Variant, string> = {
  dark: "bg-ink text-white",
  light: "bg-surface text-foreground",
  outline: "border border-line bg-transparent text-foreground",
};

export const PillButton = ({
  label,
  href,
  onClick,
  variant = "dark",
  withArrow = false,
  arrow = "right",
  type = "button",
  className,
}: PillButtonProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const ArrowIcon = arrow === "up-right" ? ArrowUpRightIcon : ArrowRightIcon;

  const badgeColors =
    variant === "dark" ? "bg-white text-ink" : "bg-ink text-white";

  const padding = withArrow ? "py-1.5 pl-6 pr-1.5" : "px-7 py-3.5";

  const content = (
    <span
      className={`inline-flex items-center gap-3 rounded-pill text-sm font-medium ${surfaceByVariant[variant]} ${padding}`}
    >
      <span>{label}</span>
      {withArrow ? (
        <Hover
          tag="span"
          trigger={rootRef}
          from={{ transform: "translate(0px, 0px)" }}
          to={{
            transform:
              arrow === "up-right"
                ? "translate(2px, -2px)"
                : "translate(3px, 0px)",
          }}
          config={{ tension: 320, friction: 18 }}
          className={`grid size-9 place-items-center rounded-pill text-base ${badgeColors}`}
        >
          <ArrowIcon />
        </Hover>
      ) : null}
    </span>
  );

  const inner = (
    <Hover
      tag="span"
      trigger={rootRef}
      from={{ transform: "scale(1)" }}
      to={{ transform: "scale(1.04)" }}
      config={{ tension: 320, friction: 18 }}
      className="inline-block"
    >
      {content}
    </Hover>
  );

  if (href) {
    return (
      <Link
        ref={rootRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={`inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className ?? ""}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={rootRef as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={`inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className ?? ""}`}
    >
      {inner}
    </button>
  );
};
