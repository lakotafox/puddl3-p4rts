import code from '@content/Backgrounds/SlatRipple/SlatRipple.jsx?raw';
import css from '@content/Backgrounds/SlatRipple/SlatRipple.css?raw';
import tailwind from '@tailwind/Backgrounds/SlatRipple/SlatRipple.jsx?raw';
import tsCode from '@ts-default/Backgrounds/SlatRipple/SlatRipple.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/SlatRipple/SlatRipple.tsx?raw';

export const slatRipple = {
  dependencies: `ogl`,
  usage: `import SlatRipple from './SlatRipple';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <SlatRipple
    color1="#FF9FFC"
    color2="#5227FF"
    color3="#B497CF"
    columns={14}
    rows={8}
    barThickness={0.1}
    speed={0.35}
    travel={0.7}
    waveSpread={0.9}
    rowOffset={1.0}
    softness={0.05}
    glow={0}
    brightness={1.0}
    contrast={1.0}
    opacity={0.5}
    orientation="horizontal"
    alternate={false}
    mouseInteraction={true}
    mouseStrength={1}
    mouseRadius={0.3}
    grain={true}
    grainIntensity={0.05}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
