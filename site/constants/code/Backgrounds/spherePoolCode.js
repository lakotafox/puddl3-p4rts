import code from '@content/Backgrounds/SpherePool/SpherePool.jsx?raw';
import tailwind from '@tailwind/Backgrounds/SpherePool/SpherePool.jsx?raw';
import tsCode from '@ts-default/Backgrounds/SpherePool/SpherePool.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/SpherePool/SpherePool.tsx?raw';

export const spherePool = {
  dependencies: `three`,
  usage: `//Component inspired by Kevin Levron:
//https://x.com/soju22/status/1858925191671271801
  
import SpherePool from './SpherePool;'

<div style={{position: 'relative', overflow: 'hidden', minHeight: '500px', maxHeight: '500px', width: '100%'}}>
  <SpherePool
    count={200}
    gravity={0.7}
    friction={0.8}
    wallBounce={0.95}
    followCursor={true}
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
