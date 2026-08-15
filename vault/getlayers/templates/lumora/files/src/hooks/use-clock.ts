"use client";

import { useEffect, useState } from "react";

export interface Clock {
  /** e.g. "9:41am" — lower-case meridiem, no leading zero on the hour. */
  time: string;
  /** e.g. "12 March, 2025". */
  date: string;
  /** False until mounted on the client (avoids SSR hydration mismatch). */
  ready: boolean;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const format = (now: Date): { time: string; date: string } => {
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const meridiem = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const time = `${hours}:${minutes.toString().padStart(2, "0")}${meridiem}`;
  const date = `${now.getDate()} ${MONTHS[now.getMonth()]}, ${now.getFullYear()}`;
  return { time, date };
};

/**
 * Live local time + date, updated every second. Returns `ready: false` on the
 * server / first paint so callers can render a stable placeholder and avoid a
 * hydration mismatch.
 */
export function useClock(): Clock {
  const [clock, setClock] = useState<{ time: string; date: string } | null>(
    null,
  );

  useEffect(() => {
    const update = () => setClock(format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return {
    time: clock?.time ?? "",
    date: clock?.date ?? "",
    ready: clock !== null,
  };
}
