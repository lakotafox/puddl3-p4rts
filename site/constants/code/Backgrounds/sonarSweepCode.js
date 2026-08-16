import code from '@content/Backgrounds/SonarSweep/SonarSweep.jsx?raw';
import css from '@content/Backgrounds/SonarSweep/SonarSweep.css?raw';
import tailwind from '@tailwind/Backgrounds/SonarSweep/SonarSweep.jsx?raw';
import tsCode from '@ts-default/Backgrounds/SonarSweep/SonarSweep.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/SonarSweep/SonarSweep.tsx?raw';

export const sonarSweep = {
  dependencies: `ogl`,
  usage: `import SonarSweep from './SonarSweep';
  
<SonarSweep
  speed={1.0}
  scale={0.5}
  ringCount={10}
  spokeCount={10}
  ringThickness={0.05}
  spokeThickness={0.01}
  sweepSpeed={1.0}
  sweepWidth={2.0}
  sweepLobes={1}
  color="#9f29ff"
  backgroundColor="#000000"
  falloff={2.0}
  brightness={1.0}
  enableMouseInteraction={true}
  mouseInfluence={0.1}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
