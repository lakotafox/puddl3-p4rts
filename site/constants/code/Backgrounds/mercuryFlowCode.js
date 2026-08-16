import code from '@content/Backgrounds/MercuryFlow/MercuryFlow.jsx?raw';
import css from '@content/Backgrounds/MercuryFlow/MercuryFlow.css?raw';
import tailwind from '@tailwind/Backgrounds/MercuryFlow/MercuryFlow.jsx?raw';
import tsCode from '@ts-default/Backgrounds/MercuryFlow/MercuryFlow.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/MercuryFlow/MercuryFlow.tsx?raw';

export const mercuryFlow = {
  dependencies: `ogl`,
  usage: `import MercuryFlow from './MercuryFlow';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <MercuryFlow
    baseColor={[0.1, 0.1, 0.1]}
    speed={1}
    amplitude={0.6}
    interactive={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
