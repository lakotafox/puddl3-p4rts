"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns `false` on the server and during the first (hydration) client render,
 * then `true` afterwards.
 *
 * react-spring serializes a `SpringValue`'s initial style differently on the
 * server (normalised, e.g. `rgba(241, 240, 238, 0)`) than the client's raw
 * pre-animation read (`rgba(241,240,238,0)`), which React flags as a hydration
 * mismatch. Gating the animated style on this hook lets the spring components
 * render the plain, deterministic `from` object until hydration completes, so
 * the server and first client paint are byte-identical and no mismatch occurs.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
