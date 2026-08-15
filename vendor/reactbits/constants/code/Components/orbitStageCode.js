import code from '@content/Components/OrbitStage/OrbitStage.jsx?raw';
import tailwind from '@tailwind/Components/OrbitStage/OrbitStage.jsx?raw';
import tsCode from '@ts-default/Components/OrbitStage/OrbitStage.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/OrbitStage/OrbitStage.tsx?raw';

export const orbitStage = {
  dependencies: `three @react-three/fiber @react-three/drei`,
  usage: `import OrbitStage from './OrbitStage';

<OrbitStage
  url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
  width={400}
  height={400}
/>
`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
