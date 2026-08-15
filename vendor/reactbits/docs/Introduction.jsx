import useScrollToTop from '../hooks/useScrollToTop';
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
