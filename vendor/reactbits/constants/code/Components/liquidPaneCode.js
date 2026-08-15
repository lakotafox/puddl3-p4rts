import code from '@content/Components/LiquidPane/LiquidPane.jsx?raw';
import tailwind from '@tailwind/Components/LiquidPane/LiquidPane.jsx?raw';
import tsCode from '@ts-default/Components/LiquidPane/LiquidPane.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/LiquidPane/LiquidPane.tsx?raw';

export const liquidPane = {
  dependencies: `three @react-three/fiber @react-three/drei maath`,
  usage: `// IMPORTANT INFO BELOW
// This component requires a 3D model to function correctly.
// You can find three example models in the 'public/assets/3d' directory of the repository:
// - 'lens.glb'
// - 'bar.glb'
// - 'cube.glb'
// Make sure to place these models in the correct directory or update the paths accordingly.

import LiquidPane from './LiquidPane'

<div style={{ height: '600px', position: 'relative' }}>
  <LiquidPane 
    mode="lens" // or "bar", "cube"
    lensProps={{
      scale: 0.25,
      ior: 1.15,
      thickness: 5,
      chromaticAberration: 0.1,
      anisotropy: 0.01  
    }}
    barProps={} // add specific props if using bar mode
    cubeProps={} // add specific props if using cube mode
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
