import code from '@content/Backgrounds/Cosmos/Cosmos.jsx?raw';
import css from '@content/Backgrounds/Cosmos/Cosmos.css?raw';
import tailwind from '@tailwind/Backgrounds/Cosmos/Cosmos.jsx?raw';
import tsCode from '@ts-default/Backgrounds/Cosmos/Cosmos.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/Cosmos/Cosmos.tsx?raw';

export const cosmos = {
  dependencies: `ogl`,
  usage: `import Cosmos from './Cosmos';

// Basic usage
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Cosmos />
</div>

// With custom prop values
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Cosmos 
    mouseRepulsion={true}
    mouseInteraction={true}
    density={1.5}
    glowIntensity={0.5}
    saturation={0.8}
    hueShift={240}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
