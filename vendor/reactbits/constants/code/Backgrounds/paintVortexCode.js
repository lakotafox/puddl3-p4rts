import code from '@content/Backgrounds/PaintVortex/PaintVortex.jsx?raw';
import css from '@content/Backgrounds/PaintVortex/PaintVortex.css?raw';
import tailwind from '@tailwind/Backgrounds/PaintVortex/PaintVortex.jsx?raw';
import tsCode from '@ts-default/Backgrounds/PaintVortex/PaintVortex.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/PaintVortex/PaintVortex.tsx?raw';

export const paintVortex = {
  dependencies: `ogl`,
  usage: `import PaintVortex from './PaintVortex';
  
<PaintVortex
  isRotate={false}
  mouseInteraction={true}
  pixelFilter={700}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
