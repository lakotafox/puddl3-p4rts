"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertTriangle, FileCode2, Play, X } from "lucide-react";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const focus =
  "focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]";

const transition =
  "transition-[background-color,border-color,color,opacity,transform] duration-150 ease-out";

type Tab = { id: string; name: string; dirty: boolean; code: string };

const FILES: Tab[] = [
  {
    id: "meter",
    name: "meter.ts",
    dirty: true,
    code: `import { ledger } from "./ledger";
import type { Event, Window } from "./types";

const WINDOW_MS = 10_000;

export function meter(events: Event[], window: Window) {
  const buckets = new Map<string, number>();

  for (const event of events) {
    if (event.ts < window.from) continue;
    if (event.ts >= window.to) break;

    const key = event.workspace;
    buckets.set(key, (buckets.get(key) ?? 0) + event.units);
  }

  return [...buckets].map(([workspace, units]) => ({
    workspace,
    units,
    window: WINDOW_MS,
  }));
}

export async function flush(window: Window) {
  const rows = meter(await ledger.since(window.from), window);
  await ledger.commit(rows);
  return rows.length;
}`,
  },
  {
    id: "ledger",
    name: "ledger.ts",
    dirty: false,
    code: `import { db } from "./db";

export const ledger = {
  async since(ts: number) {
    return db.events.where("ts").aboveOrEqual(ts).toArray();
  },

  async commit(rows: unknown[]) {
    return db.rollups.bulkPut(rows);
  },
};`,
  },
  {
    id: "types",
    name: "types.ts",
    dirty: false,
    code: `export type Event = {
  ts: number;
  workspace: string;
  units: number;
};

export type Window = {
  from: number;
  to: number;
};`,
  },
];

type Tok = { content: string; htmlStyle?: Record<string, string> };

const THEME_SCOPES: [string[], string, string, string?][] = [
  [
    ["comment", "punctuation.definition.comment"],
    "#a1a1aa",
    "#71717a",
    "italic",
  ],
  [
    ["string", "string.quoted", "constant.character.escape"],
    "#059669",
    "#6ee7b7",
  ],
  [
    ["constant.numeric", "constant.language", "constant.other"],
    "#d97706",
    "#fcd34d",
  ],
  [
    ["keyword", "keyword.control", "storage.type", "storage.modifier"],
    "#7c3aed",
    "#c4b5fd",
  ],
  [
    ["entity.name.function", "support.function", "meta.function-call"],
    "#2563eb",
    "#93c5fd",
  ],
  [
    ["entity.name.type", "support.type", "entity.name.class", "support.class"],
    "#0891b2",
    "#67e8f9",
  ],
  [["variable.parameter", "meta.definition.variable"], "#3f3f46", "#e4e4e7"],
  [["punctuation", "meta.brace"], "#71717a", "#a1a1aa"],
];

const buildTheme = (dark: boolean) => ({
  name: dark ? "app-ui-dark" : "app-ui-light",
  type: dark ? ("dark" as const) : ("light" as const),
  colors: {
    "editor.background": dark ? "#171717" : "#ffffff",
    "editor.foreground": dark ? "#d4d4d8" : "#3f3f46",
  },
  tokenColors: THEME_SCOPES.map(([scope, light, darkC, fontStyle]) => ({
    scope,
    settings: {
      foreground: dark ? darkC : light,
      ...(fontStyle ? { fontStyle } : {}),
    },
  })),
});

export default function Editor3() {
  const reduce = useReducedMotion();
  const [tabs, setTabs] = useState(FILES);
  const [active, setActive] = useState("meter");
  const [caret, setCaret] = useState(12);

  const file = tabs.find((t) => t.id === active) ?? tabs[0];
  const lines = useMemo(() => file.code.split("\n"), [file]);
  const [tokens, setTokens] = useState<Tok[][] | null>(null);
  const runId = useRef(0);

  useEffect(() => {
    const run = ++runId.current;
    setTokens(null);
    let cancelled = false;
    import("shiki")
      .then(({ codeToTokens }) =>
        codeToTokens(file.code, {
          lang: "typescript",
          themes: { light: buildTheme(false), dark: buildTheme(true) },
          defaultColor: false,
        }),
      )
      .then((res) => {
        if (!cancelled && run === runId.current)
          setTokens(res.tokens as Tok[][]);
      })
      .catch(() => {
        if (!cancelled && run === runId.current) setTokens(null);
      });
    return () => {
      cancelled = true;
    };
  }, [file.code]);

  const close = (id: string) => {
    setTabs((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (next.length === 0) return prev;
      if (id === active) setActive(next[0].id);
      return next;
    });
  };

  return (
    <div className="relative flex h-full min-h-[680px] w-full flex-col overflow-hidden bg-white dark:bg-neutral-950">
      <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-neutral-200 px-2 dark:border-neutral-800">
        <AnimatePresence initial={false}>
          {tabs.map((t) => {
            const on = t.id === active;
            return (
              <motion.div
                key={t.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={reduce ? undefined : { opacity: 0, width: 0 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="relative shrink-0"
              >
                <button
                  type="button"
                  onClick={() => setActive(t.id)}
                  aria-current={on ? "true" : undefined}
                  className={cx(
                    "inline-flex h-10 cursor-pointer items-center gap-2 px-3 pr-8 text-[13px]",
                    on
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
                    transition,
                    focus,
                  )}
                >
                  <FileCode2
                    className="h-3.5 w-3.5 text-neutral-400"
                    strokeWidth={1.75}
                  />
                  {t.name}
                  {t.dirty && (
                    <span
                      aria-label="Unsaved changes"
                      className="h-1.5 w-1.5 rounded-full bg-amber-500"
                    />
                  )}
                </button>
                <button
                  type="button"
                  aria-label={`Close ${t.name}`}
                  onClick={() => close(t.id)}
                  className={cx(
                    "absolute top-1/2 right-1.5 inline-flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-400",
                    "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white",
                    transition,
                    focus,
                  )}
                >
                  <X className="h-3 w-3" strokeWidth={2} />
                </button>
                {on && (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--rb-accent,oklch(20.5%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))]" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        <button
          type="button"
          className={cx(
            "ml-auto inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-[var(--rb-r-md,8px)] border border-neutral-200 bg-white px-2.5 text-[13px] text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300",
            "hover:bg-neutral-50 dark:hover:bg-neutral-900",
            transition,
            focus,
          )}
        >
          <Play className="h-3.5 w-3.5" strokeWidth={1.75} />
          Run
        </button>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="min-h-0 flex-1 overflow-auto">
          <div className="flex min-w-max font-mono text-[12.5px] leading-5">
            <div
              aria-hidden
              className="sticky left-0 z-10 shrink-0 border-r border-neutral-200 bg-white py-3 pr-3 pl-4 text-right text-neutral-300 tabular-nums select-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-700"
            >
              {lines.map((_, i) => (
                <div
                  key={i}
                  className={cx(
                    i + 1 === caret && "text-neutral-900 dark:text-white",
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="min-w-0 flex-1 py-3 text-neutral-600 dark:text-neutral-400">
              {lines.map((l, i) => {
                const row = tokens?.[i];
                return (
                  <div
                    key={i}
                    role="presentation"
                    onMouseEnter={() => setCaret(i + 1)}
                    className={cx(
                      "whitespace-pre pr-6 pl-4",
                      i + 1 === caret && "bg-neutral-50 dark:bg-neutral-900",
                    )}
                  >
                    {row && row.length > 0
                      ? row.map((t, j) => (
                          <span
                            key={j}
                            className="text-[var(--shiki-light)] dark:text-[var(--shiki-dark)]"
                            style={t.htmlStyle as React.CSSProperties}
                          >
                            {t.content}
                          </span>
                        ))
                      : l === ""
                        ? " "
                        : l}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="hidden w-[52px] shrink-0 border-l border-neutral-200 px-2 py-3 lg:block dark:border-neutral-800"
        >
          <div className="space-y-[3px]">
            {lines.map((l, i) => (
              <div
                key={i}
                className={cx(
                  "h-[2px] rounded-full",
                  i + 1 === caret
                    ? "bg-[var(--rb-accent,oklch(20.5%_0_0))] dark:bg-[var(--rb-accent,oklch(100%_0_0))]"
                    : "bg-neutral-200 dark:bg-neutral-800",
                )}
                style={{
                  width: `${Math.min(100, Math.max(6, (l.trim().length / 44) * 100))}%`,
                  marginLeft: `${Math.min(30, (l.length - l.trimStart().length) * 4)}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-t border-neutral-200 px-4 py-2 text-[12px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        <span className="tabular-nums">
          Ln {caret}, Col {lines[caret - 1]?.length ?? 0}
        </span>
        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>Spaces: 2</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-500">
          <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.75} />1 warning
        </span>
      </footer>
    </div>
  );
}
