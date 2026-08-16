import code from '@content/Backgrounds/EmberGaze/EmberGaze.jsx?raw';
import css from '@content/Backgrounds/EmberGaze/EmberGaze.css?raw';
import tailwind from '@tailwind/Backgrounds/EmberGaze/EmberGaze.jsx?raw';
import tsCode from '@ts-default/Backgrounds/EmberGaze/EmberGaze.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/EmberGaze/EmberGaze.tsx?raw';

export const emberGaze = {
  dependencies: `ogl`,
  usage: `import EmberGaze from './EmberGaze';

<EmberGaze
  eyeColor="#FF6F37"
  intensity={1.5}
  pupilSize={0.6}
  irisWidth={0.25}
  glowIntensity={0.35}
  scale={0.8}
  noiseScale={1.0}
  pupilFollow={1.0}
  flameSpeed={1.0}
  backgroundColor="#000000"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
