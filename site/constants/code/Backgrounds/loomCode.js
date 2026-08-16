import code from '@content/Backgrounds/Loom/Loom.jsx?raw';
import css from '@content/Backgrounds/Loom/Loom.css?raw';
import tailwind from '@tailwind/Backgrounds/Loom/Loom.jsx?raw';
import tsCode from '@ts-default/Backgrounds/Loom/Loom.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/Loom/Loom.tsx?raw';

export const loom = {
  dependencies: `ogl`,
  usage: `import Loom from './Loom';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Loom
    amplitude={1}
    distance={0}
    enableMouseInteraction={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
