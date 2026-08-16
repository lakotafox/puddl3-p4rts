import code from '@content/Backgrounds/InkCurrents/InkCurrents.jsx?raw';
import css from '@content/Backgrounds/InkCurrents/InkCurrents.css?raw';
import tailwind from '@tailwind/Backgrounds/InkCurrents/InkCurrents.jsx?raw';
import tsCode from '@ts-default/Backgrounds/InkCurrents/InkCurrents.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/InkCurrents/InkCurrents.tsx?raw';

export const inkCurrents = {
  dependencies: `three`,
  usage: `import InkCurrents from './InkCurrents';

<div style={{ width: '100%', height: 600, position: 'relative' }}>
  <InkCurrents
    colors={[ '#5227FF', '#FF9FFC', '#B497CF' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
