import code from '@content/Backgrounds/IonSwell/IonSwell.jsx?raw';
import css from '@content/Backgrounds/IonSwell/IonSwell.css?raw';
import tailwind from '@tailwind/Backgrounds/IonSwell/IonSwell.jsx?raw';
import tsCode from '@ts-default/Backgrounds/IonSwell/IonSwell.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/IonSwell/IonSwell.tsx?raw';

export const ionSwell = {
  dependencies: `ogl`,
  usage: `import IonSwell from './IonSwell';
  
<IonSwell
  colors={["#A855F7", "#06B6D4"]}
  speed1={0.05}
  speed2={0.05}
  focalLength={0.8}
  bend1={1}
  bend2={0.5}
  dir2={1.0}
  rotationDeg={0}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
