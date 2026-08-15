"use client";

import { ArrowRight, Waves } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { Water } from "@paper-design/shaders-react";

function useIsDark() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const read = () => {
      const classes = document.documentElement.classList;
      if (classes.contains("dark")) return true;
      if (classes.contains("light")) return false;
      return query.matches;
    };
    const update = () => setIsDark(read());
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    query.addEventListener("change", update);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
    };
  }, []);

  return isDark;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const headline: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const stage: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero23() {
  const isDark = useIsDark();
  const reduceMotion = useReducedMotion();
  const water = isDark
    ? { colorBack: "#0e2a5e", colorHighlight: "#6fb8ff" }
    : { colorBack: "#1f5fd0", colorHighlight: "#bfeeff" };

  return (
    <section className="relative flex min-h-screen w-full items-start overflow-hidden bg-white px-4 py-16 dark:bg-neutral-950 sm:px-6 sm:py-20 lg:items-center lg:px-8">
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
          >
            <Waves className="h-3.5 w-3.5 text-sky-500 dark:text-sky-300" />
            Fluid, in real time
          </motion.div>

          <motion.h1
            variants={headline}
            className="mt-7 max-w-3xl text-4xl font-medium leading-[1.03] tracking-[-0.04em] text-neutral-950 dark:text-white sm:text-6xl md:text-7xl"
          >
            Motion that feels
            <br />
            <span className="text-neutral-500 dark:text-neutral-400">
              like water.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg"
          >
            Tide is a rendering engine for interfaces that breathe. Ship living
            surfaces that respond to every scroll, hover, and gesture: at sixty
            frames a second.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <button className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 dark:focus-visible:ring-offset-neutral-950 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base">
              Explore the engine
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors duration-200 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-neutral-950 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base">
              Watch the reel
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stage}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-14 w-full sm:mt-16"
        >
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[24px] border border-neutral-200 bg-neutral-100 shadow-2xl shadow-neutral-950/10 dark:border-white/10 dark:bg-neutral-900 dark:shadow-black/50 sm:aspect-[16/8] lg:aspect-[16/6.5] sm:rounded-[28px]">
            <Water
              key={isDark ? "dark" : "light"}
              className="absolute inset-0 h-full w-full"
              style={{ width: "100%", height: "100%" }}
              colorBack={water.colorBack}
              colorHighlight={water.colorHighlight}
              highlights={0.5}
              layering={0.55}
              edges={0.5}
              caustic={0.45}
              waves={0.5}
              size={0.7}
              fit="cover"
              scale={1.2}
              speed={reduceMotion ? 0 : 0.42}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.28),rgba(255,255,255,0)_60%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.12),rgba(255,255,255,0)_60%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,10,30,0.5),rgba(4,10,30,0)_42%),linear-gradient(to_bottom,rgba(4,10,30,0.32),rgba(4,10,30,0)_30%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/25 dark:ring-white/10 sm:rounded-[28px]"
            />

            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:left-6 sm:top-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Live render
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                  Frame rate
                </span>
                <span className="mt-0.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  60 fps
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                GPU-accelerated · WebGL
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero23;
