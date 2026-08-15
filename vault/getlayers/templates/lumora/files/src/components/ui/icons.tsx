/**
 * Inline SVG icon set. Decorative by default (aria-hidden); pass a `title` when
 * an icon needs an accessible name. Sized in `em` so they scale with text.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

const base = (props: IconProps) => ({
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": props.title ? undefined : true,
  role: props.title ? "img" : undefined,
});

export const ArrowRightIcon = ({ title, ...props }: IconProps) => (
  <svg {...base({ title })} {...props}>
    {title ? <title>{title}</title> : null}
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowUpRightIcon = ({ title, ...props }: IconProps) => (
  <svg {...base({ title })} {...props}>
    {title ? <title>{title}</title> : null}
    <path
      d="M7 17 17 7M8 7h9v9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StarIcon = ({ title, ...props }: IconProps) => (
  <svg {...base({ title })} {...props}>
    {title ? <title>{title}</title> : null}
    <path
      d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z"
      fill="currentColor"
    />
  </svg>
);

export const GlobeIcon = ({ title, ...props }: IconProps) => (
  <svg {...base({ title })} {...props}>
    {title ? <title>{title}</title> : null}
    <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25zM2.75 12h18.5"
      stroke="currentColor"
      strokeWidth="1.4"
    />
  </svg>
);

export const XIcon = ({ title, ...props }: IconProps) => (
  <svg {...base({ title })} {...props}>
    {title ? <title>{title}</title> : null}
    <path
      d="M4 4l16 16M20 4 4 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CircleDotIcon = ({ title, ...props }: IconProps) => (
  <svg {...base({ title })} {...props}>
    {title ? <title>{title}</title> : null}
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="3.2" fill="currentColor" />
  </svg>
);

export const GridIcon = ({ title, ...props }: IconProps) => (
  <svg {...base({ title })} {...props}>
    {title ? <title>{title}</title> : null}
    <path
      d="M4 6h16M4 12h16M4 18h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
