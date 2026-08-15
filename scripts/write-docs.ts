#!/usr/bin/env bun
import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { HOME } from "../src/lib/vault.ts";

/**
 * Get Started docs, ours (user, 2026-08-15): short intro in the PUDDLE voice,
 * and Installation/MCP that document how THIS library actually works — the
 * site's copy buttons, the foxbits CLI, and the local MCP server
 * (src/mcp/server.ts) — not upstream's registry. Wholesale page writes, so a
 * re-vendor is copy-the-tree, re-run.
 */

const DOCS = join(HOME, "vendor/reactbits/docs");

const intro = `import useScrollToTop from '../hooks/useScrollToTop';
import DocsButtonBar from './DocsButtonBar';
import CopyPageButton from './CopyPageButton';

const Introduction = () => {
  useScrollToTop();
  return (
    <section className="docs-section">
      <div className="docs-page-header">
        <h1 className="docs-title">Introduction</h1>
        <CopyPageButton />
      </div>

      <p className="docs-lead">
        Hey — this is PUDDL3 P4RTS. Free components for PUDDLE projects: easy to use, fun to play with.
      </p>
      <p className="docs-paragraph">
        Pick a component, tweak the knobs, copy the code. That&apos;s the whole tutorial.
      </p>

      <DocsButtonBar next={{ label: 'Installation', route: '/get-started/installation' }} />
    </section>
  );
};

export default Introduction;
`;

const install = `import useScrollToTop from '../hooks/useScrollToTop';
import DocsButtonBar from './DocsButtonBar';
import CopyPageButton from './CopyPageButton';
import CodeBlock from './CodeBlock';

const Installation = () => {
  useScrollToTop();
  return (
    <section className="docs-section">
      <div className="docs-page-header">
        <h1 className="docs-title">Installation</h1>
        <CopyPageButton />
      </div>

      <p className="docs-lead">Three ways in, easiest first.</p>

      <h2 className="docs-section-title">1. Copy the code</h2>
      <p className="docs-paragraph">
        Every component page has a Code tab with four variants (JS/TS × CSS/Tailwind). Copy the file into your
        project, install the deps it lists, done. This always works — no accounts, no registries.
      </p>

      <h2 className="docs-section-title">2. The CLI</h2>
      <p className="docs-paragraph">
        On machines with the library checked out, <code>p4rts add</code> drops a component straight into your
        project, installs its deps, and prints the import line:
      </p>
      <CodeBlock language="bash">{'p4rts add letter-break --to ./my-app'}</CodeBlock>

      <h2 className="docs-section-title">3. Ask your AI</h2>
      <p className="docs-paragraph">
        Wire up the MCP server (next page) and your assistant can search the library and paste components in for
        you.
      </p>

      <DocsButtonBar
        previous={{ label: 'Introduction', route: '/get-started/introduction' }}
        next={{ label: 'MCP', route: '/get-started/mcp' }}
      />
    </section>
  );
};

export default Installation;
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
        The library ships its own MCP server — everything served from local disk, no network, no keys.
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

      <DocsButtonBar previous={{ label: 'Installation', route: '/get-started/installation' }} />
    </section>
  );
};

export default McpServer;
`;

await writeFile(join(DOCS, "Introduction.jsx"), intro, "utf8");
await writeFile(join(DOCS, "Installation.jsx"), install, "utf8");
await writeFile(join(DOCS, "McpServer.jsx"), mcp, "utf8");
console.log("✓ docs rewritten: Introduction (short), Installation (ours), MCP (real server)");
