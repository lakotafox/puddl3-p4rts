import { StrictMode } from "react";
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
// transparent so it shows through, while demo stages stay opaque.
const SiteFlurry = () => (
  <div
    aria-hidden="true"
    style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", background: "#120f17" }}
  >
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
  </div>
);

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
