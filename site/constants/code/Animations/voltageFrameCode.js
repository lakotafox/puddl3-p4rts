import code from '@content/Animations/VoltageFrame/VoltageFrame.jsx?raw';
import css from '@content/Animations/VoltageFrame/VoltageFrame.css?raw';
import tailwind from '@tailwind/Animations/VoltageFrame/VoltageFrame.jsx?raw';
import tsCode from '@ts-default/Animations/VoltageFrame/VoltageFrame.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/VoltageFrame/VoltageFrame.tsx?raw';

export const voltageFrame = {
  usage: `// CREDIT
// Component inspired by @BalintFerenczy on X
// https://codepen.io/BalintFerenczy/pen/KwdoyEN
  
import VoltageFrame from './VoltageFrame'

<VoltageFrame
  color="#7df9ff"
  speed={1}
  chaos={0.5}
  thickness={2}
  style={{ borderRadius: 16 }}
>
  <div>
    <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
      A glowing, animated border wrapper.
    </p>
  </div>
</VoltageFrame>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
