import code from '@content/Backgrounds/NeonDownpour/NeonDownpour.jsx?raw';
import css from '@content/Backgrounds/NeonDownpour/NeonDownpour.css?raw';
import tailwind from '@tailwind/Backgrounds/NeonDownpour/NeonDownpour.jsx?raw';
import tsCode from '@ts-default/Backgrounds/NeonDownpour/NeonDownpour.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/NeonDownpour/NeonDownpour.tsx?raw';

export const neonDownpour = {
  dependencies: `ogl`,
  usage: `import NeonDownpour from './NeonDownpour';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <NeonDownpour
    colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
    backgroundColor="#0A29FF"
    speed={1}
    streakCount={8}
    streakWidth={1}
    streakLength={1}
    glow={1}
    density={1}
    twinkle={1}
    zoom={2}
    backgroundGlow={1}
    opacity={1}
    mouseInteraction={true}
    mouseStrength={1}
    mouseRadius={0.6}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
