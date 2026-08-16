import code from '@content/Animations/ArcaneHalos/ArcaneHalos.jsx?raw';
import css from '@content/Animations/ArcaneHalos/ArcaneHalos.css?raw';
import tailwind from '@tailwind/Animations/ArcaneHalos/ArcaneHalos.jsx?raw';
import tsCode from '@ts-default/Animations/ArcaneHalos/ArcaneHalos.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/ArcaneHalos/ArcaneHalos.tsx?raw';

export const arcaneHalos = {
  dependencies: '',
  usage: `import ArcaneHalos from './ArcaneHalos';

<div style={{ width: '600px', height: '400px', position: 'relative' }}>
  <ArcaneHalos
    color="#fc42ff"
    colorTwo="#42fcff"
    ringCount={6}
    speed={1}
    attenuation={10}
    lineThickness={2}
    baseRadius={0.35}
    radiusStep={0.1}
    scaleRate={0.1}
    opacity={1}
    blur={0}
    noiseAmount={0.1}
    rotation={0}
    ringGap={1.5}
    fadeIn={0.7}
    fadeOut={0.5}
    followMouse={false}
    mouseInfluence={0.2}
    hoverScale={1.2}
    parallax={0.05}
    clickBurst={false}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind,
};
