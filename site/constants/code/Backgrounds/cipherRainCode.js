import code from '@content/Backgrounds/CipherRain/CipherRain.jsx?raw';
import tailwind from '@tailwind/Backgrounds/CipherRain/CipherRain.jsx?raw';
import tsCode from '@ts-default/Backgrounds/CipherRain/CipherRain.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/CipherRain/CipherRain.tsx?raw';

export const cipherRain = {
  usage: `import CipherRain from './CipherRain';
  
<CipherRain
  glitchSpeed={50}
  centerVignette={true}
  outerVignette={false}
  smooth={true}
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
