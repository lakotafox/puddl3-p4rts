import useScrollToTop from '../hooks/useScrollToTop';
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
