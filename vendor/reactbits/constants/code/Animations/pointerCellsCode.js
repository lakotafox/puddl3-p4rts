import code from '@content/Animations/PointerCells/PointerCells.jsx?raw';
import css from '@content/Animations/PointerCells/PointerCells.css?raw';
import tailwind from '@tailwind/Animations/PointerCells/PointerCells.jsx?raw';
import tsCode from '@ts-default/Animations/PointerCells/PointerCells.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/PointerCells/PointerCells.tsx?raw';

export const pointerCells = {
  usage: `import PointerCells from './PointerCells';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PointerCells
    cellSize={70}
    color="#D946EF"
    radius={140}
    falloff="smooth"
    holdTime={400}
    fadeDuration={800}
    lineWidth={1.2}
    maxOpacity={1}
    fillOpacity={0}
    gridOpacity={0}
    cellRadius={0}
    clickPulse
    pulseSpeed={600}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
