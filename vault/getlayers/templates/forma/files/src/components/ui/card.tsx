// 📖 Docs: obsidian/frontend/components/ui.md
import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Semantic element to render. */
  tag?: "article" | "section" | "div";
  className?: string;
  children: ReactNode;
}

/**
 * The hero's rounded, hairline-bordered surface. Shared by all three cards in
 * the bottom row, so the radius and border live here rather than being
 * repeated per card.
 *
 * Note for callers: the 1px border sits inside the card's box, so a 19px
 * padding — not 20px — reproduces the design's 20px inset from the card edge.
 */
export const Card = ({
  tag: Tag = "article",
  className = "",
  children,
  ...props
}: CardProps) => (
  <Tag
    className={`relative overflow-hidden rounded-card border border-border-subtle ${className}`}
    {...props}
  >
    {children}
  </Tag>
);
