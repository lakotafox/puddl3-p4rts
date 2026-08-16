import code from '@content/Backgrounds/RippleLines/RippleLines.jsx?raw';
import css from '@content/Backgrounds/RippleLines/RippleLines.css?raw';
import tailwind from '@tailwind/Backgrounds/RippleLines/RippleLines.jsx?raw';
import tsCode from '@ts-default/Backgrounds/RippleLines/RippleLines.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/RippleLines/RippleLines.tsx?raw';

export const rippleLines = {
  usage: `import RippleLines from './RippleLines';

<RippleLines
  lineColor="#fff"
  backgroundColor="rgba(255, 255, 255, 0.2)"
  waveSpeedX={0.02}
  waveSpeedY={0.01}
  waveAmpX={40}
  waveAmpY={20}
  friction={0.9}
  tension={0.01}
  maxCursorMove={120}
  xGap={12}
  yGap={36}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
