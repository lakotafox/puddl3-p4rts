import code from '@content/Backgrounds/OilSlick/OilSlick.jsx?raw';
import css from '@content/Backgrounds/OilSlick/OilSlick.css?raw';
import tailwind from '@tailwind/Backgrounds/OilSlick/OilSlick.jsx?raw';
import tsCode from '@ts-default/Backgrounds/OilSlick/OilSlick.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/OilSlick/OilSlick.tsx?raw';

export const oilSlick = {
  dependencies: `ogl`,
  usage: `import OilSlick from './OilSlick';
  
<OilSlick
  color={[1, 1, 1]}
  mouseReact={false}
  amplitude={0.1}
  speed={1.0}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};

export const iridescenceMock = {
  usage: `import OilSlick from './OilSlick';

<OilSlick
  color={[0, 1, 1]}
  mouseReact={false}
  amplitude={0.1}
  speed={1.0}
/>`
};
