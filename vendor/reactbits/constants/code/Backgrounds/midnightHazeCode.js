import code from '@content/Backgrounds/MidnightHaze/MidnightHaze.jsx?raw';
import css from '@content/Backgrounds/MidnightHaze/MidnightHaze.css?raw';
import tailwind from '@tailwind/Backgrounds/MidnightHaze/MidnightHaze.jsx?raw';
import tsCode from '@ts-default/Backgrounds/MidnightHaze/MidnightHaze.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/MidnightHaze/MidnightHaze.tsx?raw';

export const midnightHaze = {
  dependencies: `ogl`,
  usage: `import MidnightHaze from './MidnightHaze';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <MidnightHaze />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
