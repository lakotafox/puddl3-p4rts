import code from '@content/Backgrounds/NebulaDrift/NebulaDrift.jsx?raw';
import css from '@content/Backgrounds/NebulaDrift/NebulaDrift.css?raw';
import tailwind from '@tailwind/Backgrounds/NebulaDrift/NebulaDrift.jsx?raw';
import tsCode from '@ts-default/Backgrounds/NebulaDrift/NebulaDrift.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/NebulaDrift/NebulaDrift.tsx?raw';

export const nebulaDrift = {
  dependencies: `ogl`,
  usage: `import NebulaDrift from './NebulaDrift';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <NebulaDrift 
    color="#ff6b35"
    speed={0.6}
    direction="forward"
    scale={1.1}
    opacity={0.8}
    mouseInteractive={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
