import code from '@content/Backgrounds/RetroStatic/RetroStatic.jsx?raw';
import css from '@content/Backgrounds/RetroStatic/RetroStatic.css?raw';
import tailwind from '@tailwind/Backgrounds/RetroStatic/RetroStatic.jsx?raw';
import tsCode from '@ts-default/Backgrounds/RetroStatic/RetroStatic.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/RetroStatic/RetroStatic.tsx?raw';

export const retroStatic = {
  dependencies: 'three postprocessing @react-three/fiber @react-three/postprocessing',
  usage: `import RetroStatic from './RetroStatic';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <RetroStatic
    waveColor={[0.5, 0.5, 0.5]}
    disableAnimation={false}
    enableMouseInteraction={true}
    mouseRadius={0.3}
    colorNum={4}
    waveAmplitude={0.3}
    waveFrequency={3}
    waveSpeed={0.05}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
