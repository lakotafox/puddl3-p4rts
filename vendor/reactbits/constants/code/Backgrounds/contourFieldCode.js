import code from '@content/Backgrounds/ContourField/ContourField.jsx?raw';
import css from '@content/Backgrounds/ContourField/ContourField.css?raw';
import tailwind from '@tailwind/Backgrounds/ContourField/ContourField.jsx?raw';
import tsCode from '@ts-default/Backgrounds/ContourField/ContourField.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/ContourField/ContourField.tsx?raw';

export const contourField = {
  dependencies: `ogl`,
  usage: `import ContourField from './ContourField';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <ContourField
    lowColor="#5227FF"
    midColor="#FF9FFC"
    highColor="#FFFFFF"
    speed={0.35}
    morphAmount={3.0}
    morphSpeed={0.05}
    bands={2.0}
    thickness={0.01}
    scale={1.0}
    pixelSize={1.0}
    glow={0.5}
    colorMode="elevation"
    contrast={3.0}
    brightness={1.0}
    fillBands={false}
    opacity={1.0}
    grain={true}
    grainIntensity={0.05}
    mouseInteraction={true}
    mouseRadius={0.3}
    mouseStrength={0.4}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
