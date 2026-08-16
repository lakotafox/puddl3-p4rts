import code from '@content/Backgrounds/GlowColumn/GlowColumn.jsx?raw';
import css from '@content/Backgrounds/GlowColumn/GlowColumn.css?raw';
import tailwind from '@tailwind/Backgrounds/GlowColumn/GlowColumn.jsx?raw';
import tsCode from '@ts-default/Backgrounds/GlowColumn/GlowColumn.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/GlowColumn/GlowColumn.tsx?raw';

export const glowColumn = {
  dependencies: `three`,
  usage: `import GlowColumn from './GlowColumn';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <GlowColumn
    topColor="#5227FF"
    bottomColor="#FF9FFC"
    intensity={1.0}
    rotationSpeed={0.3}
    glowAmount={0.005}
    pillarWidth={3.0}
    pillarHeight={0.4}
    noiseIntensity={0.5}
    pillarRotation={0}
    interactive={false}
    mixBlendMode="normal"
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
