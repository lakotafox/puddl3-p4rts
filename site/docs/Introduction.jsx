import { Link } from 'react-router-dom';
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
