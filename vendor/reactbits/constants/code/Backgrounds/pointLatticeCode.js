import code from '@content/Backgrounds/PointLattice/PointLattice.jsx?raw';
import css from '@content/Backgrounds/PointLattice/PointLattice.css?raw';
import tailwind from '@tailwind/Backgrounds/PointLattice/PointLattice.jsx?raw';
import tsCode from '@ts-default/Backgrounds/PointLattice/PointLattice.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/PointLattice/PointLattice.tsx?raw';

export const pointLattice = {
  dependencies: `gsap`,
  usage: `import PointLattice from './PointLattice';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PointLattice
    dotSize={10}
    gap={15}
    baseColor="#5227FF"
    activeColor="#5227FF"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
