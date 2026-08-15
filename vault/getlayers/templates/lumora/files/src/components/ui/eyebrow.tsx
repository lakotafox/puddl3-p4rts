/**
 * Small section label with a leading dot — e.g. "• Creative Agency".
 * The dot is a decorative pseudo-mark rendered as a sibling span.
 */
import type { ElementType, ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
  /** Semantic element to render. Defaults to a paragraph. */
  as?: ElementType;
  /** `light` reads on dark surfaces; `dark` (default) reads on light surfaces. */
  tone?: "light" | "dark";
  className?: string;
}

export const Eyebrow = ({
  children,
  as: Tag = "p",
  tone = "dark",
  className,
}: EyebrowProps) => {
  const toneClass = tone === "light" ? "text-white/70" : "text-foreground/70";
  const dotClass = tone === "light" ? "bg-white/60" : "bg-foreground/50";

  return (
    <Tag
      className={`inline-flex items-center gap-2 text-sm font-medium ${toneClass} ${className ?? ""}`}
    >
      <span aria-hidden className={`size-1.5 rounded-pill ${dotClass}`} />
      {children}
    </Tag>
  );
};
