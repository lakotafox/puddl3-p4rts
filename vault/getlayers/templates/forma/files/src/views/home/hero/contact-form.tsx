"use client";

import type { FormEvent } from "react";

import { SubmitArrowButton } from "@/components/ui/submit-arrow-button";

import { IntroReveal } from "./intro-reveal";

export interface ContactFormProps {
  /** Delay (ms) before the first field reveals. */
  delay?: number;
  className?: string;
}

interface FieldProps {
  id: string;
  name: string;
  type: "text" | "email";
  label: string;
  autoComplete: string;
}

const Field = ({ id, name, type, label, autoComplete }: FieldProps) => (
  <div className="flex w-full items-center border-b border-border-field pb-[1.25rem]">
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      placeholder={label}
      className="w-full bg-transparent text-body leading-copy text-foreground outline-none placeholder:text-foreground"
    />
  </div>
);

/**
 * Name + email capture with an icon-only submit. Figma node 706:337.
 *
 * Submission is intentionally inert: `/api/contact` expects a `message` field
 * this two-input design does not collect, so wiring it up needs a product
 * decision rather than a guess.
 */
export const ContactForm = ({
  delay = 0,
  className = "",
}: ContactFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Start streaming your pay"
      className={`flex flex-col items-stretch gap-[1rem] sm:flex-row sm:items-end sm:gap-[0.75rem] ${className}`}
    >
      <IntroReveal className="min-w-0 sm:flex-1" delay={delay} distance={20}>
        <Field
          id="contact-name"
          name="name"
          type="text"
          label="Name"
          autoComplete="name"
        />
      </IntroReveal>
      <IntroReveal
        className="min-w-0 sm:flex-1"
        delay={delay + 90}
        distance={20}
      >
        <Field
          id="contact-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
        />
      </IntroReveal>
      <IntroReveal delay={delay + 180} distance={20}>
        <SubmitArrowButton label="Request early access" />
      </IntroReveal>
    </form>
  );
};
