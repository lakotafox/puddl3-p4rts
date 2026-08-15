/**
 * Geometric brand mark — a four-point spark (a "light" motif). Decorative by
 * default; pass a `title` to give it an accessible name (e.g. in the header).
 */
import type { SVGProps } from "react";

type LogoMarkProps = SVGProps<SVGSVGElement> & { title?: string };

export const LogoMark = ({ title, ...props }: LogoMarkProps) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden={title ? undefined : true}
    role={title ? "img" : undefined}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    {/* concave four-point spark drawn from the centre outward */}
    <path
      d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z"
      fill="currentColor"
    />
  </svg>
);
