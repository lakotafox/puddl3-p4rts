import useScrollToTop from '../hooks/useScrollToTop';
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
