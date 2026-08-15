import code from '@content/Animations/FilamentWeave/FilamentWeave.jsx?raw';
import css from '@content/Animations/FilamentWeave/FilamentWeave.css?raw';
import tailwind from '@tailwind/Animations/FilamentWeave/FilamentWeave.jsx?raw';
import tsCode from '@ts-default/Animations/FilamentWeave/FilamentWeave.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/FilamentWeave/FilamentWeave.tsx?raw';

export const filamentWeave = {
  dependencies: `ogl`,
  usage: `import FilamentWeave from './FilamentWeave';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <FilamentWeave
    colors={["#FF4242", "#7C3AED", "#06B6D4", "#EAB308"]}
    count={3}
    speed={0.5}
    amplitude={1}
    waviness={1}
    thickness={0.7}
    glow={2.6}
    taper={3}
    spread={1}
    intensity={0.6}
    saturation={1.5}
    opacity={1}
    scale={1.5}
    glass={false}
    refraction={1}
    dispersion={1}
    glassSize={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
