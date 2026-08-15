import { StrictMode, Suspense, Component, lazy, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router/v6";

// react-bits' own providers, vendored verbatim — reusing them (rather than
// approximating each one as its absence surfaces) is what makes this an exact
// clone instead of a lookalike.
import { Provider as ChakraSetup } from "@/components/setup/provider";
import Providers from "@/components/layout/Providers";
import { ActiveRouteProvider } from "@/components/context/ActiveRouteContext/ActiveRouteContext";
import { initInputModeTracking } from "@/utils/inputMode";
import ProDemo from "@/demo/Pro/ProDemo";
import { PRO_INDEX } from "@/constants/ProCatalog";
import "./demo.css";

/**
 * Renders react-bits' OWN demo component for a given asset.
 *
 * The vendored demo files already encode everything reactbits.dev shows — the
 * 500px stage, default props, Customize controls, the prop table, the
 * dependency list — so mounting them directly is an exact clone. Regex-parsing
 * props out of the demo JSX (the earlier approach) rebuilt all that by hand and
 * got it subtly wrong.
 */

initInputModeTracking();

const demos = import.meta.glob("../../vendor/reactbits/demo/**/*Demo.jsx");

const params = new URLSearchParams(location.search);
const want = params.get("demo") ?? "";

function post(status: string, detail?: string) {
  parent.postMessage({ type: "foxbits:preview", status, detail, demo: want }, "*");
}

class Boundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(e: Error) { post("error", e.message); }
  render() {
    if (this.state.error)
      return <pre style={{ padding: 16, font: "12px ui-monospace", color: "#f87171", whiteSpace: "pre-wrap" }}>
        {this.state.error.message}
      </pre>;
    return this.props.children;
  }
}

const key = Object.keys(demos).find((k) => k.endsWith(`/${want}Demo.jsx`));

// Module scope, never inside render — a lazy() built during render re-suspends
// on every pass and the fallback never clears.
const Lazy = key
  ? lazy(async () => {
      const mod: any = await demos[key]!();
      post("ok");
      return { default: mod.default };
    })
  : null;

const isPro = want in (PRO_INDEX as Record<string, unknown>);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraSetup>
      <MemoryRouter initialEntries={[isPro ? `/pro/${want}` : "/"]}>
        <NuqsAdapter>
          <ActiveRouteProvider>
            <Providers>
              <Boundary>
                <Suspense fallback={<div style={{ padding: 16, color: "#71717a", font: "12px ui-monospace" }}>compiling…</div>}>
                  {isPro ? (
                    <Routes>
                      <Route path="/pro/:subcategory" element={<ProDemo />} />
                    </Routes>
                  ) : Lazy ? (
                    <Lazy />
                  ) : (
                    <pre style={{ padding: 16, color: "#f87171" }}>no demo for {want}</pre>
                  )}
                </Suspense>
              </Boundary>
            </Providers>
          </ActiveRouteProvider>
        </NuqsAdapter>
      </MemoryRouter>
    </ChakraSetup>
  </StrictMode>,
);
