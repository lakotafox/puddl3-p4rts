// 📖 Docs: obsidian/frontend/components/ui.md
export interface RingDotProps {
  className?: string;
}

/**
 * Small hollow marker dot. Takes its stroke from the current text colour, so
 * the caller sets the hue with a `text-*` utility.
 */
export const RingDot = ({ className = "" }: RingDotProps) => (
  <svg
    viewBox="0 0 10 10"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={`size-[0.625rem] shrink-0 ${className}`}
  >
    <circle cx="5" cy="5" r="4.5" stroke="currentColor" />
  </svg>
);
