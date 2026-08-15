import code from '@content/Backgrounds/CrystalSpin/CrystalSpin.jsx?raw';
import css from '@content/Backgrounds/CrystalSpin/CrystalSpin.css?raw';
import tailwind from '@tailwind/Backgrounds/CrystalSpin/CrystalSpin.jsx?raw';
import tsCode from '@ts-default/Backgrounds/CrystalSpin/CrystalSpin.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/CrystalSpin/CrystalSpin.tsx?raw';

export const crystalSpin = {
  dependencies: `ogl`,
  usage: `import CrystalSpin from './CrystalSpin';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <CrystalSpin
    animationType="rotate"
    timeScale={0.5}
    height={3.5}
    baseWidth={5.5}
    scale={3.6}
    hueShift={0}
    colorFrequency={1}
    noise={0.5}
    glow={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
