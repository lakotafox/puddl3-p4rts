import code from '@content/Backgrounds/StippleSurface/StippleSurface.jsx?raw';
import css from '@content/Backgrounds/StippleSurface/StippleSurface.css?raw';
import tailwind from '@tailwind/Backgrounds/StippleSurface/StippleSurface.jsx?raw';
import tsCode from '@ts-default/Backgrounds/StippleSurface/StippleSurface.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/StippleSurface/StippleSurface.tsx?raw';

export const stippleSurface = {
  dependencies: ``,
  usage: `import StippleSurface from './StippleSurface';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <StippleSurface
    dotRadius={1.5}
    dotSpacing={14}
    bulgeStrength={67}
    glowRadius={160}
    sparkle={false}
    waveAmplitude={0}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
