import code from '@content/Backgrounds/CRTFlicker/CRTFlicker.jsx?raw';
import css from '@content/Backgrounds/CRTFlicker/CRTFlicker.css?raw';
import tailwind from '@tailwind/Backgrounds/CRTFlicker/CRTFlicker.jsx?raw';
import tsCode from '@ts-default/Backgrounds/CRTFlicker/CRTFlicker.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/CRTFlicker/CRTFlicker.tsx?raw';

export const crtFlicker = {
  dependencies: `ogl`,
  usage: `import CRTFlicker from './CRTFlicker';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <CRTFlicker
    scale={1.5}
    gridMul={[2, 1]}
    digitSize={1.2}
    timeScale={1}
    pause={false}
    scanlineIntensity={1}
    glitchAmount={1}
    flickerAmount={1}
    noiseAmp={1}
    chromaticAberration={0}
    dither={0}
    curvature={0}
    tint="#ffffff"
    mouseReact={true}
    mouseStrength={0.5}
    pageLoadAnimation={false}
    brightness={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
