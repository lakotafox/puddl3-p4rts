import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// react-bits' own app, vendored verbatim and rebranded to foxbits. Running their
// real App means the sidebar, category routes, search, Customize panels and prop
// tables are the genuine article rather than a lookalike.
import App from "@/App";
import { Provider } from "@/components/setup/provider";
import { initInputModeTracking } from "@/utils/inputMode";
import "./demo.css";

initInputModeTracking();

// Their main.jsx warms the syntax highlighter off-screen before first paint;
// without it the Code tab flashes unstyled the first time it opens.
createRoot(document.createElement("div")).render(
  <SyntaxHighlighter language="" children={""} />,
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
);
