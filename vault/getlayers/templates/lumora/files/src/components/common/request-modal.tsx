"use client";

import { useEffect, useState } from "react";
import { animated, useTransition } from "@react-spring/web";
import { PillButton } from "@/components/ui/pill-button";
import { XIcon } from "@/components/ui/icons";
import { LogoMark } from "@/components/ui/logo-mark";
import { useRequestModal } from "@/hooks/ui-store";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { apiFetch } from "@/lib/api-client";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY = { name: "", email: "", message: "" };

/**
 * "Start streaming" request modal. Opens from any CTA via `useRequestModal`,
 * blurs the whole site behind a backdrop, and posts the lead to `/api/contact`.
 */
export const RequestModal = () => {
  const open = useRequestModal((state) => state.open);
  const closeModal = useRequestModal((state) => state.closeModal);
  const stopScroll = useScroll((state) => state.stop);
  const startScroll = useScroll((state) => state.start);

  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    stopScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      startScroll();
    };
  }, [open, closeModal, stopScroll, startScroll]);

  // Reset the form a moment after the modal closes (so it doesn't flicker mid-exit).
  useEffect(() => {
    if (open) return;
    const id = setTimeout(() => {
      setForm(EMPTY);
      setStatus("idle");
      setError(null);
    }, 300);
    return () => clearTimeout(id);
  }, [open]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);
    try {
      await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    }
  };

  const transitions = useTransition(open, {
    from: { opacity: 0, y: 28 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 18 },
    config: { tension: 260, friction: 30 },
  });

  return transitions((style, item) =>
    item ? (
      <animated.div
        style={{ opacity: style.opacity }}
        className="fixed inset-0 z-[110] flex items-end justify-center bg-foreground/30 p-4 backdrop-blur-xl sm:items-center"
        onClick={closeModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-modal-title"
      >
        <animated.div
          onClick={(event) => event.stopPropagation()}
          style={{
            opacity: style.opacity,
            transform: style.y.to((y) => `translateY(${y}px)`),
          }}
          className="relative w-full max-w-lg overflow-hidden rounded-card bg-background p-6 shadow-2xl ring-1 ring-line sm:p-8"
        >
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-pill bg-surface text-foreground/60 transition hover:bg-surface-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <XIcon className="text-sm" />
          </button>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <span className="grid size-14 place-items-center rounded-pill bg-ink text-2xl text-accent-from">
                <LogoMark />
              </span>
              <h2
                id="request-modal-title"
                className="text-2xl font-semibold tracking-tight"
              >
                Request received
              </h2>
              <p className="max-w-[32ch] text-sm text-foreground/60">
                Thanks for reaching out — a real human will get back to you
                within the day.
              </p>
              <PillButton label="Close" onClick={closeModal} variant="dark" />
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60">
                  <span className="size-1.5 rounded-pill bg-accent" />
                  Start streaming
                </span>
                <h2
                  id="request-modal-title"
                  className="text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  Tell us where you work.
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Field label="Name">
                  <input
                    required
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full rounded-control border border-line bg-surface/50 px-4 py-3 text-sm outline-none transition focus:border-foreground/30 focus:bg-background"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full rounded-control border border-line bg-surface/50 px-4 py-3 text-sm outline-none transition focus:border-foreground/30 focus:bg-background"
                    placeholder="you@company.com"
                  />
                </Field>
                <Field label="Message">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full resize-none rounded-control border border-line bg-surface/50 px-4 py-3 text-sm outline-none transition focus:border-foreground/30 focus:bg-background"
                    placeholder="A few words about your team, headcount, and payroll setup."
                  />
                </Field>

                {error ? (
                  <p className="text-sm text-accent" role="alert">
                    {error}
                  </p>
                ) : null}

                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-xs text-foreground/45">
                    We reply fast: hello@puddl3.xyz
                  </p>
                  <PillButton
                    label={status === "submitting" ? "Sending…" : "Send request"}
                    type="submit"
                    variant="dark"
                    withArrow
                    arrow="up-right"
                  />
                </div>
              </form>
            </>
          )}
        </animated.div>
      </animated.div>
    ) : null,
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
      {label}
    </span>
    {children}
  </label>
);
