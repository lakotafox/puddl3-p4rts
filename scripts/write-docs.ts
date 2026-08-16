#!/usr/bin/env bun
import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { HOME } from "../src/lib/vault.ts";

/**
 * Get Started docs, ours. Reworked 2026-08-16 (user: "over-complicating things
 * for vibe coders"): Introduction and Installation are ONE simple page that
 * leads with copy-paste (the Get button's Copy prompt / Copy source — the
 * thing we never mentioned), CLI second, and MCP as an OPTIONAL side page —
 * not a forced next step — that ends with a way back into the library.
 * Wholesale page writes + wiring patches, so a re-vendor is copy-the-tree,
 * re-run. Old /get-started/installation links land on the merged page.
 */

const DOCS = join(HOME, "vendor/reactbits/docs");
const VENDOR = join(HOME, "vendor/reactbits");

const intro = `import { Link } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';
import DocsButtonBar from './DocsButtonBar';
import CopyPageButton from './CopyPageButton';
import CodeBlock from './CodeBlock';

const Introduction = () => {
  useScrollToTop();
  return (
    <section className="docs-section">
      <div className="docs-page-header">
        <h1 className="docs-title">Introduction</h1>
        <CopyPageButton />
      </div>

      <p className="docs-lead">
        Hey — this is PUDDL3 P4RTS. Free animated components for PUDDLE projects. No accounts, no keys, nothing to
        install.
      </p>

      <h2 className="docs-section-title">Grab a part</h2>
      <p className="docs-paragraph">
        Open any component and hit <span className="docs-highlight">Get</span> (on desktop it&apos;s the{' '}
        <span className="docs-highlight">Copy for AI</span> menu):
      </p>
      <ul className="docs-list">
        <li className="docs-list-item">
          <span className="docs-highlight">Copy prompt</span> — paste it into Claude, Cursor, or ChatGPT and your AI
          wires the component into your project for you. Easiest way, start here.
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">Copy component source</span> — paste the code in yourself. The Code tab has
          all four variants (JS/TS × CSS/Tailwind).
        </li>
      </ul>

      <h2 className="docs-section-title">On the team?</h2>
      <p className="docs-paragraph">
        The library repo is private. With it checked out, the CLI drops a component straight in, installs its deps,
        and prints the import line:
      </p>
      <CodeBlock language="bash">{'p4rts add letter-break --to ./my-app'}</CodeBlock>

      <p className="docs-paragraph dim">
        Same deal for the <Link className="docs-link" to="/get-started/mcp">MCP server</Link>, which wires your AI
        into the whole library. Both are extras — copy and paste above works for everyone, no repo needed.
      </p>

      <DocsButtonBar next={{ label: 'Browse the library', route: '/library' }} />
    </section>
  );
};

export default Introduction;
`;

const mcp = `import useScrollToTop from '../hooks/useScrollToTop';
import DocsButtonBar from './DocsButtonBar';
import CopyPageButton from './CopyPageButton';
import CodeBlock from './CodeBlock';

const McpServer = () => {
  useScrollToTop();
  return (
    <section className="docs-section">
      <div className="docs-page-header">
        <h1 className="docs-title">MCP</h1>
        <CopyPageButton />
      </div>

      <p className="docs-lead">
        Optional — only if you want your AI wired straight into the library. Everything is served from local disk: no
        network, no keys.
      </p>

      <h2 className="docs-section-title">Setup</h2>
      <p className="docs-paragraph">Add this to your client&apos;s MCP config (Claude Code, Cursor, etc.):</p>
      <CodeBlock language="json">
        {JSON.stringify(
          { mcpServers: { 'puddl3-components': { command: 'bun', args: ['run', '<path-to-library>/src/mcp/server.ts'] } } },
          null,
          2,
        )}
      </CodeBlock>

      <h2 className="docs-section-title">Tools</h2>
      <ul className="docs-list">
        <li className="docs-list-item">
          <span className="docs-highlight">search_components</span> — fuzzy search by name, tag, or description
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">get_component</span> — details, deps, and the import line
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">get_source</span> — paste-ready source for any variant
        </li>
      </ul>

      <p className="docs-paragraph dim">
        Then just ask: &quot;find me a text scramble effect and add it to my hero&quot;.
      </p>

      <DocsButtonBar
        previous={{ label: 'Introduction', route: '/get-started/introduction' }}
        next={{ label: 'Browse the library', route: '/library' }}
      />
    </section>
  );
};

export default McpServer;
`;

await writeFile(join(DOCS, "Introduction.jsx"), intro, "utf8");
await writeFile(join(DOCS, "McpServer.jsx"), mcp, "utf8");

// wiring: Get Started = Introduction, MCP; old installation links → merged page
const catPath = join(VENDOR, "constants/Categories.js");
let cat = await readFile(catPath, "utf8");
cat = cat.replace(
  "subcategories: ['Introduction', 'Installation', 'MCP']",
  "subcategories: ['Introduction', 'MCP']",
);
await writeFile(catPath, cat, "utf8");

const compPath = join(VENDOR, "constants/Components.js");
let comp = await readFile(compPath, "utf8");
comp = comp.replace(
  "installation: () => import('../docs/Installation.jsx'),",
  "installation: () => import('../docs/Introduction.jsx'), // merged (write-docs.ts)",
);
await writeFile(compPath, comp, "utf8");

console.log("✓ docs rewritten: Introduction (merged, copy-paste first), MCP (optional, with exit)");
