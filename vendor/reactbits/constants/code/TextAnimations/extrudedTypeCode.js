import code from '@content/TextAnimations/ExtrudedType/ExtrudedType.jsx?raw';
import css from '@content/TextAnimations/ExtrudedType/ExtrudedType.css?raw';
import tailwind from '@tailwind/TextAnimations/ExtrudedType/ExtrudedType.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ExtrudedType/ExtrudedType.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ExtrudedType/ExtrudedType.tsx?raw';

export const extrudedType = {
  dependencies: ``,
  usage: `import ExtrudedType from './ExtrudedType';

<ExtrudedType
  text="Elevate"
  layers={34}
  depth={2.4}
  faceColor="#f8fafc"
  depthColor="#7c3aed"
  tilt={7.5}
  pointerTracking
  smoothing={0.14}
  perspective={900}
  autoOrbit
  orbitSpeed={0.35}
  fontSize="clamp(3rem, 12vw, 7rem)"
  fontWeight={900}
  shadow
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
