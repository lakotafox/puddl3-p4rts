import code from '@content/Backgrounds/SpectrumFlare/SpectrumFlare.jsx?raw';
import css from '@content/Backgrounds/SpectrumFlare/SpectrumFlare.css?raw';
import tailwind from '@tailwind/Backgrounds/SpectrumFlare/SpectrumFlare.jsx?raw';
import tsCode from '@ts-default/Backgrounds/SpectrumFlare/SpectrumFlare.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/SpectrumFlare/SpectrumFlare.tsx?raw';

export const spectrumFlare = {
  dependencies: `ogl`,
  usage: `import SpectrumFlare from './SpectrumFlare';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <SpectrumFlare
    animationType="rotate3d"
    intensity={2}
    speed={0.5}
    distort={1.0}
    paused={false}
    offset={{ x: 0, y: 0 }}
    hoverDampness={0.25}
    rayCount={24}
    mixBlendMode="lighten"
    colors={['#ff007a', '#4d3dff', '#ffffff']}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
