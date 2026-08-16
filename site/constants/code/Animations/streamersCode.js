import code from '@content/Animations/Streamers/Streamers.jsx?raw';
import css from '@content/Animations/Streamers/Streamers.css?raw';
import tailwind from '@tailwind/Animations/Streamers/Streamers.jsx?raw';
import tsCode from '@ts-default/Animations/Streamers/Streamers.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/Streamers/Streamers.tsx?raw';

export const streamers = {
  dependencies: `ogl`,
  usage: `import Streamers from './Streamers';

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <Streamers
    baseThickness={30}
    colors={['#ffffff']}
    speedMultiplier={0.5}
    maxAge={500}
    enableFade={false}
    enableShaderEffect={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
