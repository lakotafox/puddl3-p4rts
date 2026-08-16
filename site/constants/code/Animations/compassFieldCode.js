import code from '@content/Animations/CompassField/CompassField.jsx?raw';
import css from '@content/Animations/CompassField/CompassField.css?raw';
import tailwind from '@tailwind/Animations/CompassField/CompassField.jsx?raw';
import tsCode from '@ts-default/Animations/CompassField/CompassField.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/CompassField/CompassField.tsx?raw';

export const compassField = {
  usage: `import CompassField from './CompassField';

<CompassField
  rows={9}
  columns={9}
  containerSize="60vmin"
  lineColor="tomato"
  lineWidth="0.8vmin"
  lineHeight="5vmin"
  baseAngle={0}
  style={{ margin: "2rem auto" }}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
