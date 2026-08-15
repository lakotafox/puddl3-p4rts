#!/usr/bin/env bun
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { loadManifest, resolveAsset, HOME } from "../lib/manifest.ts";
import { search } from "../lib/search.ts";

/**
 * PUDDL3 Components MCP server — the vault over stdio.
 *
 * Everything is served from local disk (vault/ + manifest.json): no network,
 * no keys, works offline. Register in a client as:
 *   { "command": "bun", "args": ["run", "<repo>/src/mcp/server.ts"] }
 */

const server = new McpServer({ name: "puddl3-components", version: "1.0.0" });

const fmt = (a: any) =>
  `${a.id} — ${a.title}\n  ${a.description}\n  tags: ${a.tags.join(", ")} | variants: ${a.variants.map((v: any) => v.id).join(", ")}`;

server.tool(
  "search_components",
  "Fuzzy-search the component library (title, tags, description). Returns ids to use with get_component / get_source.",
  { query: z.string(), limit: z.number().optional() },
  async ({ query, limit }) => {
    const m = await loadManifest();
    const hits = search(m.assets, query, {}, limit ?? 12);
    return { content: [{ type: "text", text: hits.length ? hits.map(fmt).join("\n\n") : "no matches" }] };
  },
);

server.tool(
  "get_component",
  "Full details for one component: description, variants, dependencies, and the import line to use after installing.",
  { id: z.string().describe("id or slug, e.g. rb-free/component/letter-break or letter-break") },
  async ({ id }) => {
    const m = await loadManifest();
    const a = resolveAsset(m.assets, id);
    if (!a) return { content: [{ type: "text", text: `not found: ${id}` }], isError: true };
    const deps = a.dependencies.map((d: any) => d.name).join(" ") || "none";
    const text = [
      fmt(a),
      `default variant: ${a.defaultVariant}`,
      `npm deps: ${deps}`,
      `import: import ${a.exports[0]?.name ?? a.name} from "@/components/puddl3/${a.slug}";`,
    ].join("\n");
    return { content: [{ type: "text", text }] };
  },
);

server.tool(
  "get_source",
  "Raw source files for a component variant — paste-ready.",
  { id: z.string(), variant: z.string().optional().describe("e.g. ts-tw (default: the component's default variant)") },
  async ({ id, variant }) => {
    const m = await loadManifest();
    const a = resolveAsset(m.assets, id);
    if (!a) return { content: [{ type: "text", text: `not found: ${id}` }], isError: true };
    const v = a.variants.find((x: any) => x.id === (variant ?? a.defaultVariant)) ?? a.variants[0];
    if (!v) return { content: [{ type: "text", text: `no variants for ${id}` }], isError: true };
    const parts: string[] = [];
    for (const f of v.files) {
      const src = await readFile(join(HOME, f.path), "utf8");
      parts.push(`// ─── ${f.path.split("/").pop()} ───\n${src}`);
    }
    return { content: [{ type: "text", text: parts.join("\n\n") }] };
  },
);

await server.connect(new StdioServerTransport());
