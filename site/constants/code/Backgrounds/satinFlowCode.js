import code from '@content/Backgrounds/SatinFlow/SatinFlow.jsx?raw';
import tailwind from '@tailwind/Backgrounds/SatinFlow/SatinFlow.jsx?raw';
import tsCode from '@ts-default/Backgrounds/SatinFlow/SatinFlow.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/SatinFlow/SatinFlow.tsx?raw';

export const satinFlow = {
  installation: 'npm install three @react-three/fiber',
  usage: `import SatinFlow from './SatinFlow';

<SatinFlow
  speed={5}
  scale={1}
  color="#7B7481"
  noiseIntensity={1.5}
  rotation={0}
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
