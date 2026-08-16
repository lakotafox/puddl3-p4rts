import code from '@content/Animations/PhantomPointer/PhantomPointer.jsx?raw';
import css from '@content/Animations/PhantomPointer/PhantomPointer.css?raw';
import tailwind from '@tailwind/Animations/PhantomPointer/PhantomPointer.jsx?raw';
import tsCode from '@ts-default/Animations/PhantomPointer/PhantomPointer.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/PhantomPointer/PhantomPointer.tsx?raw';

export const phantomPointer = {
  dependencies: `three`,
  usage: `import PhantomPointer from './PhantomPointer'

<div style={{ height: 600, position: 'relative' }}>
  <PhantomPointer
    // Visuals
    color="#B497CF"
    brightness={1}
    edgeIntensity={0}

    // Trail and motion
    trailLength={50}
    inertia={0.5}

    // Post-processing
    grainIntensity={0.05}
    bloomStrength={0.1}
    bloomRadius={1.0}
    bloomThreshold={0.025}

    // Fade-out behavior
    fadeDelayMs={1000}
    fadeDurationMs={1500}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
