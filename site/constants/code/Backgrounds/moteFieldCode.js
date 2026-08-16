import code from '@content/Backgrounds/MoteField/MoteField.jsx?raw';
import css from '@content/Backgrounds/MoteField/MoteField.css?raw';
import tailwind from '@tailwind/Backgrounds/MoteField/MoteField.jsx?raw';
import tsCode from '@ts-default/Backgrounds/MoteField/MoteField.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/MoteField/MoteField.tsx?raw';

export const moteField = {
  dependencies: `ogl`,
  usage: `import MoteField from './MoteField';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <MoteField
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
