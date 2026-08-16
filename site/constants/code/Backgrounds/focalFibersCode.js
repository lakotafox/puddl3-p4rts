import code from '@content/Backgrounds/FocalFibers/FocalFibers.jsx?raw';
import css from '@content/Backgrounds/FocalFibers/FocalFibers.css?raw';
import tailwind from '@tailwind/Backgrounds/FocalFibers/FocalFibers.jsx?raw';
import tsCode from '@ts-default/Backgrounds/FocalFibers/FocalFibers.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/FocalFibers/FocalFibers.tsx?raw';

export const focalFibers = {
  dependencies: `ogl`,
  usage: `import FocalFibers from './FocalFibers';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <FocalFibers
    color1="#5227FF"
    color2="#FF9FFC"
    color3="#FFFFFF"
    speed={0.2}
    threadCount={6}
    frequency={5.0}
    spread={0.18}
    taper={1.0}
    position={0.5}
    fanMode="center"
    glow={0.02}
    falloff={0.6}
    thickness={1.1}
    brightness={0.6}
    opacity={1.0}
    mirror={true}
    shimmer={false}
    grain={true}
    grainIntensity={0.05}
    mouseInteraction={true}
    mouseStrength={0.3}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
