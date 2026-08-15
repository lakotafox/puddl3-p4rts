import code from '@content/TextAnimations/DustType/DustType.jsx?raw';
import css from '@content/TextAnimations/DustType/DustType.css?raw';
import tailwind from '@tailwind/TextAnimations/DustType/DustType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/DustType/DustType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/DustType/DustType.tsx?raw';

export const dustType = {
  dependencies: ``,
  usage: `import DustType from './DustType';

<div style={{ width: '100%', height: 360, background: '#09090f' }}>
  <DustType
    text="Launch Faster"
    particleSize={2}
    density={4}
    color="#ffffff"
    highlightColor="#8b5cf6"
    scatter={180}
    gatherDuration={1600}
    stagger={420}
    pointerRepel={40}
    repelRadius={120}
    idleDrift={0.7}
    trigger="hover"
    fontSize="clamp(3rem, 12vw, 8rem)"
    fontWeight={800}
    fontFamily="inherit"
    glow
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
