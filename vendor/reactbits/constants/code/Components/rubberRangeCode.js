import code from '@content/Components/RubberRange/RubberRange.jsx?raw';
import css from '@content/Components/RubberRange/RubberRange.css?raw';
import tailwind from '@tailwind/Components/RubberRange/RubberRange.jsx?raw';
import tsCode from '@ts-default/Components/RubberRange/RubberRange.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/RubberRange/RubberRange.tsx?raw';

export const rubberRange = {
  dependencies: `motion`,
  usage: `import RubberRange from './RubberRange'
  
<RubberRange
  leftIcon={<>...your icon...</>}
  rightIcon={<>...your icon...</>}
  startingValue={500}
  defaultValue={750}
  maxValue={1000}
  isStepped
  stepSize={10}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
