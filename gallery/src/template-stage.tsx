import { Suspense, Component, lazy, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

/**
 * Template stage — one GetLayers template (PUDDL3-branded) mounted WHOLE from
 * the vault, in an isolated iframe: its real app/page.tsx, its real globals.css
 * compiled through tailwind (the wrappers in src/template-css add the @source
 * scan), its own Lenis scroll. Ported from the harvest sandbox, which learned
 * every lesson the hard way (see ~/puddl3-harvest/README.md).
 */

const params = new URLSearchParams(location.search);
const t = params.get("t") ?? "";

const globals = import.meta.glob("./template-css/*.css");
const gkey = Object.keys(globals).find((k) => k.endsWith(`/${t}.css`));
if (gkey) globals[gkey]!();

const pages = import.meta.glob("../../vault/getlayers/templates/*/files/src/app/page.tsx");
const homes = import.meta.glob("../../vault/getlayers/templates/*/files/src/views/{home.tsx,home/index.ts,home/index.tsx}");
const pkey =
  Object.keys(pages).find((k) => k.includes(`/templates/${t}/`)) ??
  Object.keys(homes).find((k) => k.includes(`/templates/${t}/`));
const loaders = { ...pages, ...homes };

class Boundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) { return { err }; }
  render() {
    if (this.state.err)
      return <pre style={{ padding: 24, color: "#f87171", whiteSpace: "pre-wrap", font: "12px ui-monospace" }}>{String(this.state.err)}</pre>;
    return this.props.children;
  }
}

const isComponent = (v: unknown) =>
  typeof v === "function" || (typeof v === "object" && v !== null && "$$typeof" in (v as any));

const Lazy = pkey
  ? lazy(async () => {
      const mod: any = await loaders[pkey]!();
      let C = mod.default ?? mod.HomeView;
      if (!isComponent(C)) C = Object.values(mod).find(isComponent);
      return { default: (C as any) ?? (() => <pre style={{ color: "#f87171", padding: 24 }}>no page export for {t}</pre>) };
    })
  : null;

createRoot(document.getElementById("root")!).render(
  Lazy ? (
    <Boundary>
      <Suspense fallback={<div style={{ padding: 24, color: "#71717a", font: "12px ui-monospace" }}>compiling…</div>}>
        <main><Lazy /></main>
      </Suspense>
    </Boundary>
  ) : (
    <pre style={{ padding: 24, color: "#f87171" }}>template not found: {t}</pre>
  ),
);
