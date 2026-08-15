/**
 * Small outlined chip used for category / tag labels.
 */
import type { ReactNode } from "react";

export interface TagChipProps {
  children: ReactNode;
  /** Light chips read on dark surfaces; default reads on light surfaces. */
  tone?: "light" | "dark";
  className?: string;
}

export const TagChip = ({ children, tone = "dark", className }: TagChipProps) => {
  const toneClass =
    tone === "light"
      ? "border-white/25 text-white"
      : "border-line text-foreground";

  return (
    <span
      className={`inline-flex items-center rounded-pill border px-4 py-2 text-sm ${toneClass} ${className ?? ""}`}
    >
      {children}
    </span>
  );
};
