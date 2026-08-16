import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// react-bits' own app, vendored verbatim and rebranded to PUDDL3 P4RTS. Running their
// real App means the sidebar, category routes, search, Customize panels and prop
// tables are the genuine article rather than a lookalike.
import App from "@/App";
import RetroFlurry from "@/content/Backgrounds/RetroFlurry/RetroFlurry";
import { Provider } from "@/components/setup/provider";
import { initInputModeTracking } from "@/utils/inputMode";
import "./demo.css";

// Site-wide pixel snow (user, 2026-08-15): fixed at z -1 behind every page,
// carrying the base page color itself — demo.css makes .app-container
// transparent so it shows through, while demo stages stay opaque. The SNOW
// pill (bottom-right, every page) turns it off; the choice persists.
const SNOW_KEY = "p4rts-snow";

const SiteFlurry = () => {
  const [on, setOn] = useState(() => {
    const stored = localStorage.getItem(SNOW_KEY);
    if (stored) return stored !== "off";
    // no stored choice: respect reduced-motion (full-viewport shader otherwise)
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const toggle = () =>
    setOn((v) => {
      localStorage.setItem(SNOW_KEY, v ? "off" : "on");
      return !v;
    });
  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", background: "#120f17" }}
      >
        {on && (
          <RetroFlurry
            color="#ffffff"
            flakeSize={0.01}
            minFlakeSize={1.25}
            pixelResolution={200}
            speed={1.25}
            density={0.3}
            direction={125}
            brightness={1}
          />
        )}
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        className="snow-toggle"
        title={on ? "Turn snow off" : "Turn snow on"}
      >
        <span aria-hidden="true" className="snow-toggle__flake">❄</span>
        <span className="snow-toggle__label">SNOW {on ? "ON" : "OFF"}</span>
      </button>
    </>
  );
};

initInputModeTracking();

// Their main.jsx warms the syntax highlighter off-screen before first paint;
// without it the Code tab flashes unstyled the first time it opens.
createRoot(document.createElement("div")).render(
  <SyntaxHighlighter language="" children={""} />,
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <SiteFlurry />
      <App />
    </Provider>
  </StrictMode>,
);
