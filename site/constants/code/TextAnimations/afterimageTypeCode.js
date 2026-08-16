import code from '@content/TextAnimations/AfterimageType/AfterimageType.jsx?raw';
import css from '@content/TextAnimations/AfterimageType/AfterimageType.css?raw';
import tailwind from '@tailwind/TextAnimations/AfterimageType/AfterimageType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/AfterimageType/AfterimageType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/AfterimageType/AfterimageType.tsx?raw';

export const afterimageType = {
  dependencies: ``,
  usage: `import AfterimageType from './AfterimageType';

<AfterimageType
  text="Motion Echo"
  echoes={12}
  lag={0.24}
  offset={36}
  direction="right"
  fade={0.72}
  blur={3}
  tint="#7dd3fc"
  mode="both"
  cursorRadius={320}
  duration={900}
  ease="ease-out"
  fontSize="clamp(3rem, 9vw, 7rem)"
  fontWeight={800}
  color="#f8fafc"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
