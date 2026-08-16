import code from '@content/Backgrounds/ShutterGlow/ShutterGlow.jsx?raw';
import css from '@content/Backgrounds/ShutterGlow/ShutterGlow.css?raw';
import tailwind from '@tailwind/Backgrounds/ShutterGlow/ShutterGlow.jsx?raw';
import tsCode from '@ts-default/Backgrounds/ShutterGlow/ShutterGlow.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/ShutterGlow/ShutterGlow.tsx?raw';

export const shutterGlow = {
  dependencies: `ogl`,
  usage: `import ShutterGlow from './ShutterGlow';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <ShutterGlow
    gradientColors={['#FF9FFC', '#5227FF']}
    angle={0}
    noise={0.3}
    blindCount={12}
    blindMinWidth={50}
    spotlightRadius={0.5}
    spotlightSoftness={1}
    spotlightOpacity={1}
    mouseDampening={0.15}
    distortAmount={0}
    shineDirection="left"
    mixBlendMode="lighten"
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
