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
  const [on, setOn] = useState(() => localStorage.getItem(SNOW_KEY) !== "off");
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
        title={on ? "Turn snow off" : "Turn snow on"}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 18px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,.18)",
          background: "rgba(18,15,23,.82)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.08em",
          cursor: "pointer",
          opacity: on ? 1 : 0.65,
        }}
      >
        <span aria-hidden="true" style={{ fontSize: 15 }}>❄</span>
        SNOW {on ? "ON" : "OFF"}
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
