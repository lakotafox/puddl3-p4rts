import { StrictMode, Suspense, Component, lazy, useEffect, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./preview.css";

/**
 * Isolated preview surface, rendered inside an iframe by the gallery.
 *
 * The iframe is not decoration: browsers cap live WebGL contexts around 16 and
 * ~180 vault components use ogl/three, many components are full-bleed (cursors,
 * fixed backgrounds) and would hijack the gallery chrome, and a component that
 * throws in an effect would otherwise take down the whole app.
 */

// Vite compiles vault source on demand — lazy, so only the previewed file builds.
// The glob is relative because the vault sits outside Vite's project root.
const all = {
  ...import.meta.glob("../../vault/**/variants/**/*.{tsx,jsx}"),
  ...import.meta.glob("../../vault/**/files/*.{tsx,jsx}"),
};

// Preview-only overrides: same filename as the vault component, preferred when
// present. Lets previews carry small behavioral tweaks (user-cursor holding its
// idle direction) and personalized demo content while the vault — what
// `foxbits add` actually ships — stays byte-identical to upstream.
const overrides = import.meta.glob("../overrides/*.{tsx,jsx}");

const params = new URLSearchParams(location.search);
const want = (params.get("path") ?? "").replace(/^\/+/, "");
const exportName = params.get("export") ?? "";
// "fill" for full-bleed backgrounds/WebGL, "center" for text and UI bits.
const fit = params.get("fit") ?? "center";

function post(status: string, detail?: string) {
  parent.postMessage({ type: "foxbits:preview", status, detail, path: want }, "*");
}

class Boundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error) { post("error", error.message); }
  render() {
    if (this.state.error)
      return (
        <pre style={{ padding: 16, font: "12px ui-monospace, monospace", color: "#f87171", whiteSpace: "pre-wrap" }}>
          {this.state.error.message}
        </pre>
      );
    return this.props.children;
  }
}

const base = want.split("/").pop() ?? "";
const overrideKey = Object.keys(overrides).find((k) => k.endsWith(`/${base}`));
const key = overrideKey ?? Object.keys(all).find((k) => k.endsWith(want));
const loaders = overrideKey ? overrides : all;

// Created once at module scope, never inside render: a lazy() built during
// render is a new component every pass, so it re-suspends forever and the
// fallback never clears.
const Lazy = key
  ? lazy(async () => {
      const mod: any = await loaders[key]!();
      const Cmp = mod.default ?? mod[exportName] ?? Object.values(mod).find((v) => typeof v === "function");
      if (!Cmp) throw new Error(`no component export in ${key}`);
      post("ok");
      return { default: Cmp as any };
    })
  : null;

/** Overlay that mirrors reactbits' "Demo Content" toggle, so backgrounds are
 *  judged the way they'll actually be used — behind real page furniture. */
function DemoContent() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 24, pointerEvents: "none", padding: 24 }}>
      <div style={{ position: "absolute", top: 24, left: 24, right: 24, display: "flex",
                    alignItems: "center", justifyContent: "space-between", padding: "12px 20px",
                    borderRadius: 999, background: "rgba(255,255,255,.08)",
                    backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.12)" }}>
        <strong style={{ fontSize: 15 }}>PUDDL3 P4RTS</strong>
        <span style={{ display: "flex", gap: 20, alignItems: "center", fontSize: 14, opacity: .8 }}>
          Features About
          <span style={{ background: "#fff", color: "#000", padding: "7px 16px", borderRadius: 999, fontWeight: 600 }}>
            Sign up
          </span>
        </span>
      </div>
      <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, textAlign: "center",
                   lineHeight: 1.15, margin: 0, textShadow: "0 2px 24px rgba(0,0,0,.5)" }}>
        Bring the Arctic to you,<br />with one line of code
      </h1>
      <div style={{ display: "flex", gap: 12 }}>
        <span style={{ background: "#fff", color: "#000", padding: "12px 26px", borderRadius: 12, fontWeight: 600 }}>Get started</span>
        <span style={{ background: "rgba(255,255,255,.1)", padding: "12px 26px", borderRadius: 12,
                       border: "1px solid rgba(255,255,255,.15)" }}>Learn more</span>
      </div>
    </div>
  );
}

/** JSON-safe rich children: components like Shader Card expect a title +
 *  description + button as children (their showcase supplies JSX we cannot
 *  serialize). Schemas send a spec via __cardContent instead. */
function CardContent({ spec }: { spec: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 24, maxWidth: 340 }}>
      {spec.title && (
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em" }}>{spec.title}</div>
      )}
      {spec.description && (
        <div style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.5 }}>{spec.description}</div>
      )}
      {Array.isArray(spec.bullets) && (
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, opacity: 0.8, display: "grid", gap: 4 }}>
          {spec.bullets.map((b: string) => <li key={b}>{b}</li>)}
        </ul>
      )}
      {spec.button && (
        <span style={{ alignSelf: "flex-start", marginTop: 6, padding: "8px 18px", borderRadius: 999,
                       background: "rgba(255,255,255,.92)", color: "#111", fontSize: 13, fontWeight: 600 }}>
          {spec.button}
        </span>
      )}
    </div>
  );
}

function Stage() {
  const [props, setProps] = useState<Record<string, unknown>>(() => {
    try { return JSON.parse(params.get("props") ?? "{}"); } catch { return {}; }
  });
  const [demo, setDemo] = useState(params.get("demo") === "1");

  // Timed demo script: some components only animate on a prop transition
  // (Preloader's stairs exit plays when `loading` flips false, like a real app
  // finishing a fetch). __sequence lists timed patches; the toolbar's replay
  // button remounts the iframe, replaying the sequence.
  useEffect(() => {
    let seq: any;
    try { seq = JSON.parse(params.get("props") ?? "{}").__sequence; } catch { /* no-op */ }
    if (!Array.isArray(seq)) return;
    const timers = seq.map((step: any) =>
      setTimeout(() => setProps(prev => ({ ...prev, ...(step.set || {}) })), step.after ?? 1000));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Props arrive by message, not by URL, so tweaking a slider re-renders the
  // component instead of reloading the iframe (which would restart WebGL).
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === "foxbits:props") setProps(e.data.props ?? {});
      if (e.data?.type === "foxbits:demo") setDemo(!!e.data.on);
    };
    addEventListener("message", onMsg);
    return () => removeEventListener("message", onMsg);
  }, []);

  // Pointer-driven components get a play area with the same affordance the Pro
  // site shows; the hint fades out on the first real mouse move.
  // (Declared before the early return — hooks must run unconditionally.)
  const [hintGone, setHintGone] = useState(false);

  if (!Lazy) {
    post("error", `not found: ${want}`);
    return <pre style={{ padding: 16, color: "#f87171" }}>not found: {want}</pre>;
  }

  // __cardContent is a template spec, not a component prop — swap it for
  // real children before mounting.
  const { __cardContent, __sequence, ...rest } = props as any;
  const mountProps = __cardContent ? { ...rest, children: <CardContent spec={__cardContent} /> } : rest;

  const inner =
    fit === "fill" ? (
      <div style={{ width: "100%", height: "100%", overflow: "auto" }}><Lazy {...mountProps} /></div>
    ) : fit === "cursor" ? (
      <div
        style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}
        onMouseMove={() => !hintGone && setHintGone(true)}
      >
        <Lazy {...mountProps} />
        <div
          style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", pointerEvents: "none",
            opacity: hintGone ? 0 : 1, transition: "opacity .6s",
            color: "rgba(255,255,255,.35)", fontSize: 13, letterSpacing: "0.35em",
            textTransform: "uppercase", fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          Move your cursor here
        </div>
      </div>
    ) : fit === "scroll" ? (
      // Scroll-linked components need scroll room inside the frame. The
      // data-scroll-container attribute matters: GSAP ScrollTrigger components
      // (3d-text-reveal et al) use closest("[data-scroll-container]") as their
      // scroller — without it they bind to the window, which never scrolls
      // here, so wheeling over the stage did nothing and the effect stayed
      // frozen at scroll zero. Component sits at the TOP of a tall track (it
      // pins itself); centering it would put the pin start out of reach.
      <div
        data-scroll-container
        style={{ width: "100%", height: "100%", overflowY: "auto", position: "relative" }}
        onScroll={() => !hintGone && setHintGone(true)}
      >
        <div style={{ minHeight: "420%" }}>
          <Lazy {...mountProps} />
        </div>
        {/* Same affordance the Pro site's scroll demos show at idle. */}
        <div
          style={{
            position: "sticky", bottom: 24, left: 0, right: 0, marginTop: "-64px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            pointerEvents: "none", opacity: hintGone ? 0 : 1, transition: "opacity .5s",
            color: "rgba(255,255,255,.45)", fontSize: 13,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          <span>Scroll Down</span>
          <span aria-hidden>↓</span>
        </div>
      </div>
    ) : (
      <div style={{ width: "100%", height: "100%", display: "flex",
                    alignItems: "center", justifyContent: "center", overflow: "auto" }}>
        <Lazy {...mountProps} />
      </div>
    );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {inner}
      {demo && <DemoContent />}
    </div>
  );
}

// A component that never mounts is a silent blank; surface it as a timeout.
setTimeout(() => post("timeout"), 5000);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Boundary>
      <Suspense fallback={<div style={{ padding: 16, color: "#71717a", font: "12px ui-monospace" }}>compiling…</div>}>
        <Stage />
      </Suspense>
    </Boundary>
  </StrictMode>,
);
