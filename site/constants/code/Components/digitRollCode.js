import code from '@content/Components/DigitRoll/DigitRoll.jsx?raw';
import css from '@content/Components/DigitRoll/DigitRoll.css?raw';
import tailwind from '@tailwind/Components/DigitRoll/DigitRoll.jsx?raw';
import tsCode from '@ts-default/Components/DigitRoll/DigitRoll.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/DigitRoll/DigitRoll.tsx?raw';

export const digitRoll = {
  dependencies: `motion`,
  usage: `import DigitRoll from './DigitRoll';

<DigitRoll
  value={1}
  places={[100, 10, 1]}
  fontSize={80}
  padding={5}
  gap={10}
  textColor="white"
  fontWeight={900}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
