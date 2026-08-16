import code from '@content/Animations/FocusPull/FocusPull.jsx?raw';
import tailwind from '@tailwind/Animations/FocusPull/FocusPull.jsx?raw';
import css from '@content/Animations/FocusPull/FocusPull.css?raw';
import tsCode from '@ts-default/Animations/FocusPull/FocusPull.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/FocusPull/FocusPull.tsx?raw';

export const focusPull = {
  dependencies: `mathjs`,
  usage: `// Component added by Ansh - github.com/ansh-dhanani

import GradualBlur from './GradualBlur';

<section style={{position: 'relative',height: 500,overflow: 'hidden'}}>
  <div style={{ height: '100%',overflowY: 'auto',padding: '6rem 2rem' }}>
    <!-- Content Here - such as an image or text -->
  </div>

  <GradualBlur
    target="parent"
    position="bottom"
    height="6rem"
    strength={2}
    divCount={5}
    curve="bezier"
    exponential={true}
    opacity={1}
  />
</section>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
