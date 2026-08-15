export type SourceId = "rb-free" | "rb-starter" | "rb-pro" | "layers" | "local";

export type Kind =
  | "component" | "block" | "template" | "scene"
  | "background" | "section" | "skill" | "prompt" | "recipe";

export type ExportStyle = "default" | "named";

export type ExportRec = {
  name: string;
  style: ExportStyle;
  file: string;
  confidence: "parsed" | "guessed";
};

export type FileRec = {
  path: string;      // vault-relative
  bytes: number;
  sha256: string;
};

export type Variant = {
  id: string;              // "ts-tw" | "js-css" | "tw" | "css" | "default"
  lang: "ts" | "js" | null;
  styling: "tw" | "css" | null;
  upstreamName: string;    // exact key to refetch, e.g. "BlurText-TS-TW"
  path: string;            // vault-relative dir
  files: FileRec[];
  dependencies: Dep[];
  exports: ExportRec[];
  hash: string;
};

export type Dep = { name: string; range: string };

export type Requires = {
  tailwind: "v4" | "v3+" | null;
  client: boolean;
  webgl: boolean;
  sizedParent: boolean;
  providers: string[];
};

export type PreviewMode = "live" | "iframe" | "screenshot" | "code" | "link";

export type AssetRecord = {
  id: string;              // "rb-pro/block/hero-1" — canonical CLI arg
  source: SourceId;
  kind: Kind;
  slug: string;
  name: string;
  title: string;
  description: string;
  tags: string[];
  tagSource: "upstream" | "derived";
  category: string | null;
  keywords: string[];

  variants: Variant[];
  defaultVariant: string;

  dependencies: Dep[];     // union across variants
  registryDependencies: string[];
  exports: ExportRec[];    // from defaultVariant

  requires: Requires;
  paths: { root: string; raw: string | null; preview: string | null; demo: string | null };
  preview: { mode: PreviewMode; url?: string; note?: string };
  /** react-bits' own demo component, rendered by the gallery for an exact clone. */
  demo?: { name: string; path: string };
  license: { spdx: string; redistributable: boolean; note: string };
  upstream: { url: string; registry?: string; docs?: string };
  /** Pre-rename identity (stockroom rename, 2026-08-14) — the thread that lets
   *  sync match upstream and lets old names still resolve in the CLI. */
  upstreamSlug?: string;
  upstreamName?: string;

  hash: string;
  fetchedAt: string;
  vaultVersion: number;
};

export type Manifest = {
  schemaVersion: number;
  generatedAt: string;
  counts: Record<string, number>;
  assets: AssetRecord[];
};

export const VAULT_VERSION = 1;
export const SCHEMA_VERSION = 1;

/** Shape of a shadcn registry-item response (all three React Bits registries). */
export type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  tags?: string[];
  dependencies?: string[];
  registryDependencies?: string[];
  files?: { path: string; type?: string; content: string }[];
};
