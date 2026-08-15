"use client";

// 📖 Docs: obsidian/frontend/html-semantics.md

import type { FormEvent } from "react";

import { Spring } from "@/components/animation/springs/spring";
import { useIntro } from "@/hooks/intro/use-intro";
import type { HeroField } from "@/data/mocks/home";

export interface HeroFormProps {
  fields: HeroField[];
  submitLabel: string;
}

/**
 * The glass enquiry bar: two fields and a gradient submit pill inside a single
 * blurred, hairline-bordered capsule with a light catch along its bottom edge.
 *
 * Below `sm` the capsule becomes a stacked card — 553px of horizontal bar has
 * nowhere to go on a phone — and returns to the design's single row from `sm`.
 *
 * Labels are visually hidden rather than absent: the design shows placeholder
 * text only, but a field with no accessible name is unusable to a screen reader.
 *
 * Client leaf: it owns the submit handler. There is no backend yet, so submit is
 * intercepted and does nothing.
 */
export const HeroForm = ({ fields, submitLabel }: HeroFormProps) => {
  const isComplete = useIntro((state) => state.isComplete);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Spring
      tag="div"
      mode="once"
      enabled={isComplete}
      from={{ opacity: 0, y: 22, filter: "blur(8px)" }}
      to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      config={{ tension: 60, friction: 26 }}
      delayIn={760}
      className="flex w-full justify-center"
    >
    <form
      onSubmit={handleSubmit}
      className="flex w-138.25 max-w-full flex-col gap-3 rounded-button border border-on-media/30 bg-scrim/20 p-3 shadow-glass-inset backdrop-blur-glass transition-colors duration-[var(--duration-fast)] ease-entrance focus-within:border-on-media/60 sm:h-13.5 sm:flex-row sm:items-center sm:gap-8.5 sm:rounded-field sm:py-0.75 sm:pr-0.75 sm:pl-8.5"
    >
      {fields.map((field) => (
        <div key={field.name} className="w-full sm:w-37.5">
          <label htmlFor={field.name} className="sr-only">
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            placeholder={field.label}
            required
            className="w-full bg-transparent text-body leading-body text-on-media transition-colors duration-[var(--duration-fast)] ease-entrance placeholder:text-on-media focus-visible:outline-none focus:placeholder:text-on-media/50"
          />
        </div>
      ))}

      <button
        type="submit"
        className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-button border border-on-media/80 bg-[image:var(--action-gradient)] px-12 font-display text-lead leading-none text-action-foreground transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-media"
      >
        {submitLabel}
        <span
          aria-hidden="true"
          className="size-1 shrink-0 rounded-full bg-action-foreground"
        />
      </button>
      </form>
    </Spring>
  );
};
