import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The shadcn `cn()` helper. PUDDL3 P4RTS Pro components import this from
 * "@/lib/utils" — the standard location in a shadcn project — so the gallery
 * provides it at the same specifier for previewing them.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
